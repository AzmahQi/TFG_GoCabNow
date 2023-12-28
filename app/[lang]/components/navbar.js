"use client";
// Import necessary modules
import { useState, useEffect } from 'react'
import useScrollListener from '@/app/hooks/useScrollListener'
import useSectionId from '@/app/hooks/sectionId';
import ImageLoader from '@/app/hooks/imageLoader'
import Link from "next/link";
import { Modal, Button } from "@/app/ui/ui";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import LocaleSwitcher from "./locale-switcher";
import { ProfileMenu } from "./navbarComponents";
import Image from "next/image";
import myLogo from "/public/img/logo.png"

// Utility function for conditional CSS classes
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// Navbar component
export default function Navbar({ data, session }) {
  // Define navigation links
  const navigation = data.menu;
  const profile = data.profileMenu;
  const router = useRouter();
  const [navClassList, setNavClassList] = useState([]);
  const scroll = useScrollListener();
  const path = usePathname();
  const sectionIds = navigation.map((item) => item.id);
  const currentSectionId = useSectionId(sectionIds);
  // update classList of nav on scroll
  useEffect(() => {
    const _classList = [];

    
    if (scroll.y > 150 && scroll.y - scroll.lastY > 0)
      _classList.push("nav-bar--hidden");

    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);

  return (

    <Disclosure
      as="nav"
      className={navClassList.join(" ") + " fixed top-0 z-10 w-full secondary"}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    /* Updated: Use your actual close icon here */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  ) : (
                    /* Updated: Use your actual open icon here */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                    >
                      <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                   <Image loader={ImageLoader} src={myLogo} width={60} height={60} className="hover:scale-150 transition-all duration-500 cursor-pointer" alt="logo"/>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={path + item.href}
                        scroll={true}
                        className={classNames(
                          currentSectionId === item.id
                            ? "bg-[#001D3D] text-white"
                            : "text-gray-300 hover:bg-[#000814] hover:text-white",
                          "rounded-sm px-2 py-5 text-sm font-medium"
                        )}
                        aria-current={
                          currentSectionId === item.id ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex items-center space-x-2 sm:ml-6 py-3">
                <LocaleSwitcher />
              </div>
              <div>
                {!session ? (
                  <Button
                    size="small"
                    className="relative"
                    onClick={() => signIn()}
                  >
                    {data.signInButton}
                  </Button>
                ) : (
                  <ProfileMenu profileMenu={profile} />
                )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    router.asPath === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={
                    router.asPath === item.href ? "page" : undefined
                  }
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
