<script>
	import { MEMBERS } from "$lib/constants";

	/** @type {import('./$types').PageData} */
	export let data;

	import img from "$lib/assets/images/wz-logo.png";
</script>

<div>
	<img class="mx-auto" src={img} alt="Beliebers Warzone Tracker" />
</div>

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
