import Image from "next/image"
import Link from "next/link"

export interface Collection {
    id: string
    title: string
    handle: string
    image: string
    descriptionHtml?: string
}

interface CollectionCardProps {
    collection: Collection
}

export function CollectionCard({ collection }: CollectionCardProps) {
    return (
        <Link
            href={`/catalog/${collection.handle}`}
            className="group flex flex-col h-full rounded-2xl overflow-hidden aspect-[4/3] relative bg-muted"
        >
            <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
                    {collection.title}
                </h3>
            </div>
        </Link>
    )
}
