import { fail } from '@sveltejs/kit';

export const actions = {
  create: async ({ request, fetch }) => {
    const formData = await request.formData();
    const title = formData.get('title')?.toString();
    const body = formData.get('body')?.toString();

    if (!title || !body) {
      return fail(400, { message: 'Title and body are required' });
    }

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 })
    });

    if (!response.ok) {
      return fail(500, { message: 'Failed to create post' });
    }

    const post: { title: string; id: number } = await response.json();
    return { post };
  }
};
