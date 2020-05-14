import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { AttributeFilter, LineChart, Model, ErrorComponent } from '@gooddata/react-components';

import {
  totalSalesIdentifier,
  locationResortIdentifier,
  locationResortUri,
  projectId,
} from '../../../utils/fixtures';

let self: any;

interface AttributeFilterProps {
  projectId: any;
  identifier: any;
  fullscreenOnMobile: boolean;
  onApply: any;
}

export interface LineChartBucketProps {
  measures: any[];
  trendBy?: any;
  segmentBy?: any;
  filters?: any[];
  sortBy?: any[];
}

export interface LineChartProps extends LineChartBucketProps {
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
  selector: 'app-attribute-filter-example',
  template: `<div class="attribute-filter" style="height:50px" [id]="rootDomID"></div>
  <div class="attribute-filter" style="height:500px" [id]="lineRoomData"></div>`,
})

export class AttributeFilterExampleComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public rootDomID: string;
  public lineRoomData: string;
  message: string;
  filters: any[];

  totalSales = [Model.measure(totalSalesIdentifier)
    .format('#,##0')
    .alias('$ Total Sales')];

  locationResort = Model.attribute(locationResortIdentifier);

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getLineDataNode() {
    const node = document.getElementById(this.lineRoomData);
    invariant(node, `Node lineRoomData not found!`);
    return node;
  }

  protected getAttributeProps(): AttributeFilterProps {
    return {
      projectId: projectId,
      identifier: locationResortIdentifier,
      onApply: this.onApply,
      fullscreenOnMobile: false,

    };
  }

  protected getLineChartProps(): LineChartProps {
    return {
      projectId: projectId,
      measures: this.totalSales,
      trendBy: this.locationResort,
      filters: this.filters,
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

  onApply(filter) {
    self.message = null;
    if (filter.in) {
      self.filters = self.filterPositiveAttribute(filter);
    } else {
      self.filters = self.filterNegativeAttribute(filter);
    }
    self.renderLineChart();
  }

  public filterPositiveAttribute(filter) {
    var filters;
    if (filter.in.length !== 0) {
      filters = [
        {
          positiveAttributeFilter: {
            displayForm: {
              identifier: filter.id,
            },
            in: filter.in.map(element => `${locationResortUri}/elements?id=${element}`),
          },
        },
      ];
    } else {
      return self.message = 'The filter must have at least one item selected';
    }
    return filters;
  }

  public filterNegativeAttribute(filter) {
    var filters;
    if (filter.notIn.length !== 0) {
      filters = [
        {
          negativeAttributeFilter: {
            displayForm: {
              identifier: filter.id,
            },
            notIn: filter.notIn.map(element => `${locationResortUri}/elements?id=${element}`),
          },
        },
      ];
    }
    return filters;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(
        React.createElement(AttributeFilter, this.getAttributeProps()), this.getRootDomNode());
    }
    this.renderLineChart();
  }

  public renderLineChart() {
    if (this.message) {
      ReactDOM.render(React.createElement(ErrorComponent, this.getErrorProps()), this.getLineDataNode());
    } else {
      ReactDOM.render(React.createElement(LineChart, this.getLineChartProps()), this.getLineDataNode());
    }
  }

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4();
    this.lineRoomData = uuid.v4();
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
