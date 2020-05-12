import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as invariant from 'invariant';
import { BarChart, Model } from '@gooddata/react-components';
import { Component, OnInit } from '@angular/core';
import { ExampleWithExportComponent } from '../utils/example-with-export/example-with-export.component';
import {
  projectId,
  totalSalesIdentifier,
  locationResortIdentifier,
  dateDataSetUri } from '../../../utils/fixtures';

interface ChartProps {
  measures: any[];
  projectId: any;
  viewBy: any[];
  filters: any[];
  onExportReady?: any;
  onLoadingChanged?: any;
  onError?: any;
}

@Component({
  selector: 'app-bar-chart-export-example',
  template: `<div style ="height: 400px"><div style ="height: 330px" [id]="rootDomID"></div><app-example-with-export></app-example-with-export></div>`
})

export class BarChartExportExampleComponent implements OnInit {
  constructor(private ExportComponent: ExampleWithExportComponent) { }

  amount = [Model.measure(totalSalesIdentifier)
    .format("#,##0")
    .alias("$ Total Sales")];
  locationResort = [Model.attribute(locationResortIdentifier)];
  filters = [Model.absoluteDateFilter(dateDataSetUri, "2017-01-01", "2017-12-31")]

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
      measures: this.amount,
      viewBy: this.locationResort,
      filters: this.filters,
      onExportReady: this.ExportComponent.onExportReady,
      onLoadingChanged: this.onLoadingChanged,
      onError: this.onError
    };
  }

  protected render() {
    ReactDOM.render(
      React.createElement(BarChart, this.getProps()), this.getRootDomNode());
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
