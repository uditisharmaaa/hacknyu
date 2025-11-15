# Social Media API Integration Guide 📱

## How It Works (Simple Explanation)

**Current Status**: We're simulating posting (fake but looks real)
**Real Integration**: Connect to actual social media APIs to post real content

---

## The Big Picture

### Step 1: User Authentication (OAuth)
- User clicks "Connect TikTok" → Redirected to TikTok login
- User approves access → TikTok gives us a "token" (like a key)
- We store this token → Can now post on their behalf

### Step 2: Video Upload
- Your generated video → Uploaded to the platform's servers
- Platform gives back a video ID

### Step 3: Create Post
- Use the video ID + caption → Create the actual post
- Platform publishes it → Done!

---

## Platform-by-Platform Breakdown

### 🎵 **TikTok**
**API**: TikTok for Developers API
- **Requirements**: Business account, apply for API access
- **Difficulty**: ⭐⭐⭐⭐ (Moderate-Hard)
- **Authentication**: OAuth 2.0
- **What You Can Do**: 
  - Upload videos up to 10 minutes
  - Add captions, hashtags
  - Schedule posts

**Get Started**: 
1. Go to https://developers.tiktok.com
2. Create app → Request video upload permission
3. Get Client Key & Client Secret

**API Endpoint**: `POST https://open.tiktokapis.com/v2/post/publish/`

---

### 📸 **Instagram Reels**
**API**: Instagram Graph API (via Facebook)
- **Requirements**: Facebook Business account, Instagram Business account
- **Difficulty**: ⭐⭐⭐⭐⭐ (Hard - Requires Facebook integration)
- **Authentication**: Facebook Login (OAuth)
- **What You Can Do**:
  - Upload Reels (max 90 seconds)
  - Add captions, locations
  - Schedule posts

**Get Started**:
1. Go to https://developers.facebook.com
2. Create Facebook App
3. Add Instagram Basic Display product
4. Get App ID & App Secret

**API Endpoint**: `POST https://graph.facebook.com/v18.0/{ig-user-id}/media`

---

### ▶️ **YouTube Shorts**
**API**: YouTube Data API v3
- **Requirements**: Google Cloud account (free tier available)
- **Difficulty**: ⭐⭐⭐ (Easiest!)
- **Authentication**: Google OAuth 2.0
- **What You Can Do**:
  - Upload videos (Shorts if < 60 seconds)
  - Set title, description, tags
  - Make public/private

**Get Started**:
1. Go to https://console.cloud.google.com
2. Create project → Enable YouTube Data API v3
3. Create OAuth credentials
4. Get Client ID & Client Secret

**API Endpoint**: `POST https://www.googleapis.com/upload/youtube/v3/videos`

**Why This Is Best for Hackathon**: 
- Free tier is generous
- Good documentation
- Easy to demo

---

### 🐦 **X (Twitter)**
**API**: Twitter API v2
- **Requirements**: Twitter Developer account ($100/month for basic access)
- **Difficulty**: ⭐⭐⭐⭐ (Moderate - Expensive)
- **Authentication**: OAuth 1.0a or 2.0
- **What You Can Do**:
  - Post videos (up to 2:20 minutes)
  - Add text, hashtags
  - Tweet with media

**Get Started**:
1. Go to https://developer.twitter.com
2. Apply for developer account
3. Create app → Get API keys
4. Note: Paid tier required for posting

**API Endpoint**: `POST https://api.twitter.com/2/tweets`

---

### 💼 **LinkedIn**
**API**: LinkedIn Marketing API
- **Requirements**: LinkedIn company page, Marketing Developer Platform access
- **Difficulty**: ⭐⭐⭐⭐ (Moderate)
- **Authentication**: OAuth 2.0
- **What You Can Do**:
  - Post videos to company pages
  - Share as native video
  - Add captions

**Get Started**:
1. Go to https://www.linkedin.com/developers
2. Create app
3. Request video upload permission
4. Get Client ID & Client Secret

**API Endpoint**: `POST https://api.linkedin.com/v2/ugcPosts`

---

## Implementation Strategy

### Option 1: Direct API Integration (Recommended for Hackathon)
**Pros**: 
- Full control
- Impressive for judges
- Free for most platforms (YouTube, basic TikTok)

**Cons**: 
- More code to write
- Need to handle each platform separately

### Option 2: Use Third-Party Service
**Services**: Buffer API, Hootsuite API, SocialPilot API
**Pros**: 
- One API for all platforms
- Less code
- Handles rate limits

**Cons**: 
- Costs money
- Less impressive for hackathon
- Less control

---

## Recommended Approach for Hackathon

### 1. **Start with YouTube** (Easiest & Free)
- Best documentation
- Free quota (10,000 units/day)
- Easy to demo
- Judges will be impressed by real posting

### 2. **Add Instagram** (If Time Permits)
- More complex but doable
- Very visual for demo

### 3. **Mock Others** (For Demo)
- Show the full vision
- Explain you can add more later

---

## OAuth Flow (How Authentication Works)

```
1. User clicks "Connect Platform"
   ↓
2. Redirect to platform login (e.g., google.com)
   ↓
3. User logs in and approves access
   ↓
4. Platform redirects back with "authorization code"
   ↓
5. Your backend exchanges code for "access token"
   ↓
6. Store token in database
   ↓
7. Use token to post content
```

---

## What You Need to Implement

1. **Authentication Pages** (`/api/auth/youtube`, `/api/auth/tiktok`, etc.)
   - Handle OAuth redirects
   - Store tokens securely

2. **Token Storage** 
   - Database (PostgreSQL, MongoDB)
   - Or session storage for demo

3. **Video Upload Service**
   - Upload video file to platform
   - Handle file size limits
   - Progress tracking

4. **Posting Service** (Update `app/api/post/route.ts`)
   - Use real API calls instead of mocks
   - Handle errors properly
   - Rate limiting

---

## Quick Start: YouTube Integration

I'll set this up for you! Here's what we'll add:

1. **YouTube OAuth setup**
2. **Video upload function**
3. **Real posting endpoint**

Check the implementation files I create next!

---

## Important Notes

⚠️ **Rate Limits**: Each platform has limits (e.g., YouTube: 10,000 units/day)
⚠️ **Video Requirements**: Each platform has different specs (duration, format, size)
⚠️ **Terms of Service**: Must comply with each platform's ToS
⚠️ **Privacy**: Never store user passwords - only OAuth tokens

---

## For Hackathon Demo

**Best Strategy**:
1. ✅ Get YouTube working (real posting)
2. ✅ Show Instagram connection flow (even if not fully implemented)
3. ✅ Mock the others but explain they work the same way
4. ✅ Emphasize the architecture is ready for all platforms

**Talking Points**:
- "We've built a modular system - each platform is a plugin"
- "YouTube is fully integrated, others follow the same pattern"
- "The multi-agent system makes it easy to add new platforms"

---

## Next Steps

See the implementation files I'll create:
- `lib/social-media/youtube.ts` - YouTube API client
- `app/api/auth/youtube/route.ts` - OAuth handler
- Updated `app/api/post/route.ts` - Real posting logic

