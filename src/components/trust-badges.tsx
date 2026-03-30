import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react"

export function TrustBadges() {
    const badges = [
        {
            icon: Truck,
            title: "Free Shipping",
            description: "On orders over AED 150"
        },
        {
            icon: ShieldCheck,
            title: "Secure Payment",
            description: "100% secure checkout"
        },
        {
            icon: RefreshCw,
            title: "Easy Returns",
            description: "14-day return policy"
        },
        {
            icon: Headphones,
            title: "24/7 Support",
            description: "Dedicated team at your service"
        }
    ]

    return (
        <section className="py-12 border-y bg-muted/30">
            <div className="container mx-auto px-6 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {badges.map((badge, idx) => {
                        const Icon = badge.icon
                        return (
                            <div key={idx} className="flex flex-col items-center justify-center text-center space-y-3">
                                <div className="p-3 bg-background border shadow-sm rounded-full text-foreground/80">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">{badge.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
