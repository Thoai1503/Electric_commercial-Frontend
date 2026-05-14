/**
 * INTEGRATION GUIDE: Content Version Management
 *
 * Quick start để integrate Content Management vào ProductDetailsPage
 * Xem file này để hiểu các cách sử dụng khác nhau.
 *
 * IMPORT STATEMENTS:
 * ==================
 *
 * Main section component (use in existing page/tab):
 *   import { ContentManagementSection } from "@/components/admin/content_management";
 *
 * Individual components:
 *   import {
 *     ContentVersionsList,
 *     VersionDetailModal,
 *     VersionComparisonModal
 *   } from "@/components/admin/content_management";
 *
 * Page component:
 *   import ContentManagementPage from "@/page/admin/ContentManagementPage";
 *
 * Service:
 *   import { ContentVersionService } from "@/service/contentVersionService";
 *
 * Hook:
 *   import { useContentVersions } from "@/module/admin/hook/useContentVersions";
 *
 *
 * USAGE EXAMPLES:
 * ===============
 *
 * Example 1 - As Tab in ProductDetailsPage:
 *   const renderTabContent = () => {
 *     switch (activeTab) {
 *       case 4:
 *         return <ContentManagementSection productId={productId} />;
 *     }
 *   };
 *
 * Example 2 - Standalone Route:
 *   Route: /admin/product/:productId/content
 *   Component: ContentManagementPage
 *
 * Example 3 - With Custom Hook:
 *   const { versions, loading, error, publishVersion } = useContentVersions(productId);
 *
 * Example 4 - Add button in GeneralInfoSection:
 *   <Link to={`/admin/product/${id}/content`} className="btn btn-outline-info">
 *     Manage Versions
 *   </Link>
 */

export const INTEGRATION_NOTES = `
Content Version Management System
==================================

This module provides complete content (HTML) version management for products.

FEATURES:
- List all versions (draft & published)
- View version details with HTML content
- Compare two versions side-by-side  
- Publish version (set as live)
- Restore version (create new draft from old)
- Delete unused versions
- Change notes tracking
- Error handling & loading states

COMPONENTS:
1. ContentManagementSection - Main wrapper component
2. ContentVersionsList - List of versions with actions
3. VersionDetailModal - View version HTML content
4. VersionComparisonModal - Compare two versions
5. ContentManagementPage - Standalone admin page

HOOKS:
- useContentVersions - Custom hook for version management

SERVICE:
- ContentVersionService - API calls to backend

BACKEND ENDPOINTS REQUIRED:
GET    /api/product/:id/content/versions
GET    /api/product/:id/content/versions/:versionId
GET    /api/product/:id/content/compare/:v1/:v2
POST   /api/product/:id/content/versions/:versionId/publish
POST   /api/product/:id/content/versions/:versionId/restore
DELETE /api/product/:id/content/versions/:versionId
`;
