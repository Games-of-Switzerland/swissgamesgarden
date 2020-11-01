import {useTranslation} from 'react-i18next';

const NotFound = () => {
  const {t} = useTranslation();
  return (
    <div className="my-16 text-lg text-white text-center">
      {t('game.not_found')}
    </div>
  );
};

export default NotFound;
