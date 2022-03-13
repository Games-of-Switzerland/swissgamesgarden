import React from 'react';
import {useTranslation} from 'react-i18next';
import {prefetchPage, usePage} from '../api/page';
import Loading from 'components/Loading';
import Error from 'components/Error';
import Image from 'next/image';

const About = () => {
  const {t} = useTranslation();

  const teams = t('about.teams', {returnObjects: true});

  const {data= {}, isLoading, isError, error} = usePage('about');

  if (isLoading) return <Loading />;
  if (isError) return <Error message={error?.message} />;

  const {body} = data;

  return (
    <>
      <div className="text-5xl my-20 font-semibold items-center flex flex-col leading-none text-center">
        <span className="text-white tracking-tight">{t('about.title_1')}</span>
        <span className="text-gradient">{t('about.title_2')}</span>
      </div>

      <div className="content-container text-white">
        <div style={{gridArea: 'main'}}>
          <div className="mb-12 formatted">
            <div dangerouslySetInnerHTML={{__html: body.processed}} />
          </div>

          {Object.entries(teams).map(([key, {team, title}]) => (
            <div className="mb-12" key={key}>
              <h2 className="text-2xl font-semibold mb-8">{title}</h2>
              <div className="grid grid-cols-3 gap-x-4 gap-y-10">
                {Object.entries(team).map(([key, {job, name, twitter}]) => (
                  <div key={key}>
                    <div className="mb-3">
                      <Image
                        src={`/team/${key}.jpeg`}
                        alt={name}
                        layout="responsive"
                        objectFit="cover"
                        width={330}
                        height={220}
                      />
                    </div>
                    {/*<Placeholder className="mb-3" />*/}
                    <div className="text-gray-500 text-md font-light">
                      {job}
                    </div>
                    <div className="text-lg font-semibold">{name}</div>
                    <a
                      className="text-md font-light text-gradient"
                      href={twitter}
                      target="_blank"
                      rel="noreferrer nofollow"
                    >
                      {twitter.replace(/.*?twitter.com\//i, '@')}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async props =>
  await prefetchPage({path: 'about', ...props});

export default About;
