<script>
  import { Schema } from './data';
  import { saveScores } from './data.remote';

  const firstIssue = $derived(
    [
      ...(saveScores.fields.korean_1.issues() ?? []),
      ...(saveScores.fields.math_1.issues() ?? []),
      ...(saveScores.fields.english_1.issues() ?? []),
      ...(saveScores.fields.korean_2.issues() ?? []),
      ...(saveScores.fields.math_2.issues() ?? []),
      ...(saveScores.fields.english_2.issues() ?? []),
      ...(saveScores.fields.korean_3.issues() ?? []),
      ...(saveScores.fields.math_3.issues() ?? []),
      ...(saveScores.fields.english_3.issues() ?? [])
    ][0]
  );
</script>

<h2>성적 입력 (preflight 패턴)</h2>

<form {...saveScores.preflight(Schema)}>
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
      <tr>
        <td>김철수</td>
        <td><input {...saveScores.fields.korean_1.as('text')} min="0" max="100" /></td>
        <td><input {...saveScores.fields.math_1.as('text')} min="0" max="100" /></td>
        <td><input {...saveScores.fields.english_1.as('text')} min="0" max="100" /></td>
      </tr>
      <tr>
        <td>이영희</td>
        <td><input {...saveScores.fields.korean_2.as('text')} min="0" max="100" /></td>
        <td><input {...saveScores.fields.math_2.as('text')} min="0" max="100" /></td>
        <td><input {...saveScores.fields.english_2.as('text')} min="0" max="100" /></td>
      </tr>
      <tr>
        <td>박민수</td>
        <td><input {...saveScores.fields.korean_3.as('text')} min="0" max="100" /></td>
        <td><input {...saveScores.fields.math_3.as('text')} min="0" max="100" /></td>
        <td><input {...saveScores.fields.english_3.as('text')} min="0" max="100" /></td>
      </tr>
    </tbody>
  </table>

  {#if firstIssue}
    <p style="color: red; font-size: 0.85em;">{firstIssue.message}</p>
  {/if}

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
