import {useTranslation} from 'react-i18next';
import classNames from 'classnames';
import {useRanger} from 'react-ranger';
import Dropdown from 'components/Dropdown';
import Tooltip from 'components/Tooltip';
import {useState} from 'react';
import {useGosRouter} from 'hooks';
import queryString from 'query-string';

const getMaxCount = (array, key, min = 0) => {
  let max = min;
  array.forEach(item => {
    if (max < item[key]) max = item[[key]];
  });
  return max;
};

const ReleasesFilter = ({data, filterName}) => {
  const {t} = useTranslation();
  const {query, replace} = useGosRouter();

  const filter = query[filterName] ? Number(query[filterName]) : null;

  const min = Number(data[0].key_as_string);
  const max = Number(data[data.length - 1].key_as_string);

  const [changed, setChanged] = useState(false);
  const [values, setValues] = React.useState([min, max]);

  const handleSave = async () => {
    const newQuery = {
      ...query,
      [filterName]: values[1],
    };

    await replace(
      {
        pathname: '/',
        query: newQuery,
      },
      `?${queryString.stringify(newQuery, {arrayFormat: 'bracket'})}`
    );
  };

  const handleReset = async () => {
    setValues([min, max]);
    const newQuery = query;
    delete newQuery[filterName];
    await replace(
      {
        pathname: '/',
        query,
      },
      `?${queryString.stringify(newQuery, {arrayFormat: 'bracket'})}`
    );
  };

  const handleChangeValues = ([newMin, newMax]) => {
    const [stateMin, stateMax] = values;
    const gatedMin = newMin >= stateMax ? stateMax - 1 : newMin;
    const gatedMax = newMax <= stateMin ? stateMin + 1 : newMax;
    setValues([gatedMin, gatedMax]);
    setChanged(true);
  };

  const {getTrackProps, handles, ticks} = useRanger({
    min: min,
    max: max,
    stepSize: 1,
    values,
    onDrag: handleChangeValues,
    ticks: [min, max],
  });

  const actions = close => (
    <div className="flex space-x-2">
      <button
        className="btn btn-gray py-4 w-full"
        onClick={async () => {
          close();
          await handleReset();
        }}
      >
        {t('reset')}
      </button>
      <button
        className="btn btn-red py-4 w-full"
        onClick={async () => {
          close();
          await handleSave();
        }}
        disabled={!changed}
      >
        {t('save')}
      </button>
    </div>
  );

  const maxCount = getMaxCount(data, 'doc_count');

  const handleMinChange = e => {
    const val = e.target.value;
    handleChangeValues([val, values[1]]);
  };
  const handleMaxChange = e => {
    const val = e.target.value;
    handleChangeValues([values[0], val]);
  };

  const handleBarClick = val => {
    if (val > values[0]) {
      handleChangeValues([values[0], val]);
    } else if (val < values[1]) {
      handleChangeValues([val, values[1]]);
    }
  };

  return (
    <Dropdown
      title={t(`${filterName}.title`)}
      isSelected={filter}
      content={actions}
    >
      <>
        <div className="flex space-x-2 mb-3">
          <select
            className="form-select flex-grow"
            value={values[0]}
            onChange={handleMinChange}
          >
            {data.map(
              ({key_as_string, key, doc_count}) =>
                Number(key_as_string) < values[1] && (
                  <option
                    key={`option-min-${key}`}
                    value={Number(key_as_string)}
                  >
                    {key_as_string} ({doc_count})
                  </option>
                )
            )}
          </select>

          <select
            className="form-select flex-grow"
            value={values[1]}
            onChange={handleMaxChange}
          >
            {data.map(
              ({key_as_string, key, doc_count}) =>
                Number(key_as_string) > values[0] && (
                  <option
                    key={`option-max-${key}`}
                    value={Number(key_as_string)}
                  >
                    {key_as_string} ({doc_count})
                  </option>
                )
            )}
          </select>
        </div>
        <div className="h-20 flex items-end w-20 mb-4 w-full">
          {data.map(({key_as_string, key, doc_count}) => {
            const numberKey = Number(key_as_string);
            return (
              <Tooltip content={`${key_as_string} (${doc_count})`}>
                <div
                  key={key}
                  className={classNames(
                    'flex-grow border-l border-gray-1000',
                    numberKey >= values[0] && numberKey <= values[1]
                      ? 'bg-gray-200 hover:bg-red-600'
                      : 'bg-gray-700 hover:bg-gray-500'
                  )}
                  onClick={() => handleBarClick(numberKey)}
                  style={{
                    height: `${(doc_count / maxCount) * 100}%`,
                    minHeight: doc_count > 0 ? '2px' : 0,
                  }}
                />
              </Tooltip>
            );
          })}
        </div>
        <div className="mb-4">
          <div
            {...getTrackProps({
              className: 'h-1 bg-gray-700 mb-3',
            })}
          >
            {handles.map(({getHandleProps}) => (
              <div
                {...getHandleProps({
                  className:
                    'w-6 h-6 rounded bg-red-500 hover:bg-red-400 cursor-pointer',
                })}
              />
            ))}
          </div>
          <div className="flex justify-between text-gray-500">
            {ticks.map(({value}) => (
              <div>{value}</div>
            ))}
          </div>
        </div>
      </>
    </Dropdown>
  );
};

ReleasesFilter.propTypes = {
  // data: PropTypes.array.isRequired,
};

export default ReleasesFilter;
