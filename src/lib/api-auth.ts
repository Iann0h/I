import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export async function withAuth(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Missing authorization token' },
        { status: 401 }
      );
    }

    const verified = await jwtVerify(token, secret);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('user-id', verified.payload.id as string);
    requestHeaders.set('user-role', verified.payload.role as string);

    return requestHeaders;
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid authorization token' },
      { status: 401 }
    );
  }
}

export function requireRole(role: string) {
  return (userRole: string) => userRole === role || userRole === 'ADMIN';
}
