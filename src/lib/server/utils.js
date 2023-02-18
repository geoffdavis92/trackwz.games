/**
 *
 * @param {string} str
 */
export function toCamelCase(str) {
  return str.replace(/\s([a-z])/g, (match) => match.trim().toUpperCase());
}

/**
 * AIRTABLE UTILS
 */

/**
 * 
 * @param {*} arr 
 * @param {*} callback 
 * @returns 
 */
export const asyncForEach = async function asyncForEach(arr, callback) {
	return new Promise((resolve) => {
		arr.forEach(async (record, recordIndex) => {
			await callback(record, recordIndex);

			if (recordIndex === arr.length - 1) {
				resolve();
			}
		});
	});
};

export const asyncMap = function asyncMap(arr, callback) {
	return new Promise((resolve) => {
		resolve(
			Promise.all(
				arr.map(async (record) => {
					return await callback(record);
				})
			)
		);
	});
};

export const asyncGetRecord = (tableId, recordId) => {
	return new Promise(async (resolve, reject) => {
		base(tableId).find(recordId, function (err, record) {
			if (err) {
				reject(err);

				return;
			}

			resolve(record);
		});
	});
};
