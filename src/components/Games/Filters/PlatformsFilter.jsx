import {useState} from 'react';
import {useRouter} from 'next/router';
import addOrRemove from 'utils/addOrRemove';
import {FilterableDropdown} from 'components/Dropdown';
import {useTranslation} from 'react-i18next';

const PlatformsFilter = ({data}) => {
  const {t} = useTranslation();
  const router = useRouter();

  const {platforms} = router.query;
  const [selected, setSelected] = useState(platforms || []);

  const handleClick = async key => {
    const newSelected = addOrRemove(selected, key);
    setSelected(newSelected);

    await router.replace({
      pathname: '/',
      query: {[`platforms[]`]: newSelected},
    });
  };

  const handleReset = async () => {
    setSelected([]);
    await router.replace({
      pathname: '/',
    });
  };

  data = data.map(item => ({
    ...item,
    title: t(`platforms.${item.key}`),
  }));

  return (
    <FilterableDropdown
      items={data}
      selectedItems={selected}
      title={t('platforms.title')}
      onClick={handleClick}
      onReset={handleReset}
    />
  );
};

export default PlatformsFilter;
