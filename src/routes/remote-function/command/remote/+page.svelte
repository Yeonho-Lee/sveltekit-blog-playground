<script>
  import { addLike } from './actions.remote';

  let likes = $state(0);
</script>

<p>Likes: {likes}</p>

<button
  onclick={async () => {
    await addLike();
    likes += 1;
  }}>Like</button
>
