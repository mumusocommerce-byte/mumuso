"use client"

import * as React from "react"
import Image from "next/image"
import { useCart } from "./cart-provider"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ProductFormProps {
  product: any
}

export function ProductForm({ product }: ProductFormProps) {
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = React.useState(product.variants[0])
  const [quantity, setQuantity] = React.useState(1)

  const isAvailable = selectedVariant?.availableForSale

  // Determine if product has "real" variants (not just "Default Title")
  const hasRealVariants =
    product.variants.length > 1 ||
    (product.variants.length === 1 && product.variants[0].title !== "Default Title")

  // Check if variants have images (for image swatches)
  const variantsHaveImages = product.variants.some((v: any) => v.image?.url)

  const handleAddToCart = () => {
    if (!selectedVariant) return

    addItem({
      id: `${product.id}-${selectedVariant.id}`,
      variantId: selectedVariant.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      image: selectedVariant.image?.url || product.images[0]?.url || "https://picsum.photos/seed/placeholder/600/800",
    }, quantity)

    toast.success(`${product.title} added to cart!`, {
      description: `${quantity > 1 ? `Qty: ${quantity}` : ""}${selectedVariant.title !== "Default Title" ? (quantity > 1 ? ` · ${selectedVariant.title}` : selectedVariant.title) : ""}`,
    })

    setQuantity(1)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Only show variant picker if there are real variants */}
      {hasRealVariants && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Variant</label>
            <span className="text-sm text-muted-foreground">— {selectedVariant.title}</span>
          </div>

          {variantsHaveImages ? (
            /* Image swatch grid */
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant: any) => {
                const imgSrc = variant.image?.url || product.images[0]?.url
                const isSelected = variant.id === selectedVariant.id
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={cn(
                      "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200",
                      isSelected
                        ? "border-primary ring-2 ring-primary/20 scale-105"
                        : "border-transparent hover:border-muted-foreground/40",
                      !variant.availableForSale && "opacity-40"
                    )}
                    title={variant.title}
                    disabled={!variant.availableForSale}
                  >
                    {imgSrc && (
                      <Image
                        src={imgSrc}
                        alt={variant.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                    {!variant.availableForSale && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                        <div className="w-full h-[1px] bg-muted-foreground rotate-45 origin-center" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          ) : (
            /* Text pill swatches (for variants without images) */
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant: any) => {
                const isSelected = variant.id === selectedVariant.id
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:border-foreground/40 text-foreground",
                      !variant.availableForSale && "opacity-40 line-through"
                    )}
                    disabled={!variant.availableForSale}
                  >
                    {variant.title}
                  </button>
                )
              })}
            </div>
          )}

          {/* Price update for selected variant */}
          {selectedVariant.price !== product.variants[0].price && (
            <p className="text-sm font-medium text-primary">
              AED {Number(selectedVariant.price).toFixed(2)}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-md border">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-none border-r"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </Button>
          <span className="w-12 text-center text-sm font-medium">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-none border-l"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>

        <Button
          onClick={handleAddToCart}
          className="flex-1 max-w-sm h-10"
          disabled={!isAvailable}
        >
          {isAvailable ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  )
}
