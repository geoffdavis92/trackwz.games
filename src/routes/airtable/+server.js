// @ts-nocheck
import { AIRTABLE_UTILS, MWII_BASE_ID } from "$lib/server/constants";
import { MEMBERS } from "$lib/constants";
import { asyncForEach, toCamelCase } from "$lib/server/utils";
import Airtable from "airtable";
import { AIRTABLE_API_KEY } from "$env/static/private";

// Configure Airtable instance
Airtable.configure({
	apiKey: AIRTABLE_API_KEY
});

const EMPTY_MEMBER_NAME = "(empty)";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const base = Airtable.base(MWII_BASE_ID);
	const sortByParams = url.searchParams.get("sortBy") ?? false;
	const selectConfig = {};
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
				// Push formateed field and direction to array
				arr.push({
					field: field.toUpperCase(),
					direction
				});

				return arr;
			}, []);

		// Add sort criteria to select config object
		selectConfig.sort = sortArr;
	}

	await new Promise(async (resolve, reject) => {
		base(AIRTABLE_UTILS.TABLE.MEMBERS)
			.select(selectConfig)
			.eachPage(
				async function page(records, fetchNextPage) {
					await asyncForEach(records, async (membersRecord) => {
						const memberData = {};

						if (membersRecord.get(MEMBERS.NAME) !== EMPTY_MEMBER_NAME) {
							// Iterate through Members fields, append to data obj
							Object.values(MEMBERS).forEach((memberFieldId) => {
								memberData[toCamelCase(memberFieldId)] = membersRecord.get(memberFieldId);
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

	return new Response(JSON.stringify(members));
}
