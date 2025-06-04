// app/components/BlogContentWrapper.tsx
'use client';

import React, { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import TableOfContents from './TableOfContents';
import FaqAccordion from './FaqAccordion';

type Heading = {
    id: string;
    text: string;
};

type Props = {
    content: string;
    Faq: []
};

export default function BlogContentWrapper({ content, Faq }: Props) {
    const [headings, setHeadings] = useState<Heading[]>([]);

    return (
        <div className="flex gap-6">
            <div className="flex-1 font-sans text-lg">
                <MarkdownRenderer content={content} onHeadingsExtracted={setHeadings} />
                {Faq.length > 0 && (
                    <FaqAccordion faqs={Faq} />
                )}
            </div>
            <div className="hidden md:block">
                <TableOfContents headings={headings} />
            </div>

        </div>
    );
}