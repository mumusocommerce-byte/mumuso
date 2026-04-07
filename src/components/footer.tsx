import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.27 8.27 0 0 0 4.76 1.5V6.77a4.83 4.83 0 0 1-1-.08z" />
        </svg>
    )
}
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
                                href="https://www.facebook.com/MumusoME/"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <Link
                                href="https://www.instagram.com/mumuso_me/"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Instagram className="h-4 w-4" />
                            </Link>
                            <Link
                                href="https://www.tiktok.com/@mumuso_me"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <TikTokIcon className="h-4 w-4" />
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
