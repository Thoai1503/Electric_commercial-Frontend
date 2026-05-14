const API_URL = import.meta.env.VITE_API_URL;

export interface ContentVersion {
  id: number;
  version_number: number;
  created_at: Date;
  change_note: string | null;
  is_draft: boolean;
  is_published: boolean;
}

export interface VersionDetail {
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

export interface VersionsList {
  product_id: number;
  locale: string;
  versions: ContentVersion[];
  draft_version_id: number | null;
  published_version_id: number | null;
}

export interface CompareResult {
  version1: {
    version_number: number;
    html: string;
  };
  version2: {
    version_number: number;
    html: string;
  };
}

export class ContentVersionService {
  static async getVersionsList(productId: number): Promise<VersionsList> {
    const response = await fetch(
      `${API_URL}/api/product/${productId}/content/versions`,
    );
    if (!response.ok) throw new Error("Failed to fetch versions list");
    return response.json();
  }

  static async getVersionDetail(
    productId: number,
    versionId: number,
  ): Promise<VersionDetail> {
    const response = await fetch(
      `${API_URL}/api/product/${productId}/content/versions/${versionId}`,
    );
    if (!response.ok) throw new Error("Failed to fetch version detail");
    return response.json();
  }

  static async publishVersion(productId: number, versionId: number) {
    const response = await fetch(
      `${API_URL}/api/product/${productId}/content/versions/${versionId}/publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!response.ok) throw new Error("Failed to publish version");
    return response.json();
  }

  static async restoreVersion(productId: number, versionId: number) {
    const response = await fetch(
      `${API_URL}/api/product/${productId}/content/versions/${versionId}/restore`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!response.ok) throw new Error("Failed to restore version");
    return response.json();
  }

  static async deleteVersion(productId: number, versionId: number) {
    const response = await fetch(
      `${API_URL}/api/product/${productId}/content/versions/${versionId}`,
      { method: "DELETE" },
    );
    if (!response.ok) throw new Error("Failed to delete version");
    return response.json();
  }

  static async compareVersions(
    productId: number,
    versionId1: number,
    versionId2: number,
  ): Promise<CompareResult> {
    const response = await fetch(
      `${API_URL}/api/product/${productId}/content/compare/${versionId1}/${versionId2}`,
    );
    if (!response.ok) throw new Error("Failed to compare versions");
    return response.json();
  }
}
