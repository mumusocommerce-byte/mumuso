import { Metadata } from "next"

export const metadata: Metadata = {
    title: "FAQ",
    description: "Find answers to common questions about Mumuso products, orders, shipping, returns, payments, and store information across the UAE.",
    openGraph: {
        title: "FAQ | Mumuso",
        description: "Find answers to common questions about Mumuso products, orders, shipping, returns, payments, and store information across the UAE.",
        type: "website",
    },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
