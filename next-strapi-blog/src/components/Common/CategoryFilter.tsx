'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Category = {
    id: string;
    Title: string;
};

export default function CategoryFilter({
    categories,
    selectedCategory,
}: {
    categories: Category[];
    selectedCategory: string | null;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeCategory, setActiveCategory] = useState<string | null>(selectedCategory);
    console.log(activeCategory, "activeCategory")
    useEffect(() => {
        setActiveCategory(selectedCategory); // sync when URL changes
    }, [selectedCategory]);

    const handleCategoryClick = (categoryId: string | null) => {
        setActiveCategory(categoryId);

        const params = new URLSearchParams(searchParams?.toString() || '');

        if (categoryId) {
            params.set('category', categoryId);
        } else {
            params.delete('category');
        }

        router.push(`/blog?${params.toString()}`);
    };

    const baseClasses = `px-3 py-1 rounded-full text-sm font-medium border transition-colors duration-200`;

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(null)}
                className={`${baseClasses} ${activeCategory === null
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                    }`}
            >
                All Categories
            </motion.button>

            {categories.map((category) => (
                <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryClick(String(category.id))}
                    className={`${baseClasses} ${activeCategory === String(category.id)
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    {category.Title}
                </motion.button>
            ))}
        </div>
    );
}
