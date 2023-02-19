<script>
	import { MEMBERS } from "$lib/constants";

	/** @type {import('./$types').PageData} */
	export let data;

	import img from "$lib/assets/images/wz-logo.png";
</script>

<div>
	<img class="mx-auto pt-4" src={img} alt="Beliebers Warzone Tracker" />
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

<style>
	:global(body) {
		background-color: #192214;
		background: linear-gradient(rgba(27, 20, 0, 0.808), rgba(27, 20, 0, 0.808)),
			url("../lib/assets/images/background-pattern.jpg");
		background-size: 70%;
	}
</style>
