"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItemNew } from "../Common/Navbar/navbar-menu";
import { Bolt, Laptop, Layers, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function NavbarDemo() {
    return (
        <Navbar className="" />
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-0 backdrop-blur-md inset-x-0 gap-x-2.5 mx-auto z-50 font-sans", className)}
        >
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">Web Development</HoveredLink>
                        <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                        <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                        <HoveredLink href="/branding">Branding</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Hire Developers">
                    <div className="  text-sm grid grid-cols-4 gap-10 p-4">

                        <ProductItemNew
                            header="Mobile"
                            color="#DDD6FE" // light purple
                            icon={<Smartphone size={20} />} // use Image or SVG
                            items={[
                                { label: "Flutter Developers", href: "/hire-flutter-app-developers" },
                                { label: "React Native Developers", href: "/hire-react-native-developers" },
                            ]}
                        />

                        <ProductItemNew
                            header="Frontend"
                            color="#FEE2E2" // light red
                            icon={<Laptop size={20} />}
                            items={[
                                { label: "React JS Developers", href: "/hire-react-js-developers" },
                                { label: "Angular Developers", href: "/hire-angular-developers" },
                                { label: "Vue JS Developers", href: "/hire-vue-js-developers" },
                                { label: "WordPress Developers", href: "/hire-wordpress-developers" },
                            ]}
                        />

                        <ProductItemNew
                            header="Backend"
                            color="#F3E8FF" // light violet
                            icon={<Bolt size={20} />}
                            items={[
                                { label: "Node JS Developers", href: "/hire-node-js-developers" },
                                { label: "Python Developers", href: "/hire-python-developers" },
                                { label: "Django Developers", href: "/hire-django-developers" },
                            ]}
                        />

                        <ProductItemNew
                            header="In-demand"
                            color="#D1FAE5" // light green
                            icon={<Layers size={20} />}
                            items={[
                                { label: "UI/UX Designers", href: "/hire-ui-ux-designers" },
                                { label: "DevOps Engineers", href: "/hire-devops-engineers" },
                                { label: "MEARN Stack Developers", href: "/hire-mearn-stack-developers" },
                                { label: "Full Stack Developers", href: "/hire-fullstack-developers" },
                            ]}
                        />
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Pricing">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/hobby">Hobby</HoveredLink>
                        <HoveredLink href="/individual">Individual</HoveredLink>
                        <HoveredLink href="/team">Team</HoveredLink>
                        <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                    </div>
                </MenuItem>
                <Link
                    href="/blog"
                    onMouseEnter={() => setActive(null)} // closes any active menu on hover
                >
                    Blog
                </Link>
            </Menu>
        </div>
    );
}
