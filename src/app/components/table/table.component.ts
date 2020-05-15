import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import '@gooddata/react-components/styles/css/main.css';
import { Table, Model } from '@gooddata/react-components';
import {
  projectId,
  monthDateIdentifier,
  franchiseFeesIdentifier,
  franchiseFeesAdRoyaltyIdentifier,
  franchiseFeesInitialFranchiseFeeIdentifier,
  franchiseFeesIdentifierOngoingRoyalty,
} from '../../../utils/fixtures.js';

interface TableBucketProps {
  projectId:any;
  measures?: any[];
  attributes?: any[];  
  totals?: any[];
  filters?: any[];
  sortBy?: any[];
}

interface TableProps {
  projectId: any;  
}

@Component({
  selector: 'app-table',
  template: '<div class="table" style="height:500px" [id]="rootDomID"></div>'
})

export class TableComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit  {
  measures=[
    Model.measure(franchiseFeesIdentifier)
        .format("#,##0")
        .localIdentifier("franchiseFeesIdentifier"),
    Model.measure(franchiseFeesAdRoyaltyIdentifier)
        .format("#,##0")
        .localIdentifier("franchiseFeesAdRoyaltyIdentifier"),
    Model.measure(franchiseFeesInitialFranchiseFeeIdentifier)
        .format("#,##0")
        .localIdentifier("franchiseFeesInitialFranchiseFeeIdentifier"),
    Model.measure(franchiseFeesIdentifierOngoingRoyalty)
        .format("#,##0")
        .localIdentifier("franchiseFeesIdentifierOngoingRoyalty"),
  ]

  attributes=[Model.attribute(monthDateIdentifier).localIdentifier("month")] 

  totals = [
    {
        measureIdentifier: "franchiseFeesIdentifier",
        type: "avg",
        attributeIdentifier: "month",
    },
    {
        measureIdentifier: "franchiseFeesAdRoyaltyIdentifier",
        type: "avg",
        attributeIdentifier: "month",
    },
    {
        measureIdentifier: "franchiseFeesInitialFranchiseFeeIdentifier",
        type: "avg",
        attributeIdentifier: "month",
    },
    {
        measureIdentifier: "franchiseFeesIdentifierOngoingRoyalty",
        type: "avg",
        attributeIdentifier: "month",
    },
  ]

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  
  protected getProps(): TableProps | TableBucketProps {
    return {
      projectId: projectId,     
      measures:this.measures,
      attributes:this.attributes,
      totals:this.totals,
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
