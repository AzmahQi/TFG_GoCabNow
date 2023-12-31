'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import useScrollListener from '@/app/hooks/useScrollListener';
import Link from 'next/link';
import { Disclosure} from '@headlessui/react';
import { usePathname, useRouter } from 'next/navigation';
import LocaleSwitcher from './locale-switcher';
import { LogoImage } from '@/app/ui';

export default function SecondaryNavigation({data}) {
  const pathname = usePathname();
  const router = useRouter();

  const [navClassList, setNavClassList] = useState([]);
  const scroll = useScrollListener();

  // update classList of nav on scroll
  useEffect(() => {
    const _classList = [];

    if (scroll.y > 150 && scroll.y - scroll.lastY > 0) _classList.push('nav-bar--hidden');

    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);


  return (
    <Disclosure
      as="nav"
      className={navClassList.join(' ') + ' fixed top-0 z-10 w-full bg-sky-900'}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center text-white sm:hidden">
              <Link href="/" passHref>
                    <span className="text-lg">&larr; {data.back}</span>
                </Link>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <LogoImage />
                </div>

                  <div className="flex space-x-1 px-2 py-5 text-white hidden sm:block">
                  <Link href="/" passHref>
                    <span className="text-lg">&larr; {data.back}</span>
                </Link>
                  </div>

              </div>
              <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="flex items-center space-x-2 sm:ml-6 py-3">
                  <LocaleSwitcher />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
