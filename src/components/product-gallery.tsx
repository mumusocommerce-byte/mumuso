"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
    images: { url: string; altText: string }[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = React.useState(
        images[0]?.url || "https://picsum.photos/seed/placeholder/600/800"
    )

    const hasImages = images.length > 0

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            {hasImages && images.length > 1 && (
                <div className="md:w-24 shrink-0 relative">
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto px-1 py-1 hide-scrollbar md:absolute md:inset-0">
                        {images.map((image, index) => (
                            <button
                                key={image.url + index}
                                onClick={() => setSelectedImage(image.url)}
                                className={cn(
                                    "relative h-20 w-20 md:w-full md:h-24 shrink-0 rounded-md overflow-hidden bg-muted transition-all",
                                    selectedImage === image.url
                                        ? "ring-2 ring-primary ring-offset-2"
                                        : "opacity-70 hover:opacity-100"
                                )}
                            >
                                <Image
                                    src={image.url}
                                    alt={image.altText || `Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="100px"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Image */}
            <div className="relative aspect-square flex-1 bg-muted rounded-xl overflow-hidden shadow-sm">
                <Image
                    src={selectedImage}
                    alt="Product view"
                    fill
                    className="object-cover object-center transition-opacity"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>
    )
}
