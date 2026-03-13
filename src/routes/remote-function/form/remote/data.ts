import * as v from 'valibot';

export const Schema = v.object({
  title: v.pipe(v.string(), v.nonEmpty()),
  body: v.pipe(v.string(), v.nonEmpty())
});
