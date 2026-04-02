"use client"

import * as React from "react"
import {
    Truck,
    PackageCheck,
    MapPin,
    ChevronDown,
    Loader2,
    Package,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

interface LocationInventory {
    id: string
    name: string
    city: string
    province: string
    address: string
    available: number
}

interface FulfillmentInfoProps {
    variantId?: string
}

export function FulfillmentInfo({ variantId }: FulfillmentInfoProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [locations, setLocations] = React.useState<LocationInventory[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [hasFetched, setHasFetched] = React.useState(false)

    // Fetch inventory when the panel opens
    React.useEffect(() => {
        if (isOpen && !hasFetched && variantId) {
            setIsLoading(true)
            fetch(`/api/inventory?variantId=${encodeURIComponent(variantId)}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.locations) {
                        // Filter out warehouse (keep only store locations)
                        setLocations(data.locations)
                    }
                })
                .catch((err) => console.error("Error fetching inventory:", err))
                .finally(() => {
                    setIsLoading(false)
                    setHasFetched(true)
                })
        }
    }, [isOpen, hasFetched, variantId])

    // Reset when variant changes
    React.useEffect(() => {
        setHasFetched(false)
        setLocations([])
        if (isOpen) {
            setIsOpen(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variantId])

    const getStockBadge = (qty: number) => {
        if (qty <= 0) {
            return (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-0">
                    Out of stock
                </Badge>
            )
        }
        if (qty <= 5) {
            return (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400 border-0">
                    {qty} left
                </Badge>
            )
        }
        return (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-0">
                In stock ({qty})
            </Badge>
        )
    }

    return (
        <div className="mt-6 space-y-3">
            {/* Home Delivery */}
            <div className="flex items-start gap-4 p-4 rounded-xl border bg-card hover:border-primary/30 transition-all duration-300 group">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors duration-300 shrink-0">
                    <Truck className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground">Home Delivery</h4>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs text-muted-foreground">Delivers within 48 hrs across UAE</span>
                    </div>
                </div>
            </div>

            {/* Click & Collect with Store Inventory */}
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div className="rounded-xl border bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    <CollapsibleTrigger asChild>
                        <button className="flex items-start gap-4 p-4 w-full text-left group">
                            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors duration-300 shrink-0">
                                <PackageCheck className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-foreground">Click & Collect</h4>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-xs text-muted-foreground">Ready within 24 hrs</span>
                                </div>
                                <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                                    Check store availability
                                    <ChevronDown className={cn(
                                        "h-3.5 w-3.5 transition-transform duration-200",
                                        isOpen && "rotate-180"
                                    )} />
                                </span>
                            </div>
                        </button>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <Separator />
                        <div className="p-4">
                            {/* Header */}
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin className="h-4 w-4 text-primary" />
                                <h5 className="text-sm font-semibold">Store Availability</h5>
                            </div>

                            {isLoading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                                            <Skeleton className="h-9 w-9 rounded-lg" />
                                            <div className="flex-1 space-y-1.5">
                                                <Skeleton className="h-3.5 w-32" />
                                                <Skeleton className="h-3 w-20" />
                                            </div>
                                            <Skeleton className="h-5 w-16 rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            ) : locations.length === 0 ? (
                                <div className="flex flex-col items-center py-6 text-center">
                                    <Package className="h-8 w-8 text-muted-foreground/30 mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                        No store inventory available
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {locations.map((location) => (
                                        <div
                                            key={location.id}
                                            className={cn(
                                                "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                                                location.available > 0
                                                    ? "hover:border-primary/30 hover:bg-muted/30"
                                                    : "opacity-60"
                                            )}
                                        >
                                            <div className={cn(
                                                "flex items-center justify-center w-9 h-9 rounded-lg shrink-0",
                                                location.available > 0
                                                    ? "bg-primary/10 text-primary"
                                                    : "bg-muted text-muted-foreground"
                                            )}>
                                                <MapPin className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">
                                                    {location.name}
                                                </p>
                                                {(location.city || location.province) && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {[location.city, location.province].filter(Boolean).join(", ")}
                                                    </p>
                                                )}
                                            </div>
                                            {getStockBadge(location.available)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CollapsibleContent>
                </div>
            </Collapsible>
        </div>
    )
}
