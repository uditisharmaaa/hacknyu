import { NextResponse } from 'next/server'

// This is a placeholder route that returns a mock video
// In production, this would serve the actual generated video file
export async function GET() {
  // For demo purposes, redirect to a publicly available sample video
  // In production, this would serve the actual generated video file from your storage
  return NextResponse.redirect('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
}

