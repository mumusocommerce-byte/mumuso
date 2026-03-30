"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Mail } from "lucide-react"

export function NewsletterBanner() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast.success("Welcome to the club! Check your email for a special offer.")
            setEmail("")
        }, 1000)
    }

    return (
        <section className="py-20 md:py-28 bg-foreground text-background">
            <div className="container mx-auto px-6 md:px-8">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center justify-center p-3 bg-background/10 rounded-full mb-2">
                        <Mail className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Join The Inner Circle
                    </h2>
                    <p className="text-background/80 text-lg">
                        Subscribe to receive exclusive access to new drops, special promotions, and lifestyle inspiration straight to your inbox.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder="Your email address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-background/10 border-background/20 text-background placeholder:text-background/50 h-11 focus-visible:ring-background/30"
                        />
                        <Button
                            type="submit"
                            variant="secondary"
                            className="h-11 px-8 whitespace-nowrap"
                            disabled={isLoading}
                        >
                            {isLoading ? "Subscribing..." : "Subscribe"}
                        </Button>
                    </form>
                    <p className="text-xs text-background/50 pt-4">
                        By subscribing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </section>
    )
}
