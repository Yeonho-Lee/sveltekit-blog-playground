<script>
	import { createPost } from './data.remote';
	import * as v from 'valibot';

	const schema = v.object({
		title: v.pipe(v.string(), v.nonEmpty('Title is required')),
		body: v.pipe(v.string(), v.nonEmpty('Body is required'))
	});
</script>

<h2>Create Post</h2>

<form {...createPost.preflight(schema)}>
	<label>
		Title
		<input {...createPost.fields.title.as('text')} />
		<!-- eslint-disable-next-line svelte/require-each-key -->
		{#each createPost.fields.title.issues() as issue}
			<p style="color: red">{issue.message}</p>
		{/each}
	</label>
	<label>
		Body
		<textarea {...createPost.fields.body.as('text')}></textarea>
		<!-- eslint-disable-next-line svelte/require-each-key -->
		{#each createPost.fields.body.issues() as issue}
			<p style="color: red">{issue.message}</p>
		{/each}
	</label>
	<button>Create</button>
</form>
