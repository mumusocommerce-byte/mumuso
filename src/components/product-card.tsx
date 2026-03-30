"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "./cart-provider"
import { useWishlist } from "./wishlist-provider"

export interface Product {
    id: string
    title: string
    handle: string
    price: {
        amount: string
        currencyCode: string
    }
    image: string
    category: string
    badge?: string
    tags?: string[]
    variantId?: string
    createdAt?: string
}

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart()
    const { isInWishlist, toggleItem } = useWishlist()
    const wishlisted = isInWishlist(product.id)

    const formattedPrice = new Intl.NumberFormat("en-AE", {
        style: "currency",
        currency: product.price.currencyCode || "AED",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(Number(product.price.amount))

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addItem({
            id: product.id,
            title: product.title,
            price: product.price.amount,
            image: product.image,
            variantId: product.variantId || product.id,
        })
        toast.success("Added to Cart", { description: product.title })
    }

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toggleItem({
            id: product.id,
            title: product.title,
            handle: product.handle,
            price: product.price.amount,
            image: product.image,
            category: product.category,
        })
    }

    // Determine badge text: e.g. "Badge__New Arrival" -> "New Arrival"
    const badgeTag = product.tags?.find((t) => t.startsWith("Badge__"))
    const displayBadge = badgeTag ? badgeTag.replace("Badge__", "") : product.badge

    return (
        <div className="group flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                {displayBadge && (
                    <Badge
                        variant="secondary"
                        className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-wider font-semibold py-1 px-2.5 bg-background/90 backdrop-blur border-none shadow-sm"
                    >
                        {displayBadge}
                    </Badge>
                )}

                {/* Action buttons - top right */}
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
                    {/* Wishlist button - always visible on mobile, hover on desktop */}
                    <Button
                        size="icon"
                        variant="secondary"
                        className={`h-8 w-8 rounded-full shadow-sm transition-all duration-200 ${wishlisted
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "opacity-100 md:opacity-0 md:group-hover:opacity-100 bg-background/80 backdrop-blur-sm hover:bg-background"
                            }`}
                        onClick={handleToggleWishlist}
                    >
                        <Heart className={`h-3.5 w-3.5 ${wishlisted ? "fill-current" : ""}`} />
                    </Button>

                    {/* Cart button - always visible on mobile, hover on desktop */}
                    <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-3.5 w-3.5" />
                    </Button>
                </div>

                <Link
                    href={`/product/${product.handle}`}
                    className="block w-full h-full relative"
                >
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
                    />
                </Link>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-1 mt-auto">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {product.category}
                </p>
                <Link href={`/product/${product.handle}`}>
                    <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:underline underline-offset-4">
                        {product.title}
                    </h3>
                </Link>
                <p className="text-sm font-semibold mt-0.5">{formattedPrice}</p>
            </div>
        </div>
    )
}
