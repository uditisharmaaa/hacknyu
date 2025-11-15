import { NextRequest, NextResponse } from 'next/server'

/**
 * YouTube OAuth Callback Handler
 * Google redirects here with authorization code after user approves
 */

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''
const REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL 
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/youtube/callback`
  : 'http://localhost:3000/api/auth/youtube/callback'

export async function GET(request: NextRequest) {
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
      const errorText = await tokenResponse.text()
      throw new Error(`Failed to exchange code for token: ${errorText}`)
    }

    const tokens = await tokenResponse.json()

    // In production, store tokens securely in database
    // For demo, we'll pass token back to frontend via URL
    const { access_token, refresh_token, expires_in } = tokens

    // Redirect back to app with success and token
    // Note: In production, store tokens server-side and use session IDs
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return NextResponse.redirect(
      `${appUrl}?youtube_connected=true&access_token=${access_token}&expires_in=${expires_in}`
    )
  } catch (error: any) {
    console.error('OAuth callback error:', error)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return NextResponse.redirect(
      `${appUrl}?error=oauth_failed&message=${encodeURIComponent(error.message)}`
    )
  }
}

