import { Metadata } from "next"

export const metadata: Metadata = {
    title: "My Account",
    description: "Manage your Mumuso account, view order history, and update your personal details.",
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
