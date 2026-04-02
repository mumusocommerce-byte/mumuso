"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Trash2, Truck, RotateCcw, ShieldCheck, ChevronRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { toast } from "sonner"

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart()

    const [isCheckingOut, setIsCheckingOut] = React.useState(false)

    const handleCheckout = async () => {
        setIsCheckingOut(true)
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map((item) => ({
                        variantId: item.variantId,
                        quantity: item.quantity,
                    })),
                }),
            })

            const data = await res.json()

            if (!res.ok || !data.checkoutUrl) {
                throw new Error(data.error || "Failed to create checkout")
            }

            // Redirect to Shopify checkout
            window.location.href = data.checkoutUrl
        } catch (error: any) {
            console.error("Checkout error:", error)
            toast.error("Checkout failed", {
                description: error.message || "Please try again.",
            })
            setIsCheckingOut(false)
        }
    }

    return (
        <div className="container mx-auto px-6 md:px-8 py-12 md:py-16 max-w-6xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">Shopping Cart</span>
            </nav>

            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-10">Shopping Cart</h1>

            {items.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-xl border bg-card p-5 flex flex-col sm:flex-row gap-5"
                            >
                                {/* Image */}
                                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted mx-auto sm:mx-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain p-1"
                                        sizes="112px"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between min-w-0">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-base leading-tight line-clamp-2">
                                                {item.title}
                                            </h3>
                                            {item.variantTitle && item.variantTitle !== "Default Title" && (
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {item.variantTitle}
                                                </p>
                                            )}
                                            <Badge variant="outline" className="mt-2 text-xs text-green-600 border-green-200 bg-green-50 dark:bg-green-950/30">
                                                In Stock
                                            </Badge>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-semibold text-base">
                                                AED {(Number(item.price) * item.quantity).toFixed(2)}
                                            </p>
                                            {item.quantity > 1 && (
                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                    AED {Number(item.price).toFixed(2)} each
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quantity + Remove */}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-9 w-9 rounded-r-none"
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            >
                                                <span className="text-lg leading-none">−</span>
                                            </Button>
                                            <div className="h-9 w-12 flex items-center justify-center border-y text-sm font-medium">
                                                {item.quantity}
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-9 w-9 rounded-l-none"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <span className="text-lg leading-none">+</span>
                                            </Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-muted-foreground hover:text-destructive gap-1.5 h-9"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="rounded-xl border bg-card p-6 sticky top-24">
                            <h2 className="text-lg font-semibold mb-5">Order Summary</h2>

                            {/* Promo Code */}
                            <div className="flex gap-2 mb-4">
                                <Input
                                    placeholder="Promo code"
                                    className="h-10"
                                />
                                <Button variant="outline" className="h-10 px-5 shrink-0">
                                    Apply
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mb-5">
                                Try <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">SAVE10</code> for 10% off
                            </p>

                            <Separator className="mb-5" />

                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <ShoppingCart className="h-4 w-4" />
                                <span>{items.reduce((sum, i) => sum + i.quantity, 0)} items</span>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">AED {total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-xs text-muted-foreground italic">Calculated at checkout</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-base font-semibold">
                                    <span>Estimated Total</span>
                                    <span>AED {total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full mt-6 h-11 text-sm font-semibold"
                                size="lg"
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                            >
                                {isCheckingOut ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Creating Checkout…
                                    </>
                                ) : (
                                    "Proceed to Checkout"
                                )}
                            </Button>

                            <p className="text-xs text-center text-muted-foreground mt-3">
                                Taxes calculated at checkout
                            </p>

                            <Separator className="my-5" />

                            {/* Trust signals */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Truck className="h-4 w-4 shrink-0" />
                                    <span>Free shipping on orders over AED 150</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <RotateCcw className="h-4 w-4 shrink-0" />
                                    <span>Free 30-day returns</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <ShieldCheck className="h-4 w-4 shrink-0" />
                                    <span>Secure checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Empty Cart */
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <ShoppingCart className="h-20 w-20 text-muted-foreground/15 mb-6" />
                    <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="text-muted-foreground mb-8 max-w-sm">
                        Looks like you haven't added anything to your cart yet. Start shopping and find something you love!
                    </p>
                    <Link href="/catalog">
                        <Button size="lg" className="h-11 px-8">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
