import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Mumuso",
    template: "%s | Mumuso",
  },
  description: "Your premium destination for curated lifestyle products.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getCollections } from "@/lib/shopify-queries";
import { getSession } from "@/app/actions/auth";
import { CartProvider } from "@/components/cart-provider";
import { WishlistProvider } from "@/components/wishlist-provider";
import { Toaster } from "@/components/ui/sonner";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch dynamic categories
  const categories = await getCollections({ limit: 10 });
  const session = await getSession();
  const isLoggedIn = !!session;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <WishlistProvider>
              <Navbar categories={categories} isLoggedIn={isLoggedIn} />
              <main className="flex-grow">{children}</main>
              <Footer />
              <Toaster position="bottom-center" />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
