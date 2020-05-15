import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { BulletChart, Model, HeaderPredicateFactory } from '@gooddata/react-components';
import {
  projectId,
  totalSalesIdentifier,
  locationResortIdentifier,
  grossProfitIdentifier,
  totalCostsIdentifier,
  locationNameDisplayFormIdentifier,
  dateYearIdentifier,
  dateDataSetUri,
} from "../../../utils/fixtures";

interface BulletChartProps {
  projectId: any;
  primaryMeasure: any;
  targetMeasure?: any;
  comparativeMeasure?: any;
  viewBy?: any[];
  filters?: any[];
  sortBy?: any[];
  drillableItems?: any[];
  onFiredDrillEvent?: any;
  config?: any;
}

@Component({
  selector: 'app-bullet-chart',
  template: '<div class="bullet-chart" style="height:400px" [id]="rootDomID"></div>',
})

export class BulletChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  primaryMeasure = Model.measure(totalSalesIdentifier).localIdentifier('totalSales').format("#,##0").alias("$ Total Sales");

  targetMeasure = Model.measure(grossProfitIdentifier).localIdentifier('grossProfits').format("#,##0").alias("$ Gross Profits");

  comparativeMeasure = Model.measure(totalCostsIdentifier).localIdentifier('totalCosts').format("#,##0").alias("$ Total Costs");

  viewBy = [
    Model.attribute(dateYearIdentifier).localIdentifier('dateYearIdentifier'),
    Model.attribute(locationNameDisplayFormIdentifier).localIdentifier('locationNameIdentifier')
  ];

  filters = [
    Model.positiveAttributeFilter(locationNameDisplayFormIdentifier,['Aventura','Irving'],true),
    Model.negativeAttributeFilter(locationResortIdentifier,['Deerfield Beach'],true),
    Model.absoluteDateFilter(dateDataSetUri, "2016-01-01", "2017-12-31")
  ];

  config = {
    colorMapping: [
      {
        predicate: headerItem => {
          return headerItem.measureHeaderItem
            ? headerItem.measureHeaderItem &&
            headerItem.measureHeaderItem.localIdentifier === 'totalSales' 
            : false;
        },
        color: {
          type: "rgb",
          value: {
            r: 253,
            g: 4,
            b: 249,
          },
        },
      },
      {
        predicate: headerItem => {
          return headerItem.measureHeaderItem
            ? headerItem.measureHeaderItem &&
            headerItem.measureHeaderItem.localIdentifier === 'grossProfits'
            : false;
        },
        color: {
          type: "rgb",
          value: {
            r: 255,
            g: 154,
            b: 0,
          },
        },
      },
      {
        predicate: headerItem => {
          return headerItem.measureHeaderItem
            ? headerItem.measureHeaderItem &&
            headerItem.measureHeaderItem.localIdentifier === 'totalCosts' 
            : false;
        },
        color: {
          type: "rgb",
          value: {
            r: 227,
            g: 246,
            b: 249,
          },
        },
      },
    ],    
    dataLabels: {
      visible: false,
    },
    legend: {
      enabled: true,
      position: 'bottom',
    },
    separators: {
      thousand: ',',
      decimal: '.'
    },
  }

  onDrill = drillEvent => {
    console.log(
      "onFiredDrillEvent",
      drillEvent,
      JSON.stringify(drillEvent.drillContext.intersection, null, 2),
    );
    return true;
  };

  renderDrillValue() {
    let drillEvent;
    if (!drillEvent) {
      return null;
    }
  };

  drillableItems = [
    HeaderPredicateFactory.identifierMatch(dateYearIdentifier),
    HeaderPredicateFactory.identifierMatch(locationNameDisplayFormIdentifier),
  ];

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): BulletChartProps {
    return {
      projectId: projectId,
      primaryMeasure: this.primaryMeasure,
      targetMeasure: this.targetMeasure,
      comparativeMeasure: this.comparativeMeasure,
      viewBy: this.viewBy,
      filters: this.filters,
      drillableItems: this.drillableItems,
      onFiredDrillEvent: this.onDrill,
      config: this.config,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(BulletChart, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v4();
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
