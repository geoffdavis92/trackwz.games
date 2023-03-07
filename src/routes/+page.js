/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
	const { search = "" } = url;
	const res = await fetch(`/airtable${search}`);
	const payload = await res.json();

	return { payload };
}
