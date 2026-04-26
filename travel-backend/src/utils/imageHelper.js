import { nanoid } from 'nanoid';
import { supabase } from '../config/supabase.js';
import { env } from '../config/env.js';

/**
 * Resize image and return buffer
 * Note: Sharp is mocked to bypass ARM64 compatibility issues
 */
export const resizeImage = async (buffer, width = 800, height = 600) => {
  return buffer;
};

/**
 * Upload file to Supabase Storage
 */
export const uploadToSupabase = async (buffer, folder, originalName, mimeType) => {
  const extension = originalName.split('.').pop();
  const fileName = `${folder}/${nanoid()}.${extension}`;

  const { data, error } = await supabase.storage
    .from(env.SUPABASE_STORAGE_BUCKET)
    .upload(fileName, buffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from(env.SUPABASE_STORAGE_BUCKET)
    .getPublicUrl(fileName);

  return { fileName, publicUrl };
};

/**
 * Delete file from Supabase Storage
 */
export const deleteFromSupabase = async (fileUrl) => {
  try {
    // Extract path from URL
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split('/');
    // Assuming URL format is .../storage/v1/object/public/bucket-name/folder/filename.ext
    const filePath = pathParts.slice(pathParts.indexOf(env.SUPABASE_STORAGE_BUCKET) + 1).join('/');

    const { error } = await supabase.storage
      .from(env.SUPABASE_STORAGE_BUCKET)
      .remove([filePath]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase delete error:', error.message);
    return false;
  }
};
