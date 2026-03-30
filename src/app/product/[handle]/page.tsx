import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductByHandle } from "@/lib/shopify-queries"
import { ProductGallery } from "@/components/product-gallery"
import { ProductForm } from "@/components/product-form"
import { ProductReviews } from "@/components/product-reviews"
import { FulfillmentInfo } from "@/components/fulfillment-info"
import { TabbyPromo } from "@/components/tabby-promo"
import { RecentlyViewedProducts, TrackRecentlyViewed } from "@/components/recently-viewed"
import { Separator } from "@/components/ui/separator"
import { ChevronRight } from "lucide-react"

interface ProductPageProps {
    params: {
        handle: string
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    // Await the params object before accessing properties
    const handle = (await params).handle
    const product = await getProductByHandle(handle)

    if (!product) {
        notFound()
    }

    const productPrice = Number(product.variants[0]?.price || 0)

    return (
        <div className="container mx-auto px-6 md:px-8 py-12">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-muted-foreground mb-8 whitespace-nowrap overflow-hidden">
                <Link href="/" className="hover:text-foreground flex-shrink-0">
                    Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
                <Link href="/catalog" className="hover:text-foreground flex-shrink-0">
                    Catalog
                </Link>
                <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
                <span className="text-foreground font-medium truncate">{product.title}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Gallery — sticky on desktop */}
                <div className="w-full md:sticky md:top-24">
                    <ProductGallery images={product.images} />
                </div>

                {/* Details — scrollable */}
                <div className="flex flex-col">
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">
                        {product.title}
                    </h1>
                    <p className="text-2xl font-medium tracking-tight mb-6">
                        AED {productPrice.toFixed(2)}
                    </p>

                    <Separator className="mb-8" />

                    {/* Add to Cart Form handles variants and quantity */}
                    <ProductForm product={product} />

                    {/* Tabby Installments Banner */}
                    <TabbyPromo price={productPrice} currency="AED" />

                    {/* Fulfillment Options */}
                    <FulfillmentInfo />

                    <Separator className="my-8" />

                    {/* Product Description */}
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                    </div>
                </div>
            </div>

            {/* Product Reviews */}
            <ProductReviews productId={product.id} productTitle={product.title} />

            {/* Track and Show Recently Viewed */}
            <TrackRecentlyViewed product={product} />
            <RecentlyViewedProducts currentProductId={product.id} />
        </div>
    )
}
