import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact & Stores",
    description: "Find your nearest Mumuso store across 100+ locations in the UAE. Browse by emirate, get directions, and contact us for any inquiries.",
    openGraph: {
        title: "Contact & Stores | Mumuso",
        description: "Find your nearest Mumuso store across 100+ locations in the UAE. Browse by emirate, get directions, and contact us for any inquiries.",
        type: "website",
    },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
