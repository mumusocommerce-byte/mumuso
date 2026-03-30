"use client"

import * as React from "react"

interface TabbyPromoProps {
    price: number
    currency?: string
    lang?: string
    publicKey?: string
    merchantCode?: string
}

declare global {
    interface Window {
        TabbyPromo: any
    }
}

export function TabbyPromo({
    price,
    currency = "AED",
    lang = "en",
    publicKey = "pk_f8c30a5a-0b5e-4e8a-9a22-06a98d19a7b6",
    merchantCode = "default",
}: TabbyPromoProps) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const promoId = React.useId().replace(/:/g, "-")
    const selectorId = `tabby-promo-${promoId}`

    React.useEffect(() => {
        if (!containerRef.current) return

        // Check if the script is already loaded
        const existingScript = document.querySelector('script[src="https://checkout.tabby.ai/tabby-promo.js"]')

        const initPromo = () => {
            if (typeof window.TabbyPromo === "undefined") return

            try {
                new window.TabbyPromo({
                    selector: `#${selectorId}`,
                    currency,
                    price,
                    lang,
                    publicKey,
                    merchantCode,
                })
            } catch (err) {
                console.error("Tabby promo init error:", err)
            }
        }

        if (existingScript && typeof window.TabbyPromo !== "undefined") {
            initPromo()
        } else if (!existingScript) {
            const script = document.createElement("script")
            script.src = "https://checkout.tabby.ai/tabby-promo.js"
            script.async = true
            script.onload = initPromo
            document.body.appendChild(script)
        } else {
            // Script exists but not loaded yet, wait for it
            const checkInterval = setInterval(() => {
                if (typeof window.TabbyPromo !== "undefined") {
                    clearInterval(checkInterval)
                    initPromo()
                }
            }, 100)

            return () => clearInterval(checkInterval)
        }
    }, [price, currency, lang, publicKey, merchantCode, selectorId])

    return (
        <>
            <div
                id={selectorId}
                ref={containerRef}
                className="mt-4"
            />
            <style jsx global>{`
                #${selectorId} div:empty,
                #TabbyDialogContainer div:empty {
                    display: block;
                }
            `}</style>
        </>
    )
}
