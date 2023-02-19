import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-67b4f883.js","imports":["_app/immutable/start-67b4f883.js","_app/immutable/chunks/index-ac3afb59.js","_app/immutable/chunks/singletons-b51cada9.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js')
		],
		routes: [
			{
				id: "/airtable",
				pattern: /^\/airtable\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../server/entries/endpoints/airtable/_server.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
