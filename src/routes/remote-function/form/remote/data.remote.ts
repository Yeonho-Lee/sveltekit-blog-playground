import * as v from 'valibot';
import { form } from '$app/server';

export const createPost = form(
	v.object({
		title: v.pipe(v.string(), v.nonEmpty()),
		body: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ title, body }) => {
		const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, body, userId: 1 })
		});

		if (!response.ok) {
			throw new Error('Failed to create post');
		}

		return await response.json();
	}
);
