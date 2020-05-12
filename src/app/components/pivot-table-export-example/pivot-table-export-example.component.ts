import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as invariant from 'invariant';
import { Component, OnInit } from '@angular/core';
import { PivotTable, Model } from '@gooddata/react-components';
import { ExampleWithExportComponent } from '../utils/example-with-export/example-with-export.component';
import {  
  projectId, 
  franchiseFeesIdentifier, 
  franchiseFeesAdRoyaltyIdentifier,
  franchiseFeesInitialFranchiseFeeIdentifier,
  franchiseFeesIdentifierOngoingRoyalty,
  locationStateDisplayFormIdentifier,
  locationNameDisplayFormIdentifier,
  menuCategoryAttributeDFIdentifier,
  quarterDateIdentifier,
  monthDateIdentifier,
  dateDataSetUri } from '../../../utils/fixtures';

interface ChartProps {
  measures: any[];
  rows: any[];
  columns: any[];
  projectId: any;
  sortBy: any[];
  filters: any[];
  pageSize: any;
  onExportReady?: any;
  onLoadingChanged?: any;
  onError?: any;
}

@Component({
  selector: 'app-pivot-table-export-example',
  template: `<div style ="height: 400px"><div style ="height: 330px" [id]="rootDomID"></div><app-example-with-export></app-example-with-export></div>`
})

export class PivotTableExportExampleComponent implements OnInit {
  constructor(private ExportComponent: ExampleWithExportComponent) { }

  measures = [
    Model.measure(franchiseFeesIdentifier).format("#,##0"),
    Model.measure(franchiseFeesAdRoyaltyIdentifier).format("#,##0"),
    Model.measure(franchiseFeesInitialFranchiseFeeIdentifier).format("#,##0"),
    Model.measure(franchiseFeesIdentifierOngoingRoyalty).format("#,##0"),
  ];
  attributes = [
    Model.attribute(locationStateDisplayFormIdentifier),
    Model.attribute(locationNameDisplayFormIdentifier),
    Model.attribute(menuCategoryAttributeDFIdentifier).localIdentifier("menu"),
  ];
  columns = [Model.attribute(quarterDateIdentifier), Model.attribute(monthDateIdentifier)];
  sortBy = [Model.attributeSortItem("menu", "asc")];
  filters = [Model.absoluteDateFilter(dateDataSetUri, "2017-01-01", "2017-12-31")];
  pageSize = 20;
 
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
      rows: this.attributes,
      columns: this.columns,
      sortBy: this.sortBy,
      filters: this.filters,
      pageSize: this.pageSize,
      onExportReady: this.ExportComponent.onExportReady,
      onLoadingChanged: this.onLoadingChanged,
      onError: this.onError
    };
  }

  protected render() {
    ReactDOM.render(
      React.createElement(PivotTable, this.getProps()), this.getRootDomNode());
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
