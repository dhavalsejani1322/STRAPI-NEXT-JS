"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogList({ blogs }: { blogs: any }) {
    const slugify = (str: string) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-10 text-center">Our Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs?.data.map((blog: any, index: number) => {
                    const { id, Title, publishedAt, Banner, slug } = blog;
                    const slugs = slugify(slug ?? '');
                    const imageUrl = Banner?.url
                        ? `http://localhost:1337${Banner.url}`
                        : "/placeholder.jpg";

                    return (
                        <motion.div
                            key={id}
                            className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-500/30 shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/blog/${slugs}`} className="flex flex-col h-full">
                                <div className="relative aspect-[4/2] bg-gray-100 w-full">
                                    <Image
                                        src={imageUrl}
                                        alt={Title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                <div className="flex flex-col flex-grow p-4">
                                    <div className="mb-4">
                                        {blog?.categories?.[0]?.Title && (
                                            <p className="border-2 border-[#2AB82F] w-fit px-3 py-1 rounded-full text-sm text-[#007BCF] font-sans font-semibold">
                                                {blog?.categories?.[0]?.Title}
                                            </p>
                                        )}
                                        <p className="text-xl font-sans font-semibold mt-2">{Title}</p>
                                    </div>

                                    <p className="text-xs text-gray-500 font-sans mt-auto">
                                        {new Date(publishedAt).toLocaleDateString('en-GB')}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
