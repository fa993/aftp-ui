let runType = process.env.NODE_ENV;

let baseURL = 'http://localhost:8000/';

if (runType === 'production') {
	baseURL = '';
}

export { baseURL };
