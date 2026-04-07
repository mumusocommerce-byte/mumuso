import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your Mumuso account to track orders, manage your wishlist, and enjoy a faster checkout experience.",
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
