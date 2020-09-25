import React from 'react';
import SelectFilter from 'SelectFilter';
import {
  RefinementListFilter,
  renderComponent,
  ResetFilters,
  SelectedFilters,
} from 'searchkit';
import Dropdown from 'Dropdown';
import SelectedTag from 'SelectedTag';
import Reset from 'Reset';
import {map} from 'lodash';

class GOSRefinementListFilter extends RefinementListFilter {
  render() {
    if (!this.accessor) return null;
    const {
      listComponent,
      containerComponent,
      showCount,
      title,
      id,
      countFormatter,
    } = this.props;
    return renderComponent(
      containerComponent,
      {
        title,
        className: id ? `filter--${id}` : undefined,
        disabled: !this.hasOptions(),
        selectedItems: this.accessor.state.value,
      },
      [
        renderComponent(listComponent, {
          key: 'listComponent',
          items: this.getItems(),
          itemComponent: this.props.itemComponent,
          selectedItems: this.getSelectedItems(),
          toggleItem: this.toggleFilter.bind(this),
          setItems: this.setFilters.bind(this),
          docCount: this.accessor.getDocCount(),
          showCount,
          translate: this.translate,
          countFormatter,
        }),
        this.renderShowMore(),
      ]
    );
  }
}

class GOSSelectedFilters extends SelectedFilters {
  render() {
    if (!this.hasFilters()) {
      return null;
    }
    return <>{map(this.getFilters(), this.renderFilter.bind(this))}</>;
  }
}

const ResultsFilters = () => (
  <>
    <div className="filters">
      <GOSRefinementListFilter
        id="genres"
        title="Genres"
        field="genres.name.raw"
        operator="AND"
        containerComponent={Dropdown}
        listComponent={SelectFilter}
        orderKey="_term"
      />
      <GOSRefinementListFilter
        id="studios"
        title="Studios"
        field="studios.name.raw"
        fieldOptions={{type: 'nested', options: {path: 'studios'}}}
        operator="AND"
        containerComponent={Dropdown}
        listComponent={SelectFilter}
        orderKey="_term"
      />
    </div>
    <div className="filters-tags d-flex d-flex-gap">
      <GOSSelectedFilters itemComponent={SelectedTag} />
      <ResetFilters component={Reset} />
    </div>
  </>
);

export default ResultsFilters;
