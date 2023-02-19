import { c as create_ssr_component, d as each, e as escape } from "../../chunks/index.js";
import { M as MEMBERS } from "../../chunks/constants.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="${"https://kit.svelte.dev"}">kit.svelte.dev</a> to read the documentation, or else.</p>



<table><tr><th>Player</th>
		<th>P</th>
		<th>W</th>
		<th>K</th>
		<th>DMG</th>
		<th>FC</th></tr>

	${each(data.payload, (member) => {
    return `<tr><td>${escape(member[MEMBERS.NAME])}</td>
			<td>${escape(member[MEMBERS.PLAYED])}</td>
			<td>${escape(member[MEMBERS.WINS])}</td>
			<td>${escape(member[MEMBERS.KILLS])}</td>
			<td>${escape(member[MEMBERS.DAMAGE])}</td>
			<td>${escape(member[MEMBERS.FINAL_CIRCLE])}</td>
		</tr>`;
  })}</table>`;
});
export {
  Page as default
};
