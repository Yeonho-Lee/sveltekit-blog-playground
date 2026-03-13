import { form } from '$app/server';
import { Schema } from './data';

export const createPost = form(Schema, async ({ title, body }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, userId: 1 })
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return await response.json();
});
