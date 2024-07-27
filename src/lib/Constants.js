let runType = process.env.NODE_ENV;
// @ts-ignore
export let subpath = __subpath__ ?? '/';

let baseURL = 'http://localhost:5000/';

if (runType === 'production') {
	baseURL = '';
}

baseURL += subpath;

/**
 * @param {string} path
 */
export function getPath(path) {
	if (path.startsWith(subpath)) {
		path = path.substring(subpath.length);
	}
	console.log(path);
	return path;
}

export { baseURL };
