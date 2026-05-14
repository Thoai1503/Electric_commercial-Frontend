import { useState, useCallback } from "react";
import {
  ContentVersionService,
  type VersionsList,
  type VersionDetail,
  type CompareResult,
} from "../../../service/contentVersionService";

export const useContentVersions = (productId: number) => {
  const [versions, setVersions] = useState<VersionsList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVersions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ContentVersionService.getVersionsList(productId);
      setVersions(data);
      return data;
    } catch (err) {
      const errorMsg = (err as Error).message || "Failed to fetch versions";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const getVersionDetail = useCallback(
    async (versionId: number): Promise<VersionDetail> => {
      try {
        return await ContentVersionService.getVersionDetail(
          productId,
          versionId,
        );
      } catch (err) {
        const errorMsg =
          (err as Error).message || "Failed to fetch version detail";
        setError(errorMsg);
        throw err;
      }
    },
    [productId],
  );

  const publishVersion = useCallback(
    async (versionId: number) => {
      try {
        setError(null);
        const result = await ContentVersionService.publishVersion(
          productId,
          versionId,
        );
        await fetchVersions();
        return result;
      } catch (err) {
        const errorMsg = (err as Error).message || "Failed to publish version";
        setError(errorMsg);
        throw err;
      }
    },
    [productId, fetchVersions],
  );

  const restoreVersion = useCallback(
    async (versionId: number) => {
      try {
        setError(null);
        const result = await ContentVersionService.restoreVersion(
          productId,
          versionId,
        );
        await fetchVersions();
        return result;
      } catch (err) {
        const errorMsg = (err as Error).message || "Failed to restore version";
        setError(errorMsg);
        throw err;
      }
    },
    [productId, fetchVersions],
  );

  const deleteVersion = useCallback(
    async (versionId: number) => {
      try {
        setError(null);
        const result = await ContentVersionService.deleteVersion(
          productId,
          versionId,
        );
        await fetchVersions();
        return result;
      } catch (err) {
        const errorMsg = (err as Error).message || "Failed to delete version";
        setError(errorMsg);
        throw err;
      }
    },
    [productId, fetchVersions],
  );

  const compareVersions = useCallback(
    async (versionId1: number, versionId2: number): Promise<CompareResult> => {
      try {
        setError(null);
        return await ContentVersionService.compareVersions(
          productId,
          versionId1,
          versionId2,
        );
      } catch (err) {
        const errorMsg = (err as Error).message || "Failed to compare versions";
        setError(errorMsg);
        throw err;
      }
    },
    [productId],
  );

  return {
    versions,
    loading,
    error,
    fetchVersions,
    getVersionDetail,
    publishVersion,
    restoreVersion,
    deleteVersion,
    compareVersions,
  };
};
