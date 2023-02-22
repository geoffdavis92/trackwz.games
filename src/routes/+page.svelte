<script>
	import { MEMBERS } from "$lib/constants";

	/** @type {import('./$types').PageData} */
	export let data;

	import img from "$lib/assets/images/wz-logo.png";
</script>

<svelte:head>
	<title>Leaderboard - trackwz.games</title>
</svelte:head>

<div>
	<img
		class="mx-auto pt-4 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-400"
		src={img}
		alt="Beliebers Warzone Tracker"
	/>
</div>

<table
	class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg"
>
	<tr>
		<th class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center">Player</th>
		<th class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center">P</th>
		<th class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center">W</th>
		<th class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center">K</th>
		<th class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center">DMG</th>
		<th class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center">FC</th>
	</tr>

	{#each data.payload as member (member[MEMBERS.NAME])}
		<tr>
			<td class="px-2 py-1">{member[MEMBERS.NAME]}</td>
			<td class="px-2 py-1 text-right">{member[MEMBERS.PLAYED]}</td>
			<td class="px-2 py-1 text-right">{member[MEMBERS.WINS]}</td>
			<td class="px-2 py-1 text-right">{member[MEMBERS.KILLS]}</td>
			<td class="px-2 py-1 text-right">{member[MEMBERS.DAMAGE].toLocaleString()}</td>
			<td class="px-2 py-1 text-right">{member[MEMBERS.FINAL_CIRCLE]}</td>
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
