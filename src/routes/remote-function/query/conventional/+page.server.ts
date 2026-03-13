export async function load({ fetch }) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts = await response.json();
  return { posts }; // 반드시 return 해야 함
}
