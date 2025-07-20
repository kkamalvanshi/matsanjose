import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Clear the authentication cookie
  response.cookies.set('mat-auth', '', {
    expires: new Date(0),
    path: '/',
    httpOnly: false,
    sameSite: 'strict'
  });
  
  return response;
} 