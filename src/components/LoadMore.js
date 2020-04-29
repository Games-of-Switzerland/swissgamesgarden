import React from 'react';
import {PageSizeAccessor, renderComponent, SearchkitComponent} from 'searchkit';
import fetch from 'isomorphic-unfetch';
import config from '../config';

const LoadMoreDisplay = ({label, fn}) => (
  <button className="btn btn-outline" onClick={fn}>
    {label}
  </button>
);

class LoadMore extends SearchkitComponent {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      totalCount: 0,
    };
  }

  defineAccessor() {
    return new PageSizeAccessor(config.PAGE_SIZE);
  }

  componentDidMount() {
    super.componentDidMount();

    fetch(`${config.QUERY_GAMES_URL}/_count`)
      .then(response => response.json())
      .then(data => this.setState({totalCount: data.count}));
  }

  render() {
    const props = {
      label: 'Load more',
      fn: () => {
        this.accessor.setSize(this.accessor.getSize() + config.PAGE_SIZE);
        this.searchkit.performSearch();
      },
    };

    if (!this.accessor || this.accessor.getSize() >= this.state.totalCount)
      return null;
    return renderComponent(LoadMoreDisplay, props);
  }
}

export default LoadMore;
