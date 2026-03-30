"use client"

import * as React from "react"
import { toast } from "sonner" // Ensure sonner is or will be used for toasts, or maybe just console log if not installed

export interface CartItem {
    id: string
    title: string
    price: string
    image: string
    quantity: number
    variantId: string
    variantTitle?: string
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    total: number
}

const CartContext = React.createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = React.useState<CartItem[]>([])

    // Load from local storage on mount
    React.useEffect(() => {
        try {
            const stored = localStorage.getItem("cart")
            if (stored) setItems(JSON.parse(stored))
        } catch (e) {
            console.error(e)
        }
    }, [])

    // Save to local storage on change
    React.useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    const addItem = React.useCallback(
        (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
            setItems((prev) => {
                const existing = prev.find((i) => i.id === item.id)
                if (existing) {
                    return prev.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                    )
                }
                return [...prev, { ...item, quantity }]
            })
        },
        []
    )

    const removeItem = React.useCallback((id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }, [])

    const updateQuantity = React.useCallback((id: string, quantity: number) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        )
    }, [])

    const clearCart = React.useCallback(() => {
        setItems([])
    }, [])

    const total = items.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = React.useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
