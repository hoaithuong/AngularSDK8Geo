import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Table, Model, HeaderPredicateFactory } from '@gooddata/react-components';

import {
  projectId,
  locationStateDisplayFormIdentifier,
  numberOfRestaurantsIdentifier,
  totalSalesIdentifier,
} from '../../../utils/fixtures.js';

interface ArithmeticMeasureDrillingBucketProps {
  projectId: any;
  measures?: any[];
  attributes?: any[];
  drillableItems: any[];
  onFiredDrillEvent: any;
}

interface ArithmeticMeasureDrillingProps {
  projectId: any;
}

@Component({
  selector: 'app-arithmetic-measure-drilling',
  template: '<div class="arithmetic-measure-drilling" style="height:200px" [id]="rootDomID"></div>',
})
export class ArithmeticMeasureDrillingComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  onLoadingChanged(...params) {
    return console.log("ArithmeticMeasureDrillingComponent onLoadingChanged", ...params);
  }

  onError(...params) {
    return console.log("ArithmeticMeasureDrillingComponent onError", ...params);
  }

  localIdentifiers = {
    numberOfRestaurants: "numberOfRestaurants",
    totalSales: "totalSales",
    averageRestaurantSales: "averageRestaurantSales",
  }

  measures = [
    Model.measure(numberOfRestaurantsIdentifier)
      .localIdentifier(this.localIdentifiers.numberOfRestaurants)
      .format("#,##0"),
    Model.measure(totalSalesIdentifier)
      .localIdentifier(this.localIdentifiers.totalSales)
      .format("#,##0"),
    Model.arithmeticMeasure(
      [this.localIdentifiers.totalSales, this.localIdentifiers.numberOfRestaurants],
      "ratio",
    )
      .localIdentifier(this.localIdentifiers.averageRestaurantSales)
      .format("#,##0")
      .title("$ Avg Restaurant Sales"),
  ]

  attributes = [Model.attribute(locationStateDisplayFormIdentifier).localIdentifier("month")]

  drillableItems = [
    HeaderPredicateFactory.composedFromIdentifier(totalSalesIdentifier)
  ];

  onFiredDrillEvent = (data) => { console.log(data.executionContext); console.log(data.drillContext); }

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): ArithmeticMeasureDrillingProps | ArithmeticMeasureDrillingBucketProps {
    return {
      projectId: projectId,
      measures: this.measures,
      attributes: this.attributes,
      drillableItems: this.drillableItems,
      onFiredDrillEvent: this.onFiredDrillEvent,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(Table, this.getProps()), this.getRootDomNode());
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
