import { fail } from '@sveltejs/kit';

export function load() {
  return { likes: 0 };
}

export const actions = {
  like: async ({ fetch }) => {
    // 서버에서 mutation 처리
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: 1 })
    });

    if (!response.ok) {
      return fail(500, { message: 'Failed to add like' });
    }

    return { success: true };
  }
};
