import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { AttributeFilter, PivotTable, Model, ErrorComponent } from '@gooddata/react-components';

import {
  totalSalesIdentifier,
  locationResortIdentifier,
  locationResortUri,
  projectId,
} from '../../../utils/fixtures';

let self: any;

interface NewAttributeFilterProps {
  projectId: any;
  fullscreenOnMobile: boolean;
  onApply: any;
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
  selector: 'app-attribute-filter-definition-by-uri',
  template: `<div class="attribute-filter-definition-by-uri" style="height:50px" [id]="rootAttributeFilterDomID"></div>
             <div class="attribute-filter-definition-by-uri" style="height:350px" [id]="tableRoomDataID"></div>`,
})

export class AttributeFilterDefinitionByURIComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  message: string;
  filters: any[];
  totalSales = [Model.measure(totalSalesIdentifier).format('#,##0').alias('$ Total Sales')];

  rows = [Model.attribute(locationResortIdentifier).localIdentifier('locationResort')];

  defaultFilter = Model.positiveAttributeFilter(locationResortIdentifier, [`/gdc/md/${projectId}/obj/2206/elements?id=6340103`], false);

  public rootAttributeFilterDomID: string;
  public tableRoomDataID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootAttributeFilterDomID);
    invariant(node, `Node '${this.rootAttributeFilterDomID} not found!`);
    return node;
  }

  protected getLineDataNode() {
    const node = document.getElementById(this.tableRoomDataID);
    invariant(node, `Node tableRoomDataID not found!`);
    return node;
  }

  protected getAttributeProps(): NewAttributeFilterProps {
    return {
      projectId: projectId,
      fullscreenOnMobile: false,
      filter: this.defaultFilter,
      onApply: this.onApply,
    };
  }

  protected getPivotTableProps(): PivotTableProps {
    return {
      projectId: projectId,
      measures: this.totalSales,
      rows: this.rows,
      filters: this.filters,
    };
  }

  protected getErrorProps(): ErrorProps {
    return {
      message: this.message,
    };
  }

  private isMounted(): boolean {
    return !!this.rootAttributeFilterDomID;
  }

  onApply(filter) {
    self.message = null;
    if (filter.in) {
      self.filters = self.filterPositiveAttribute(filter);
    } else {
      self.filters = self.filterNegativeAttribute(filter);
    }
    self.renderPivotTable();
  }

  public filterPositiveAttribute(filter) {
    const filters = [
      {
        positiveAttributeFilter: {
          displayForm: {
            identifier: filter.id,
          },
          in: filter.in.map(element => `${locationResortUri}/elements?id=${element}`),
        },
      },
    ];
    if (filter.in.length === 0) {
      self.message = 'The filter must have at least one item selected';
    }
    return filters;
  }

  public filterNegativeAttribute(filter) {
    const filters = [
      {
        negativeAttributeFilter: {
          displayForm: {
            identifier: filter.id,
          },
          notIn: filter.notIn.map(element => `${locationResortUri}/elements?id=${element}`),
        },
      },
    ];
    return filters;
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
    this.rootAttributeFilterDomID = uuid.v4();
    this.tableRoomDataID = uuid.v4();
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
