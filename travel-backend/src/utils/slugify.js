import slugifyLib from 'slugify';
import { nanoid } from 'nanoid';

/**
 * Generate a slug from a string with a short unique ID
 */
export const generateSlug = (text) => {
  const slug = slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
  });
  return `${slug}-${nanoid(6)}`;
};

export default generateSlug;
