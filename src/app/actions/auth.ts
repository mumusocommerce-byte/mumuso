"use server"

import { storefrontFetch } from "@/lib/storefront";
import { cookies } from "next/headers";

const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_QUERY = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      defaultAddress {
        address1
        address2
        city
        province
        country
        zip
      }
    }
  }
`;

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        const { body } = await storefrontFetch<any>({
            query: CUSTOMER_ACCESS_TOKEN_CREATE,
            variables: {
                input: { email, password },
            },
        });

        const data = body.data?.customerAccessTokenCreate;

        if (data?.customerUserErrors?.length > 0) {
            return { error: data.customerUserErrors[0].message };
        }

        if (data?.customerAccessToken?.accessToken) {
            const cookieStore = await cookies()
            cookieStore.set({
                name: 'shopify_customer_token',
                value: data.customerAccessToken.accessToken,
                httpOnly: true,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 30 * 24 * 60 * 60 // 30 days
            })

            return { success: true };
        }

        return { error: "Failed to generate token" };
    } catch (error: any) {
        return { error: error.message || "An error occurred during login" };
    }
}

export async function register(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password || !firstName || !lastName) {
        return { error: "All fields are required" };
    }

    try {
        const { body } = await storefrontFetch<any>({
            query: CUSTOMER_CREATE,
            variables: {
                input: { firstName, lastName, email, password },
            },
        });

        const data = body.data?.customerCreate;

        if (data?.customerUserErrors?.length > 0) {
            return { error: data.customerUserErrors[0].message };
        }

        // After success registration, automatically log them in
        return await login(formData);
    } catch (error: any) {
        return { error: error.message || "An error occurred during registration" };
    }
}

export async function getSession() {
    const cookieStore = await cookies()
    const token = cookieStore.get('shopify_customer_token')?.value;

    if (!token) return null;

    try {
        const { body } = await storefrontFetch<any>({
            query: CUSTOMER_QUERY,
            variables: { customerAccessToken: token },
        });

        if (body.data?.customer) {
            return body.data.customer;
        }

        // token is invalid
        return null;
    } catch (error) {
        return null;
    }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('shopify_customer_token')
}
