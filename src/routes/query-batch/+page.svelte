<script lang="ts">
  import { getProducts, getProduct } from './data.remote';

  let category = $state<'desktop' | 'laptop' | 'tablet'>('desktop');
</script>

<h2>Remote Functions (query.batch)</h2>

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
    {#each await getProducts(category) as id}
      <tr>
        <td>{id}</td>
        {#await getProduct(id) then product}
          <td>{product.calledAt}</td>
        {/await}
      </tr>
    {/each}
  </tbody>
</table>

<p>
  desktop → tablet → desktop 순으로 전환하면 calledAt이 바뀐다 (캐시 miss).
</p>
