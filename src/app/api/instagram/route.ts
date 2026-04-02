import { NextResponse } from "next/server";

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN!;
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID!;

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
    try {
        if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_ACCOUNT_ID) {
            return NextResponse.json(
                { error: "Instagram credentials not configured" },
                { status: 500 }
            );
        }

        const response = await fetch(
            `https://graph.facebook.com/v25.0/${INSTAGRAM_ACCOUNT_ID}/media?fields=id,media_type,media_url,thumbnail_url,permalink,timestamp&limit=20&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
            { next: { revalidate: 3600 } } // ISR: revalidate every hour
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Instagram API error:", errorData);
            return NextResponse.json(
                { error: "Failed to fetch Instagram posts" },
                { status: 500 }
            );
        }

        const data = await response.json();

        // Filter to only IMAGE and CAROUSEL_ALBUM types (skip VIDEO)
        const posts = data.data
            .filter(
                (post: any) =>
                    post.media_type === "IMAGE" ||
                    post.media_type === "CAROUSEL_ALBUM"
            )
            .map((post: any) => ({
                id: post.id,
                mediaUrl: post.media_url,
                permalink: post.permalink,
                timestamp: post.timestamp,
            }));

        return NextResponse.json({ posts });
    } catch (error) {
        console.error("Instagram fetch error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
