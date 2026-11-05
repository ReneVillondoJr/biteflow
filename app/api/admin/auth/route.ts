import { NextRequest, NextResponse } from 'next/server';

const sessionName = 'biteflow_admin_session';

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function createSession(email: string) {
  const secret = process.env.ADMIN_SESSION_SECRET ?? 'biteflow-development-admin-secret';
  const payload = bytesToBase64Url(new TextEncoder().encode(JSON.stringify({
    email,
    exp: Date.now() + 8 * 60 * 60 * 1000,
  })));
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return `${payload}.${bytesToBase64Url(new Uint8Array(signature))}`;
}

async function verifySession(token: string | undefined) {
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

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
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      base64UrlToBytes(parts[1]),
      encoder.encode(parts[0]),
    );
    if (!valid) return null;
    const payloadBytes = base64UrlToBytes(parts[0]);
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as { email?: string; exp?: number };
    if (!payload.email || typeof payload.exp !== 'number' || payload.exp <= Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const { email = '', password = '' } = await request.json().catch(() => ({}));
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@biteflow.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    email.trim().toLowerCase() !== adminEmail.toLowerCase() ||
    password !== adminPassword
  ) {
    return NextResponse.json({ error: 'Invalid admin email or password.' }, { status: 401 });
  }

  const token = await createSession(email.trim().toLowerCase());
  const response = NextResponse.json({ success: true });
  response.cookies.set(sessionName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 8 * 60 * 60,
  });
  return response;
}

export async function GET(request: NextRequest) {
  const payload = await verifySession(request.cookies.get(sessionName)?.value);
  return NextResponse.json(payload ? { authenticated: true, email: payload.email } : { authenticated: false });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(sessionName, '', { httpOnly: true, path: '/', maxAge: 0 });
  return response;
}
