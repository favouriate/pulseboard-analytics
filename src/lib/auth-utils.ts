/**
 * Utility functions for authentication token handling
 */

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  type?: string;
}

/**
 * Parses authentication tokens from URL hash fragments
 * @param hash - The URL hash string (e.g., "#access_token=...&refresh_token=...")
 * @returns Parsed tokens or null if not found
 */
export function parseAuthTokensFromHash(hash: string): AuthTokens | null {
  const hashParams = new URLSearchParams(hash.substring(1));
  const accessToken = hashParams.get("access_token");
  const refreshToken = hashParams.get("refresh_token");
  const type = hashParams.get("type");

  if (!accessToken || !refreshToken) {
    return null;
  }

  return {
    accessToken,
    refreshToken,
    type: type || undefined,
  };
}

/**
 * Checks if the current URL contains authentication tokens in the hash
 * @returns Parsed tokens or null if not found
 */
export function getAuthTokensFromUrl(): AuthTokens | null {
  if (typeof window === "undefined") {
    return null;
  }

  return parseAuthTokensFromHash(window.location.hash);
}

/**
 * Clears the hash from the URL without reloading the page
 */
export function clearUrlHash(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.history.replaceState(null, "", window.location.pathname);
}

