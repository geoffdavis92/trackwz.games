<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation, or else.</p>

<script>
	import { MEMBERS } from "$lib/constants";

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<table>
	<tr>
		<th>Player</th>
		<th>P</th>
		<th>W</th>
		<th>K</th>
		<th>DMG</th>
		<th>FC</th>
	</tr>

	{#each data.payload as member (member[MEMBERS.NAME])}
		<tr>
			<td>{member[MEMBERS.NAME]}</td>
			<td>{member[MEMBERS.PLAYED]}</td>
			<td>{member[MEMBERS.WINS]}</td>
			<td>{member[MEMBERS.KILLS]}</td>
			<td>{member[MEMBERS.DAMAGE]}</td>
			<td>{member[MEMBERS.FINAL_CIRCLE]}</td>
		</tr>
	{/each}
</table>
