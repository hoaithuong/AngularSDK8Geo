import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { ColumnChart, Model } from '@gooddata/react-components';

import {
  projectId,
  totalSalesIdentifier,
  locationResortIdentifier,
  totalCostsIdentifier,
} from "../../../utils/fixtures";

interface DualColumnChartBucketProps {
  measures: any[];
  viewBy?: any[];
  sortBy?: any[];
  config?: any;
}

interface DualColumnChartProps {
  projectId: any;
}

@Component({
  selector: 'app-dual-column-chart',
  template: '<div class="dual-column-chart" style="height:500px" [id]="rootDomID"></div>',
})

export class DualColumnChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  totalSalesLocalIdentifier = "totalSales"
  totalCostsLocalIdentifier = "totalCosts"

  measures1 = [
    Model.measure(totalSalesIdentifier)
      .format("#,##0")
      .alias("$ Total Sales")
      .localIdentifier(this.totalSalesLocalIdentifier),
    Model.measure(totalCostsIdentifier)
      .format("#,##0")
      .alias("$ Total Cost")
      .localIdentifier(this.totalCostsLocalIdentifier)
  ]
  
  viewBy = [Model.attribute(locationResortIdentifier)]
  
  config = {
    dataLabels: {
      visible: 'auto'
    },
    legend: {
      enabled: true,
      position: 'top',
    },
    separators: {
      thousand: ',',
      decimal: '.'
    },
    secondary_yaxis: {
      visible: true,
      labelsEnabled: true,
      rotation: "auto",
      measures: [this.totalSalesLocalIdentifier],
    },
    yaxis: {
      visible: true,
      labelsEnabled: true,
      rotation: "auto",
      measures: [this.totalCostsLocalIdentifier],
    },
  }

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  protected getProps(): DualColumnChartProps | DualColumnChartBucketProps {
    return {
      projectId: projectId,
      measures: this.measures1,
      viewBy: this.viewBy,
      config: this.config
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(ColumnChart, this.getProps()), this.getRootDomNode());
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
