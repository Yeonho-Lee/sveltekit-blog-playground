<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { QueryClient, setQueryClientContext } from '@tanstack/svelte-query';

  let { children } = $props();

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: 5 * 60 * 1000,
      },
    },
  });

  setQueryClientContext(client);
  onMount(() => client.mount());
  onDestroy(() => client.unmount());
</script>

{@render children()}
