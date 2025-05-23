/**
 * Applies environment variables to a URL string.
 * If environment variables are not available, returns an empty string.
 *
 * @param url - URL string that may contain environment variable placeholders
 * @returns URL with environment variables applied, or empty string if variables are missing
 * @example
 * ```typescript
 * // With ETHERSCAN_API_KEY=abc123
 * applyEnvVars("https://api.etherscan.io/api?apikey={ETHERSCAN_API_KEY}")
 * // Returns: "https://api.etherscan.io/api?apikey=abc123"
 *
 * // Without required env var
 * applyEnvVars("https://api.etherscan.io/api?apikey={MISSING_KEY}")
 * // Returns: ""
 *
 * // No env vars needed
 * applyEnvVars("https://api.etherscan.io/api")
 * // Returns: "https://api.etherscan.io/api"
 * ```
 */
export function applyEnvVars(url: string): string {
  const envVars = url.match(/\{([^}]+)\}/g);
  if (!envVars) return url;
  for (const envVar of envVars) {
    const value = process?.env?.[envVar.slice(1, -1)];
    if (!value) {
      return "";
    }
    url = url.replace(envVar, value);
  }
  return url;
}
