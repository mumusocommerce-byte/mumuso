"use client"

import * as React from "react"
import { ProductCard, type Product } from "@/components/product-card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, X } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { fetchMoreCatalogProductsAction, fetchMoreCollectionProductsAction, fetchMoreSearchProductsAction } from "@/app/actions/shopify"

interface CollectionLayoutProps {
    initialProducts: Product[]
    initialPageInfo?: { hasNextPage: boolean; endCursor: string | null }
    collectionHandle?: string
    searchQuery?: string
}

function CollectionLayoutInner({ initialProducts, initialPageInfo, collectionHandle, searchQuery }: CollectionLayoutProps) {
    const searchParams = useSearchParams()
    const q = searchQuery?.toLowerCase() || searchParams.get("q")?.toLowerCase() || ""

    const [products, setProducts] = React.useState<Product[]>(initialProducts)
    const [pageInfo, setPageInfo] = React.useState(initialPageInfo)
    const [isLoadingMore, setIsLoadingMore] = React.useState(false)

    const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false)
    const [sortBy, setSortBy] = React.useState("featured")

    const handleLoadMore = async () => {
        if (!pageInfo?.hasNextPage || !pageInfo.endCursor || isLoadingMore) return

        setIsLoadingMore(true)
        try {
            let res;
            if (searchQuery) {
                res = await fetchMoreSearchProductsAction(searchQuery, pageInfo.endCursor, 30)
            } else if (collectionHandle) {
                res = await fetchMoreCollectionProductsAction(collectionHandle, pageInfo.endCursor, 30)
            } else {
                res = await fetchMoreCatalogProductsAction(pageInfo.endCursor, 30)
            }

            setProducts(prev => [...prev, ...res.products])
            setPageInfo(res.pageInfo)
        } catch (error) {
            console.error("Failed to load more products:", error)
        } finally {
            setIsLoadingMore(false)
        }
    }

    // Extract unique categories
    const categories = React.useMemo(() => {
        const cats = new Set<string>()
        products.forEach(p => {
            if (p.category) cats.add(p.category)
        })
        return Array.from(cats).sort()
    }, [products])

    // Filter states
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
    const [priceRange, setPriceRange] = React.useState<"all" | "under50" | "50to100" | "100to200" | "over200">("all")

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

    const filteredProducts = React.useMemo(() => {
        let result = [...products]

        // Skip client-side text filtering when searchQuery is provided
        // because the server already returned filtered results
        if (q && !searchQuery) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(q) ||
                (p.category && p.category.toLowerCase().includes(q)) ||
                (p.tags && p.tags.some(tag => tag.toLowerCase().includes(q)))
            )
        }

        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category || "All Products"))
        }

        if (priceRange !== "all") {
            result = result.filter(p => {
                const price = Number(p.price.amount)
                if (priceRange === "under50") return price < 50
                if (priceRange === "50to100") return price >= 50 && price <= 100
                if (priceRange === "100to200") return price > 100 && price <= 200
                if (priceRange === "over200") return price > 200
                return true
            })
        }

        switch (sortBy) {
            case "price-asc":
                result.sort((a, b) => Number(a.price.amount) - Number(b.price.amount))
                break
            case "price-desc":
                result.sort((a, b) => Number(b.price.amount) - Number(a.price.amount))
                break
            case "name-asc":
                result.sort((a, b) => a.title.localeCompare(b.title))
                break
            case "name-desc":
                result.sort((a, b) => b.title.localeCompare(a.title))
                break
            default: // featured
                break
        }

        return result
    }, [products, selectedCategories, priceRange, sortBy, q, searchQuery])

    const FiltersContent = () => (
        <div className="space-y-6">
            <Accordion defaultValue={["categories", "price"]} className="w-full">
                {categories.length > 0 && (
                    <AccordionItem value="categories" className="border-b-0">
                        <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
                            Categories
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-3 pt-2">
                                {categories.map(category => (
                                    <div key={category} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`category-${category}`}
                                            checked={selectedCategories.includes(category)}
                                            onCheckedChange={() => handleCategoryChange(category)}
                                        />
                                        <Label
                                            htmlFor={`category-${category}`}
                                            className="text-sm font-normal cursor-pointer flex-1"
                                        >
                                            {category}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}

                <AccordionItem value="price" className="border-b-0">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3 mt-4 border-t">
                        Price Range
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            {[
                                { id: "all", label: "All Prices" },
                                { id: "under50", label: "Under AED 50" },
                                { id: "50to100", label: "AED 50 to AED 100" },
                                { id: "100to200", label: "AED 100 to AED 200" },
                                { id: "over200", label: "Over AED 200" }
                            ].map(range => (
                                <div key={range.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`price-${range.id}`}
                                        checked={priceRange === range.id}
                                        onCheckedChange={() => setPriceRange(range.id as any)}
                                        className="rounded-full" // makes it circular like a radio button visually
                                    />
                                    <Label
                                        htmlFor={`price-${range.id}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {range.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24">
                    <div className="flex items-center gap-2 mb-6 text-xl font-bold border-b pb-4">
                        <SlidersHorizontal className="h-5 w-5" />
                        <h2>Filters</h2>
                    </div>
                    <FiltersContent />
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
                {/* Active Filters & Sort */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b">

                    {/* Mobile Filters Toggle */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="lg:hidden flex items-center gap-2"
                        onClick={() => setMobileFiltersOpen(true)}
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </Button>

                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                        Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> results {q && <span>for <span className="font-semibold text-foreground">"{q}"</span></span>}
                    </p>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Label className="text-sm whitespace-nowrap shrink-0">Sort by:</Label>
                        <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
                            <SelectTrigger className="w-[180px] h-9">
                                <SelectValue placeholder="Featured" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="name-asc">Alphabetically, A-Z</SelectItem>
                                <SelectItem value="name-desc">Alphabetically, Z-A</SelectItem>
                                <SelectItem value="price-asc">Price, low to high</SelectItem>
                                <SelectItem value="price-desc">Price, high to low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Mobile Filters Overlay */}
                {mobileFiltersOpen && (
                    <div className="fixed inset-0 z-50 flex lg:hidden">
                        <div
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
                            onClick={() => setMobileFiltersOpen(false)}
                        />
                        <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-background p-6 shadow-xl flex flex-col pt-16 animate-in slide-in-from-left-full">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4"
                                onClick={() => setMobileFiltersOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                            <h2 className="text-xl font-bold mb-6">Filters</h2>
                            <div className="flex-1 overflow-y-auto">
                                <FiltersContent />
                            </div>
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-24 bg-muted/20 rounded-xl border border-dashed">
                        <h3 className="text-lg font-semibold mb-2">No matching products</h3>
                        <p className="text-muted-foreground mb-6">Try clearing your filters to see more results.</p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSelectedCategories([])
                                setPriceRange("all")
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 mb-12">
                            {filteredProducts.map((product, i) => (
                                <ProductCard key={product.id + i} product={product} />
                            ))}
                        </div>

                        {pageInfo?.hasNextPage && (
                            <div className="flex justify-center mt-8">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                >
                                    {isLoadingMore ? "Loading..." : "Load More Products"}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export function CollectionLayout(props: CollectionLayoutProps) {
    return (
        <React.Suspense fallback={<div className="min-h-[400px] flex items-center justify-center">Loading catalog...</div>}>
            <CollectionLayoutInner {...props} />
        </React.Suspense>
    )
}
