import { query } from '$app/server';

export const getPosts = query(async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
	return await response.json();
});
