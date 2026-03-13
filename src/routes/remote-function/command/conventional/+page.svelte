<script>
	import { enhance } from '$app/forms';

	let { data } = $props();
	let likes = $derived(data.likes);
	let localLikes = $state(0);
</script>

<p>Likes: {likes + localLikes}</p>

<form method="POST" action="?/like" use:enhance={() => {
	return async ({ result }) => {
		if (result.type === 'success') {
			localLikes += 1;
		}
	};
}}>
	<button>Like</button>
</form>
