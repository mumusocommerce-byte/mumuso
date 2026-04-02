import { shopifyFetch, SHOPIFY_STORE_DOMAIN, SHOPIFY_ACCESS_TOKEN } from "./shopify";

export const formatShopifyProduct = (node: any) => {
  const variant = node.variants?.edges?.[0]?.node;
  const price = variant?.price || "0.00";
  const variantId = variant?.id || node.id;
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    descriptionHtml: node.descriptionHtml,
    price: {
      amount: price,
      currencyCode: "AED",
    },
    image: node.images?.edges?.[0]?.node?.url || "https://picsum.photos/seed/placeholder/600/800",
    category: node.productType || "Lifestyle",
    tags: node.tags || [],
    variantId,
    createdAt: node.createdAt || "",
  };
};

export const getProducts = async ({ limit = 10, fetchAll = false }: { limit?: number, fetchAll?: boolean } = {}) => {
  const query = `
    query getProducts($first: Int!, $after: String) {
      products(first: $first, after: $after, query: "status:ACTIVE") {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            handle
            status
            descriptionHtml
            variants(first: 1) {
              edges {
                node {
                  id
                  price
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            productType
            tags
            createdAt
          }
        }
      }
    }
  `;

  let allProducts: any[] = [];
  let hasNextPage = true;
  let cursor = null;

  try {
    while (hasNextPage) {
      const fetchResult: any = await shopifyFetch<any>({
        query,
        variables: { first: fetchAll ? 250 : limit, after: cursor },
      });
      const responseBody = fetchResult.body;

      if (!responseBody?.data?.products) break;

      allProducts = [...allProducts, ...responseBody.data.products.edges];

      if (fetchAll && responseBody.data.products.pageInfo.hasNextPage) {
        cursor = responseBody.data.products.pageInfo.endCursor;
      } else {
        hasNextPage = false;
      }
    }

    return allProducts.map(({ node }: any) => formatShopifyProduct(node));
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};

export const getCollections = async ({ limit = 10 }: { limit?: number }) => {
  const query = `
    query getCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const { body } = await shopifyFetch<any>({
      query,
      variables: { first: limit },
    });

    if (!body?.data?.collections) return [];

    return body.data.collections.edges.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      descriptionHtml: node.descriptionHtml,
      image: node.image?.url || "https://picsum.photos/seed/placeholder/600/800",
    }));
  } catch (error) {
    console.error("Error fetching collections", error);
    return [];
  }
};

export const getCollectionProducts = async (handle: string, limit = 10, fetchAll = false) => {
  const query = `
    query getCollectionByHandle($handle: String!, $first: Int!, $after: String) {
      collectionByHandle(handle: $handle) {
        id
        title
        descriptionHtml
        products(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              handle
              status
              variants(first: 1) {
                edges {
                  node {
                    id
                    price
                  }
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              productType
              tags
              createdAt
            }
          }
        }
      }
    }
  `;

  let activeProducts: any[] = [];
  let collectionTitle = "";
  let collectionDesc = "";
  let currentCursor: string | null = null;
  let hasMore = true;

  try {
    // Paginate through the collection (newest first = default sort),
    // skipping DRAFT products until we have enough ACTIVE ones
    const needed = fetchAll ? Infinity : limit;

    while (activeProducts.length < needed && hasMore) {
      const fetchResult: any = await shopifyFetch<any>({
        query,
        variables: { handle, first: 50, after: currentCursor },
      });
      const responseBody = fetchResult.body;

      if (!responseBody?.data?.collectionByHandle) return null;

      collectionTitle = responseBody.data.collectionByHandle.title;
      collectionDesc = responseBody.data.collectionByHandle.descriptionHtml;

      const edges = responseBody.data.collectionByHandle.products.edges;
      const activeFromBatch = edges.filter(({ node }: any) => node.status === "ACTIVE");
      activeProducts.push(...activeFromBatch);

      hasMore = responseBody.data.collectionByHandle.products.pageInfo.hasNextPage;
      currentCursor = responseBody.data.collectionByHandle.products.pageInfo.endCursor;
    }

    const products = activeProducts
      .slice(0, fetchAll ? undefined : limit)
      .map(({ node }: any) => formatShopifyProduct(node));

    return {
      title: collectionTitle,
      description: collectionDesc,
      products,
    };
  } catch (error) {
    console.error(`Error fetching collection ${handle}`, error);
    return null;
  }
};

export const getProductsPage = async (limit = 30, cursor: string | null = null) => {
  const query = `
    query getProducts($first: Int!, $after: String) {
      products(first: $first, after: $after, query: "status:ACTIVE") {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id title handle status descriptionHtml productType tags createdAt
            variants(first: 1) { edges { node { id price } } }
            images(first: 1) { edges { node { url altText } } }
          }
        }
      }
    }
  `;
  try {
    const { body } = await shopifyFetch<any>({ query, variables: { first: limit, after: cursor } });
    if (!body?.data?.products) return { products: [], pageInfo: { hasNextPage: false, endCursor: null } };
    return {
      products: body.data.products.edges.map(({ node }: any) => formatShopifyProduct(node)),
      pageInfo: body.data.products.pageInfo
    };
  } catch (err) {
    return { products: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
};

export const searchProductsPage = async (searchQuery: string, limit = 30, cursor: string | null = null) => {
  const query = `
    query searchProducts($first: Int!, $after: String, $query: String!) {
      products(first: $first, after: $after, query: $query) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id title handle status descriptionHtml productType tags createdAt
            variants(first: 1) { edges { node { id price } } }
            images(first: 1) { edges { node { url altText } } }
          }
        }
      }
    }
  `;
  try {
    const shopifyQuery = `status:ACTIVE AND (title:*${searchQuery}* OR tag:*${searchQuery}* OR product_type:*${searchQuery}*)`;
    const { body } = await shopifyFetch<any>({ query, variables: { first: limit, after: cursor, query: shopifyQuery } });
    if (!body?.data?.products) return { products: [], pageInfo: { hasNextPage: false, endCursor: null } };
    return {
      products: body.data.products.edges.map(({ node }: any) => formatShopifyProduct(node)),
      pageInfo: body.data.products.pageInfo
    };
  } catch (err) {
    return { products: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
};

export const getCollectionProductsPage = async (handle: string, limit = 30, cursor: string | null = null) => {
  const query = `
    query getCollectionByHandle($handle: String!, $first: Int!, $after: String) {
      collectionByHandle(handle: $handle) {
        title
        descriptionHtml
        products(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id title handle status descriptionHtml productType tags createdAt
              variants(first: 1) { edges { node { id price } } }
              images(first: 1) { edges { node { url altText } } }
            }
          }
        }
      }
    }
  `;
  try {
    let activeProducts: any[] = [];
    let currentCursor = cursor;
    let hasMore = true;
    let title = "";
    let description = "";

    // Paginate through the collection (newest first = default sort),
    // skipping DRAFT products until we have enough ACTIVE ones
    while (activeProducts.length < limit && hasMore) {
      const { body } = await shopifyFetch<any>({
        query,
        variables: { handle, first: 50, after: currentCursor }
      });

      if (!body?.data?.collectionByHandle?.products) {
        if (activeProducts.length === 0) {
          return { products: [], pageInfo: { hasNextPage: false, endCursor: null } };
        }
        break;
      }

      title = body.data.collectionByHandle.title;
      description = body.data.collectionByHandle.descriptionHtml;

      const edges = body.data.collectionByHandle.products.edges;
      const activeFromBatch = edges.filter(({ node }: any) => node.status === 'ACTIVE');
      activeProducts.push(...activeFromBatch);

      hasMore = body.data.collectionByHandle.products.pageInfo.hasNextPage;
      currentCursor = body.data.collectionByHandle.products.pageInfo.endCursor;
    }

    const products = activeProducts
      .slice(0, limit)
      .map(({ node }: any) => formatShopifyProduct(node));

    return {
      title,
      description,
      products,
      pageInfo: {
        hasNextPage: activeProducts.length > limit || hasMore,
        endCursor: currentCursor
      }
    };
  } catch (err) {
    return { title: "", description: "", products: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
};

export const getProductByHandle = async (handle: string) => {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        status
        descriptionHtml
        variants(first: 100) {
          edges {
            node {
              id
              title
              price
              availableForSale
              image {
                url
                altText
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        productType
        tags
      }
    }
  `;

  try {
    const { body } = await shopifyFetch<any>({
      query,
      variables: { handle },
    });

    if (!body?.data?.productByHandle) return null;

    const p = body.data.productByHandle;

    // Do not return draft or archived products
    if (p.status !== "ACTIVE") return null;

    return {
      id: p.id,
      title: p.title,
      handle: p.handle,
      descriptionHtml: p.descriptionHtml,
      variants: p.variants.edges.map(({ node }: any) => ({
        id: node.id,
        title: node.title,
        price: node.price,
        availableForSale: node.availableForSale,
        image: node.image ? { url: node.image.url, altText: node.image.altText } : null,
        selectedOptions: node.selectedOptions || [],
      })),
      images: p.images.edges.map(({ node }: any) => ({
        url: node.url,
        altText: node.altText,
      })),
      category: p.productType || "Lifestyle",
      tags: p.tags || [],
    };
  } catch (error) {
    console.error(`Error fetching product ${handle}`, error);
    return null;
  }
};

export const getPage = async (handle: string) => {
  const query = `
    query getPageByHandle($handle: String!) {
      pageByHandle(handle: $handle) {
        id
        title
        body
      }
    }
  `;
  try {
    const { body } = await shopifyFetch<any>({ query, variables: { handle } });
    if (!body?.data?.pageByHandle) return null;
    return body.data.pageByHandle;
  } catch (error) {
    console.error(`Error fetching page ${handle}`, error);
    return null;
  }
};

export const getPolicy = async (handle: string) => {
  try {
    const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/policies.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    if (!data.policies) return null;
    const policy = data.policies.find((p: any) => p.handle === handle);
    if (!policy) return null;
    return {
      title: policy.title,
      body: policy.body,
    };
  } catch (error) {
    console.error(`Error fetching policy ${handle}`, error);
    return null;
  }
};
