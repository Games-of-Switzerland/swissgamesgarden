import React from 'react';
import {useTranslation} from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const Contact = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className="text-5xl my-20 font-semibold items-center flex flex-col leading-none text-center">
        <span className="text-white tracking-tight">
          {t('contact.title_1')}
        </span>
        <span className="text-gradient">{t('contact.title_2')}</span>
      </div>

      <div className="content-container">
        <div style={{gridArea: 'main'}}>
          <div className="text-center">
            <ReactMarkdown className="formatted text-white mb-10">
              {t('contact.description_markdown')}
            </ReactMarkdown>
            <a className="btn btn-white" href={`mailto:${t('contact.email')}`}>
              {t('contact.send_mail')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
