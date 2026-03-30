"use client"

import * as React from "react"
import { Search, X, TrendingUp, Sparkles, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface SearchPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const TRENDING = ["Skincare", "Storage", "Toys", "Tumbler", "Perfume", "Backpack"]
const SUGGESTIONS = ["Beauty Masks", "Water Bottle", "Backpack", "Desk Organizer", "Cushion", "Lip Balm", "Face Wash", "Sunglasses"]

export function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
    const [query, setQuery] = React.useState("")
    const [results, setResults] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const timer = setTimeout(async () => {
            if (!query.trim()) {
                setResults([])
                setIsLoading(false)
                return
            }

            setIsLoading(true)
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
                if (res.ok) {
                    const data = await res.json()
                    setResults(data.products || [])
                }
            } catch (error) {
                console.error("Search failed:", error)
                setResults([])
            } finally {
                setIsLoading(false)
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [query])

    if (!isOpen) return null

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/catalog?q=${encodeURIComponent(query.trim())}`)
            onClose()
        }
    }

    return (
        <>
            <div
                className="absolute top-full left-0 w-full h-[calc(100vh-64px)] bg-black/20 z-30 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="absolute top-full left-0 w-full bg-background border-b shadow-xl z-40 animate-in fade-in slide-in-from-top-4 duration-200">
                <div className="container mx-auto px-6 md:px-8 py-8 md:py-10">
                    <form onSubmit={handleSearch} className="relative flex items-center max-w-3xl mx-auto">
                        <Search className="absolute left-5 h-5 w-5 text-muted-foreground" />
                        <Input
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="What are you looking for?"
                            className="pl-14 pr-14 h-14 md:h-16 w-full text-base md:text-lg rounded-full bg-muted/60 border-transparent focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all"
                        />
                        {query && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-3 h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-transparent rounded-full"
                                onClick={() => setQuery("")}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        )}
                        <button type="submit" className="hidden">Search</button>
                    </form>

                    <div className="max-w-3xl mx-auto mt-10 grid md:grid-cols-2 gap-10 md:gap-16 pb-4">
                        {!query ? (
                            <>
                                <div>
                                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-primary" /> Trending Now
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {TRENDING.map(item => (
                                            <button
                                                key={item}
                                                onClick={() => {
                                                    setQuery(item)
                                                    router.push(`/catalog?q=${encodeURIComponent(item)}`)
                                                    onClose()
                                                }}
                                                className="px-4 py-2 bg-muted/80 hover:bg-primary hover:text-primary-foreground text-sm font-medium rounded-full transition-colors"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-primary" /> Popular Categories
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                                        {[{ title: "Beauty & Skin Care", href: "beauty-skin-care" }, { title: "Kitchenware", href: "kitchenware" }, { title: "Stationery", href: "stationery" }, { title: "Home Living", href: "household-essentials" }].map(cat => (
                                            <Link
                                                key={cat.href}
                                                href={`/catalog/${cat.href}`}
                                                onClick={onClose}
                                                className="text-sm text-muted-foreground hover:text-primary font-medium transition-colors flex justify-between group py-1 border-b md:border-none"
                                            >
                                                <span>{cat.title}</span>
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-200">→</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-muted-foreground">
                                        Products matching <span className="text-foreground">"{query}"</span>
                                    </h3>
                                    {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                                </div>

                                {!isLoading && results.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {results.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/product/${product.handle}`}
                                                onClick={onClose}
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors group"
                                            >
                                                <div className="relative w-14 h-14 bg-muted/50 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        sizes="56px"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-foreground truncate">{product.title}</h4>
                                                    <p className="text-xs text-muted-foreground mt-0.5 group-hover:text-primary transition-colors">View Product &rarr;</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : !isLoading ? (
                                    <div className="py-12 bg-muted/20 rounded-2xl border border-dashed text-center flex flex-col items-center justify-center">
                                        <Search className="h-8 w-8 text-muted-foreground/50 mb-3" />
                                        <p className="text-base font-medium mb-1">No products found for "{query}".</p>
                                        <p className="text-sm text-muted-foreground">Try a different keyword or check spelling.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-8">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <div key={i} className="flex items-center gap-4 p-3 animate-pulse">
                                                <div className="w-14 h-14 bg-muted rounded-lg shrink-0" />
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-muted rounded w-3/4" />
                                                    <div className="h-3 bg-muted rounded w-1/2" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
