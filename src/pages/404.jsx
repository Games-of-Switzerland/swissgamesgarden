import {useTranslation} from 'react-i18next';
import GhostIcon from 'svg/ghost.svg';

const NoMatch = () => {
  const {t} = useTranslation();
  return (
    <div className="text-white flex flex-col items-center justify-center mt-32">
      <div className="mb-12">
        <GhostIcon className="w-32 h-32" />
      </div>
      <h1 className="text-2xl">{t('error.404')}</h1>
    </div>
  );
};

export default NoMatch;
