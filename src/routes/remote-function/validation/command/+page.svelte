<script lang="ts">
  import * as v from 'valibot';
  import { saveScores } from './actions.remote';

  const ScoreSchema = v.object({
    studentId: v.number(),
    korean: v.pipe(
      v.number('점수를 입력해주세요'),
      v.minValue(0, '0 이상'),
      v.maxValue(100, '100 이하')
    ),
    math: v.pipe(
      v.number('점수를 입력해주세요'),
      v.minValue(0, '0 이상'),
      v.maxValue(100, '100 이하')
    ),
    english: v.pipe(
      v.number('점수를 입력해주세요'),
      v.minValue(0, '0 이상'),
      v.maxValue(100, '100 이하')
    )
  });

  const ScoresSchema = v.array(ScoreSchema);

  let scores = $state([
    {
      studentId: 1,
      name: '김철수',
      korean: null as number | null,
      math: null as number | null,
      english: null as number | null
    },
    {
      studentId: 2,
      name: '이영희',
      korean: null as number | null,
      math: null as number | null,
      english: null as number | null
    },
    {
      studentId: 3,
      name: '박민수',
      korean: null as number | null,
      math: null as number | null,
      english: null as number | null
    }
  ]);

  async function handleSave() {
    const data = scores.map(({ studentId, korean, math, english }) => ({
      studentId,
      korean,
      math,
      english
    }));

    const result = v.safeParse(ScoresSchema, data);

    if (!result.success) {
      const messages = result.issues.map((issue) => {
        const row = Number(issue.path?.[0]?.key);
        const field = issue.path?.[1]?.key;
        const student = scores[row]?.name ?? `학생 ${row + 1}`;
        return `${student}의 ${field}: ${issue.message}`;
      });
      window.alert(messages.join('\n'));
      return;
    }

    await saveScores();
  }
</script>

<h2>성적 입력 (command 패턴)</h2>

<form
  onsubmit={(e) => {
    e.preventDefault();
    handleSave();
  }}
>
  <table>
    <thead>
      <tr>
        <th>이름</th>
        <th>국어</th>
        <th>수학</th>
        <th>영어</th>
      </tr>
    </thead>
    <tbody>
      <!-- eslint-disable-next-line svelte/require-each-key -->
      {#each scores as score}
        <tr>
          <td>{score.name}</td>
          <td><input type="number" bind:value={score.korean} required min="0" max="100" /></td>
          <td><input type="number" bind:value={score.math} required min="0" max="100" /></td>
          <td><input type="number" bind:value={score.english} required min="0" max="100" /></td>
        </tr>
      {/each}
    </tbody>
  </table>
  <button type="submit">저장</button>
</form>

<style>
  table {
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ccc;
    padding: 0.5rem;
  }

  input[type='number'] {
    width: 60px;
    text-align: center;
  }
</style>
