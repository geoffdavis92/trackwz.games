// @ts-nocheck
import { AIRTABLE_UTILS, MWII_BASE_ID } from "$lib/server/constants";
import { MEMBERS } from "$lib/constants";
import { asyncForEach, toCamelCase } from "$lib/server/utils";
import Airtable from "airtable";
import dotenv from "dotenv";

dotenv.config();

const EMPTY_MEMBER_NAME = "(empty)";

export async function GET() {
	const base = Airtable.base(MWII_BASE_ID);
	const members = [];

	await new Promise(async (resolve, reject) => {
		base(AIRTABLE_UTILS.TABLE.MEMBERS)
			.select({})
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
