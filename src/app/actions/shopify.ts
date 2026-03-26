"use server"

import { getProductsPage, getCollectionProductsPage, searchProductsPage } from "@/lib/shopify-queries"

export async function fetchMoreCatalogProductsAction(cursor: string, limit: number = 30) {
    return await getProductsPage(limit, cursor)
}

export async function fetchMoreCollectionProductsAction(handle: string, cursor: string, limit: number = 30) {
    return await getCollectionProductsPage(handle, limit, cursor)
}

export async function fetchMoreSearchProductsAction(searchQuery: string, cursor: string, limit: number = 30) {
    return await searchProductsPage(searchQuery, limit, cursor)
}
