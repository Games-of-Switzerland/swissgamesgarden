import React from 'react';
import Link from 'next/link';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import classNames from 'classnames';
import AutoSuggest from 'components/Games/AutoSuggest';

const Header = () => {
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
    {
      href: '/donation',
      label: 'pages.donate',
    },
  ];

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
        {links.map(({label, href}) => (
          <Link href={href} key={label}>
            <a
              className={classNames(
                'border-b border-transparent text-white py-2 uppercase leading-relaxed hover:text-opacity-75 transition transition:opacity duration-200',
                {'text-gradient': pathname === href}
              )}
            >
              {t(label)}
            </a>
          </Link>
        ))}
      </div>
      <div
        style={{gridArea: 'cta'}}
        className="flex justify-end min-w-0 w-full"
      >
        <Link href="/add">
          <a className="btn btn-white items-center inline-flex">
            <span className="truncate">{t('gos.add_game')}</span>
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
