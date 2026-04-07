import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getCollectionProductsPage } from "@/lib/shopify-queries"
import { CollectionLayout } from "@/components/collection-layout"

export const revalidate = 300

interface CategoryPageProps {
    params: Promise<{
        category: string
    }>
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params
    const collection = await getCollectionProductsPage(category, 1)

    if (!collection || !collection.title) {
        return { title: "Collection Not Found" }
    }

    const seoTitle = collection.seo?.title || collection.title
    const seoDescription = collection.seo?.description || stripHtml(collection.description || "").slice(0, 160) || `Shop ${collection.title} at Mumuso UAE`

    return {
        title: seoTitle,
        description: seoDescription,
        openGraph: {
            title: `${seoTitle} | Mumuso`,
            description: seoDescription,
            type: "website",
            ...(collection.image && { images: [{ url: collection.image, width: 1200, height: 630, alt: collection.title }] }),
        },
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params

    const collection = await getCollectionProductsPage(category, 30)

    if (!collection || !collection.title) {
        console.error("[CategoryPage] Collection not found for handle:", category)
        notFound()
    }

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

