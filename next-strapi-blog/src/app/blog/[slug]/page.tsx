/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSingleblog } from '@/api/services/categories';
import BlogContentWrapper from '@/components/Common/BlogContentWrapper';
import { Metadata } from 'next';
import Image from 'next/image';

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const blogData = await getSingleblog({ slug: params.slug });
    const blog = blogData?.data?.[0];

    if (!blog) {
        return {
            title: 'Blog not found',
            description: 'This blog does not exist.',
            keywords: ['blog', 'not found'],
        };
    }

    const { SEO_Title, SEO_Description, SEO_Keyword, Banner } = blog;
    const imageUrl = Banner?.url ? `http://localhost:1337${Banner.url}` : undefined;

    return {
        title: SEO_Title,
        description: SEO_Description,
        keywords: SEO_Keyword?.split(',').map((k: string) => k.trim()),
        openGraph: {
            title: SEO_Title,
            description: SEO_Description,
            images: imageUrl ? [{ url: imageUrl }] : [],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: SEO_Title,
            description: SEO_Description,
            images: imageUrl ? [imageUrl] : [],
        },
    };
}

export default async function BlogPost({ params }: Props) {
    const blogData = await getSingleblog({ slug: params.slug });
    const blog = blogData?.data?.[0];
    if (!blog) return <div>Blog not found</div>;

    const { Title, Description, Banner, Faq } = blog;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 font-sans">{Title}</h1>
            {Banner?.url && (
                <Image
                    fill
                    src={`http://localhost:1337${Banner.url}`}
                    alt={Title}
                    className="rounded-lg w-full h-[400px] mb-6"
                />
            )}
            <BlogContentWrapper content={Description} Faq={Faq} />

        </div>
    );
}