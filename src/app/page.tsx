import { getCollectionProducts } from "@/lib/shopify-queries"
import HomeClient from "./home-client"

export const revalidate = 300 // Cache the homepage for 5 minutes

export default async function Home() {
  // Fetch Best Sellers and New Arrivals IN PARALLEL for faster loading
  const [bestSellersData, newArrivalsData] = await Promise.all([
    getCollectionProducts("best-selling-items", 10),
    getCollectionProducts("new-mumuso-lifestyle", 10),
  ])

  const bestSellers = bestSellersData?.products || []
  const newArrivals = newArrivalsData?.products || bestSellers

  return <HomeClient bestSellers={bestSellers} newArrivals={newArrivals} />
}
