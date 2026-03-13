# Remote Functions 블로그 포스트 메모

## 구조

```
remote-function/
├── query/       # 데이터 조회 (fetch)
├── command/     # mutation (Like 버튼)
└── form/        # 폼 제출 (포스트 생성)
    각각 conventional/ vs remote/
```

## 핵심 비교 포인트

### query — 데이터 전달 패턴 차이

- conventional: `load()` → `return { posts }` → `let { data } = $props()`
- remote: `query()` → 컴포넌트에서 바로 `await getPosts()`

### command — form action 없이 mutation

- conventional: `<form method="POST">` + `use:enhance`
- remote: `command()` → `onclick`에서 바로 `await addLike()`

### form — validation 보일러플레이트가 사라짐 (가장 임팩트 큼!)

**conventional** — 수동 파싱 + 직접 validation:

```ts
// +page.server.ts
const formData = await request.formData();
const title = formData.get('title')?.toString();
const body = formData.get('body')?.toString();

if (!title || !body) {
  return fail(400, { message: 'Title and body are required' });
}
```

**remote function** — 스키마만 넘기면 파싱/validation/타입 추론 자동:

```ts
// data.remote.ts
export const createPost = form(
  v.object({
    title: v.pipe(v.string(), v.nonEmpty()),
    body: v.pipe(v.string(), v.nonEmpty())
  }),
  async ({ title, body }) => {
    // title, body 이미 string 타입 보장
  }
);
```

컴포넌트에서도 spread만 하면 끝:

```svelte
<form {...createPost}>
  <input {...createPost.fields.title.as('text')} />
</form>
```

### form — client/server validation 비교

|                     | Client-side                                       | Server-side                                              |
| ------------------- | ------------------------------------------------- | -------------------------------------------------------- |
| **conventional**    | HTML `required` 직접 추가                         | `formData` 수동 체크 + `fail()`                          |
| **remote `form()`** | `preflight(schema)` — 제출 전 클라이언트에서 검증 | `form(schema, ...)` — 같은 스키마로 서버에서도 자동 검증 |

conventional은 client와 server validation을 **따로따로** 작성해야 함:

```svelte
<!-- client: 직접 required 추가 -->
<input name="title" type="text" required />
```

```ts
// server: 같은 검증을 또 작성
const title = formData.get('title')?.toString();
if (!title) return fail(400, { message: '...' });
```

remote `form()`은 **valibot 스키마로 양쪽 다 커버**:

```ts
// data.remote.ts — 서버 검증
export const createPost = form(
  v.object({
    title: v.pipe(v.string(), v.nonEmpty('Title is required')),
  }),
  async ({ title }) => { ... }
);
```

```svelte
<!-- +page.svelte — preflight로 클라이언트 검증 + issues()로 에러 표시 -->
<form {...createPost.preflight(schema)}>
  <input {...createPost.fields.title.as('text')} />
  {#each createPost.fields.title.issues() as issue}
    <p style="color: red">{issue.message}</p>
  {/each}
</form>
```

- `preflight(schema)`: 제출 전 클라이언트에서 먼저 검증, 실패 시 서버 요청 안 함
- `fields.title.issues()`: 필드별 에러 메시지 표시
- `nonEmpty()` 자체가 HTML `required`를 자동 부여하진 않음 → `preflight`가 필요

## 포스트 작성 시 참고

- form 섹션에서 validation DX 차이를 핵심으로 강조
- query/command는 "호출 패턴" 차이, form은 "보일러플레이트 제거" 차이
- 데이터 소스는 JSONPlaceholder — 독자가 DB 세팅 없이 바로 실행 가능
