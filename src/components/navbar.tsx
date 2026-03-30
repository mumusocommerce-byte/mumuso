"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Moon, Sun, Search, X, ChevronDown, User, Heart } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { CartDropdown } from "./cart-dropdown"
import { SearchPanel } from "./search-panel"
import { useWishlist } from "./wishlist-provider"
import { MobileMenu } from "./mobile-menu"

export interface Category {
    title: string
    handle: string
}

const megaMenuItems = [
    {
        title: "Beauty & Personal Care",
        handle: "beauty",
        subCategories: [
            { title: "Beauty & Skin Care", handle: "beauty-clean" },
            { title: "Beauty Masks", handle: "facial-mask" },
            { title: "Makeup & Perfume", handle: "make-up-tools" },
            { title: "Hair & Nail Care", handle: "hair-care-women" },
        ]
    },
    {
        title: "Home & Living",
        handle: "home",
        subCategories: [
            { title: "Kitchenware", handle: "kitchen-dining" },
            { title: "Household Essentials", handle: "home-living" },
            { title: "Storage", handle: "storage" },
            { title: "Fragrances & Diffusers", handle: "diffuser" },
        ]
    },
    {
        title: "Lifestyle",
        handle: "lifestyle",
        subCategories: [
            { title: "Toys", handle: "toys" },
            { title: "Pet Supplies", handle: "pet-essential" },
            { title: "Stationery", handle: "stationary" },
            { title: "Electronics", handle: "electronics" },
        ]
    },
    {
        title: "Fashion",
        handle: "fashion",
        subCategories: [
            { title: "Purses & Bags", handle: "gift-package-bags" },
            { title: "Fashion & Apparel", handle: "apparel-women" },
        ]
    }
]

export function Navbar({ categories = [], isLoggedIn = false }: { categories?: Category[], isLoggedIn?: boolean }) {
    const { setTheme, theme } = useTheme()
    const [isSearchOpen, setIsSearchOpen] = React.useState(false)
    const { items: wishlistItems } = useWishlist()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-6 md:px-8 flex h-16 items-center justify-between">

                {/* ── Left: Logo & Mobile Menu ──────────────────────── */}
                <div className="flex items-center gap-4 lg:w-1/4">
                    <MobileMenu megaMenuItems={megaMenuItems} isLoggedIn={isLoggedIn} />

                    <Link href="/" className="flex items-center">
                        {/* Using logo image dynamically or text fallback */}
                        <span className="text-xl font-bold tracking-tight text-primary">
                            MUMUSO
                        </span>
                    </Link>
                </div>

                {/* ── Center: Mega Navigation Menu ──────────────────────── */}
                <div className="hidden lg:flex flex-1 justify-center">
                    <NavigationMenu>
                        <NavigationMenuList>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-sm font-medium">
                                    Shop by Category
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="w-screen bg-background">
                                    <div className="container mx-auto w-full max-w-[1400px] px-6 md:px-8 flex flex-col pt-6">
                                        {/* Mega Menu Layout container */}
                                        <div className="grid grid-cols-4 gap-8 pb-8">
                                            {megaMenuItems.map((section) => (
                                                <div key={section.handle} className="space-y-4">
                                                    <h4 className="text-sm font-bold tracking-tight flex items-center border-b pb-3 border-muted-foreground/10">
                                                        {section.title}
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {section.subCategories.map((item) => (
                                                            <li key={item.handle}>
                                                                <Link
                                                                    href={`/catalog/${item.handle}`}
                                                                    className="text-sm text-muted-foreground hover:text-primary transition-colors block duration-200"
                                                                >
                                                                    {item.title}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Footer of Mega Menu spanning full width but contained content */}
                                    <div className="bg-muted/30 border-t">
                                        <div className="container mx-auto max-w-[1400px] px-6 md:px-8 p-4 flex justify-between items-center text-sm">
                                            <p className="text-muted-foreground">Looking for everything?</p>
                                            <Link href="/catalog" className="font-semibold text-primary hover:underline">
                                                View All Products &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link href="/catalog/new-mumuso-lifestyle" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        New Arrivals
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link href="/catalog/best-selling-items" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Best Sellers
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* ── Right: Search, Theme, Cart ──────────────────────── */}
                <div className="flex items-center justify-end gap-1 lg:w-1/4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                        <span className="sr-only">Search</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <Link href="/wishlist">
                        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                            <Heart className="h-4 w-4" />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                                    {wishlistItems.length}
                                </span>
                            )}
                            <span className="sr-only">Wishlist</span>
                        </Button>
                    </Link>
                    <Link href={isLoggedIn ? "/account" : "/login"}>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <User className="h-4 w-4" />
                            <span className="sr-only">Account</span>
                        </Button>
                    </Link>
                    <CartDropdown />
                </div>

            </div>

            <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    )
}
