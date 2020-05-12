import * as ReactDOM from 'react-dom';
import * as invariant from 'invariant';
import * as React from 'react';
import { Component, OnInit } from '@angular/core';
import { Table, Model } from '@gooddata/react-components';
import { ExampleWithExportComponent } from '../utils/example-with-export/example-with-export.component';
import {  
  projectId, 
  franchiseFeesIdentifier, 
  franchiseFeesAdRoyaltyIdentifier, 
  franchiseFeesInitialFranchiseFeeIdentifier,
  franchiseFeesIdentifierOngoingRoyalty,
  monthDateIdentifier,
  dateDataSetUri } from '../../../utils/fixtures';

interface ChartProps {
  measures: any[];
  projectId: any;
  attributes: any[];
  filters: any[];
  totals: any[];
  onExportReady?: any;
  onLoadingChanged?: any;
  onError?: any;
}

@Component({
  selector: 'app-table-export-example',
  template: `<div style ="height: 400px"><div style ="height: 330px" [id]="rootDomID"></div><app-example-with-export></app-example-with-export></div>`
})

export class TableExportExampleComponent implements OnInit {
  constructor(private ExportComponent: ExampleWithExportComponent) { }

  measures = [
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
  ];
  attributes = [Model.attribute(monthDateIdentifier).localIdentifier("month")];
  filters = [Model.absoluteDateFilter(dateDataSetUri, "2017-01-01", "2017-12-31")];
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
  ];
 
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  onLoadingChanged(...params) {
    // eslint-disable-next-line no-console
    console.info("TableExportExample onLoadingChanged", ...params);
  }

  onError(...params) {
    // eslint-disable-next-line no-console
    console.info("TableExportExample onLoadingChanged", ...params);
  }

  protected getProps(): ChartProps {
    return {
      projectId: projectId,
      measures: this.measures,
      attributes: this.attributes,
      filters: this.filters,
      totals: this.totals,
      onExportReady: this.ExportComponent.onExportReady,
      onLoadingChanged: this.onLoadingChanged,
      onError: this.onError
    };
  }

  protected render() {
    ReactDOM.render(
      React.createElement(Table, this.getProps()), this.getRootDomNode());
  }

  ngOnInit() {
    this.rootDomID = 'rootDomID';
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }    
}
