# Content Version Management - Frontend Documentation

## Overview

Bộ components React đầy đủ để quản lý nội dung sản phẩm (product content) và các phiên bản (versions). Cho phép admin xem lịch sử, so sánh, publish, restore, và xóa các phiên bản nội dung.

## Components

### 1. **ContentManagementSection** (Main Component)

Wrapper component chính tổng hợp tất cả chức năng.

```tsx
import ContentManagementSection from "@/components/admin/content_management/ContentManagementSection";

<ContentManagementSection productId={productId} productName={productName} />;
```

**Props:**

- `productId`: number - ID của sản phẩm
- `productName?`: string - Tên sản phẩm (optional)

---

### 2. **ContentVersionsList**

Hiển thị danh sách tất cả các phiên bản, cho phép:

- Xem chi tiết version
- Publish version
- Restore version
- Delete version

```tsx
import ContentVersionsList from "@/components/admin/content_management/ContentVersionsList";

<ContentVersionsList
  productId={productId}
  onVersionSelect={(versionId) => console.log(versionId)}
/>;
```

**Props:**

- `productId`: number
- `onVersionSelect?`: (versionId: number) => void

**Features:**

- Hiển thị draft và published versions
- Xem ngày tạo và ghi chú thay đổi
- Publish, restore, delete actions
- Responsive UI

---

### 3. **VersionDetailModal**

Modal để xem chi tiết nội dung HTML của một version.

```tsx
import VersionDetailModal from "@/components/admin/content_management/VersionDetailModal";

<VersionDetailModal
  productId={productId}
  versionId={versionId}
  onClose={() => setShowModal(false)}
/>;
```

**Props:**

- `productId`: number
- `versionId`: number
- `onClose`: () => void

**Features:**

- Xem HTML content
- Copy content button
- Hiển thị ngày tạo và change note
- Raw HTML viewer

---

### 4. **VersionComparisonModal**

Modal để so sánh 2 phiên bản side-by-side.

```tsx
import VersionComparisonModal from "@/components/admin/content_management/VersionComparisonModal";

<VersionComparisonModal
  productId={productId}
  version1Id={v1}
  version2Id={v2}
  onClose={() => {}}
/>;
```

**Props:**

- `productId`: number
- `version1Id`: number
- `version2Id`: number
- `onClose`: () => void

**Features:**

- So sánh 2 versions side-by-side
- Left (Red) vs Right (Green)
- Monospace font cho HTML comparison

---

## Pages

### ContentManagementPage

Trang standalone để quản lý content của một sản phẩm.

**Route:**

```
/admin/product/:productId/content
```

```tsx
import ContentManagementPage from "@/page/admin/ContentManagementPage";
```

---

## Hooks

### useContentVersions

Custom hook để quản lý content versions logic.

```tsx
import { useContentVersions } from "@/module/admin/hook/useContentVersions";

const {
  versions,
  loading,
  error,
  fetchVersions,
  getVersionDetail,
  publishVersion,
  restoreVersion,
  deleteVersion,
  compareVersions,
} = useContentVersions(productId);
```

**Return:**

- `versions`: VersionsList | null
- `loading`: boolean
- `error`: string | null
- `fetchVersions()`: Promise - Fetch all versions
- `getVersionDetail(versionId)`: Promise<VersionDetail>
- `publishVersion(versionId)`: Promise
- `restoreVersion(versionId)`: Promise
- `deleteVersion(versionId)`: Promise
- `compareVersions(v1, v2)`: Promise<CompareResult>

---

## Service

### ContentVersionService

API service class cho tất cả requests liên quan đến content versions.

```tsx
import { ContentVersionService } from "@/service/contentVersionService";

await ContentVersionService.getVersionsList(productId);
await ContentVersionService.getVersionDetail(productId, versionId);
await ContentVersionService.publishVersion(productId, versionId);
await ContentVersionService.restoreVersion(productId, versionId);
await ContentVersionService.deleteVersion(productId, versionId);
await ContentVersionService.compareVersions(productId, v1, v2);
```

---

## Backend Endpoints

### Endpoints Required

```
GET    /api/product/:id/content/versions              - List all versions
GET    /api/product/:id/content/versions/:versionId   - Get version detail
GET    /api/product/:id/content/compare/:v1/:v2       - Compare versions
POST   /api/product/:id/content/versions/:versionId/publish - Publish version
POST   /api/product/:id/content/versions/:versionId/restore - Restore version
DELETE /api/product/:id/content/versions/:versionId            - Delete version
```

---

## Integration Examples

### Example 1: Add to Product Details Tab

```tsx
// ProductDetailsPage.tsx
import ContentManagementSection from "../../components/admin/content_management/ContentManagementSection";

const renderTabContent = () => {
  switch (activeTab) {
    case 0:
      return <GeneralInfoSection id={productId} />;
    case 1:
      return <AttributeConfigSestion id={productId} />;
    case 2:
      return <ContentManagementSection productId={productId} />;
    // ...
  }
};
```

### Example 2: Standalone Admin Page

```tsx
// Add route in your router config
{
  path: "/admin/product/:productId/content",
  element: <ContentManagementPage />,
}
```

### Example 3: Custom Implementation

```tsx
import { useContentVersions } from "@/module/admin/hook/useContentVersions";

const MyCustomComponent = ({ productId }) => {
  const { versions, loading, publishVersion } = useContentVersions(productId);

  return (
    <div>
      {versions?.versions.map((v) => (
        <button key={v.id} onClick={() => publishVersion(v.id)}>
          Publish Version {v.version_number}
        </button>
      ))}
    </div>
  );
};
```

---

## Data Types

### ContentVersion

```typescript
interface ContentVersion {
  id: number;
  version_number: number;
  created_at: Date;
  change_note: string | null;
  is_draft: boolean;
  is_published: boolean;
}
```

### VersionDetail

```typescript
interface VersionDetail {
  id: number;
  product_id: number;
  locale: string;
  version_number: number;
  created_at: Date;
  change_note: string | null;
  html: string;
  is_draft: boolean;
  is_published: boolean;
}
```

### VersionsList

```typescript
interface VersionsList {
  product_id: number;
  locale: string;
  versions: ContentVersion[];
  draft_version_id: number | null;
  published_version_id: number | null;
}
```

---

## Features

✅ List all content versions  
✅ View version details (HTML content)  
✅ Compare two versions side-by-side  
✅ Publish version (set as live)  
✅ Restore version (create new draft from old version)  
✅ Delete version (cleanup old versions)  
✅ Change notes tracking  
✅ Draft/Published status  
✅ Error handling & loading states  
✅ Responsive design  
✅ Copy to clipboard

---

## Styling

All components use Bootstrap 5 classes:

- Responsive grid system
- Alert components
- Badges for status
- Modals
- Buttons with icons (lucide-react)
- Custom utility classes

---

## Icons

Icons từ `lucide-react`:

- Clock - timestamps
- Check - publish action
- Trash2 - delete action
- RefreshCw - restore action
- ChevronDown - expand/collapse
- AlertCircle - errors
- Loader - loading states
- Copy - copy to clipboard
- ArrowRightLeft - compare view
- FileText - content management
- GitBranch - version control

---

## Next Steps

1. Ensure backend endpoints are implemented
2. Import components in your admin pages
3. Add route to content management page in router
4. Customize styling as needed
5. Test version management workflow
