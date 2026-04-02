export const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
export const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || "";
export const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || "";
export const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET || "";

// Admin API endpoint for Partner apps
export const SHOPIFY_GRAPHQL_API_ENDPOINT = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/graphql.json`;

export async function shopifyFetch<T>({
    query,
    variables,
}: {
    query: string;
    variables?: Record<string, any>;
}): Promise<{ status: number; body: T } | never> {
    try {
        const result = await fetch(SHOPIFY_GRAPHQL_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables }),
            }),
            next: { revalidate: 300 },
        });

        const body = await result.json();

        if (body.errors) {
            console.error("Shopify API Error:", body.errors[0].message);
            throw body.errors[0];
        }

        return {
            status: result.status,
            body,
        };
    } catch (error) {
        console.error("Error fetching from Shopify:", error);
        throw error;
    }
}
