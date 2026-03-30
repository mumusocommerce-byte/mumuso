import { notFound } from "next/navigation";
import { getPolicy } from "@/lib/shopify-queries";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
    const { handle } = await params;
    const policy = await getPolicy(handle);

    if (!policy) {
        return { title: "Policy Not Found" };
    }

    return {
        title: policy.title,
    };
}

export default async function ShopifyPolicyPage({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const policy = await getPolicy(handle);

    if (!policy) {
        notFound();
    }

    return (
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
                {policy.title}
            </h1>
            <div
                className="prose prose-zinc dark:prose-invert max-w-none 
                   prose-p:leading-relaxed prose-headings:font-bold
                   prose-a:text-primary prose-a:underline-offset-4"
                dangerouslySetInnerHTML={{ __html: policy.body }}
            />
        </div>
    );
}
