<script>
	import { getContext, setContext } from "svelte";
	import { MEMBERS } from "$lib/constants";

	/** @type {import('./$types').PageData} */
	export let data;

	setContext("airtableData", data.payload);

	import img from "$lib/assets/images/wz-logo-v2.png";
</script>

<svelte:head>
	<title>Leaderboard - trackwz.games</title>
</svelte:head>

<div>
	<img
		class="mx-auto pt-4 px-20 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-400"
		src={img}
		alt="Beliebers Warzone Tracker"
	/>
</div>
<div class="flex justify-center my-6 gap-x-6">
	<button
		class="w-24 bg-slate-900 hover:bg-slate-600 text-white hover:text-slate-900 font-bold py-1 px-2 border-2 border-white hover:border-slate-900 rounded text-sm shadow"
		>All Time</button
	>
	<button
		class="w-24 bg-slate-900 hover:bg-slate-600 text-white hover:text-slate-900 font-bold py-1 px-2 border-2 border-white hover:border-slate-900 rounded text-sm shadow"
		>Season 2</button
	>
	<button
		class="w-24 bg-slate-900 hover:bg-slate-600 text-white hover:text-slate-900 font-bold py-1 px-2 border-2 border-white hover:border-slate-900 rounded text-smm"
	>
		Season 3</button
	>
</div>

<table
	class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto mb-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]"
>
	<tr>
		<th class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-tl-lg"
			><a href="/" data-sveltekit-noscroll>Player</a></th
		>
		<th class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center "
			><a href="/?sortBy=p" data-sveltekit-noscroll>P</a></th
		>
		<th class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center "
			><a href="/?sortBy=w" data-sveltekit-noscroll>W</a></th
		>
		<th class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center "
			><a href="/?sortBy=k" data-sveltekit-noscroll>K</a></th
		>
		<th class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center "
			><a href="/?sortBy=dmg" data-sveltekit-noscroll>DMG</a></th
		>
		<th class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-tr-lg"
			><a href="/?sortBy=fc" data-sveltekit-noscroll>FC</a></th
		>
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

<div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
	<table
		class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]"
	>
		<tr
			><th colspan="2" class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-t-lg"
				>Wins</th
			></tr
		>
		{#each getContext("airtableData").sort(({ W: aWins }, { W: bWins }) => bWins - aWins) as member (member[MEMBERS.NAME])}
			<tr>
				<td class="px-4 py-1 text-left">{member[MEMBERS.NAME]}</td><td class="px-2 py-1 text-center"
					>{member[MEMBERS.WINS]}</td
				>
			</tr>
		{/each}
	</table>

	<table
		class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]"
	>
		<tr
			><th colspan="2" class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-t-lg"
				>Win Percentage</th
			></tr
		>
		{#each getContext("airtableData").sort(({ [MEMBERS.WINS_PER_MATCH]: aWPM }, { [MEMBERS.WINS_PER_MATCH]: bWPM }) => bWPM - aWPM) as member (member[MEMBERS.NAME])}
			<tr>
				<td class="px-4 py-1 text-left">{member[MEMBERS.NAME]}</td><td class="px-2 py-1 text-center"
					>{Math.round(member[MEMBERS.WINS_PER_MATCH] * 100)}%</td
				>
			</tr>
		{/each}
	</table>

	<table
		class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]"
	>
		<tr
			><th colspan="2" class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-t-lg"
				>Kills Per Match</th
			></tr
		>
		{#each getContext("airtableData").sort(({ [MEMBERS.KILLS_PER_MATCH]: aKPM }, { [MEMBERS.KILLS_PER_MATCH]: bKPM }) => bKPM - aKPM) as member (member[MEMBERS.NAME])}
			<tr>
				<td class="px-4 py-1 text-left">{member[MEMBERS.NAME]}</td><td class="px-2 py-1 text-center"
					>{Math.round((member[MEMBERS.KILLS_PER_MATCH] + Number.EPSILON) * 10) / 10}</td
				>
			</tr>
		{/each}
	</table>

	<table
		class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]"
	>
		<tr
			><th colspan="2" class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-t-lg"
				>Damage Per Match</th
			></tr
		>
		{#each getContext("airtableData").sort(({ [MEMBERS.DAMAGE_PER_MATCH]: aDPM }, { [MEMBERS.DAMAGE_PER_MATCH]: bDPM }) => bDPM - aDPM) as member (member[MEMBERS.NAME])}
			<tr>
				<td class="px-4 py-1 text-left">{member[MEMBERS.NAME]}</td><td class="px-2 py-1 text-center"
					>{Math.round(member[MEMBERS.DAMAGE_PER_MATCH]).toLocaleString()}</td
				>
			</tr>
		{/each}
	</table>

	<table
		class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]"
	>
		<tr
			><th colspan="2" class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-t-lg"
				>Kills Per Win</th
			></tr
		>
		{#each getContext("airtableData").sort(({ [MEMBERS.KILLS_PER_WIN]: aKPW }, { [MEMBERS.KILLS_PER_WIN]: bKPW }) => bKPW - aKPW) as member (member[MEMBERS.NAME])}
			<tr>
				<td class="px-4 py-1 text-left">{member[MEMBERS.NAME]}</td><td class="px-2 py-1 text-center"
					>{Math.round((member[MEMBERS.KILLS_PER_WIN] + Number.EPSILON) * 10) / 10}</td
				>
			</tr>
		{/each}
	</table>

	<table
		class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]"
	>
		<tr
			><th colspan="2" class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-t-lg"
				>Damage Per Win</th
			></tr
		>
		{#each getContext("airtableData").sort(({ [MEMBERS.DAMAGE_PER_WIN]: aDPW }, { [MEMBERS.DAMAGE_PER_WIN]: bDPW }) => bDPW - aDPW) as member (member[MEMBERS.NAME])}
			<tr>
				<td class="px-4 py-1 text-left">{member[MEMBERS.NAME]}</td><td class="px-2 py-1 text-center"
					>{Math.round(member[MEMBERS.DAMAGE_PER_WIN]).toLocaleString()}</td
				>
			</tr>
		{/each}
	</table>
</div>

<style>
	:global(body) {
		background-color: #192214;
		background: linear-gradient(rgba(27, 20, 0, 0.808), rgba(27, 20, 0, 0.808)),
			url("../lib/assets/images/background-pattern.jpg");
		background-size: 190%;
	}
	@media only screen and (min-width: 800px) {
		:global(body) {
			background-size: 70%;
		}
	}
</style>
