import React from 'react';
import {useTranslation} from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const Add = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className="text-3xl md:text-5xl my-10 md:my-20 font-semibold items-center flex flex-col leading-none text-center">
        <span className="text-white tracking-tight">{t('add.title_1')}</span>
        <span className="text-gradient">{t('add.title_2')}</span>
      </div>
      <div className="content-container text-white">
        <div className="text-center" style={{gridArea: 'main'}}>
          <div className="text-center">
            <ReactMarkdown className="mb-10 formatted">
              {t('add.description_markdown')}
            </ReactMarkdown>

            <a
              className="btn btn-white"
              href={`mailto:${t('contact.email')}?subject=${t(
                'add.mail_subject'
              )}&body=${t('add.mail_body').replace(/\n/gm, '%0D%0A')}`}
            >
              {t('contact.send_mail')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
