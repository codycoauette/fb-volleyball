import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Lightweight portal session for the coach.
 *
 * Password comes from PORTAL_PASSWORD (fallback below for local/dev). When
 * Supabase Auth lands, replace `createSession` / `requirePortalSession` with
 * supabase.auth.getUser() and drop the cookie helpers.
 */

export const PORTAL_COOKIE = "fb_portal_session";
export const DEFAULT_PORTAL_PASSWORD = "falcons2027";

function portalPassword() {
  return process.env.PORTAL_PASSWORD?.trim() || DEFAULT_PORTAL_PASSWORD;
}

function portalSecret() {
  return (
    process.env.PORTAL_SECRET?.trim() ||
    process.env.PORTAL_PASSWORD?.trim() ||
    "fb-local-portal-secret"
  );
}

function sign(value: string) {
  return createHmac("sha256", portalSecret()).update(value).digest("hex");
}

function sessionPayload(issuedAt: number) {
  return `coach:${issuedAt}`;
}

export function createSessionToken() {
  const issuedAt = Date.now();
  const payload = sessionPayload(issuedAt);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }

  const issuedAt = Number(payload.split(":")[1]);
  if (!Number.isFinite(issuedAt)) return false;

  // Sessions last 14 days.
  const maxAgeMs = 14 * 24 * 60 * 60 * 1000;
  return Date.now() - issuedAt < maxAgeMs;
}

export function checkPortalPassword(password: string) {
  const expected = portalPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isUsingDefaultPassword() {
  return !process.env.PORTAL_PASSWORD?.trim();
}

export async function getPortalSession() {
  const jar = await cookies();
  const token = jar.get(PORTAL_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function requirePortalSession() {
  const ok = await getPortalSession();
  if (!ok) {
    throw new Error("UNAUTHORIZED");
  }
}

export const SESSION_MAX_AGE = 14 * 24 * 60 * 60;
