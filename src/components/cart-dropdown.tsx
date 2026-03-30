"use client"

import * as React from "react"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReactDOM from "react-dom"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "./cart-provider"

export function CartDropdown() {
    const { items, total } = useCart()
    const [isOpen, setIsOpen] = React.useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    // Close on click outside
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])

    // Close on Escape
    React.useEffect(() => {
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") setIsOpen(false)
        }
        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
        }
        return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen])

    return (
        <div className="relative">
            <Button
                ref={buttonRef}
                variant="ghost"
                size="icon"
                className="h-8 w-8 relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                <ShoppingCart className="h-4 w-4" />
                {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                        {items.length}
                    </span>
                )}
                <span className="sr-only">Cart</span>
            </Button>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 top-full mt-2 w-80 rounded-xl border bg-card shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                    {/* Header */}
                    <div className="flex items-center gap-2 px-4 pt-4 pb-3">
                        <ShoppingCart className="h-4 w-4" />
                        <span className="font-semibold text-sm">Cart</span>
                        {items.length > 0 && (
                            <span className="bg-primary text-primary-foreground text-[10px] font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                                {items.length}
                            </span>
                        )}
                    </div>

                    {items.length > 0 ? (
                        <>
                            {/* Item list */}
                            <div className="border-t border-b">
                                <div className="max-h-64 overflow-y-auto divide-y">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                                            <div className="relative h-14 w-14 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="56px"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium leading-tight line-clamp-1">
                                                    {item.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-semibold shrink-0">
                                                AED {(Number(item.price) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Subtotal</span>
                                    <span className="text-base font-semibold">AED {total.toFixed(2)}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <Link href="/cart" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full h-10 text-sm">
                                            View Cart
                                        </Button>
                                    </Link>
                                    <Link href="/cart" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full h-10 text-sm font-semibold">
                                            Checkout
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="px-4 py-8 text-center">
                            <ShoppingCart className="h-10 w-10 text-muted-foreground/20 mx-auto mb-2" />
                            <p className="text-sm font-medium">Your cart is empty</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Add items to get started.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
