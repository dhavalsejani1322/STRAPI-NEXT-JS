/* eslint-disable @typescript-eslint/no-explicit-any */

import { getHirePageSeo } from '@/api/services/categories';
import { Metadata } from 'next';

function buildSeoMetadata(data: any): Metadata {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || '';

    const imageUrl = data.seo_metaImage?.url
        ? baseUrl + data.seo_metaImage.url
        : null;

    return {
        title: data.seo_title || 'Default Page Title',
        description: data.seo_description || 'Default description for the page.',
        keywords: data.seo_keyword || '',
        openGraph: {
            title: data.seo_title || 'Default OG Title',
            description: data.seo_description || 'Default OG Description',
            type: 'website',
            url: `${baseUrl}/${data.url}`,
            images: imageUrl
                ? [
                    {
                        url: imageUrl,
                        width: data.seo_metaImage?.width || 800,
                        height: data.seo_metaImage?.height || 600,
                        alt: data.seo_metaImage?.alternativeText || data.seo_title || 'SEO Image',
                    },
                ]
                : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: data.seo_title || 'Default Twitter Title',
            description: data.seo_description || 'Default Twitter description',
            images: imageUrl ? [imageUrl] : [],
        },
    };
}

export async function generateMetadata(): Promise<Metadata> {
    const seoData = await getHirePageSeo('hire-node-js-developers');

    if (!seoData) {
        return {
            title: 'Page Not Found',
            description: 'This page does not have SEO content yet.',
        };
    }

    return buildSeoMetadata(seoData);
}

export default async function HireNodePage() {
    const seo = await getHirePageSeo('hire-node-js-developers');

    return (
        <main className="max-w-4xl mx-auto p-6 font-sans">
            <h1 className="text-3xl font-bold mb-4">{seo?.seo_title || 'Hire Node.js Developers'}</h1>
            <p className="text-lg">
                {seo?.seo_description ||
                    'Our team offers top-tier Node.js engineers ready to deliver scalable backend solutions.'}
            </p>
        </main>
    );
}
