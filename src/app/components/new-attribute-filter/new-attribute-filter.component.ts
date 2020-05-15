import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { AttributeFilter, PivotTable, Model, ErrorComponent } from '@gooddata/react-components';

import {
  totalSalesIdentifier,
  locationResortIdentifier,
  locationNameDisplayFormIdentifier,
  menuCategoryAttributeDFIdentifier,
  projectId,
} from '../../../utils/fixtures';
import { VisualizationInput } from '@gooddata/typings';

let self: any;

interface NewAttributeFilterProps {
  projectId: any;
  fullscreenOnMobile: boolean;
  onApplyWithFilterDefinition?: any;
  filter: any;
  locale?: any;
}

export interface PivotTableBucketProps {
  measures: any[];
  rows?: any[];
  columns?: any[];
  filters?: any[];
  sortBy?: any[];
  locale?: any;
}

export interface PivotTableProps extends PivotTableBucketProps {
  projectId: string;
}

export interface ErrorProps {
  code?: string;
  icon?: string;
  message: string;
  description?: string;
  className?: string;
  style?: object;
  width?: any;
  height?: any;
}

@Component({
  selector: 'app-new-attribute-filter',
  template: `<div class="attribute-filter-new" style="height:50px" [id]="rootDomID"></div>
  <div class="attribute-filter-new" style="height:350px" [id]="pivotTableRoomDataID"></div>`,
})

export class NewAttributeFilterComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  message: string;
  filters: any[];
  totalSales = [Model.measure(totalSalesIdentifier)
    .format('#,##0')
    .alias('$ Total Sales')];

  rows = [
    Model.attribute(locationResortIdentifier).localIdentifier('locationResort'),
    Model.attribute(locationNameDisplayFormIdentifier).localIdentifier('name'),
    Model.attribute(menuCategoryAttributeDFIdentifier).localIdentifier('menu'),
  ];

  filter = Model.positiveAttributeFilter(locationResortIdentifier, ['Dallas', 'Hayward', 'Irving'], true);

  public rootDomID: string;

  public pivotTableRoomDataID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getLineDataNode() {
    const node = document.getElementById(this.pivotTableRoomDataID);
    invariant(node, `Node ${this.pivotTableRoomDataID} not found!`);
    return node;
  }

  protected getAttributeProps(): NewAttributeFilterProps {
    return {
      projectId: projectId,
      fullscreenOnMobile: false,
      onApplyWithFilterDefinition: this.onApplyWithFilterDefinition,
      filter: this.filter
    };
  }

  protected getPivotTableProps(): PivotTableProps {
    return {
      projectId: projectId,
      measures: this.totalSales,
      rows: this.rows,
      filters: this.filters
    };
  }

  protected getErrorProps(): ErrorProps {
    return {
      message: this.message,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  onLoadingChanged(...params) {
    // tslint:disable-next-line: no-console
    console.info('NewAttributeFilterComponent onLoadingChanged', ...params);
  }

  onError(...params) {
    // tslint:disable-next-line: no-console
    console.info('NewAttributeFilterComponent onLoadingChanged', ...params);
  }

  onApplyWithFilterDefinition = filter => {
    self.message = null;
    console.log('NewAttributeFilterComponent onApplyWithFilterDefinition', filter);
    const isPositiveFilter = VisualizationInput.isPositiveAttributeFilter(filter);
    const inType = isPositiveFilter ? 'in' : 'notIn';
    const filterItems = isPositiveFilter
      ? filter.positiveAttributeFilter[inType]
      : filter.negativeAttributeFilter[inType];
    if (!filterItems.length && isPositiveFilter) {
      self.message = 'The filter must have at least one item selected';
    } else {
      self.filters = [filter];
    }
    self.renderPivotTable();
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(
        React.createElement(AttributeFilter, this.getAttributeProps()), this.getRootDomNode());
    }
    this.renderPivotTable();
  }

  public renderPivotTable() {
    if (this.message) {
      ReactDOM.render(React.createElement(ErrorComponent, this.getErrorProps()), this.getLineDataNode());
    } else {
      ReactDOM.render(React.createElement(PivotTable, this.getPivotTableProps()), this.getLineDataNode());
    }
  }

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4();
    this.pivotTableRoomDataID = uuid.v4();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
