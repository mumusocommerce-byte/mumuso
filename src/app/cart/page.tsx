"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
    ShoppingCart,
    Trash2,
    Truck,
    RotateCcw,
    ShieldCheck,
    ChevronRight,
    Loader2,
    Minus,
    Plus,
    ArrowLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { toast } from "sonner"

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart()

    const [isCheckingOut, setIsCheckingOut] = React.useState(false)
    const [promoCode, setPromoCode] = React.useState("")

    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

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

            window.location.href = data.checkoutUrl
        } catch (error: any) {
            console.error("Checkout error:", error)
            toast.error("Checkout failed", {
                description: error.message || "Please try again.",
            })
            setIsCheckingOut(false)
        }
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-6 md:px-8 py-12 md:py-16 max-w-6xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-foreground font-medium">Shopping Cart</span>
                </nav>

                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="h-24 w-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                        <ShoppingCart className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="text-muted-foreground mb-8 max-w-sm">
                        Looks like you haven&apos;t added anything to your cart yet. Start
                        shopping and find something you love!
                    </p>
                    <Link href="/catalog">
                        <Button size="lg" className="h-11 px-8 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-6 md:px-8 py-12 md:py-16 max-w-6xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">Shopping Cart</span>
            </nav>

            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                        Shopping Cart
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
                    </p>
                </div>
                <Link href="/catalog">
                    <Button variant="ghost" className="gap-2 text-muted-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        Continue Shopping
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* ── LEFT: Cart Items (3/5) ──────────────────────────────── */}
                <div className="lg:col-span-3 flex flex-col gap-0">
                    {/* Header row - desktop only */}
                    <div className="hidden sm:grid sm:grid-cols-[1fr_140px_120px_40px] gap-4 px-4 pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <span>Product</span>
                        <span className="text-center">Quantity</span>
                        <span className="text-right">Price</span>
                        <span></span>
                    </div>

                    <Separator className="hidden sm:block mb-0" />

                    {/* Cart Items */}
                    {items.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <div className="flex items-center gap-4 sm:gap-5 py-5 px-2 sm:px-4">
                                {/* Product Image - Square */}
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-muted/50 border">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain p-2"
                                        sizes="96px"
                                    />
                                </div>

                                {/* Product Info + Controls */}
                                <div className="flex-1 min-w-0 grid sm:grid-cols-[1fr_140px_120px_40px] gap-3 sm:gap-4 items-center">
                                    {/* Title & Variant */}
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-sm sm:text-base leading-tight line-clamp-2">
                                            {item.title}
                                        </h3>
                                        {item.variantTitle &&
                                            item.variantTitle !== "Default Title" && (
                                                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                                    {item.variantTitle}
                                                </p>
                                            )}
                                    </div>

                                    {/* Quantity Stepper */}
                                    <div className="flex items-center sm:justify-center">
                                        <div className="inline-flex items-center rounded-lg border bg-background">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        Math.max(1, item.quantity - 1)
                                                    )
                                                }
                                                className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="h-3.5 w-3.5" />
                                            </button>
                                            <span className="h-9 w-10 flex items-center justify-center text-sm font-medium border-x">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity + 1)
                                                }
                                                className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                            </button>
                                        </div>

                                        {/* Price - inline on mobile */}
                                        <span className="ml-auto font-semibold text-sm sm:hidden">
                                            AED{" "}
                                            {(Number(item.price) * item.quantity).toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Price - desktop */}
                                    <div className="hidden sm:block text-right">
                                        <p className="font-semibold text-base">
                                            AED{" "}
                                            {(Number(item.price) * item.quantity).toFixed(2)}
                                        </p>
                                        {item.quantity > 1 && (
                                            <p className="text-xs text-muted-foreground">
                                                AED {Number(item.price).toFixed(2)} each
                                            </p>
                                        )}
                                    </div>

                                    {/* Delete */}
                                    <div className="hidden sm:flex justify-center">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Mobile delete */}
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="sm:hidden h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors flex-shrink-0"
                                    aria-label="Remove item"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                            {index < items.length - 1 && <Separator />}
                        </React.Fragment>
                    ))}

                    <Separator />
                </div>

                {/* ── RIGHT: Order Summary (2/5) ─────────────────────────── */}
                <div className="lg:col-span-2">
                    <div className="rounded-2xl border bg-card p-6 lg:sticky lg:top-24">
                        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                        {/* Mini Cart Items */}
                        <div className="space-y-4 mb-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-muted/50 border">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-contain p-1"
                                            sizes="48px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-sm font-medium flex-shrink-0">
                                        AED{" "}
                                        {(Number(item.price) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Separator className="mb-5" />

                        {/* Promo Code */}
                        <div className="flex gap-2 mb-5">
                            <Input
                                placeholder="Promo code"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="h-10"
                            />
                            <Button variant="outline" className="h-10 px-5 shrink-0">
                                Apply
                            </Button>
                        </div>

                        <Separator className="mb-5" />

                        {/* Price Breakdown */}
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">
                                    AED {total.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="text-muted-foreground text-xs">
                                    Calculated at next step
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Estimated Tax
                                </span>
                                <span className="text-muted-foreground text-xs">
                                    Calculated at checkout
                                </span>
                            </div>
                        </div>

                        <Separator className="my-5" />

                        {/* Total */}
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-lg font-bold">
                                AED {total.toFixed(2)}
                            </span>
                        </div>

                        {/* Checkout Button */}
                        <Button
                            className="w-full h-12 text-sm font-semibold rounded-xl"
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
                            You&apos;ll be redirected to complete your purchase
                        </p>

                        <Separator className="my-5" />

                        {/* Trust Signals */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                                    <Truck className="h-4 w-4 text-primary" />
                                </div>
                                <span>Free shipping on orders over AED 150</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                                    <RotateCcw className="h-4 w-4 text-primary" />
                                </div>
                                <span>Free 30-day returns</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                </div>
                                <span>Secure checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
