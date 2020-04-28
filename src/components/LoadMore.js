import React from 'react';
import {PageSizeAccessor, renderComponent, SearchkitComponent} from 'searchkit';
import fetch from 'isomorphic-unfetch';
import get from 'lodash/get';

const LoadMoreDisplay = ({label, fn}) => (
  <button className="btn btn-outline" onClick={fn}>
    {label}
  </button>
);

class LoadMore extends SearchkitComponent {
  accessor;

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      totalCount: 0,
    };

    this.accessor = new PageSizeAccessor();
    this.increaseSize = this.increaseSize.bind(this);
  }

  getCurrentSize() {
    return Number(this.accessor.getSize()) || 1;
  }

  componentDidMount() {
    fetch('http://localhost:9200/gos_node_game/_count')
      .then(response => response.json())
      .then(data => this.setState({totalCount: data.count}));
  }

  increaseSize() {
    this.accessor.setSize(this.getCurrentSize() * 2);
    this.searchkit.performSearch();
  }

  render() {
    const props = {
      label: 'Load more',
      fn: () => this.increaseSize(),
    };

    return renderComponent(LoadMoreDisplay, props);
  }
}

export default LoadMore;
