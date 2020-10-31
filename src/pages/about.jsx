import React from 'react';
import {useTranslation} from 'react-i18next';
import Placeholder from '../components/Placeholder';

const About = () => {
  const {t} = useTranslation();

  const team = [
    {
      job: t('team.david.job'),
      name: t('team.david.name'),
      twitter: t('team.david.twitter'),
      img: t('team.david.img'),
    },
    {
      job: t('team.toni.job'),
      name: t('team.toni.name'),
      twitter: t('team.toni.twitter'),
      img: t('team.toni.img'),
    },
    {
      job: t('team.kevin.job'),
      name: t('team.kevin.name'),
      twitter: t('team.kevin.twitter'),
      img: t('team.kevin.img'),
    },
    {
      job: t('team.camille.job'),
      name: t('team.camille.name'),
      twitter: t('team.camille.twitter'),
      img: t('team.camille.img'),
    },
    {
      job: t('team.pierre.job'),
      name: t('team.pierre.name'),
      twitter: t('team.pierre.twitter'),
      img: t('team.pierre.img'),
    },
  ];

  return (
    <>
      <div className="content-container text-white">
        <div style={{gridArea: 'main'}}>
          <div className="text-5xl my-20 font-semibold items-center flex flex-col leading-none text-center">
            <span className="text-white tracking-tight">About</span>
            <span className="text-gradient">the project</span>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {t('about.subtitle')}
            </h2>
            <p>{t('about.description')}</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-8">
              {t('about.sponsors')}
            </h2>
            ...
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-8">
              {t('about.team_title')}
            </h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-10">
              {team.map(({job, name, twitter, img}) => {
                return (
                  <div>
                    <Placeholder className="mb-3" />
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
