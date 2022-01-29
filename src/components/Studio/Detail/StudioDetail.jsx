import {SimpleList} from 'components/SimpleList';
import {useTranslation} from 'react-i18next';

const StudioDetail = ({studio, games}) => {
  const {t} = useTranslation();
  const {title, members, body} = studio;

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
          <SimpleList items={members.data} title={t('studio.members')} />
          <SimpleList items={games} title={t('studio.games')} />
        </div>
      </div>
    </>
  );
};

export default StudioDetail;
