import React from 'react';
import {useTranslation} from 'react-i18next';
import Placeholder from 'components/Placeholder';

const About = () => {
  const {t} = useTranslation();

  const team = t('about.team', {returnObjects: true});

  return (
    <>
      <div className="text-5xl my-20 font-semibold items-center flex flex-col leading-none text-center">
        <span className="text-white tracking-tight">{t('about.title_1')}</span>
        <span className="text-gradient">{t('about.title_2')}</span>
      </div>

      <div className="content-container text-white">
        <div style={{gridArea: 'main'}}>
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
              {Object.values(team).map(({job, name, twitter}) => {
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
