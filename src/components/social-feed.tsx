"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

// Fallback posts using Shopify CDN images
const fallbackPosts = [
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/BEAUTY_SKINCARE.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/MAKEUP-_-PERFUME.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/HAIR-_-NAIL-CARE.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/KITCHENWARE.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/TOYS_7aac0ad2-c1ca-42d1-a2ea-3d0d5dce589d.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/HOUSEHOLD-ESSENTIALS.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/FRAGRANCES-_-DIFFUSERS.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/PET-SUPPLIES.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/STORAGE.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/STATIONERY_d2daf697-7683-4cfb-b4e1-d5652591754c.jpg?v=1773312468",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/ELECTRONICS_2dab8a1c-2d5c-4fd5-bb68-6eb52820c9f2.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/FASHION-_-APPAREL.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/BEAUTY-MASKS.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/DENTAL-CARE.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/PURSES-_-BAGS.jpg?v=1773312467",
    "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/BEAUTY_SKINCARE.jpg?v=1773312467",
]

interface InstagramPost {
    id: string
    mediaUrl: string
    permalink: string
    timestamp: string
}

interface PostDisplay {
    image: string
    permalink: string
    username: string
}

function SocialCard({ post }: { post: PostDisplay }) {
    return (
        <Link
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden bg-card border shadow-sm group mb-4"
        >
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={post.image}
                    alt={`${post.username} post`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 25vw"
                />
            </div>
            <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white">M</span>
                    </div>
                    <span className="text-xs font-medium text-foreground/80">{post.username}</span>
                </div>
                <Instagram className="h-4 w-4 text-muted-foreground" />
            </div>
        </Link>
    )
}

function MarqueeColumn({
    posts,
    direction = "up",
    speed = 30,
}: {
    posts: PostDisplay[]
    direction?: "up" | "down"
    speed?: number
}) {
    // Duplicate posts for seamless loop
    const allPosts = [...posts, ...posts]

    return (
        <div className="relative h-full overflow-hidden">
            <div
                className={`flex flex-col ${direction === "up" ? "animate-marquee-up" : "animate-marquee-down"}`}
                style={{
                    animationDuration: `${speed}s`,
                }}
            >
                {allPosts.map((post, i) => (
                    <SocialCard key={`${post.permalink}-${i}`} post={post} />
                ))}
            </div>
        </div>
    )
}

export function SocialFeed() {
    const [posts, setPosts] = React.useState<PostDisplay[]>([])
    const [isLoaded, setIsLoaded] = React.useState(false)

    React.useEffect(() => {
        async function fetchInstagramPosts() {
            try {
                const res = await fetch("/api/instagram")
                if (!res.ok) throw new Error("Failed to fetch")

                const data = await res.json()

                if (data.posts && data.posts.length > 0) {
                    const igPosts: PostDisplay[] = data.posts.map(
                        (p: InstagramPost) => ({
                            image: p.mediaUrl,
                            permalink: p.permalink,
                            username: "@mumuso_me",
                        })
                    )
                    setPosts(igPosts)
                } else {
                    // Use fallback
                    setPosts(
                        fallbackPosts.map((img) => ({
                            image: img,
                            permalink: "https://www.instagram.com/mumuso_me/",
                            username: "@mumuso_me",
                        }))
                    )
                }
            } catch (error) {
                console.error("Error fetching Instagram posts:", error)
                // Use fallback on error
                setPosts(
                    fallbackPosts.map((img) => ({
                        image: img,
                        permalink: "https://www.instagram.com/mumuso_me/",
                        username: "@mumuso_me",
                    }))
                )
            } finally {
                setIsLoaded(true)
            }
        }

        fetchInstagramPosts()
    }, [])

    // Show fallback while loading
    const displayPosts =
        posts.length > 0
            ? posts
            : fallbackPosts.map((img) => ({
                  image: img,
                  permalink: "https://www.instagram.com/mumuso_me/",
                  username: "@mumuso_me",
              }))

    // Distribute posts across 4 columns
    const col1 = displayPosts.filter((_, i) => i % 4 === 0)
    const col2 = displayPosts.filter((_, i) => i % 4 === 1)
    const col3 = displayPosts.filter((_, i) => i % 4 === 2)
    const col4 = displayPosts.filter((_, i) => i % 4 === 3)

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex items-end justify-between mb-10">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">Follow Us!</h2>
                        <p className="text-sm text-muted-foreground">
                            Join our community and stay inspired.
                        </p>
                    </div>
                    <Link
                        href="https://www.instagram.com/mumuso_me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors flex items-center gap-1.5"
                    >
                        <Instagram className="h-4 w-4" />
                        @mumuso_me
                    </Link>
                </div>

                {/* Marquee grid */}
                <div className="relative h-[600px] md:h-[700px] overflow-hidden rounded-2xl">
                    {/* Top gradient fade — theme-aware */}
                    <div
                        className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none"
                        style={{
                            background: "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
                        }}
                    />
                    {/* Bottom gradient fade — theme-aware */}
                    <div
                        className="absolute inset-x-0 bottom-0 h-32 z-10 pointer-events-none"
                        style={{
                            background: "linear-gradient(to top, var(--background) 0%, transparent 100%)",
                        }}
                    />

                    {/* Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
                        <MarqueeColumn posts={col1} direction="up" speed={35} />
                        <MarqueeColumn posts={col2} direction="down" speed={28} />
                        <MarqueeColumn posts={col3} direction="up" speed={32} />
                        <MarqueeColumn posts={col4} direction="down" speed={25} />
                    </div>
                </div>
            </div>
        </section>
    )
}
