"use client"

import * as React from "react"
import { Star, UserCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"

interface Review {
    id: string
    author: string
    rating: number
    content: string
    date: Date
}

interface ProductReviewsProps {
    productId: string
    productTitle: string
}

export function ProductReviews({ productId, productTitle }: ProductReviewsProps) {
    const [reviews, setReviews] = React.useState<Review[]>([])
    const [avgRating, setAvgRating] = React.useState("0.0")
    const [isLoading, setIsLoading] = React.useState(true)

    const [isWriting, setIsWriting] = React.useState(false)
    const [newReview, setNewReview] = React.useState({ author: "", email: "", rating: 5, content: "" })
    const [hoveredStar, setHoveredStar] = React.useState(0)

    React.useEffect(() => {
        setIsLoading(true)
        fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`)
            .then(res => res.json())
            .then(data => {
                if (data.reviews) {
                    setReviews(data.reviews.map((r: any) => ({ ...r, date: new Date(r.date) })))
                    setAvgRating(data.averageRating || "0.0")
                }
            })
            .catch(err => console.error("Error fetching reviews:", err))
            .finally(() => setIsLoading(false))
    }, [productId])

    const averageRating = avgRating || "0.0"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!newReview.author.trim() || !newReview.content.trim()) {
            toast.error("Please fill out all fields.")
            return
        }

        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId,
                    author: newReview.author,
                    email: newReview.email || "customer@example.com",
                    rating: newReview.rating,
                    content: newReview.content,
                    title: "Amazing Product"
                })
            })

            if (!res.ok) throw new Error("Failed to post review")

            // Optimistically add to DOM
            const review: Review = {
                id: Math.random().toString(36).substr(2, 9),
                author: newReview.author,
                rating: newReview.rating,
                content: newReview.content,
                date: new Date()
            }

            setReviews([review, ...reviews])
            setIsWriting(false)
            setNewReview({ author: "", email: "", rating: 5, content: "" })
            toast.success("Thank you! Your review has been submitted to Judge.me.")

        } catch (error) {
            toast.error("There was a problem submitting your review. Try again later.")
            console.error(error)
        }
    }

    return (
        <section className="mt-16 border-t pt-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Customer Reviews</h2>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center text-yellow-500">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-5 w-5 ${star <= Number(averageRating) ? "fill-current" : "text-muted"}`}
                                />
                            ))}
                        </div>
                        <span className="text-lg font-semibold">{averageRating} out of 5</span>
                        <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
                    </div>
                </div>
                {!isWriting && (
                    <Button onClick={() => setIsWriting(true)} size="lg" className="shrink-0">
                        Write a Review
                    </Button>
                )}
            </div>

            {isWriting && (
                <div className="bg-muted/30 p-6 md:p-8 rounded-xl mb-12 border">
                    <h3 className="text-lg font-semibold mb-6">Write a review for {productTitle}</h3>
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                        <div className="space-y-2">
                            <Label>Overall Rating</Label>
                            <div className="flex items-center gap-1 text-yellow-500">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        onMouseEnter={() => setHoveredStar(star)}
                                        onMouseLeave={() => setHoveredStar(0)}
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`h-8 w-8 ${star <= (hoveredStar || newReview.rating)
                                                ? "fill-current"
                                                : "text-muted-foreground/30 stroke-1"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="author">Your Name</Label>
                            <Input
                                id="author"
                                placeholder="Enter your full name"
                                value={newReview.author}
                                onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Your Review</Label>
                            <Textarea
                                id="content"
                                placeholder="What did you like or dislike? What is it used for?"
                                className="min-h-[120px]"
                                value={newReview.content}
                                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex gap-4 pt-2">
                            <Button type="submit">Submit Review</Button>
                            <Button type="button" variant="outline" onClick={() => setIsWriting(false)}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-8">
                {isLoading ? (
                    <div className="text-center py-12 text-muted-foreground animate-pulse">Loading reviews...</div>
                ) : reviews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                        No reviews yet. Be the first to share your thoughts!
                    </p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2">
                        {reviews.map((review) => (
                            <div key={review.id} className="p-6 rounded-xl border bg-card">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <UserCircle2 className="h-10 w-10 text-muted-foreground/30" />
                                        <div>
                                            <p className="font-semibold text-sm">{review.author}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(review.date, { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-yellow-500">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${star <= review.rating ? "fill-current" : "text-muted-foreground/20"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-foreground/90 leading-relaxed">
                                    "{review.content}"
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
