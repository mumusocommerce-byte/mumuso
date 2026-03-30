"use client"

import Link from "next/link"
import { MapPin, Phone, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { stores, getEmirateStoreCounts } from "@/lib/store-data"

const featuredEmirates = [
    { name: "Dubai", icon: "🏙️" },
    { name: "Abu Dhabi", icon: "🕌" },
    { name: "Sharjah", icon: "🌆" },
    { name: "Al Ain", icon: "🌴" },
]

export function StoreLocatorBanner() {
    const counts = getEmirateStoreCounts()

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-6 md:px-8">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border">
                    <div className="p-8 md:p-12 lg:p-16">
                        {/* Header */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
                            <div className="space-y-3 max-w-xl">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
                                        <MapPin className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                                        Store Locator
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                                    Find a MUMUSO Store Near You
                                </h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    With <span className="text-primary font-semibold">{stores.length}+ stores</span> across the UAE,
                                    there&apos;s always a MUMUSO close by. Visit us today!
                                </p>
                            </div>
                            <Link
                                href="/contact"
                                className={buttonVariants({
                                    size: "lg",
                                    className: "gap-2 shrink-0",
                                })}
                            >
                                View All Stores
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        {/* Emirate Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {featuredEmirates.map((emirate) => (
                                <Link
                                    key={emirate.name}
                                    href="/contact"
                                    className="group bg-card/80 backdrop-blur border rounded-xl p-4 md:p-5 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                                >
                                    <div className="text-2xl mb-2">{emirate.icon}</div>
                                    <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                                        {emirate.name}
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <MapPin className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">
                                            {counts[emirate.name] || 0} stores
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Quick Contact Row */}
                        <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-primary/10">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>Need help? Call your nearest store</span>
                            </div>
                            <Link
                                href="/contact"
                                className="text-sm font-medium text-primary hover:underline underline-offset-4 flex items-center gap-1"
                            >
                                Find store numbers
                                <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Decorative background elements */}
                    <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 h-48 w-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                </div>
            </div>
        </section>
    )
}
