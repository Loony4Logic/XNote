import { NextResponse } from "next/server";
import {
  YoutubeTranscript,
  TranscriptConfig,
  TranscriptResponse,
  YoutubeTranscriptError,
} from "youtube-transcript";
export async function GET() {
  try {
    const data = await YoutubeTranscript.fetchTranscript(
      "https://www.youtube.com/watch?v=ZrsajKqG1L4"
    );

    return NextResponse.json(data);
  } catch (error) {
    console.log("🚀 ~ file: route.ts:8 ~ GET ~ error:", error);
    return NextResponse.json([]);
  }
}
