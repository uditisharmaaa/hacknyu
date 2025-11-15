# Quick Start: YouTube Integration 🎬

## How to Get YouTube Posting Working (5 Minutes)

### Step 1: Get Google API Credentials

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Select a project" → "New Project"
   - Name it: "AutoShort" or anything you like
   - Click "Create"

3. **Enable YouTube Data API**
   - Search for "YouTube Data API v3" in the search bar
   - Click on it → Click "Enable"

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - If prompted, configure OAuth consent screen first:
     - User Type: External (for testing)
     - App name: "AutoShort"
     - Support email: Your email
     - Click "Save and Continue" through the steps
   - Application type: "Web application"
   - Name: "AutoShort Web Client"
   - Authorized redirect URIs: 
     - `http://localhost:3000/api/auth/youtube/callback` (for local dev)
     - Add your production URL if deploying
   - Click "Create"
   - **Copy your Client ID and Client Secret!**

### Step 2: Add to Environment Variables

Create/update `.env.local` file in your project root:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Test It!

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Connect YouTube**:
   - Visit: `http://localhost:3000/api/auth/youtube?action=connect`
   - You'll be redirected to Google login
   - Approve access
   - You'll be redirected back with an access token

3. **Use the token**:
   - The token will be in the URL after connecting
   - Copy it and use it when posting to YouTube

### Step 4: How It Works

**Authentication Flow**:
```
User clicks "Connect YouTube" 
→ Redirects to Google login
→ User approves
→ Google redirects back with code
→ We exchange code for access token
→ Store token (for production, use database)
→ Use token to post videos
```

**Posting Flow**:
```
Generate video → User selects YouTube → 
Check if connected → If yes, use real API → 
If no, use mock → Post video
```

## For Hackathon Demo

**Best Strategy**:
1. ✅ Set up YouTube OAuth (takes 5 minutes)
2. ✅ Test with real YouTube account
3. ✅ Show real posting working
4. ✅ Explain other platforms work the same way

**Talking Points**:
- "We've integrated YouTube with real OAuth"
- "The same pattern works for all platforms"
- "Users connect once, then can post automatically"

## Troubleshooting

**"Invalid redirect URI"**:
- Make sure redirect URI in Google Console matches exactly
- Include both `http://localhost:3000` and your production URL

**"Access denied"**:
- Make sure YouTube Data API is enabled
- Check OAuth consent screen is configured

**"Token expired"**:
- Tokens expire after 1 hour
- For production, implement refresh token logic
- For demo, just reconnect

## Production Notes

**Security**:
- Never expose Client Secret in frontend code
- Store tokens in database (encrypted)
- Use refresh tokens to get new access tokens
- Implement token rotation

**Rate Limits**:
- YouTube: 10,000 units per day (free)
- Each upload = ~1,600 units
- ~6 uploads per day free

**Best Practices**:
- Store tokens server-side only
- Use session IDs instead of passing tokens in URL
- Implement error handling and retries
- Monitor quota usage

---

**You're all set!** 🚀

The architecture is ready - just add your Google credentials and you can post real videos to YouTube!

