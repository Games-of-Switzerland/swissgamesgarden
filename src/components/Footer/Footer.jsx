import React from 'react';
import Link from 'next/link';
import {useTranslation} from 'react-i18next';

const Footer = () => {
  const {t} = useTranslation();
  const linkClasses =
    'border-b border-transparent hover:text-white hover:border-white';
  return (
    <footer className="flex flex-wrap text-gray-500 text-md">
      <div className="mb-4">
        {t('gos.copyright', {year: new Date().getFullYear()})}
      </div>
      <div className="flex space-x-5 ml-auto mb-4">
        <Link href="/about">
          <a className={linkClasses}>{t('pages.about')}</a>
        </Link>
        <Link href="/contact">
          <a className={linkClasses}>{t('pages.contact')}</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
