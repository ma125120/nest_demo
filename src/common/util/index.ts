
import { createHash } from 'crypto';

const encrypt = (algorithm: string, content: string): string => {
  const hash = createHash(algorithm)
  hash.update(content)
  return hash.digest('hex')
}

/**
 * @param {any} content
 *  @return {string}
 */
export const sha1 = (content) => encrypt('sha1', content)

export const md5 = content => encrypt('md5', content);