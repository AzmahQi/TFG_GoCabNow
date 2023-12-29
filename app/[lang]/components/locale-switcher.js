'use client'

import { Listbox, Transition } from '@headlessui/react';
import { usePathname } from 'next/navigation';
import { i18n } from '../../../i18n-config';
import { useRouter } from 'next/navigation';
import React, { useState, Fragment } from 'react';
import { setCookie } from 'nookies';

const pathSplitter = (path) => {
  let i = 2;
  const actualPath = path.split('/');
  let newPath = '';
  for (i; i < actualPath.length; i++) {
    newPath = newPath + '/' + actualPath[i];
  }
  return newPath === '' ? '/' : newPath;
};

const updateLangCookie = (selectedLang) => {
  setCookie(null, 'lang', selectedLang, {
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    path: '/',
  });
};

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathName = usePathname();
  const activeLocale = pathName.split('/')[1];
  const newPath = pathSplitter(pathName);

  const [selectedLocale, setSelectedLocale] = useState(activeLocale);
  const inactiveLocales = i18n.locales.filter((locale) => locale !== activeLocale);

  const handleLanguageChange = (newLocale) => {
    setSelectedLocale(newLocale);
    updateLangCookie(newLocale);
    router.push(newPath);
    router.refresh();
  };

  return (
    <Listbox as="div" className="relative ml-3" value={selectedLocale} onChange={handleLanguageChange}>
        <Listbox.Button
          className="relative mx-3 my-1 flex text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
          }}
        >
          {selectedLocale.toUpperCase()}
        </Listbox.Button>
        <Transition as={React.Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute right-0 z-10 mt-2 w-15 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700">
            {inactiveLocales.map((locale) => (
              <Listbox.Option key={locale} value={locale}>
                {({ active }) => (
                  <div
                    className={`${
                      active ? 'bg-blue-500 rounded-md text-white' : 'text-white'
                    } cursor-pointer select-none py-2 px-4`}
                  >
                    {locale.toUpperCase()}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>

    </Listbox>
  );
}