// app/components/Common/MarkdownRenderer.tsx
'use client';

import React, { ReactNode, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

type Heading = {
    id: string;
    text: string;
};

type Props = {
    content: string;
    onHeadingsExtracted?: (headings: Heading[]) => void;
};

// Utility function to extract plain text from React children
function extractTextFromReactNode(children: ReactNode): string {
    if (typeof children === 'string') return children;
    if (typeof children === 'number' || typeof children === 'bigint') return children.toString();
    if (Array.isArray(children)) return children.map(extractTextFromReactNode).join('');
    if (typeof children === 'object' && children && 'props' in children) {
        // Handle <a> tags by extracting only the text inside (e.g., "Shazam" from <a href="...">Shazam</a>)
        if ((children as any).type === 'a') {
            return extractTextFromReactNode((children as any).props.children);
        }
        return extractTextFromReactNode((children as any).props.children);
    }
    return '';
}

// New utility to strip markdown links and basic formatting from heading text
function stripMarkdownLinks(text: string): string {
    return text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // remove links: [text](url) => text
        .replace(/\*\*([^*]+)\*\*/g, '$1')       // remove bold **
        .replace(/\*([^*]+)\*/g, '$1')           // remove italic *
        .replace(/_(.+?)_/g, '$1')                // remove italic _
        .replace(/`([^`]+)`/g, '$1');             // remove inline code
}

export default function MarkdownRenderer({ content, onHeadingsExtracted }: Props) {
    // Extract h2 headings and generate IDs with plain text
    const headings = useMemo(() => {
        const headingList: Heading[] = [];
        const headingRegex = /^##\s+(.+)$/gm;
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
            const rawText = match[1].trim();

            // Strip markdown links and inline formatting to get plain text for TOC
            const plainText = stripMarkdownLinks(rawText);

            const id = plainText
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            headingList.push({ id, text: plainText });
        }

        return headingList;
    }, [content]);

    // Pass headings to parent component
    useEffect(() => {
        if (onHeadingsExtracted) {
            onHeadingsExtracted(headings);
        }
    }, [headings, onHeadingsExtracted]);

    return (
        <div className="prose prose-green max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ node, ...props }) => (
                        <h1 className="text-4xl font-bold mt-8 mb-4 text-green-700" {...props} />
                    ),
                    h2: ({ children, ...props }) => {
                        const text = extractTextFromReactNode(children);
                        const id = text
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)/g, '');

                        return (
                            <h2 id={id} className="text-2xl font-semibold mt-6 mb-3 text-black" {...props}>
                                {children}
                            </h2>
                        );
                    },
                    a: ({ node, ...props }) => (
                        <a
                            className="text-[#007BCF] hover:text-[#2AB82F] transition-colors duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                        />
                    ),
                    img: ({ node, ...props }) => {
                        const src = typeof props.src === 'string' ? props.src : '';
                        const alt = props.alt || '';

                        return (
                            <figure className="relative w-full aspect-video my-4 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 700px"
                                    className="object-contain"
                                    loading="lazy"
                                />
                            </figure>
                        );
                    },
                    p: ({ node, children, ...props }) => {
                        const isImageOnly =
                            node?.children?.length === 1 &&
                            node.children[0].type === 'element' &&
                            node.children[0].tagName === 'img';

                        if (isImageOnly) {
                            return <>{children}</>;
                        }

                        return (
                            <p className="my-4 text-gray-800 leading-relaxed" {...props}>
                                {children}
                            </p>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
