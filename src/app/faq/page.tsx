"use client"

import * as React from "react"
import Link from "next/link"
import {
    Search,
    Package,
    Truck,
    RotateCcw,
    CreditCard,
    ShieldCheck,
    HelpCircle,
    Store,
    ChevronRight,
    MessageCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface FAQItem {
    question: string
    answer: string
}

interface FAQCategory {
    id: string
    icon: React.ElementType
    title: string
    description: string
    items: FAQItem[]
}

const faqCategories: FAQCategory[] = [
    {
        id: "orders",
        icon: Package,
        title: "Orders & Products",
        description: "Everything about placing orders and our products",
        items: [
            {
                question: "How do I place an order on the Mumuso website?",
                answer: "Simply browse our catalog, select the items you'd like, choose your preferred variant and quantity, then click 'Add to Cart'. When you're ready, proceed to checkout where you can enter your delivery details and complete payment. You'll receive an order confirmation via email once your order is successfully placed.",
            },
            {
                question: "Can I modify or cancel my order after placing it?",
                answer: "We process orders quickly to ensure fast delivery. If you need to modify or cancel your order, please contact our customer service team at customer.service@mumuso.ae as soon as possible. We'll do our best to accommodate your request if the order hasn't been shipped yet.",
            },
            {
                question: "Are all products on the website available in stores?",
                answer: "Most products listed on our website are also available across our 80+ stores in the UAE. However, product availability may vary by location due to stock levels. We recommend calling your nearest store to confirm availability before visiting, or you can use our 'Click & Collect' option for guaranteed pickup.",
            },
            {
                question: "How do I check the availability of a product?",
                answer: "Product availability is shown on each product page. If an item is out of stock, it will be marked as 'Out of Stock'. For in-store availability, please contact your nearest Mumuso store directly or use the store locator on our Contact page.",
            },
            {
                question: "Do you offer gift wrapping?",
                answer: "Yes! We offer gift wrapping services at select Mumuso stores. Please inquire at the store nearest to you. For online orders, gift wrapping options may be available during checkout when the service is active.",
            },
        ],
    },
    {
        id: "shipping",
        icon: Truck,
        title: "Shipping & Delivery",
        description: "Delivery timelines, charges, and tracking",
        items: [
            {
                question: "What are the delivery charges?",
                answer: "We offer free delivery on orders above AED 100 within the UAE. For orders below AED 100, a flat delivery fee of AED 15 applies. Delivery charges are calculated and displayed at checkout before you complete your payment.",
            },
            {
                question: "How long does delivery take?",
                answer: "Standard home delivery takes 2–5 business days within the UAE. Orders placed before 2:00 PM on business days are typically processed on the same day. Delivery to remote areas may take an additional 1–2 business days.",
            },
            {
                question: "Do you deliver across all Emirates?",
                answer: "Yes! We deliver to all seven Emirates across the UAE including Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah. Some remote areas may have slightly longer delivery windows.",
            },
            {
                question: "How can I track my order?",
                answer: "Once your order is dispatched, you will receive an email and/or SMS with a tracking link. You can use this link to monitor the real-time status of your delivery. If you haven't received tracking information within 48 hours of ordering, please contact our customer service team.",
            },
            {
                question: "What is Click & Collect and how does it work?",
                answer: "Click & Collect allows you to order online and pick up from your preferred Mumuso store. Simply select 'Click & Collect' during checkout and choose your pickup location. Your order will be ready within 24 hours, and you'll receive a notification when it's available for collection. Please bring your order confirmation and a valid ID for pickup.",
            },
        ],
    },
    {
        id: "returns",
        icon: RotateCcw,
        title: "Returns & Exchanges",
        description: "Our return policy and exchange process",
        items: [
            {
                question: "What is your return policy?",
                answer: "We accept returns within 7 days of purchase for most items, provided they are unused, in their original packaging, and accompanied by the original receipt or order confirmation. Some items such as cosmetics, personal care products, and undergarments are non-returnable for hygiene reasons.",
            },
            {
                question: "How do I initiate a return or exchange?",
                answer: "For online orders, please email customer.service@mumuso.ae with your order number and reason for return. For in-store purchases, simply visit any Mumuso store with your receipt and the item in its original condition. Our team will guide you through the process.",
            },
            {
                question: "How long does it take to process a refund?",
                answer: "Once we receive and inspect your returned item, refunds are processed within 5–7 business days. The refund will be credited to your original payment method. For card payments, please allow an additional 3–5 business days for the bank to reflect the refund.",
            },
            {
                question: "Can I exchange an item for a different product?",
                answer: "Yes! You can exchange items at any Mumuso store within 7 days of purchase. If you'd like to exchange for a higher-priced item, you'll pay the difference. If the exchange item is lower-priced, we'll issue a store credit for the balance.",
            },
            {
                question: "What if I receive a damaged or defective product?",
                answer: "We're sorry if that happens! Please contact us immediately at customer.service@mumuso.ae with photos of the damaged item and your order number. We'll arrange a free replacement or full refund as quickly as possible.",
            },
        ],
    },
    {
        id: "payment",
        icon: CreditCard,
        title: "Payment & Pricing",
        description: "Payment methods, pricing, and installments",
        items: [
            {
                question: "What payment methods do you accept?",
                answer: "We accept Visa, MasterCard, Apple Pay, and Cash on Delivery (COD) for online orders. We also offer Buy Now, Pay Later through Tabby, allowing you to split your purchase into 4 interest-free payments. In-store, we additionally accept Samsung Pay and cash.",
            },
            {
                question: "Are the prices on the website the same as in stores?",
                answer: "Yes, our prices are consistent across all channels — online and in-store. All prices displayed on our website are in AED and inclusive of VAT. Occasional online-exclusive promotions may offer additional discounts.",
            },
            {
                question: "How do installment payments with Tabby work?",
                answer: "Tabby allows you to split your purchase into 4 interest-free payments. Select Tabby as your payment method at checkout, and you'll pay 25% upfront. The remaining 75% is charged automatically in three equal monthly installments — completely interest-free with no hidden fees.",
            },
            {
                question: "Is Cash on Delivery (COD) available?",
                answer: "Yes, Cash on Delivery is available for orders within the UAE. You can pay in cash when your order is delivered to your doorstep. Please note that a COD fee may apply and will be displayed at checkout.",
            },
            {
                question: "Do you offer discounts or promotions?",
                answer: "We regularly run promotions and seasonal sales. Sign up for our newsletter to receive exclusive discount codes and early access to sales. Follow us on Instagram (@mumuso_me) and Facebook for the latest deals and new product launches.",
            },
        ],
    },
    {
        id: "account",
        icon: ShieldCheck,
        title: "Account & Privacy",
        description: "Managing your account and data security",
        items: [
            {
                question: "Do I need an account to shop on Mumuso?",
                answer: "No, you can shop as a guest without creating an account. However, creating an account allows you to track orders, save your delivery addresses, build a wishlist, and enjoy a faster checkout experience on future purchases.",
            },
            {
                question: "How do I create an account?",
                answer: "Click the user icon in the top right corner of the website and select 'Register'. Fill in your name, email, and password. Once registered, you'll have access to your personal dashboard where you can manage orders, addresses, and preferences.",
            },
            {
                question: "Is my personal information secure?",
                answer: "Absolutely. We take your privacy very seriously. All transactions are encrypted using industry-standard SSL technology. We never share your personal information with third parties for marketing purposes. You can read our full Privacy Policy for more details.",
            },
            {
                question: "How do I reset my password?",
                answer: "Click the user icon, go to the login page, and select 'Forgot Password'. Enter your registered email address and we'll send you a password reset link. If you don't receive the email within a few minutes, please check your spam folder or contact our support team.",
            },
        ],
    },
    {
        id: "stores",
        icon: Store,
        title: "Store Information",
        description: "Finding stores and in-store services",
        items: [
            {
                question: "How many Mumuso stores are there in the UAE?",
                answer: "We currently operate over 80 stores across all seven Emirates in the UAE, including locations in major malls and shopping destinations. We're continuously expanding to bring Mumuso closer to you.",
            },
            {
                question: "What are the store operating hours?",
                answer: "Most Mumuso stores operate from 10:00 AM to 10:00 PM, seven days a week. Store hours may vary during Ramadan, national holidays, and special occasions. We recommend checking with your nearest store for the most accurate timings.",
            },
            {
                question: "How can I find the nearest Mumuso store?",
                answer: "Visit our Contact & Stores page where you can browse all store locations filtered by emirate. Each listing includes the mall name, phone number, and a link to Google Maps for easy navigation.",
            },
            {
                question: "Do all stores carry the same products?",
                answer: "While we strive to maintain a consistent product range across all stores, availability may vary based on store size and location. Our larger flagship stores typically carry the most complete product range. For specific product availability, please call your preferred store before visiting.",
            },
        ],
    },
]

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [activeCategory, setActiveCategory] = React.useState("all")

    const filteredCategories = React.useMemo(() => {
        if (!searchQuery.trim() && activeCategory === "all") return faqCategories

        const q = searchQuery.toLowerCase().trim()

        return faqCategories
            .filter((category) => {
                if (activeCategory !== "all" && category.id !== activeCategory) return false
                return true
            })
            .map((category) => ({
                ...category,
                items: q
                    ? category.items.filter(
                        (item) =>
                            item.question.toLowerCase().includes(q) ||
                            item.answer.toLowerCase().includes(q)
                    )
                    : category.items,
            }))
            .filter((category) => category.items.length > 0)
    }, [searchQuery, activeCategory])

    const totalResults = filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0)

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-primary/5 border-b overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.08),transparent_70%)]" />
                <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Link href="/" className="hover:text-foreground transition-colors">
                                Home
                            </Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="text-foreground font-medium">FAQ</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            How can we help?
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Find answers to common questions about our products, orders, shipping, returns, and more.
                        </p>

                        {/* Search Bar */}
                        <div className="relative pt-4 max-w-xl">
                            <Search className="absolute left-4 top-1/2 mt-2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search for answers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 text-base rounded-xl bg-background border-border shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                            />
                            {searchQuery && (
                                <p className="text-sm text-muted-foreground mt-3">
                                    Found <span className="font-semibold text-foreground">{totalResults}</span> result{totalResults !== 1 ? "s" : ""} for "{searchQuery}"
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <section className="border-b sticky top-16 bg-background/95 backdrop-blur-md z-20">
                <div className="container mx-auto px-6 md:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto py-3 hide-scrollbar">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                                activeCategory === "all"
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "bg-muted/60 hover:bg-muted text-foreground"
                            )}
                        >
                            <HelpCircle className="h-3.5 w-3.5" />
                            All Topics
                        </button>
                        {faqCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                                    activeCategory === category.id
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "bg-muted/60 hover:bg-muted text-foreground"
                                )}
                            >
                                <category.icon className="h-3.5 w-3.5" />
                                {category.title}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="container mx-auto px-6 md:px-8 py-12 md:py-16">
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed max-w-2xl mx-auto">
                        <Search className="h-10 w-10 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No results found</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            We couldn't find any questions matching "{searchQuery}".
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery("")
                                setActiveCategory("all")
                            }}
                        >
                            Clear Search
                        </Button>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-12">
                        {filteredCategories.map((category) => (
                            <div key={category.id} id={category.id}>
                                {/* Category Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
                                        <category.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold tracking-tight">
                                            {category.title}
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            {category.description}
                                        </p>
                                    </div>
                                    <Badge variant="secondary" className="ml-auto shrink-0">
                                        {category.items.length} question{category.items.length !== 1 ? "s" : ""}
                                    </Badge>
                                </div>

                                {/* Questions */}
                                <Accordion className="space-y-3">
                                    {category.items.map((item, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={`${category.id}-${index}`}
                                            className="border rounded-xl px-6 data-[state=open]:shadow-sm data-[state=open]:border-primary/20 transition-all duration-200"
                                        >
                                            <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline py-5 [&[data-state=open]]:text-primary">
                                                {item.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                                                {item.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>

                                {category.id !== filteredCategories[filteredCategories.length - 1].id && (
                                    <Separator className="mt-12" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Still Need Help CTA */}
            <section className="border-t bg-accent/20">
                <div className="container mx-auto px-6 md:px-8 py-16 md:py-20">
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <div className="flex items-center justify-center">
                            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <MessageCircle className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                            Still have questions?
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Can't find the answer you're looking for? Our friendly customer support
                            team is always ready to help you out.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                            <Link href="/contact">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Contact Us
                                </Button>
                            </Link>
                            <a href="mailto:customer.service@mumuso.ae">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    Email Support
                                </Button>
                            </a>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            We typically respond within 24 hours · Mon–Sat, 10am–10pm
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
