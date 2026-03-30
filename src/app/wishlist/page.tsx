"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/components/wishlist-provider"
import { useCart } from "@/components/cart-provider"
import { toast } from "sonner"

export default function WishlistPage() {
    const { items, removeItem } = useWishlist()
    const { addItem } = useCart()

    const handleMoveToCart = (item: typeof items[0]) => {
        addItem({
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            variantId: item.id,
        })
        removeItem(item.id)
        toast.success("Moved to Cart", { description: item.title })
    }

    return (
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 max-w-5xl">
            <div className="flex items-center gap-3 mb-10">
                <Heart className="h-7 w-7 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
                {items.length > 0 && (
                    <span className="text-muted-foreground text-lg">({items.length} items)</span>
                )}
            </div>

            {items.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="group flex flex-col">
                            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                                {/* Remove button */}
                                <div className="absolute top-3 right-3 z-10">
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="h-8 w-8 rounded-full shadow-sm bg-red-500 hover:bg-red-600 text-white"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Heart className="h-3.5 w-3.5 fill-current" />
                                    </Button>
                                </div>
                                <Link href={`/product/${item.handle}`} className="block w-full h-full relative">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                </Link>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.category}</p>
                                <Link href={`/product/${item.handle}`}>
                                    <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:underline underline-offset-4">
                                        {item.title}
                                    </h3>
                                </Link>
                                <p className="text-sm font-semibold mt-0.5">AED {Number(item.price).toFixed(2)}</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 w-full text-xs h-9"
                                    onClick={() => handleMoveToCart(item)}
                                >
                                    <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                                    Move to Cart
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <Heart className="h-16 w-16 text-muted-foreground/20 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                    <p className="text-muted-foreground mb-6 max-w-sm">
                        Browse our products and tap the heart icon to save items you love.
                    </p>
                    <Link href="/catalog">
                        <Button size="lg">Start Shopping</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
