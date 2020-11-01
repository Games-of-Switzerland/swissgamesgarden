import React from 'react';
import {PageSizeAccessor, renderComponent, SearchkitComponent} from 'searchkit';
import config from 'config';

const Stats = ({count}) => <div className="text-center mb-spacer">{count}</div>;

const LoadMoreDisplay = ({label, count, onClick}) => (
  <>
    <Stats count={count} />
    <div className="text-center mb-spacer">
      <button className="btn btn-outline" onClick={onClick}>
        {label}
      </button>
    </div>
  </>
);

class LoadMore extends SearchkitComponent {
  defineAccessor() {
    return this.searchkit.getAccessorByType(PageSizeAccessor);
  }

  render() {
    if (!this.accessor) return null;
    if (!this.hasHits()) return null;

    const hitsCount = this.searchkit.getHitsCount();
    let pageSize = Math.min(this.accessor.getSize(), hitsCount);

    const disabled = this.getHitsCount() <= pageSize;

    const props = {
      label: 'Load more',
      count: `${pageSize} of ${hitsCount}`,
      onClick: () => {
        this.accessor.setSize(Number(pageSize) + Number(config.PAGE_SIZE));
        this.searchkit.performSearch();
      },
    };

    return !disabled
      ? renderComponent(LoadMoreDisplay, props)
      : renderComponent(Stats, props);
  }
}

export default LoadMore;
