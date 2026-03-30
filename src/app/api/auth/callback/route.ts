import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const code = searchParams.get("code");
    const shop = searchParams.get("shop");
    const state = searchParams.get("state");
    const hmac = searchParams.get("hmac");

    // Verify nonce
    const storedNonce = request.cookies.get("shopify_nonce")?.value;
    if (!storedNonce || storedNonce !== state) {
        return NextResponse.json(
            { error: "Invalid nonce. Possible CSRF attack." },
            { status: 403 }
        );
    }

    if (!code || !shop) {
        return NextResponse.json(
            { error: "Missing code or shop parameter" },
            { status: 400 }
        );
    }

    // Verify HMAC
    const clientSecret = process.env.SHOPIFY_CLIENT_SECRET || "";
    const params = new URLSearchParams(searchParams.toString());
    params.delete("hmac");
    params.sort();
    const message = params.toString();
    const generatedHmac = crypto
        .createHmac("sha256", clientSecret)
        .update(message)
        .digest("hex");

    if (generatedHmac !== hmac) {
        return NextResponse.json(
            { error: "HMAC verification failed" },
            { status: 403 }
        );
    }

    // Exchange authorization code for a permanent access token
    try {
        const tokenResponse = await fetch(
            `https://${shop}/admin/oauth/access_token`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client_id: process.env.SHOPIFY_CLIENT_ID,
                    client_secret: clientSecret,
                    code,
                }),
            }
        );

        const tokenData = await tokenResponse.json();

        if (!tokenData.access_token) {
            return NextResponse.json(
                {
                    error: "Failed to get access token",
                    details: tokenData,
                },
                { status: 500 }
            );
        }

        const accessToken = tokenData.access_token;

        // Try to write the access token to .env file automatically
        try {
            const envPath = path.resolve(process.cwd(), ".env");
            let envContent = fs.readFileSync(envPath, "utf-8");
            envContent = envContent.replace(
                /SHOPIFY_ACCESS_TOKEN=.*/,
                `SHOPIFY_ACCESS_TOKEN=${accessToken}`
            );
            fs.writeFileSync(envPath, envContent);
        } catch (writeError) {
            console.error("Could not write to .env file:", writeError);
        }

        // Return the token on screen so the user can also copy it
        return new NextResponse(
            `<!DOCTYPE html>
      <html>
      <head><title>Shopify OAuth Success</title>
      <style>
        body { font-family: system-ui, sans-serif; max-width: 600px; margin: 80px auto; padding: 20px; background: #0a0a0a; color: #fafafa; }
        .token-box { background: #1a1a2e; border: 1px solid #333; border-radius: 8px; padding: 16px; word-break: break-all; margin: 16px 0; font-family: monospace; font-size: 14px; }
        h1 { color: #4ade80; }
        .info { color: #888; font-size: 14px; }
        .success { color: #4ade80; font-size: 18px; }
        a { color: #60a5fa; }
      </style>
      </head>
      <body>
        <h1>✅ App Installed Successfully!</h1>
        <p class="success">Your Shopify app has been authorized and installed on <strong>${shop}</strong>.</p>
        <p>Your permanent Admin API Access Token:</p>
        <div class="token-box">${accessToken}</div>
        <p class="info">This token has been automatically saved to your <code>.env</code> file as <code>SHOPIFY_ACCESS_TOKEN</code>.</p>
        <p class="info"><strong>Important:</strong> Restart your Next.js dev server (<code>npm run dev</code>) for the token to take effect.</p>
        <p style="margin-top:24px;"><a href="/">← Go to Homepage</a></p>
      </body>
      </html>`,
            {
                status: 200,
                headers: {
                    "Content-Type": "text/html",
                },
            }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: "OAuth token exchange failed", message: error.message },
            { status: 500 }
        );
    }
}
