import {useTranslation} from 'react-i18next';
import classNames from 'classnames';

const Category = ({title, count, children, className, ...rest}) => {
  const {t} = useTranslation();
  return (
    <div className="mb-16">
      <h2 className={classNames('section-title', className)} {...rest}>
        {t(title, {count})}
      </h2>
      {children}
    </div>
  );
};

export default Category;
