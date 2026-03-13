<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	interface Post {
		title: string;
		id: number;
	}

	let result: Post | null = $state(null);

	const form = page.form as { post: Post } | null;
	$effect(() => {
		if (form?.post) {
			result = form.post;
		}
	});
</script>

<h2>Create Post</h2>

<form method="POST" action="?/create" use:enhance>
	<label>
		Title
		<input name="title" type="text" required />
	</label>
	<label>
		Body
		<textarea name="body" required></textarea>
	</label>
	<button>Create</button>
</form>

{#if result}
	<p>Created: {result.title} (id: {result.id})</p>
{/if}
