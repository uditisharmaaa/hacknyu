/**
 * YouTube API Client
 * 
 * This handles real YouTube video uploads and posting
 * For hackathon demo - easiest platform to integrate
 */

interface YouTubeCredentials {
  accessToken: string
  refreshToken?: string
}

interface YouTubeVideoOptions {
  title: string
  description: string
  tags?: string[]
  privacyStatus?: 'public' | 'unlisted' | 'private'
  categoryId?: string
}

export class YouTubeAPI {
  private accessToken: string

  constructor(credentials: YouTubeCredentials) {
    this.accessToken = credentials.accessToken
  }

  /**
   * Upload video file to YouTube
   * This is the real implementation - requires OAuth token
   */
  async uploadVideo(
    videoFile: File | Blob | string, // Can be file, blob, or file path
    options: YouTubeVideoOptions
  ) {
    try {
      // For hackathon: If we have a URL, we need to download it first
      let videoBlob: Blob
      if (typeof videoFile === 'string') {
        // Download video from URL
        const response = await fetch(videoFile)
        videoBlob = await response.blob()
      } else {
        videoBlob = videoFile as Blob
      }

      // Step 1: Initialize upload and get upload URL
      const uploadUrl = await this.initiateUpload(options)

      // Step 2: Upload video file
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'video/*',
          'Content-Length': videoBlob.size.toString(),
        },
        body: videoBlob,
      })

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`)
      }

      const uploadResult = await uploadResponse.json()
      const videoId = uploadResult.id

      return {
        success: true,
        videoId,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        shortUrl: `https://youtu.be/${videoId}`, // For Shorts
      }
    } catch (error: any) {
      console.error('YouTube upload error:', error)
      return {
        success: false,
        error: error.message || 'Failed to upload video',
      }
    }
  }

  /**
   * Initialize the upload process
   * This gets the upload URL from YouTube
   */
  private async initiateUpload(options: YouTubeVideoOptions): Promise<string> {
    const metadata = {
      snippet: {
        title: options.title,
        description: options.description,
        tags: options.tags || [],
        categoryId: options.categoryId || '22', // People & Blogs (good for Shorts)
      },
      status: {
        privacyStatus: options.privacyStatus || 'public',
        selfDeclaredMadeForKids: false,
      },
    }

    const response = await fetch(
      `https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to initiate upload: ${error}`)
    }

    // YouTube returns the upload URL in the Location header
    const uploadUrl = response.headers.get('Location')
    if (!uploadUrl) {
      throw new Error('No upload URL received from YouTube')
    }

    return uploadUrl
  }

  /**
   * Post a video (for Shorts, make sure it's < 60 seconds)
   */
  async postVideo(videoUrl: string, title: string, description: string) {
    // In production, you'd download the video file first
    // For demo, we'll use the video URL directly
    
    // Note: YouTube API requires the actual video file, not just a URL
    // So we'd need to:
    // 1. Download video from videoUrl
    // 2. Upload it to YouTube
    // 3. Return the YouTube video ID
    
    return this.uploadVideo(videoUrl, {
      title,
      description: `${description}\n\n#shorts #youtube #viral`,
      privacyStatus: 'public',
    })
  }

  /**
   * Refresh access token if expired
   * YouTube tokens expire after 1 hour
   */
  async refreshAccessToken(refreshToken: string): Promise<string> {
    // This would call Google's token refresh endpoint
    // Implementation depends on your OAuth setup
    throw new Error('Token refresh not implemented - needs OAuth client credentials')
  }
}

/**
 * Mock version for demo when not authenticated
 */
export class MockYouTubeAPI {
  async postVideo(videoUrl: string, title: string, description: string) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    return {
      success: true,
      videoId: `demo_${Date.now()}`,
      url: 'https://www.youtube.com/watch?v=demo',
      shortUrl: 'https://youtu.be/demo',
      note: 'This is a mock response. Connect your YouTube account for real posting.',
    }
  }
}

