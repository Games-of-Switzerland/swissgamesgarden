import {useTranslation} from 'react-i18next';
import GameTeaser from 'components/Game/Teaser';
import Link from 'next/link';

const StudioDetail = ({studio, games}) => {
  const {t} = useTranslation();
  const {title, members, body} = studio;
  console.log(games);

  return (
    <>
      <div className="content-container text-white">
        <div style={{gridArea: 'main'}}>
          <h1 className="text-4xl font-semibold mb-4">{title}</h1>

          {/* DESCRIPTION */}
          {body && (
            <div
              className="mb-10"
              dangerouslySetInnerHTML={{__html: body.processed}}
            />
          )}
        </div>
        <div style={{gridArea: 'secondary'}}>
          {members && (
            <div className="mb-16">
              <h2 className="section-title">{t('studio.members')}</h2>
              <p className="text-lg">
                {members?.data.map(({title}) => title).join(', ')}
              </p>
            </div>
          )}
          {members && (
            <div className="mb-16">
              <h2 className="section-title">{t('studio.games')}</h2>
              <div className="text-lg">
                {games?.map(({title, field_path}) => (
                  <div>
                    <Link href={field_path}>
                      <a className="text-white hover:text-opacity-75 transition transition:opacity duration-200">
                        {title}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudioDetail;
