import { command } from '$app/server';

export const saveScores = command(async () => {
  // 실제로는 여기서 DB에 저장
  console.log('Scores saved');
});
