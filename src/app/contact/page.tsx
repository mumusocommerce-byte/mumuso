"use client"

import * as React from "react"
import Link from "next/link"
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Search,
    Store,
    ChevronDown,
    ExternalLink,
    Instagram,
    Facebook,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { stores, emirates, type Store as StoreType } from "@/lib/store-data"

export default function ContactPage() {
    const [selectedEmirate, setSelectedEmirate] = React.useState("All Emirates")
    const [searchQuery, setSearchQuery] = React.useState("")
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    // Close dropdown on outside click
    React.useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const filteredStores = React.useMemo(() => {
        let result = stores
        if (selectedEmirate !== "All Emirates") {
            result = result.filter((s) => s.emirate === selectedEmirate)
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            result = result.filter(
                (s) =>
                    s.mall.toLowerCase().includes(q) ||
                    s.emirate.toLowerCase().includes(q) ||
                    s.phone.includes(q)
            )
        }
        return result
    }, [selectedEmirate, searchQuery])

    // Group stores by emirate for display
    const grouped = React.useMemo(() => {
        const map: Record<string, StoreType[]> = {}
        for (const store of filteredStores) {
            if (!map[store.emirate]) map[store.emirate] = []
            map[store.emirate].push(store)
        }
        return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
    }, [filteredStores])

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative bg-primary/5 border-b">
                <div className="container mx-auto px-6 md:px-8 py-16 md:py-24">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Link href="/" className="hover:text-foreground transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-foreground font-medium">Contact & Stores</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            Find a Store
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Visit any of our <span className="text-primary font-semibold">{stores.length} stores</span> across
                            the UAE. We&apos;re always happy to help you find what you need.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="container mx-auto px-6 md:px-8 -mt-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            icon: Phone,
                            title: "Call Us",
                            detail: "+971 4 263 8682",
                            sub: "Mon–Sat, 10am–10pm",
                        },
                        {
                            icon: Mail,
                            title: "Email",
                            detail: "customer.service@mumuso.ae",
                            sub: "We reply within 24 hours",
                        },
                        {
                            icon: Clock,
                            title: "Working Hours",
                            detail: "10:00 AM – 10:00 PM",
                            sub: "Open 7 days a week",
                        },
                        {
                            icon: MapPin,
                            title: "Headquarters",
                            detail: "Dubai, UAE",
                            sub: "United Arab Emirates",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <item.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{item.title}</p>
                                    <p className="text-sm text-foreground/80 mt-0.5">{item.detail}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Store Locator */}
            <section className="container mx-auto px-6 md:px-8 py-16 md:py-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                            <Store className="h-6 w-6 text-primary" />
                            Our Stores
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {filteredStores.length} store{filteredStores.length !== 1 ? "s" : ""} found
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search stores..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 w-full sm:w-[220px] h-10"
                            />
                        </div>

                        {/* Emirate filter dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center justify-between gap-2 h-10 px-4 rounded-md border bg-card text-sm font-medium w-full sm:w-[200px] hover:bg-accent transition-colors"
                            >
                                <MapPin className="h-4 w-4 text-primary shrink-0" />
                                <span className="truncate">{selectedEmirate}</span>
                                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-full mt-1 right-0 w-full sm:w-[200px] bg-popover border rounded-lg shadow-lg z-30 py-1 max-h-[300px] overflow-y-auto">
                                    {emirates.map((emirate) => {
                                        const count = emirate === "All Emirates"
                                            ? stores.length
                                            : stores.filter((s) => s.emirate === emirate).length
                                        return (
                                            <button
                                                key={emirate}
                                                onClick={() => {
                                                    setSelectedEmirate(emirate)
                                                    setIsDropdownOpen(false)
                                                }}
                                                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-accent transition-colors ${selectedEmirate === emirate ? "text-primary font-medium bg-primary/5" : "text-foreground"}`}
                                            >
                                                <span>{emirate}</span>
                                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                                    {count}
                                                </Badge>
                                            </button>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Separator className="mb-8" />

                {/* Store grid grouped by emirate */}
                {grouped.length === 0 ? (
                    <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
                        <Store className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <h3 className="text-lg font-semibold mb-1">No stores found</h3>
                        <p className="text-sm text-muted-foreground">
                            Try a different search or select another emirate.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {grouped.map(([emirate, emirateStores]) => (
                            <div key={emirate}>
                                <div className="flex items-center gap-3 mb-5">
                                    <h3 className="text-lg font-semibold tracking-tight">
                                        {emirate}
                                    </h3>
                                    <Badge variant="outline" className="text-xs">
                                        {emirateStores.length} store{emirateStores.length !== 1 ? "s" : ""}
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                    {emirateStores.map((store) => (
                                        <div
                                            key={store.id}
                                            className="group bg-card border rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold leading-snug truncate group-hover:text-primary transition-colors">
                                                        {store.mall}
                                                    </p>
                                                    <div className="flex items-center gap-1.5 mt-2">
                                                        <Phone className="h-3 w-3 text-muted-foreground shrink-0" />
                                                        <a
                                                            href={`tel:${store.phone}`}
                                                            className="text-xs text-muted-foreground hover:text-primary transition-colors"
                                                        >
                                                            {store.phone}
                                                        </a>
                                                    </div>
                                                </div>
                                                <a
                                                    href={`https://www.google.com/maps/search/Mumuso+${encodeURIComponent(store.mall)}+${encodeURIComponent(store.emirate)}+UAE`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Open in Google Maps"
                                                >
                                                    <ExternalLink className="h-3.5 w-3.5 text-primary" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Social & Get in Touch */}
            <section className="border-t bg-accent/20">
                <div className="container mx-auto px-6 md:px-8 py-16 md:py-20">
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Connect With Us
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Follow us on social media for the latest updates, promotions, and new store openings.
                        </p>
                        <div className="flex items-center justify-center gap-4 pt-2">
                            <Link
                                href="https://www.instagram.com/mumuso_me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                            >
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://www.facebook.com/mumusouae/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                            >
                                <Facebook className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
