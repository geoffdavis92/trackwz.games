async function load({ fetch }) {
  const res = await fetch("/airtable");
  const payload = await res.json();
  return { payload };
}
export {
  load
};
