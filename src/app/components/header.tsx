"use client"

import React from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLayerGroup, faUser, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useRouter, usePathname, useSearchParams  } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    // Typage du path en string
    const isActive = (path: string): boolean => pathname === path;

    return (
        <div className="btm-nav fixed bottom-0 w-full z-50 bg-primary py-10">
            <a href={`/`}>
                <button className={`flex flex-col items-center ${isActive('/') ? 'text-base-100' : 'text-neutral'}`}>
                    <FontAwesomeIcon icon={faHouse} className="fa-fw" size='2x' />
                    <span className="text-xs py-2 text-neutral">Home</span>
                </button>
            </a>

            <a href={`/TemplatePage`}>
                <button className={`flex flex-col items-center ${isActive('/TemplatePage') ? 'text-base-100' : 'text-neutral'}`}>
                    <FontAwesomeIcon icon={faLayerGroup} className="fa-fw" size='2x' />
                    <span className="text-xs py-2 text-neutral">Template</span>
                </button>
            </a>

            <a href={`/ProfilePage`}>
                <button className={`flex flex-col items-center ${isActive('/ProfilePage') ? 'text-base-100' : 'text-neutral'}`}>
                    <FontAwesomeIcon icon={faUser} className="fa-fw" size={isActive('/ProfilePage') ? '2x' : '2x'}  />
                    <span className="text-xs py-2 text-neutral">Profile</span>
                </button>
            </a>

            <a href={`/PlusPage`}>
                <button className={`flex flex-col items-center ${isActive('/PlusPage') ? 'text-base-100' : 'text-neutral'}`}>
                    <FontAwesomeIcon icon={faEllipsis} className="fa-fw" size='2x' />
                    <span className="text-xs py-2 text-neutral">Plus</span>
                </button>
            </a>
        </div>
    );
}
