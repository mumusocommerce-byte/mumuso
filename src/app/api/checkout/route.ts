import { NextResponse } from "next/server";

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN!;

const ADMIN_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/graphql.json`;

export async function POST(request: Request) {
    try {
        const { items } = await request.json();

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "Cart is empty" },
                { status: 400 }
            );
        }

        // Build cart permalink URL: https://store.myshopify.com/cart/VARIANT_ID:QTY,...
        // We need to resolve any Product IDs to their first Variant ID

        const lineItemParts: string[] = [];

        for (const item of items) {
            const gid = item.variantId as string;
            let numericId: string | null = null;

            // Check if this is a ProductVariant GID (correct)
            if (gid.includes("ProductVariant")) {
                numericId = extractNumericId(gid);
            }
            // Check if this is a Product GID (old cart items — need to resolve)
            else if (gid.includes("Product")) {
                numericId = await resolveProductToVariant(
                    extractNumericId(gid)
                );
            }
            // Already a numeric ID — could be either product or variant
            else if (/^\d+$/.test(gid)) {
                // Try as variant first; if it fails Shopify will just show an error
                numericId = gid;
            } else {
                numericId = extractNumericId(gid);
            }

            if (!numericId) {
                console.error(
                    "Could not resolve variant ID from:",
                    item.variantId
                );
                continue;
            }

            lineItemParts.push(`${numericId}:${item.quantity}`);
        }

        if (lineItemParts.length === 0) {
            return NextResponse.json(
                { error: "No valid items to checkout" },
                { status: 400 }
            );
        }

        // Build the cart permalink: /cart/variant_id:qty,variant_id:qty
        const cartPath = lineItemParts.join(",");
        const checkoutUrl = `https://${SHOPIFY_STORE_DOMAIN}/cart/${cartPath}`;

        return NextResponse.json({ checkoutUrl });
    } catch (error) {
        console.error("Checkout creation error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Extract the numeric ID from a Shopify GID like "gid://shopify/ProductVariant/12345"
function extractNumericId(gid: string): string | null {
    if (!gid) return null;
    if (/^\d+$/.test(gid)) return gid;
    const match = gid.match(/\/(\d+)$/);
    return match ? match[1] : null;
}

// Resolve a Product numeric ID to its first Variant numeric ID via Admin API
async function resolveProductToVariant(
    productNumericId: string | null
): Promise<string | null> {
    if (!productNumericId) return null;

    try {
        const response = await fetch(ADMIN_GRAPHQL_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
            },
            body: JSON.stringify({
                query: `{
                    product(id: "gid://shopify/Product/${productNumericId}") {
                        variants(first: 1) {
                            edges {
                                node {
                                    id
                                }
                            }
                        }
                    }
                }`,
            }),
        });

        const data = await response.json();
        const variantGid =
            data?.data?.product?.variants?.edges?.[0]?.node?.id;

        if (variantGid) {
            return extractNumericId(variantGid);
        }
    } catch (error) {
        console.error(
            "Error resolving product to variant:",
            productNumericId,
            error
        );
    }

    return null;
}
