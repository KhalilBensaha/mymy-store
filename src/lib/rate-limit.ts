/**
 * Simple in-memory rate limiter for public API routes.
 * Uses a sliding-window approach keyed by IP address.
 */

const store = new Map<string, { count: number; resetAt: number }>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of store) {
    if (now > val.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

type RateLimitResult = { success: true } | { success: false; retryAfter: number };

/**
 * Check if a request from this IP is within the rate limit.
 * @param ip        Client IP address (use "unknown" as fallback)
 * @param limit     Max requests per window (default 60)
 * @param windowMs  Window size in ms (default 60 000 = 1 min)
 */
export function rateLimit(
  ip: string,
  limit = 60,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { success: true };
  }

  if (entry.count >= limit) {
    return { success: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { success: true };
}
