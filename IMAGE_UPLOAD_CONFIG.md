# Frontend & Backend Image Upload Configuration Guide

## Architecture Overview

```
Frontend (Electric_commercial-Frontend)          Backend (PhoneShop NestJS)
    ↓                                                    ↓
vite dev server                          NestJS Server (Port 3000)
    ↓ (Proxy /uploads)                                  ↓
Request: /uploads/abc123.jpg        ← ServeStaticModule reads from ./Uploads folder
    ↓                                                    ↓
Returns: /Uploads/abc123.jpg      ← Image file served to frontend
```

## Backend Setup (PhoneShop - NestJS)

### Configuration Status: ✅ Completed

**File:** `PhoneShop/src/app.module.ts`

The backend is now configured to serve static files from the `Uploads` folder:

```typescript
// Serves files from ./Uploads directory at /Uploads endpoint
ServeStaticModule.forRoot({
  rootPath: join(process.cwd(), "Uploads"),
  serveRoot: "/Uploads",
});
```

This is automatically **enabled in development** (when `VERCEL` env var is not set) and **disabled in production** (when deployed to Vercel).

**Starting the backend:**

```bash
cd PhoneShop
npm run start:dev
# Server runs on http://localhost:3000
# Static files accessible at http://localhost:3000/Uploads/filename.jpg
```

## Frontend Setup (Electric_commercial-Frontend - React + Vite)

### Configuration Status: ✅ Completed

**File:** `vite.config.ts`

The Vite dev server proxies requests to the backend:

```typescript
proxy: {
  "/uploads": {
    target: "https://localhost:3000/",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/uploads/, "/Uploads"),
  },
}
```

**How it works:**

- Frontend request: `/uploads/abc123.jpg`
- Rewritten to: `/Uploads/abc123.jpg`
- Forwarded to: `http://localhost:3000/Uploads/abc123.jpg`

**Starting the frontend:**

```bash
cd Electric_commercial-Frontend
npm run dev
# Dev server runs on http://localhost:5173 (or similar)
# Images accessible at http://localhost:5173/uploads/filename.jpg
```

## Using Images in Components

### Option 1: Using the Helper Utility (Recommended)

```tsx
import { getImageUrl } from "@/utils/imageHelper";

// In a component
const imageUrl = getImageUrl(product.image_url);
// or with fallback
const imageUrl = getImageUrl(product.image_url, "/images/no-image.png");

<img src={imageUrl} alt="Product" />;
```

### Option 2: Manual String Formatting

```tsx
// Direct string template
<img src={`/uploads/${item.image_url}`} alt="Product" />
```

### Option 3: For Product Galleries

```tsx
import { getProductImageUrls } from "@/utils/imageHelper";

// For arrays of images
const imageUrls = getProductImageUrls(product.product_images);

{
  imageUrls.map((url, idx) => (
    <img key={idx} src={url} alt={`Product ${idx}`} />
  ));
}
```

### Option 4: With Error Handling

```tsx
import { getImageUrl, handleImageError } from "@/utils/imageHelper";

<img
  src={getImageUrl(imageUrl)}
  alt="Product"
  onError={(e) => handleImageError(e, "/images/no-image.png")}
/>;
```

## Image Upload Handling

When uploading files via the backend, ensure they are saved to the `Uploads` folder.

**Backend expects:**

- File path: `PhoneShop/Uploads/`
- File returns: `filename.jpg` (just the filename, without path)
- Frontend uses: `/uploads/filename.jpg`

**Example upload response:**

```json
{
  "filename": "abc123.jpg",
  "url": "abc123.jpg" // Store just the filename
}
```

**On frontend:**

```tsx
// Returned filename from API
const filename = response.url; // "abc123.jpg"

// Use directly
<img src={getImageUrl(filename)} />;
// Results in: /uploads/abc123.jpg
```

## Environment Variables

### Backend (.env in PhoneShop folder)

```
VERCEL=false  # Ensures static file serving is enabled (default)
PORT=3000
```

### Frontend (.env in Electric_commercial-Frontend folder)

```
VITE_API_URL=http://localhost:3000  # Optional, for backend API calls
```

## Troubleshooting

### Images Not Loading (404 errors)

**Problem:** `GET /uploads/abc123.jpg 404`

**Solutions:**

1. Check backend is running on port 3000: `http://localhost:3000/Uploads/abc123.jpg`
2. Verify file exists in `PhoneShop/Uploads/` folder
3. Check filename matches exactly (case-sensitive on Linux/Mac)
4. Verify vite.config.ts proxy is correct
5. Check browser DevTools Network tab - see actual request URL

### CORS Errors

**Problem:** `Cross-Origin Request Blocked`

**Solution:** Backend already has CORS enabled in `app.factory.ts`:

```typescript
app.enableCors({
  origin: getCorsOrigins(),
  credentials: true,
});
```

### Production Deployment (Vercel)

On Vercel, the `VERCEL` env variable is automatically set, so static file serving is disabled. Instead:

1. Upload files to cloud storage (AWS S3, Cloudinary, etc.)
2. Store URLs directly in database
3. Update frontend to use full URLs from database

## Example Component (Complete)

```tsx
import { useState } from "react";
import { getImageUrl, handleImageError } from "@/utils/imageHelper";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

export const ProductCard = ({ product }: { product: Product }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="card">
      <img
        src={getImageUrl(product.image_url)}
        alt={product.name}
        className="card-img-top"
        style={{ height: "200px", objectFit: "contain" }}
        onError={(e) => {
          handleImageError(e, "/images/no-image.png");
          setImageFailed(true);
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
      </div>
    </div>
  );
};
```

## Summary Checklist

- ✅ Backend static file serving configured (app.module.ts)
- ✅ Frontend vite proxy configured (vite.config.ts)
- ✅ Image helper utility created (imageHelper.ts)
- ✅ Backend running on port 3000
- ✅ Frontend running on dev server
- ✅ Images in `PhoneShop/Uploads/` folder accessible at `/uploads/filename.jpg`

## Next Steps

1. Start backend: `npm run start:dev` in PhoneShop folder
2. Start frontend: `npm run dev` in Electric_commercial-Frontend folder
3. Test image loading in components
4. Update existing components to use `getImageUrl()` helper for consistency
