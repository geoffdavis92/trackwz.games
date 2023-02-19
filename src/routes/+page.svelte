<script>
	import { MEMBERS } from "$lib/constants";
	console.log(MEMBERS);

	/** @type {import('./$types').PageData} */
	export let data;
	console.log(data);

	import img from "$lib/assets/images/wz-logo.png";
</script>

<svelte:head>
	<title>Leaderboard - trackwz.games</title>
</svelte:head>

<div>
	<img class="mx-auto" src={img} alt="Beliebers Warzone Tracker" />
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

<div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
	<table
		class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] hover:scale-110 transition-all duration-300 hover:shadow-[0_35px_60px_-10px_rgba(0,0,0,0.7)]"
	>
		<tr
			><th colspan="2" class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-t-lg"
				>Wins</th
			></tr
		>
		{#each data.payload as member (member[MEMBERS.NAME])}
			<tr>
				<td class="px-4 py-1 text-left">{member[MEMBERS.NAME]}</td><td class="px-2 py-1 text-center"
					>{member[MEMBERS.WINS]}</td
				>
			</tr>
		{/each}
	</table>

	<table
		class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] hover:scale-110 transition-all duration-300 hover:shadow-[0_35px_60px_-10px_rgba(0,0,0,0.7)]"
	>
		<tr
			><th colspan="2" class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-t-lg"
				>Win Percentage</th
			></tr
		>
		{#each data.payload as member (member[MEMBERS.NAME])}
			<tr>
				<td class="px-4 py-1 text-left">{member[MEMBERS.NAME]}</td><td class="px-2 py-1 text-center"
					>{Math.round(member[MEMBERS.WINS_PER_MATCH] * 100)}%</td
				>
			</tr>
		{/each}
	</table>

	<table
		class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] hover:scale-110 transition-all duration-300 hover:shadow-[0_35px_60px_-10px_rgba(0,0,0,0.7)]"
	>
		<tr
			><th colspan="2" class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-t-lg"
				>Kills Per Match</th
			></tr
		>
		{#each data.payload as member (member[MEMBERS.NAME])}
			<tr>
				<td class="px-4 py-1 text-left">{member[MEMBERS.NAME]}</td><td class="px-2 py-1 text-center"
					>{Math.round((member[MEMBERS.KILLS_PER_MATCH] + Number.EPSILON) * 10) / 10}</td
				>
			</tr>
		{/each}
	</table>

	<table
		class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] hover:scale-110 transition-all duration-300 hover:shadow-[0_35px_60px_-10px_rgba(0,0,0,0.7)]"
	>
		<tr
			><th colspan="2" class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-t-lg"
				>Damage Per Match</th
			></tr
		>
		{#each data.payload as member (member[MEMBERS.NAME])}
			<tr>
				<td class="px-4 py-1 text-left">{member[MEMBERS.NAME]}</td><td class="px-2 py-1 text-center"
					>{Math.round(member[MEMBERS.DAMAGE_PER_MATCH])}</td
				>
			</tr>
		{/each}
	</table>

	<table
		class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] hover:scale-110 transition-all duration-300 hover:shadow-[0_35px_60px_-10px_rgba(0,0,0,0.7)]"
	>
		<tr
			><th colspan="2" class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-t-lg"
				>Kills Per Win</th
			></tr
		>
		{#each data.payload as member (member[MEMBERS.NAME])}
			<tr>
				<td class="px-4 py-1 text-left">{member[MEMBERS.NAME]}</td><td class="px-2 py-1 text-center"
					>{Math.round((member[MEMBERS.KILLS_PER_WIN] + Number.EPSILON) * 10) / 10}</td
				>
			</tr>
		{/each}
	</table>

	<table
		class="bg-slate-100 dark:bg-slate-600 dark:text-white border-collapse w-9/12 mx-auto my-6 text-lg rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] hover:scale-110 transition-all duration-300 hover:shadow-[0_35px_60px_-10px_rgba(0,0,0,0.7)]"
	>
		<tr
			><th colspan="2" class="px-2 py-1 bg-slate-300 dark:bg-slate-900 text-center rounded-t-lg"
				>Damage Per Win</th
			></tr
		>
		{#each data.payload as member (member[MEMBERS.NAME])}
			<tr>
				<td class="px-4 py-1 text-left">{member[MEMBERS.NAME]}</td><td class="px-2 py-1 text-center"
					>{Math.round(member[MEMBERS.DAMAGE_PER_WIN])}</td
				>
			</tr>
		{/each}
	</table>
</div>
