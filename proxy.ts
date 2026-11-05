import { NextRequest, NextResponse } from 'next/server';

const sessionName = 'biteflow_admin_session';

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function decodePayload(value: string) {
  const bytes = base64UrlToBytes(value);
  return JSON.parse(new TextDecoder().decode(bytes)) as { exp?: number };
}

async function verifySession(token: string | undefined) {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const secret = process.env.ADMIN_SESSION_SECRET ?? 'biteflow-development-admin-secret';
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );

  try {
    const payloadBytes = encoder.encode(parts[0]);
    const signatureBytes = base64UrlToBytes(parts[1]);
    const validSignature = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      payloadBytes,
    );

    if (!validSignature) return false;
    const payload = decodePayload(parts[0]);
    return typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith('/admin')) return NextResponse.next();
  if (pathname === '/admin/login') return NextResponse.next();

  const session = await verifySession(request.cookies.get(sessionName)?.value);
  if (session) {
    if (pathname === '/admin') {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = '/admin/dashboard';
      dashboardUrl.search = '';
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/admin/login';
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};
