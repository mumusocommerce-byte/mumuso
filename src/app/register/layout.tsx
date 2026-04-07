import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Create Account",
    description: "Create your Mumuso account to track orders, save your favourites, and enjoy exclusive offers across the UAE.",
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
