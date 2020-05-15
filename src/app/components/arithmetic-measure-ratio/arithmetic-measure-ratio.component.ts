import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Table, Model } from '@gooddata/react-components';

import {
  projectId,
  locationStateDisplayFormIdentifier,
  numberOfRestaurantsIdentifier,
  totalSalesIdentifier,
} from '../../../utils/fixtures.js';

interface ArithmeticMeasuresRatioBucketProps {
  projectId: any;
  measures?: any[];
  attributes?: any[];
}

interface ArithmeticMeasuresRatioProps {
  projectId: any;
}

@Component({
  selector: 'app-arithmetic-measures-ratio',
  template: '<div class="arithmetic-measures-ratio" style="height:200px" [id]="rootDomID"></div>',
})

export class ArithmeticMeasuresRatioComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  onLoadingChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("ArithmeticMeasuresRatioComponent onLoadingChanged", ...params);
  }

  onError(...params) {
    // eslint-disable-next-line no-console
    return console.log("ArithmeticMeasuresRatioComponent onError", ...params);
  }

  localIdentifiers = {
    numberOfRestaurants: "numberOfRestaurants",
    averageRestaurantDailyCosts: "averageRestaurantDailyCosts",
    averageRestaurantSales: "averageRestaurantSales",
  }

  measures = [
    Model.measure(numberOfRestaurantsIdentifier)
      .localIdentifier(this.localIdentifiers.numberOfRestaurants)
      .format("#,##0"),
    Model.measure(totalSalesIdentifier)
      .localIdentifier(this.localIdentifiers.averageRestaurantDailyCosts)
      .format("#,##0"),
    Model.arithmeticMeasure([this.localIdentifiers.numberOfRestaurants, this.localIdentifiers.averageRestaurantDailyCosts], "ratio")
      .localIdentifier(this.localIdentifiers.averageRestaurantSales)
      .format("#,##0")
      .title("$ Avg State Daily Sales"),
  ]

  attributes = [Model.attribute(locationStateDisplayFormIdentifier).localIdentifier("month")]

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): ArithmeticMeasuresRatioProps | ArithmeticMeasuresRatioBucketProps {
    return {
      projectId: projectId,
      measures: this.measures,
      attributes: this.attributes
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
