"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Slide {
    image: string
    title: string
    subtitle: string
    cta?: {
        label: string
        href: string
    }
}

const slides: Slide[] = [
    {
        image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/SUMMER_COLLECTION_158e6806-4c86-4195-bddd-e284eb1296de.jpg?v=1775137603",
        title: "Summer Collection 2026",
        subtitle: "Fresh arrivals to brighten your everyday life with style and comfort.",
        cta: { label: "Shop Now", href: "/catalog/new-mumuso-lifestyle" },
    },
    {
        image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/BEAUTY_ESSENTIALS.jpg?v=1775137602",
        title: "Beauty Essentials",
        subtitle: "Discover skincare and beauty products crafted for your daily routine.",
        cta: { label: "Explore", href: "/catalog" },
    },
    {
        image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/HOME-_-LIVING2.jpg?v=1775137602",
        title: "Home & Living",
        subtitle: "Transform your space with our curated home accessories collection.",
        cta: { label: "View Collection", href: "/catalog" },
    },
]

export function HeroSlideshow() {
    const [current, setCurrent] = React.useState(0)
    const [isTransitioning, setIsTransitioning] = React.useState(false)
    const timerRef = React.useRef<NodeJS.Timeout | null>(null)

    const totalSlides = slides.length

    const resetTimer = React.useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setIsTransitioning(true)
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % totalSlides)
                setIsTransitioning(false)
            }, 500)
        }, 5000)
    }, [totalSlides])

    React.useEffect(() => {
        resetTimer()
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [resetTimer])

    const goTo = (index: number) => {
        if (index === current) return
        setIsTransitioning(true)
        setTimeout(() => {
            setCurrent(index)
            setIsTransitioning(false)
        }, 500)
        resetTimer()
    }

    const goNext = () => goTo((current + 1) % totalSlides)
    const goPrev = () => goTo((current - 1 + totalSlides) % totalSlides)

    const slide = slides[current]

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-6 md:px-8">
                <div className="relative h-[340px] sm:h-[400px] md:h-[460px] lg:h-[520px] rounded-2xl overflow-hidden">
                    {/* Background Image */}
                    <div
                        className={cn(
                            "absolute inset-0 transition-opacity duration-500",
                            isTransitioning ? "opacity-0" : "opacity-100"
                        )}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover object-center"
                            sizes="100vw"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center">
                        <div className="container mx-auto px-6 md:px-8">
                            <div
                                className={cn(
                                    "max-w-lg space-y-4 transition-all duration-500",
                                    isTransitioning
                                        ? "opacity-0 translate-y-4"
                                        : "opacity-100 translate-y-0"
                                )}
                            >
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                                    {slide.title}
                                </h2>
                                <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-md">
                                    {slide.subtitle}
                                </p>
                                {slide.cta && (
                                    <Link
                                        href={slide.cta.href}
                                        className={buttonVariants({
                                            size: "lg",
                                            className:
                                                "text-sm font-medium mt-2",
                                        })}
                                    >
                                        {slide.cta.label}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={goNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Dot Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    i === current
                                        ? "w-8 bg-white"
                                        : "w-2 bg-white/40 hover:bg-white/60"
                                )}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
