import {useTranslation} from 'react-i18next';
import classNames from 'classnames';
import {useRanger} from 'react-ranger';
import Dropdown from 'components/Dropdown';
import Tooltip from 'components/Tooltip';
import {useCallback, useState} from 'react';
import {useGosFilter, useGosRouter} from 'hooks';
import addOrRemove from '../../../utils/addOrRemove';
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

  const filterStartName = `${filterName}[start]`;
  const filterEndName = `${filterName}[end]`;

  const isSelected = Object.keys(query).some(k =>
    [filterStartName, filterEndName].includes(k)
  );

  const {reset} = useGosFilter({
    filterName,
    isArray: true,
    isNumber: true,
  });

  const save = useCallback(
    async ([start, end]) => {
      const newQuery = {
        ...query,
        [filterStartName]: start,
        [filterEndName]: end,
      };

      await replace(
        {
          pathname: '/',
          query: newQuery,
        },
        `?${queryString.stringify(newQuery, {arrayFormat: 'bracket'})}`
      );

      // release_year_range[start]=2020&release_year_range[end]=2010
    },
    [query]
  );

  const start = Number(data[0].key_as_string);
  const end = Number(data[data.length - 1].key_as_string);

  const [changed, setChanged] = useState(false);
  const [values, setValues] = useState([start, end]);

  const handleSave = async () => {
    await save(values);
  };

  const handleReset = async () => {
    setValues([start, end]);
    await reset();
  };

  const handleChangeValues = ([newMin, newMax]) => {
    const [stateMin, stateMax] = values;
    const gatedMin = newMin >= stateMax ? stateMax - 1 : newMin;
    const gatedMax = newMax < stateMin ? stateMin + 1 : newMax;
    setValues([Number(gatedMin), Number(gatedMax)]);
    setChanged(true);
  };

  const {getTrackProps, handles, ticks} = useRanger({
    min: start,
    max: end,
    stepSize: 1,
    values,
    onDrag: handleChangeValues,
    ticks: [start, end],
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

  const [isFirstClick, setIsFirstClick] = useState(true);
  const handleBarClick = val => {
    if (isFirstClick) {
      handleChangeValues([val, values[1]]);
    } else {
      handleChangeValues([values[0], val]);
    }
    setIsFirstClick(p => !p);
  };

  return (
    <Dropdown
      title={t(`${filterName}.title`)}
      isSelected={isSelected}
      content={actions}
      className="mb-1 mr-1"
    >
      <>
        <div className="flex space-x-2 mb-3">
          <select
            className="flex-1"
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
            className="form-select flex-1"
            value={values[1]}
            onChange={handleMaxChange}
          >
            {data.map(
              ({key_as_string, key, doc_count}) =>
                Number(key_as_string) >= values[0] && (
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
              <Tooltip key={key} content={`${key_as_string} (${doc_count})`}>
                <div
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
              <div key={`tick-${value}`}>{value}</div>
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
