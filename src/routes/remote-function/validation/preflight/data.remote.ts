import { form } from '$app/server';
import { Schema } from './data';

export const saveScores = form(Schema, async (data) => {
  console.log('Scores saved:', data);
  return { success: true };
});
