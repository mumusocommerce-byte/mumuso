import { NextResponse } from "next/server";

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const PRIVATE_TOKEN = process.env.JUDGEME_PRIVATE_TOKEN || "";

// GET: Fetch reviews for a specific Product External ID
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
        return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    // Usually Shopify IDs look like "gid://shopify/Product/5820010234011"
    const externalId = productId.split("/").pop();

    try {
        // Step 1: Resolve internal Judge.me Product ID from Shopify External ID
        const productRes = await fetch(
            `https://judge.me/api/v1/products/-1?shop_domain=${SHOP_DOMAIN}&api_token=${PRIVATE_TOKEN}&external_id=${externalId}`
        );
        const productData = await productRes.json();

        // If product has never received a review, Judge.me might not have it mapped yet
        if (!productData.product) {
            return NextResponse.json({ reviews: [], averageRating: "0.0" });
        }

        const internalId = productData.product.id;

        // Step 2: Fetch the actual reviews mapped to that internal ID
        const reviewsRes = await fetch(
            `https://judge.me/api/v1/reviews?shop_domain=${SHOP_DOMAIN}&api_token=${PRIVATE_TOKEN}&product_id=${internalId}&per_page=10`
        );
        const reviewsData = await reviewsRes.json();

        // Filter out reviews that are hidden in Judge.me dashboard
        const visibleReviews = (reviewsData.reviews || []).filter(
            (r: any) => r.hidden !== true
        );

        const reviews = visibleReviews.map((r: any) => ({
            id: r.id.toString(),
            author: r.reviewer?.name || "Verified Customer",
            rating: r.rating,
            content: r.body,
            date: new Date(r.created_at)
        }));

        const averageRating = reviews.length > 0
            ? (reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviews.length).toFixed(1)
            : "0.0";

        return NextResponse.json({ reviews, averageRating });

    } catch (error) {
        console.error("Error fetching Judge.me reviews:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST: Create a new Review
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { productId, author, email, rating, content, title } = body;

        const externalId = productId.split("/").pop();

        const payload = {
            shop_domain: SHOP_DOMAIN,
            platform: "shopify",
            id: externalId,
            email: email || "customer@example.com",
            name: author,
            rating: rating,
            title: title || "Review via Storefront",
            body: content,
            api_token: PRIVATE_TOKEN,
        };

        const res = await fetch(`https://judge.me/api/v1/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        // The API returns 201 Created immediately
        if (res.ok) {
            return NextResponse.json({ success: true });
        } else {
            const errResult = await res.text();
            console.error("Judge.me POST Error:", errResult);
            return NextResponse.json({ error: "Failed to post review" }, { status: 400 });
        }

    } catch (error) {
        console.error("Server Error posting review:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
