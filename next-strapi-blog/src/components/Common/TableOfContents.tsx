// app/components/Common/TableOfContents.tsx
'use client';

import React, { useState, useEffect } from 'react';

type Heading = {
    id: string;
    text: string;
};

type Props = {
    headings: Heading[];
};

export default function TableOfContents({ headings }: Props) {
    const [activeId, setActiveId] = useState<string | null>(null);

    // Handle click to scroll to section
    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Adjust based on your header height
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });
            setActiveId(id);
        }
    };

    // Set up Intersection Observer to highlight active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -50% 0px',
                threshold: 0.1,
            }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => {
            headings.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (element) observer.unobserve(element);
            });
        };
    }, [headings]);

    if (!headings.length) return null;

    return (
        <div className="sticky top-20 p-4 bg-gray-50 rounded-lg shadow-md max-w-xs">
            <h3 className="text-lg font-sans font-semibold mb-3 text-gray-800">Table of Contents</h3>
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <button
                            onClick={() => handleClick(heading.id)}
                            className={`text-sm text-left font-sans transition-colors duration-200 ${activeId === heading.id
                                ? 'text-green-600 font-medium'
                                : 'text-gray-600 hover:text-green-500'
                                }`}
                        >
                            {heading.text}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}