import React from 'react';
import Link from 'next/link';
import {AutoSuggest} from 'components/Search';
import {useTranslation} from 'react-i18next';

const Header = () => {
  const linkProps = {
    className:
      'text-white py-2 uppercase leading-relaxed hover:text-opacity-75 transition transition:opacity duration-200',
  };
  const {t} = useTranslation();

  return (
    <header className="mb-6 header">
      <h1
        className="leading-none tracking-wide text-lg my-1 mr-6"
        style={{gridArea: 'title'}}
      >
        <Link href="/">
          <a className="text-white uppercase">
            Swiss Games <br />
            Garden
          </a>
        </Link>
      </h1>

      <AutoSuggest className="relative z-50" style={{gridArea: 'search'}} />

      {/* Menu */}
      <div
        className="flex space-x-5 lg:space-x-8 place-self-end overflow-x-auto max-w-full"
        style={{gridArea: 'menu'}}
      >
        <Link href="/about">
          <a {...linkProps}>{t('pages.about')}</a>
        </Link>
        <Link href="/contact">
          <a {...linkProps}>{t('pages.contact')}</a>
        </Link>
        <Link href="/add">
          <a className="btn btn-white">{t('gos.add_game')}</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
