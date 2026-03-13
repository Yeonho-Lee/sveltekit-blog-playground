import { command } from '$app/server';

export const addLike = command(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes: 1 })
  });

  if (!response.ok) {
    throw new Error('Failed to add like');
  }
});
