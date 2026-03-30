import { shopifyFetch } from '@/lib/shopify';
import { NextResponse } from 'next/server';

export async function GET() {
    const query = `
    query {
      pages(first: 250) {
        edges {
          node { id title handle }
        }
      }
    }
  `;
    try {
        const { body } = await shopifyFetch<any>({ query });
        return NextResponse.json(body.data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}
