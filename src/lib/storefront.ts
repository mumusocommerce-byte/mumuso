export const SHOPIFY_STOREFRONT_API_ENDPOINT = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

export async function storefrontFetch<T>({
    query,
    variables,
    headers,
}: {
    query: string;
    variables?: Record<string, any>;
    headers?: HeadersInit;
}): Promise<{ status: number; body: T } | never> {
    if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
        console.warn("Missing NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env");
    }

    try {
        const result = await fetch(SHOPIFY_STOREFRONT_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
                ...(headers && headers),
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables }),
            }),
            cache: "no-store", // For auth mutations, we never want to cache
        });

        const body = await result.json();

        if (body.errors) {
            throw body.errors[0];
        }

        return {
            status: result.status,
            body,
        };
    } catch (error) {
        console.error("Error fetching from Storefront API:", error);
        throw error;
    }
}
