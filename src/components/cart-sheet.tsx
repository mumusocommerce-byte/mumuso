"use client"

import * as React from "react"
import { ShoppingCart } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useCart } from "./cart-provider"

export function CartSheet() {
    const { items, removeItem, updateQuantity, total } = useCart()

    return (
        <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 relative" />}>
                <ShoppingCart className="h-4 w-4" />
                {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                        {items.length}
                    </span>
                )}
                <span className="sr-only">Cart</span>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className="px-1">
                    <SheetTitle>Cart ({items.length})</SheetTitle>
                </SheetHeader>
                <Separator className="mt-4" />

                {items.length > 0 ? (
                    <>
                        <div className="flex flex-1 flex-col gap-5 overflow-y-auto overflow-x-hidden p-1 pr-6 mt-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex justify-between gap-2">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-medium leading-none line-clamp-2">
                                                    {item.title}
                                                </span>
                                                <span className="text-xs text-muted-foreground mt-1">
                                                    {item.variantTitle !== "Default Title" ? item.variantTitle : ""}
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium">AED {Number(item.price).toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center rounded-md border">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 rounded-none"
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                >
                                                    -
                                                </Button>
                                                <span className="w-8 text-center text-xs font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 rounded-none"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                className="h-auto p-0 text-xs text-muted-foreground"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4 pr-6 pb-6 pt-4">
                            <Separator />
                            <div className="flex justify-between text-base font-medium">
                                <span>Subtotal</span>
                                <span>AED {total.toFixed(2)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Shipping and taxes calculated at checkout.
                            </p>
                            <Button className="w-full" size="lg">
                                Checkout
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center space-y-2 px-1">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground opacity-20" />
                        <span className="text-lg font-medium">Your cart is empty</span>
                        <span className="text-sm text-muted-foreground">
                            Add items to your cart to checkout.
                        </span>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
