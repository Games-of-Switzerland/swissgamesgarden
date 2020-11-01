import {useTranslation} from 'react-i18next';

const Error = ({message}) => {
  const {t} = useTranslation();
  return (
    <div className="flex justify-center py-20 max-w-md mx-auto">
      <div className="bg-red-500 p-2 border border-red-400 text-red-900">
        {message || t('error.message')}
      </div>
    </div>
  );
};

export default Error;
