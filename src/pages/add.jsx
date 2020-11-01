import React from 'react';
import {useTranslation} from 'react-i18next';

const Add = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className="text-5xl my-20 font-semibold items-center flex flex-col leading-none text-center">
        <span className="text-white tracking-tight">{t('add.title_1')}</span>
        <span className="text-gradient">{t('add.title_2')}</span>
      </div>
      <div className="content-container text-white">
        <div className="text-center" style={{gridArea: 'main'}}>
          <div className="text-center">
            <p className="text-white mb-10">{t('add.description')}</p>

            <a className="btn btn-white" href={`mailto:${t('contact.email')}`}>
              {t('contact.send_mail')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
