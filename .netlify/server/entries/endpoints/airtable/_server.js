import { M as MEMBERS } from "../../../chunks/constants.js";
import Airtable from "airtable";
const MWII_BASE_ID = "appYeVSeuftJC3hkP";
const AIRTABLE_UTILS = {
  TABLE: {
    MATCHES: "Matches",
    MEMBERS: "Members",
    STATS: "Stats"
  }
};
function toCamelCase(str) {
  return str.replace(/\s([a-z])/g, (match) => match.trim().toUpperCase());
}
const asyncForEach = async function asyncForEach2(arr, callback) {
  return new Promise((resolve) => {
    arr.forEach(async (record, recordIndex) => {
      await callback(record, recordIndex);
      if (recordIndex === arr.length - 1) {
        resolve();
      }
    });
  });
};
const AIRTABLE_API_KEY = "patfqwOalD3i7CAr3.b6978cea73b943e6e5dba95b0ae25a1c4b795bfb78905568677f9154398c0516";
Airtable.configure({
  apiKey: AIRTABLE_API_KEY
});
const EMPTY_MEMBER_NAME = "(empty)";
async function GET() {
  const base = Airtable.base(MWII_BASE_ID);
  const members = [];
  await new Promise(async (resolve, reject) => {
    base(AIRTABLE_UTILS.TABLE.MEMBERS).select({}).eachPage(
      async function page(records, fetchNextPage) {
        await asyncForEach(records, async (membersRecord) => {
          const memberData = {};
          if (membersRecord.get(MEMBERS.NAME) !== EMPTY_MEMBER_NAME) {
            Object.values(MEMBERS).forEach((memberFieldId) => {
              memberData[toCamelCase(memberFieldId)] = membersRecord.get(memberFieldId);
            });
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
export {
  GET
};
