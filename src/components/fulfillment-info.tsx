"use client"

import * as React from "react"
import { Truck, PackageCheck, Store, ChevronRight, MapPin, Phone, X } from "lucide-react"
import { stores, emirates, getStoresByEmirate, type Store as StoreType } from "@/lib/store-data"
import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface StoreListPanelProps {
    isOpen: boolean
    onClose: () => void
    title: string
    description?: string
}

function StoreListPanel({ isOpen, onClose, title, description }: StoreListPanelProps) {
    const [selectedEmirate, setSelectedEmirate] = React.useState("All Emirates")
    const filteredStores = getStoresByEmirate(selectedEmirate)

    if (!isOpen) return null

    return (
        <div className="mt-4 rounded-xl border bg-card overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
                <div>
                    <h4 className="text-sm font-semibold">{title}</h4>
                    {description && (
                        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                    )}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={onClose}
                >
                    <X className="h-3.5 w-3.5" />
                </Button>
            </div>

            {/* Filter */}
            <div className="px-4 py-3 border-b">
                <Select value={selectedEmirate} onValueChange={(val) => val && setSelectedEmirate(val)}>
                    <SelectTrigger className="h-9 text-sm rounded-lg">
                        <SelectValue placeholder="Filter by Emirate" />
                    </SelectTrigger>
                    <SelectContent>
                        {emirates.map((emirate) => (
                            <SelectItem key={emirate} value={emirate}>
                                {emirate}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Store List */}
            <div className="max-h-[240px] overflow-y-auto">
                {filteredStores.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No stores found in this emirate.
                    </div>
                ) : (
                    <ul className="divide-y">
                        {filteredStores.map((store) => (
                            <li
                                key={store.id}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors"
                            >
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                                    <MapPin className="h-3.5 w-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{store.mall}</p>
                                    <p className="text-xs text-muted-foreground">{store.emirate}</p>
                                </div>
                                <a
                                    href={`tel:${store.phone}`}
                                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors shrink-0"
                                >
                                    <Phone className="h-3 w-3" />
                                    <span className="hidden sm:inline">Call</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t bg-muted/20 text-center">
                <p className="text-xs text-muted-foreground">
                    {filteredStores.length} store{filteredStores.length !== 1 ? "s" : ""} available
                </p>
            </div>
        </div>
    )
}

export function FulfillmentInfo() {
    const [showStoreInfo, setShowStoreInfo] = React.useState(false)
    const [showStoreList, setShowStoreList] = React.useState(false)

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

            {/* Click & Collect */}
            <div className="rounded-xl border bg-card hover:border-primary/30 transition-all duration-300 group">
                <div className="flex items-start gap-4 p-4">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors duration-300 shrink-0">
                        <PackageCheck className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-semibold text-foreground">Click & Collect</h4>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs text-muted-foreground">Ready within 24 hrs</span>
                        </div>
                        <button
                            onClick={() => {
                                setShowStoreInfo(!showStoreInfo)
                                setShowStoreList(false)
                            }}
                            className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-foreground hover:text-primary transition-colors group/link"
                        >
                            Show store information
                            <ChevronRight className={cn(
                                "h-3.5 w-3.5 transition-transform duration-200",
                                showStoreInfo && "rotate-90"
                            )} />
                        </button>
                    </div>
                </div>

                {/* Store info panel for Click & Collect */}
                {showStoreInfo && (
                    <StoreListPanel
                        isOpen={showStoreInfo}
                        onClose={() => setShowStoreInfo(false)}
                        title="Pickup Locations"
                        description="Select your nearest store for collection"
                    />
                )}
            </div>

            {/* In Store */}
            <div className="rounded-xl border bg-card hover:border-primary/30 transition-all duration-300 group">
                <div className="flex items-start gap-4 p-4">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors duration-300 shrink-0">
                        <Store className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-semibold text-foreground">In Store</h4>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs text-muted-foreground">Available at {stores.length}+ stores</span>
                        </div>
                        <button
                            onClick={() => {
                                setShowStoreList(!showStoreList)
                                setShowStoreInfo(false)
                            }}
                            className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-foreground hover:text-primary transition-colors group/link"
                        >
                            Check store list
                            <ChevronRight className={cn(
                                "h-3.5 w-3.5 transition-transform duration-200",
                                showStoreList && "rotate-90"
                            )} />
                        </button>
                    </div>
                </div>

                {/* Store list panel */}
                {showStoreList && (
                    <StoreListPanel
                        isOpen={showStoreList}
                        onClose={() => setShowStoreList(false)}
                        title="Store Locations"
                        description="Browse all Mumuso stores across the UAE"
                    />
                )}
            </div>
        </div>
    )
}
