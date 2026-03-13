<script>
	let { data } = $props(); // load()의 return 값을 여기서 받음
</script>

<!-- eslint-disable-next-line svelte/require-each-key -->
{#each data.posts as post}
	<p>{post.title}</p>
{/each}
