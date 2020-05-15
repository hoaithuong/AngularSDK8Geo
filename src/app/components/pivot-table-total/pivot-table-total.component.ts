import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import '@gooddata/react-components/styles/css/main.css';
import { PivotTable, Model } from '@gooddata/react-components';
import {
  projectId,
  quarterDateIdentifier,
  monthDateIdentifier,
  locationStateDisplayFormIdentifier,
  locationNameDisplayFormIdentifier,
  franchiseFeesIdentifier,
  franchiseFeesAdRoyaltyIdentifier,
  franchiseFeesInitialFranchiseFeeIdentifier,
  franchiseFeesIdentifierOngoingRoyalty,
  menuCategoryAttributeDFIdentifier,
} from '../../../utils/fixtures.js';

interface PivotTableTotalsBucketProps {
  projectId: any;
  measures?: any[];
  rows?: any[];
  columns?: any[];
  totals?: any[];
  filters?: any[];
  sortBy?: any[];
}

interface PivotTableTotalsProps {
  projectId: any;
  pageSize: number;
  config: (any),
  groupRows: boolean,
}

@Component({
  selector: 'app-pivot-table-totals',
  template: '<div class="pivot-table-totals" style="height:500px" [id]="rootDomID"></div>',
})

export class PivotTableTotalsComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  measures = [
    Model.measure(franchiseFeesIdentifier).format("#,##0").localIdentifier("franchiseFeesIdentifier"),
    Model.measure(franchiseFeesAdRoyaltyIdentifier).format("#,##0").localIdentifier("franchiseFeesAdRoyaltyIdentifier"),
    Model.measure(franchiseFeesInitialFranchiseFeeIdentifier).format("#,##0").localIdentifier("franchiseFeesInitialFranchiseFeeIdentifier"),
    Model.measure(franchiseFeesIdentifierOngoingRoyalty).format("#,##0").localIdentifier("franchiseFeesIdentifierOngoingRoyalty"),
  ]
  rows = [
    Model.attribute(locationStateDisplayFormIdentifier).localIdentifier("state"),
    Model.attribute(locationNameDisplayFormIdentifier).localIdentifier("name"),
    Model.attribute(menuCategoryAttributeDFIdentifier).localIdentifier("menu"),
  ]
  columns = [Model.attribute(quarterDateIdentifier), Model.attribute(monthDateIdentifier)]

  sortBy = [Model.attributeSortItem("state", "asc")];

  totals = [
    {
      measureIdentifier: "franchiseFeesIdentifier",
      type: "sum",
      attributeIdentifier: "state",
    },
    {
      measureIdentifier: "franchiseFeesIdentifier",
      type: "avg",
      attributeIdentifier: "state",
    },
    {
      measureIdentifier: "franchiseFeesAdRoyaltyIdentifier",
      type: "sum",
      attributeIdentifier: "state",
    },
    {
      measureIdentifier: "franchiseFeesIdentifier",
      type: "max",
      attributeIdentifier: "state",
    },
    {
      measureIdentifier: "franchiseFeesIdentifier",
      type: "sum",
      attributeIdentifier: "name",
    },
    {
      measureIdentifier: "franchiseFeesIdentifier",
      type: "avg",
      attributeIdentifier: "name",
    },
    {
      measureIdentifier: "franchiseFeesAdRoyaltyIdentifier",
      type: "sum",
      attributeIdentifier: "name",
    },
    {
      measureIdentifier: "franchiseFeesIdentifier",
      type: "sum",
      attributeIdentifier: "menu",
    },
    {
      measureIdentifier: "franchiseFeesIdentifier",
      type: "avg",
      attributeIdentifier: "menu",
    },
    {
      measureIdentifier: "franchiseFeesAdRoyaltyIdentifier",
      type: "nat",
      attributeIdentifier: "menu",
    },
    {
      measureIdentifier: "franchiseFeesIdentifier",
      type: "med",
      attributeIdentifier: "menu",
    },
  ];

  config = {
    menu: {
      aggregations: true,
      aggregationsSubMenu: true,
    }
  }

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): PivotTableTotalsProps | PivotTableTotalsBucketProps {
    return {
      projectId: projectId,
      measures: this.measures,
      rows: this.rows,
      columns: this.columns,
      totals: this.totals,
      sortBy: this.sortBy,
      pageSize: 20,
      groupRows: true,
      config: this.config
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(PivotTable, this.getProps()), this.getRootDomNode());
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
