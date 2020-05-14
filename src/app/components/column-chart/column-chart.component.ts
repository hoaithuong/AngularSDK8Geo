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
  franchiseFeesAdRoyaltyIdentifier,
} from "../../../utils/fixtures";

interface ColumnChartBucketProps {
  measures: any[];
  viewBy?: any[];
  stackBy?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
}

interface ColumnChartProps {
  projectId: any;
}

@Component({
  selector: 'app-column-chart',
  template: '<div class="column-chart" style="height:500px" [id]="rootDomID"></div>',
})

export class ColumnChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  measures = [
    Model.measure(totalSalesIdentifier)
      .format("#,##0")
      .alias("$ Total Sales")
      .localIdentifier(totalSalesIdentifier),
    Model.measure(franchiseFeesAdRoyaltyIdentifier)
      .alias("Franchise Fee")
      .format("$#,##0.00")
      .localIdentifier(franchiseFeesAdRoyaltyIdentifier)
  ]
  viewBy = [Model.attribute(locationResortIdentifier).localIdentifier(locationResortIdentifier)]
  filterLocationResort = [Model.positiveAttributeFilter(locationResortIdentifier, ["Irving", "Montgomery", "San Jose", "Deerfield Beach"], true)]
  sortByMeasure = [Model.measureSortItem(totalSalesIdentifier, "desc")]
  sortByAttribute = [Model.attributeSortItem(locationResortIdentifier, "desc")]

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
    stackMeasures: false,
    stackMeasuresToPercent: false,
  }

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): ColumnChartProps | ColumnChartBucketProps {
    return {
      projectId: projectId,
      measures: this.measures,
      viewBy: this.viewBy,
      filters: this.filterLocationResort,
      sortBy: this.sortByMeasure,
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
