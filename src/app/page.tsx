import { getProducts } from "@/lib/shopify-queries"
import HomeClient from "./home-client"

export default async function Home() {
  // Fetch up to 40 products from the live Shopify Store
  const products = await getProducts({ limit: 40 })

  return <HomeClient products={products} />
}
