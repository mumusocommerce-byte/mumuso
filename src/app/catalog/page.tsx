import { getProductsPage, searchProductsPage } from "@/lib/shopify-queries"
import { CollectionLayout } from "@/components/collection-layout"

interface CatalogPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
    const params = await searchParams;
    const searchQuery = params.q?.trim() || "";

    // If there's a search query, fetch matching products from Shopify; otherwise fetch all
    const { products, pageInfo } = searchQuery
        ? await searchProductsPage(searchQuery, 30)
        : await getProductsPage(30);

    return (
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-2 max-w-2xl">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                        {searchQuery ? `Search results for "${searchQuery}"` : "All Products"}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {searchQuery
                            ? `Found ${products.length} product${products.length !== 1 ? "s" : ""} matching your search.`
                            : "Explore our complete collection of curated lifestyle essentials designed for modern living."
                        }
                    </p>
                </div>
                <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    {products.length} Products
                </p>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
                    <h2 className="text-2xl font-semibold mb-2">
                        {searchQuery ? `No products found for "${searchQuery}"` : "No Products Found"}
                    </h2>
                    <p className="text-muted-foreground">
                        {searchQuery
                            ? "Try a different keyword or check your spelling."
                            : "We couldn't load the catalog at this time."
                        }
                    </p>
                </div>
            ) : (
                <CollectionLayout
                    initialProducts={products}
                    initialPageInfo={pageInfo}
                    searchQuery={searchQuery || undefined}
                />
            )}
        </div>
    )
}
