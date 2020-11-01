import React from 'react';
import Link from 'next/link';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import classNames from 'classnames';

const Footer = () => {
  const {t} = useTranslation();
  const {pathname} = useRouter();
  const links = [
    {
      href: '/about',
      label: 'pages.about',
    },
    {
      href: '/contact',
      label: 'pages.contact',
    },
  ];

  return (
    <footer className="flex flex-wrap text-gray-500 text-md mt-auto">
      <div className="mb-4">
        {t('gos.copyright', {year: new Date().getFullYear()})}
      </div>
      <div className="flex space-x-5 ml-auto mb-4">
        {links.map(({label, href}) => (
          <Link href={href} key={label}>
            <a
              className={classNames(
                'border-b border-transparent hover:text-white hover:border-white',
                {'text-gradient': pathname === href}
              )}
            >
              {t(label)}
            </a>
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
