import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container mx-auto px-6 md:px-8 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <h3 className="text-base font-bold tracking-tight">MUMUSO</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Your premium destination for curated lifestyle products.
                        </p>
                        <div className="flex items-center gap-3">
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Instagram className="h-4 w-4" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Twitter className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Shop */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Shop</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/catalog"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/catalog/new-mumuso-lifestyle"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/catalog/best-selling-items"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Best Sellers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/policies/shipping-policy"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/policies/terms-of-service"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/policies/privacy-policy"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <p className="text-xs text-muted-foreground text-center">
                    &copy; {new Date().getFullYear()} Mumuso. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
