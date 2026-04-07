import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Wishlist",
    description: "View and manage your saved items at Mumuso. Move your favourite products to cart when you're ready to purchase.",
}

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
