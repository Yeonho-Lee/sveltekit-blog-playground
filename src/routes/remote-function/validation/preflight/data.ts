import * as v from 'valibot';

const score = () =>
  v.pipe(
    v.string(),
    v.nonEmpty('점수를 입력해주세요'),
    v.transform(Number),
    v.minValue(0, '0 이상'),
    v.maxValue(100, '100 이하')
  );

export const Schema = v.object({
  korean_1: score(),
  math_1: score(),
  english_1: score(),
  korean_2: score(),
  math_2: score(),
  english_2: score(),
  korean_3: score(),
  math_3: score(),
  english_3: score()
});
