<script>
	import { getPosts } from './data.remote';

	const posts = await getPosts(); // 그냥 바로 호출!
</script>

<!-- eslint-disable-next-line svelte/require-each-key -->
{#each posts as post}
	<p>{post.title}</p>
{/each}
