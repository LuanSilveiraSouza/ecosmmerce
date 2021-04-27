import { createHash } from 'crypto';

export const hash = (value: string): string => {
  const hash = createHash('sha256');

  const data = hash.update(value, 'utf-8');

  return data.digest('hex');
};
