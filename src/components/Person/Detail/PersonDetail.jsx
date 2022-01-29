import {SimpleList} from 'components/SimpleList';
import {useTranslation} from 'react-i18next';

const PersonDetail = ({person, games, studios}) => {
  console.log(studios);
  const {t} = useTranslation();
  const {title, body} = person;

  return (
    <>
      <div className='content-container text-white'>
        <div style={{gridArea: 'main'}}>
          <h1 className='text-4xl font-semibold mb-4'>{title}</h1>

          {/* DESCRIPTION */}
          {body && (
            <div
              className='mb-10'
              dangerouslySetInnerHTML={{__html: body.processed}}
            />
          )}
        </div>
        <div style={{gridArea: 'secondary'}}>
          <SimpleList items={studios} title={t('people.studios')} />
          <SimpleList items={games} title={t('people.games')} />
        </div>
      </div>
    </>
  );
};

export default PersonDetail;
