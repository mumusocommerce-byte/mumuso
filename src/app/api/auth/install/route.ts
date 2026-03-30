import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Step 1: Redirect the user to Shopify's OAuth authorization page
export async function GET(request: NextRequest) {
    const shop = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const clientId = process.env.SHOPIFY_CLIENT_ID;
    const redirectUri = `${request.nextUrl.origin}/api/auth/callback`;

    // Generate a random nonce for CSRF protection
    const nonce = crypto.randomBytes(16).toString("hex");

    // All Admin API scopes
    const scopes = [
        "read_products",
        "read_product_listings",
        "read_inventory",
        "read_orders",
        "read_content",
        "read_themes",
        "read_script_tags",
        "read_fulfillments",
        "read_shipping",
        "read_customers",
        "read_price_rules",
        "read_discounts",
        "read_marketing_events",
        "read_reports",
        "read_locations",
    ].join(",");

    const authUrl =
        `https://${shop}/admin/oauth/authorize?` +
        `client_id=${clientId}` +
        `&scope=${scopes}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${nonce}`;

    // Store nonce in a cookie so we can verify it in the callback
    const response = NextResponse.redirect(authUrl);
    response.cookies.set("shopify_nonce", nonce, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 600, // 10 minutes
        path: "/",
    });

    return response;
}
