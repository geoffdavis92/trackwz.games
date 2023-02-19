export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-67b4f883.js","imports":["_app/immutable/start-67b4f883.js","_app/immutable/chunks/index-ac3afb59.js","_app/immutable/chunks/singletons-b51cada9.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/airtable",
				pattern: /^\/airtable\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/airtable/_server.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
