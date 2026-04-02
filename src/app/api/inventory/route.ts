import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const variantId = searchParams.get("variantId");

    if (!variantId) {
        return NextResponse.json({ error: "Missing variantId" }, { status: 400 });
    }

    const query = `
        query getInventoryByLocation($variantId: ID!) {
            productVariant(id: $variantId) {
                inventoryItem {
                    inventoryLevels(first: 20) {
                        edges {
                            node {
                                quantities(names: ["available"]) {
                                    name
                                    quantity
                                }
                                location {
                                    id
                                    name
                                    address {
                                        address1
                                        city
                                        province
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const { body } = await shopifyFetch<any>({
            query,
            variables: { variantId },
        });

        if (!body?.data?.productVariant?.inventoryItem?.inventoryLevels) {
            return NextResponse.json({ locations: [] });
        }

        const locations = body.data.productVariant.inventoryItem.inventoryLevels.edges.map(
            ({ node }: any) => ({
                id: node.location.id,
                name: node.location.name,
                city: node.location.address?.city || "",
                province: node.location.address?.province || "",
                address: node.location.address?.address1 || "",
                available: node.quantities?.[0]?.quantity ?? 0,
            })
        );

        return NextResponse.json({ locations });
    } catch (error) {
        console.error("Error fetching inventory:", error);
        return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
    }
}
