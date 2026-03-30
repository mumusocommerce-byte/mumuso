"use client"

import * as React from "react"
import ReactDOM from "react-dom"
import Link from "next/link"
import { Menu, X, ChevronDown, User, Heart } from "lucide-react"
import { useWishlist } from "./wishlist-provider"

interface MegaMenuItem {
    title: string
    handle: string
    subCategories: { title: string; handle: string }[]
}

interface MobileMenuProps {
    megaMenuItems: MegaMenuItem[]
    isLoggedIn: boolean
}

function CollapsibleSection({
    title,
    children,
    defaultOpen = false
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean
}) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)

    return (
        <div className="border-b border-border/40">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-2 py-5 text-left"
            >
                <span className="text-[28px] leading-none font-bold tracking-tight">{title}</span>
                <ChevronDown
                    className={`h-4 w-4 mt-1 text-foreground/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    )
}

function WishlistBadge() {
    const { items } = useWishlist()
    if (items.length === 0) return null
    return (
        <span className="h-6 min-w-6 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
            {items.length}
        </span>
    )
}

export function MobileMenu({ megaMenuItems, isLoggedIn }: MobileMenuProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    // Lock body scroll when menu is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [isOpen])

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden flex items-center justify-center"
                aria-label="Open menu"
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Dropdown overlay menu - portaled to body */}
            {isOpen && typeof document !== "undefined" && ReactDOM.createPortal(
                <div className="fixed inset-0 z-[90] lg:hidden" style={{ top: "64px" }}>
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drop-down box */}
                    <div
                        className="relative w-full bg-background shadow-2xl rounded-b-3xl overflow-hidden animate-in slide-in-from-top-2 fade-in duration-300 ease-out"
                        style={{ maxHeight: "calc(100vh - 64px)" }}
                    >
                        <div className="overflow-y-auto px-6 pt-2 pb-6" style={{ maxHeight: "calc(100vh - 64px)" }}>

                            {/* Shop section */}
                            <CollapsibleSection title="Shop" defaultOpen>
                                <div className="flex flex-col pl-1">
                                    {megaMenuItems.map((section) => (
                                        <div key={section.handle} className="mb-3">
                                            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">{section.title}</p>
                                            {section.subCategories.map((item) => (
                                                <Link
                                                    key={item.handle}
                                                    href={`/catalog/${item.handle}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block py-1.5 text-[15px] text-foreground/80 hover:text-primary transition-colors"
                                                >
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                    <Link
                                        href="/catalog"
                                        onClick={() => setIsOpen(false)}
                                        className="block py-1.5 text-[15px] font-semibold text-primary hover:underline"
                                    >
                                        All Products →
                                    </Link>
                                </div>
                            </CollapsibleSection>

                            {/* New In section */}
                            <CollapsibleSection title="New In">
                                <div className="flex flex-col pl-1">
                                    <Link
                                        href="/catalog/new-mumuso-lifestyle"
                                        onClick={() => setIsOpen(false)}
                                        className="block py-1.5 text-[15px] text-foreground/80 hover:text-primary transition-colors"
                                    >
                                        New Arrivals
                                    </Link>
                                    <Link
                                        href="/catalog/best-selling-items"
                                        onClick={() => setIsOpen(false)}
                                        className="block py-1.5 text-[15px] text-foreground/80 hover:text-primary transition-colors"
                                    >
                                        Bestsellers
                                    </Link>
                                </div>
                            </CollapsibleSection>

                            {/* Community section */}
                            <CollapsibleSection title="Community">
                                <div className="flex flex-col pl-1">
                                    <Link
                                        href="/about"
                                        onClick={() => setIsOpen(false)}
                                        className="block py-1.5 text-[15px] text-foreground/80 hover:text-primary transition-colors"
                                    >
                                        About Us
                                    </Link>
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsOpen(false)}
                                        className="block py-1.5 text-[15px] text-foreground/80 hover:text-primary transition-colors"
                                    >
                                        Contact Us
                                    </Link>
                                    <Link
                                        href={isLoggedIn ? "/account" : "/login"}
                                        onClick={() => setIsOpen(false)}
                                        className="block py-1.5 text-[15px] text-foreground/80 hover:text-primary transition-colors"
                                    >
                                        Account
                                    </Link>
                                </div>
                            </CollapsibleSection>

                            {/* Footer Actions */}
                            <div className="mt-6 space-y-3">
                                <Link
                                    href="/wishlist"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border font-semibold text-[15px] hover:bg-muted transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Heart className="h-5 w-5" />
                                        My Wishlist
                                    </div>
                                    <WishlistBadge />
                                </Link>
                                <Link
                                    href={isLoggedIn ? "/account" : "/login"}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 p-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] justify-center hover:opacity-90 transition-opacity"
                                >
                                    <User className="h-5 w-5" />
                                    {isLoggedIn ? "My Account" : "Sign In / Register"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}
