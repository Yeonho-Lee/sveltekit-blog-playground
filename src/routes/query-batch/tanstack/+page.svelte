<script lang="ts">
  import { createQuery, useQueryClient } from '@tanstack/svelte-query';

  const PRODUCTS: Record<string, string[]> = {
    desktop: ['desktop-1', 'desktop-2', 'desktop-3'],
    laptop: ['laptop-1', 'laptop-2', '2in1-1'],
    tablet: ['tablet-1', '2in1-1'],
  };

  async function fetchProduct(id: string) {
    await new Promise((r) => setTimeout(r, 50));
    return { id, calledAt: Date.now() };
  }

  let category = $state<'desktop' | 'laptop' | 'tablet'>('desktop');

  const queryClient = useQueryClient();

  // 카테고리 쿼리 안에서 아이템별 캐시를 직접 채움
  // queryKey: ['product', id] 단위로 캐싱 → 2in1-1은 laptop/tablet이 공유
  const productsQuery = createQuery(() => ({
    queryKey: ['productList', category],
    queryFn: () =>
      Promise.all(
        PRODUCTS[category].map((id) =>
          queryClient.fetchQuery({
            queryKey: ['product', id],
            queryFn: () => fetchProduct(id),
            staleTime: Infinity,
          }),
        ),
      ),
  }));
</script>

<h2>TanStack Query</h2>

<nav>
  <a href="/query-batch">Remote Functions</a>
  {' | '}
  <a href="/query-batch/tanstack">TanStack Query</a>
</nav>

<div>
  {#each (['desktop', 'laptop', 'tablet'] as const) as cat}
    <button onclick={() => (category = cat)} aria-current={category === cat}>
      {cat}
    </button>
  {/each}
</div>

<table>
  <thead>
    <tr>
      <th>id</th>
      <th>calledAt</th>
    </tr>
  </thead>
  <tbody>
    {#each productsQuery.data ?? [] as product}
      <tr>
        <td>{product.id}</td>
        <td>{product.calledAt}</td>
      </tr>
    {/each}
  </tbody>
</table>

<p>
  desktop → tablet → desktop 순으로 전환하면 calledAt이 유지된다 (gcTime으로 캐시 hit).
</p>
