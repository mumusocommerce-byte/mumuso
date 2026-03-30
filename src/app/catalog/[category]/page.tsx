import { notFound } from "next/navigation"
import { getCollectionProductsPage } from "@/lib/shopify-queries"
import { CollectionLayout } from "@/components/collection-layout"

// We rely on next: { revalidate: 30 } at the fetch layer for fresh data,
// so we don't need to force-dynamic which slows down navigation heavily.
interface CategoryPageProps {
    params: Promise<{
        category: string
    }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params
    console.log("[CategoryPage] Fetching collection:", category)

    const collection = await getCollectionProductsPage(category, 30)

    if (!collection || !collection.title) {
        console.error("[CategoryPage] Collection not found for handle:", category)
        notFound()
    }

    console.log("[CategoryPage] Found", collection.products.length, "products in", collection.title)

    return (
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-2 max-w-2xl">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                        {collection.title}
                    </h1>
                    <div
                        className="text-lg text-muted-foreground prose dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: collection.description || "Explore curated items in this collection." }}
                    />
                </div>
                <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    {collection.products.length} Products
                </p>
            </div>

            {collection.products.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
                    <h2 className="text-2xl font-semibold mb-2">No Products in Collection</h2>
                    <p className="text-muted-foreground">
                        Check back later for new arrivals in this category.
                    </p>
                </div>
            ) : (
                <CollectionLayout initialProducts={collection.products} initialPageInfo={collection.pageInfo} collectionHandle={category} />
            )}
        </div>
    )
}

