import { NextRequest, NextResponse } from "next/server";
import {
  YoutubeTranscript,
  TranscriptConfig,
  TranscriptResponse,
  YoutubeTranscriptError,
} from "youtube-transcript";

export async function GET(request: NextRequest) {
  try {
    const vidUrl = request.nextUrl.searchParams.get("link");
    console.log(vidUrl);
    const data = await YoutubeTranscript.fetchTranscript(vidUrl || "");
    return NextResponse.json(data);
  } catch (error) {
    console.log("🚀 ~ file: route.ts:8 ~ GET ~ error:", error);
    return NextResponse.json([]);
  }
}
