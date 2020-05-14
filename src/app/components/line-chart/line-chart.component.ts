import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { LineChart, Model } from '@gooddata/react-components';

import {
  projectId,
  totalSalesIdentifier,
  locationResortIdentifier,
  franchiseFeesIdentifier,
} from "../../../utils/fixtures";

import { CUSTOM_COLOR_PALETTE } from "../../../utils/colors";

interface LineChartBucketProps {
  measures: any[];
  trendBy?: any;
  segmentBy?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
  locale?: any;
}

interface LineChartProps {
  projectId: any;
}

@Component({
  selector: 'app-line-chart',
  template: '<div class="line-chart" style="height:500px" [id]="rootDomID"></div>',
})

export class LineChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  measures = [
    Model.measure(totalSalesIdentifier)
      .format("#,##0")
      .alias("$ Total Sales"),
    Model.measure(franchiseFeesIdentifier)
      .alias("Franchise Fee")
      .format("$#,##0.00")
  ]
  trendBy = Model.attribute(locationResortIdentifier)
  filterLocationResort = [Model.positiveAttributeFilter(locationResortIdentifier, ["Irving", "Montgomery", "San Jose", "Deerfield Beach"], true)]
  config = {
    colorPalette: CUSTOM_COLOR_PALETTE,
    dataLabels: {
      visible: 'auto'
    },
    legend: {
      enabled: true,
      position: 'top',
    },
    separators: {
      thousand: '.',
      decimal: ','
    },
  }

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): LineChartProps | LineChartBucketProps {
    return {
      projectId: projectId,
      measures: this.measures,
      trendBy: this.trendBy,
      filters: this.filterLocationResort,
      config: this.config
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(LineChart, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
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
