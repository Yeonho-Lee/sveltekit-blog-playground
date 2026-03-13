<script>
  import { createPost } from './data.remote';

  import { Schema } from './data';
</script>

<h2>Create Post</h2>

<form {...createPost.preflight(Schema)}>
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
