// @ts-nocheck
import { median } from "mathjs";
import { AIRTABLE_UTILS, MWII_BASE_ID } from "$lib/server/constants";
import { BOOLEAN_STRING, MEMBERS } from "$lib/constants";
import { asyncForEach, toCamelCase } from "$lib/server/utils";
import Airtable from "airtable";
import { AIRTABLE_API_KEY } from "$env/static/private";

// Configure Airtable instance
Airtable.configure({
	apiKey: AIRTABLE_API_KEY
});

// When playing quads without a full 4 member squad
const EMPTY_MEMBER_NAME = "(empty)";

// When playing with a random via squad fill
const RANDOM_MEMBER_NAME = "(random)";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const base = Airtable.base(MWII_BASE_ID);
	const sortByParams = url.searchParams.get("sortBy") ?? false;
	const filterParams = url.searchParams.get("filter") ?? false;
	const selectConfig = {};
	const filterConfig = {};
	const members = [];

	// Build sorting array
	if (sortByParams) {
		// Multiple search criteria are comma separated
		const splitCriteria = sortByParams.split(",");
		const sortArr = splitCriteria
			// Split strings by spaces/URL encoded "+"
			.map((str) => str.split(" "))
			// Build array of criteria objects
			.reduce((arr, [field, direction = "desc"]) => {
				let safeFieldName;

				if (Object.values(MEMBERS).includes(field.toUpperCase())) {
					safeFieldName = field.toUpperCase();
				} else {
					safeFieldName = field;
				}

				// Push formateed field and direction to array
				arr.push({
					field: safeFieldName,
					direction
				});

				return arr;
			}, []);

		// Add sort criteria to select config object
		selectConfig.sort = sortArr;
	}

	if (filterParams) {
		const splitCriteria = filterParams.split(",");

		splitCriteria
			.map((str) => str.split(" "))
			.forEach(([filter]) => {
				filterConfig[filter] = true;
			});
	}

	await new Promise(async (resolve, reject) => {
		base(AIRTABLE_UTILS.TABLE.MEMBERS)
			.select(selectConfig)
			.eachPage(
				async function page(records, fetchNextPage) {
					await asyncForEach(records, async (membersRecord) => {
						const memberData = {};

						if (
							membersRecord.get(MEMBERS.NAME) !== EMPTY_MEMBER_NAME &&
							membersRecord.get(MEMBERS.NAME) !== RANDOM_MEMBER_NAME
						) {
							// Iterate through Members fields, append to data obj
							Object.values(MEMBERS).forEach((memberFieldId) => {
								// Retrieve data value
								const dataValue = membersRecord.get(memberFieldId);

								/**
								 * Test for NaN in computed value
								 *
								 * If value is not a string and when parsed to a float
								 * 	is NaN, then default to a value of zero
								 */
								let safeDataValue = dataValue;
								if (typeof safeDataValue !== "string" && Number.isNaN(parseFloat(dataValue))) {
									safeDataValue = 0;
								}

								// Assign safe data valuue to key
								memberData[toCamelCase(memberFieldId)] = safeDataValue;
							});

							// Push member data to array
							members.push(memberData);
						}
					});

					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);

						reject(err);

						return;
					}

					resolve();
				}
			);
	});

	/**
	 * FILTERING
	 */
	let filteredMembers = members;
	if (filterConfig.outliers) {
		const memberMatchesPlayed = members.map(({ [MEMBERS.PLAYED]: played }) => played);
		const medianMatchesPlayed = median(memberMatchesPlayed);

		filteredMembers = filteredMembers.filter(({ [MEMBERS.PLAYED]: memberMatchesPlayed }) => {
			if (memberMatchesPlayed >= medianMatchesPlayed) {
				return true;
			} else {
				return false;
			}
		});
	}

	// Return data
	return new Response(JSON.stringify(filteredMembers));
}
