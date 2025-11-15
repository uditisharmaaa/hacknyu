import { NextRequest, NextResponse } from 'next/server'

/**
 * YouTube OAuth Authentication
 * 
 * This handles the OAuth flow for YouTube:
 * 1. User clicks "Connect YouTube" → Redirects here
 * 2. Redirects to Google OAuth
 * 3. Google redirects back with code
 * 4. We exchange code for tokens
 */

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''
const REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL 
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/youtube/callback`
  : 'http://localhost:3000/api/auth/youtube/callback'

/**
 * Step 1: Start OAuth flow
 * Redirects user to Google login
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get('action')

  if (action === 'connect') {
    // Redirect to Google OAuth
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID)
    authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/youtube.upload')
    authUrl.searchParams.set('access_type', 'offline') // Get refresh token
    authUrl.searchParams.set('prompt', 'consent') // Force consent screen

    return NextResponse.redirect(authUrl.toString())
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

/**
 * Step 2: Handle OAuth callback
 * Google redirects here with authorization code
 */
export async function GET_CALLBACK(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}?error=${error}`
    )
  }

  if (!code) {
    return NextResponse.json({ error: 'No authorization code' }, { status: 400 })
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokens = await tokenResponse.json()

    // In production, store tokens securely (database, encrypted)
    // For demo, we could store in session or return to frontend
    const { access_token, refresh_token, expires_in } = tokens

    // Redirect back to app with success
    // In production, store tokens server-side
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}?youtube_connected=true&token=${access_token}`
    )
  } catch (error: any) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}?error=oauth_failed`
    )
  }
}

