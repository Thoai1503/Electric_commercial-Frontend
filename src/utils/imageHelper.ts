const API_URL_BASE = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") ?? "";

/**
 * Converts an image URL from the backend to a frontend-accessible URL.
 *
 * Examples:
 * - Input: "abc123.jpg" -> Output: "http://localhost:3000/Uploads/abc123.jpg"
 * - Input: "/uploads/abc123.jpg" -> Output: "http://localhost:3000/Uploads/abc123.jpg"
 * - Input: null/undefined -> Output: "/placeholder-image.png"
 */
export const getImageUrl = (
  filename: string | null | undefined,
  fallback: string = "/placeholder-image.png",
): string => {
  if (!filename) {
    return fallback;
  }

  if (filename.startsWith("http://") || filename.startsWith("https://")) {
    return filename;
  }

  const cleanFilename = filename.replace(/^\/?uploads\//i, "");

  if (!API_URL_BASE) {
    return `/Uploads/${cleanFilename}`;
  }

  return `${API_URL_BASE}/Uploads/${cleanFilename}`;
};

/**
 * Get multiple image URLs from product image objects
 * Useful for product galleries that have multiple images
 */
export const getProductImageUrls = (
  images: Array<{ url?: string; id?: string }> | undefined,
  fallback: string = "/placeholder-image.png",
): string[] => {
  if (!images || images.length === 0) {
    return [fallback];
  }

  return images.map((img) => getImageUrl(img.url, fallback));
};

/**
 * Get image URL with error handler
 * Use this on <img> elements for graceful fallback
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallback: string = "/placeholder-image.png",
) => {
  const img = event.currentTarget;
  img.src = fallback;
};
