import { SHOPIFY_STORE_DOMAIN, SHOPIFY_ACCESS_TOKEN } from '@/lib/shopify';
import { NextResponse } from 'next/server';

// Test endpoint to verify different filtering approaches
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get('handle') || 'new-mumuso-lifestyle';

    const results: Record<string, any> = { handle };

    // Approach 1: Try newer API version (2025-01) with query filter on collection products
    try {
        const query1 = `
        query($handle: String!, $first: Int!) {
          collectionByHandle(handle: $handle) {
            title
            products(first: $first, query: "status:active") {
              edges { node { id title status } }
            }
          }
        }`;
        const res1 = await fetch(
            `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2025-01/graphql.json`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN },
                body: JSON.stringify({ query: query1, variables: { handle, first: 5 } }),
            }
        );
        const body1 = await res1.json();
        if (body1.errors) {
            results.approach1_queryFilter = { error: body1.errors[0].message };
        } else {
            const products = body1.data?.collectionByHandle?.products?.edges || [];
            results.approach1_queryFilter = {
                success: true,
                count: products.length,
                statuses: products.map((e: any) => ({ title: e.node.title, status: e.node.status })),
            };
        }
    } catch (err: any) {
        results.approach1_queryFilter = { error: err.message };
    }

    // Approach 2: Reverse order to get active products first
    try {
        const query2 = `
        query($handle: String!, $first: Int!) {
          collectionByHandle(handle: $handle) {
            title
            products(first: $first, reverse: true) {
              edges { node { id title status } }
            }
          }
        }`;
        const res2 = await fetch(
            `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/graphql.json`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN },
                body: JSON.stringify({ query: query2, variables: { handle, first: 10 } }),
            }
        );
        const body2 = await res2.json();
        if (body2.errors) {
            results.approach2_reverse = { error: body2.errors[0].message };
        } else {
            const products = body2.data?.collectionByHandle?.products?.edges || [];
            results.approach2_reverse = {
                success: true,
                count: products.length,
                statuses: products.map((e: any) => ({ title: e.node.title, status: e.node.status })),
            };
        }
    } catch (err: any) {
        results.approach2_reverse = { error: err.message };
    }

    return NextResponse.json(results);
}
