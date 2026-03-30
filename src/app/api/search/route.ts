import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ products: [] });
    }

    const query = `
      query searchProducts($query: String!) {
        products(first: 6, query: $query) {
          edges {
            node {
              id
              title
              handle
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
        const fetchResult: any = await shopifyFetch<any>({
            query,
            variables: { query: `status:ACTIVE AND (title:*${q}* OR tag:*${q}* OR product_type:*${q}*)` },
        });

        const body = fetchResult.body;

        if (!body?.data?.products) {
            return NextResponse.json({ products: [] });
        }

        const products = body.data.products.edges.map(({ node }: any) => ({
            id: node.id,
            title: node.title,
            handle: node.handle,
            image: node.images?.edges?.[0]?.node?.url || "https://picsum.photos/seed/placeholder/600/800",
        }));

        return NextResponse.json({ products });
    } catch (error) {
        console.error("Search API Error", error);
        return NextResponse.json({ products: [] }, { status: 500 });
    }
}
