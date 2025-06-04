'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type FaqItem = {
    id: number;
    question: string;
    answer: string;
};

type Props = {
    faqs: FaqItem[];
};

export default function FaqAccordion({ faqs }: Props) {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const handleToggle = (value: string) => {
        setOpenItems((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Frequently Asked Questions</h2>
            <Accordion.Root
                type="multiple"
                value={openItems}
                onValueChange={setOpenItems}
                className="space-y-2"
            >
                {faqs.map((faq) => {
                    const value = `faq-${faq.id}`;
                    const isOpen = openItems.includes(value);

                    return (
                        <Accordion.Item
                            key={faq.id}
                            value={value}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                            <Accordion.Header>
                                <Accordion.Trigger
                                    className="flex justify-between w-full px-4 py-3 text-left font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 transition"
                                    onClick={() => handleToggle(value)}
                                >
                                    {faq.question}
                                    <ChevronDown
                                        className={`h-5 w-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                </Accordion.Trigger>
                            </Accordion.Header>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <Accordion.Content forceMount>
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="px-4 py-3 bg-white text-gray-700 border-t border-gray-200 overflow-hidden"
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    </Accordion.Content>
                                )}
                            </AnimatePresence>
                        </Accordion.Item>
                    );
                })}
            </Accordion.Root>
        </div>
    );
}
