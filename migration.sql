-- Run this in your PostgreSQL database to enable dynamic About Image
ALTER TABLE grafix.business_info ADD COLUMN IF NOT EXISTS about_image_url TEXT;
