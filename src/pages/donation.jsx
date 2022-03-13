import React from 'react';
import {useTranslation} from 'react-i18next';
import {prefetchPage, usePage} from '../api/page';
import Loading from 'components/Loading';
import Error from 'components/Error';
import Image from 'next/image';

const Donation = () => {
  const {t} = useTranslation();

  const {data = {}, isLoading, isError, error} = usePage('donation');

  if (isLoading) return <Loading />;
  if (isError) return <Error message={error?.message} />;

  const {body} = data || {};

  return (
    <>
      <div className="text-5xl my-20 font-semibold items-center flex flex-col leading-none text-center">
        <span className="text-white tracking-tight">
          {t('donation.title_1')}
        </span>
        <span className="text-gradient">{t('donation.title_2')}</span>
      </div>

      <div className="content-container text-white">
        <div style={{gridArea: 'main'}}>
          <div className="mb-12 formatted">
            <div dangerouslySetInnerHTML={{__html: body.processed}} />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async props =>
  await prefetchPage({path: 'donation', ...props});

export default Donation;
