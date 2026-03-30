"use client"

import * as React from "react"
import { toast } from "sonner"

export interface WishlistItem {
    id: string
    title: string
    handle: string
    price: string
    image: string
    category: string
}

interface WishlistContextType {
    items: WishlistItem[]
    addItem: (item: WishlistItem) => void
    removeItem: (id: string) => void
    isInWishlist: (id: string) => boolean
    toggleItem: (item: WishlistItem) => void
}

const WishlistContext = React.createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = React.useState<WishlistItem[]>([])

    // Load from local storage on mount
    React.useEffect(() => {
        try {
            const stored = localStorage.getItem("wishlist")
            if (stored) setItems(JSON.parse(stored))
        } catch (e) {
            console.error(e)
        }
    }, [])

    // Save to local storage on change
    React.useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(items))
    }, [items])

    const addItem = React.useCallback((item: WishlistItem) => {
        setItems((prev) => {
            if (prev.find((i) => i.id === item.id)) return prev
            return [...prev, item]
        })
        toast.success("Added to Wishlist", { description: item.title })
    }, [])

    const removeItem = React.useCallback((id: string) => {
        setItems((prev) => {
            const item = prev.find((i) => i.id === id)
            if (item) {
                toast("Removed from Wishlist", { description: item.title })
            }
            return prev.filter((i) => i.id !== id)
        })
    }, [])

    const isInWishlist = React.useCallback(
        (id: string) => items.some((i) => i.id === id),
        [items]
    )

    const toggleItem = React.useCallback(
        (item: WishlistItem) => {
            if (items.some((i) => i.id === item.id)) {
                removeItem(item.id)
            } else {
                addItem(item)
            }
        },
        [items, addItem, removeItem]
    )

    return (
        <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, toggleItem }}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = React.useContext(WishlistContext)
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider")
    }
    return context
}
