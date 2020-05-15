import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { PieChart, Model } from '@gooddata/react-components';

import {
  projectId,
  franchiseFeesAdRoyaltyIdentifier,
  franchiseFeesInitialFranchiseFeeIdentifier,
  franchiseFeesIdentifierOngoingRoyalty,
} from '../../../utils/fixtures.js';

interface PieChartColorMappingBucketProps {
  measures: any[];
  viewBy?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
}

interface PieChartColorMappingProps {
  projectId: any;
}

@Component({
  selector: 'app-pie-chart-color-mapping',
  template: '<div class="pie-chart-color-mapping" style="height:300px" [id]="rootDomID"></div>'
})

export class PieChartColorMappingComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  localIdentifiers = {
    numberOfRestaurants: "numberOfRestaurants",
    totalSales: "totalSales",
    averageRestaurantSales: "averageRestaurantSales",
  };

  measures = [
    Model.measure(franchiseFeesAdRoyaltyIdentifier).format("#,##0").localIdentifier("franchiseFeesAdRoyaltyIdentifier"),
    Model.measure(franchiseFeesInitialFranchiseFeeIdentifier).format("#,##0").localIdentifier("franchiseFeesInitialFranchiseFeeIdentifier"),
    Model.measure(franchiseFeesIdentifierOngoingRoyalty).format("#,##0").localIdentifier("franchiseFeesIdentifierOngoingRoyalty"),
  ]
  config = {
    colorMapping: [
      {
        predicate: headerItem => {
          return headerItem.measureHeaderItem
            ? headerItem.measureHeaderItem &&
            headerItem.measureHeaderItem.localIdentifier === "franchiseFeesAdRoyaltyIdentifier"
            : false;
        },
        color: {
          type: "guid",
          value: "5",
        },
      },
      {
        predicate: headerItem => {
          return headerItem.measureHeaderItem
            ? headerItem.measureHeaderItem &&
            headerItem.measureHeaderItem.localIdentifier === "franchiseFeesIdentifierOngoingRoyalty"
            : false;
        },
        color: {
          type: "rgb",
          value: {
            r: 0,
            g: 0,
            b: 0,
          },
        },
      },
    ],
  }

  public rootDomID: string;
  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): PieChartColorMappingProps | PieChartColorMappingBucketProps {
    return {
      projectId: projectId,
      measures: this.measures,
      config: this.config,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(PieChart, this.getProps()), this.getRootDomNode());
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
