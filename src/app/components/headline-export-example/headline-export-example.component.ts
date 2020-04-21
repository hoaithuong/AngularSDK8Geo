import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as invariant from 'invariant';
import { Component, OnInit } from '@angular/core';
import { Headline, Model } from '@gooddata/react-components';
import { ExampleWithExportComponent } from '../utils/example-with-export/example-with-export.component';
import {  
  projectId, 
  dateDataSetUri,
  franchiseFeesIdentifier,
  franchiseFeesAdRoyaltyIdentifier } from '../../../utils/fixtures';

interface ChartProps {
  primaryMeasure: any;
  secondaryMeasure: any;
  filters: any[];
  projectId: any;
  onExportReady?: any;
  onLoadingChanged?: any;
  onError?: any;
}

@Component({
  selector: 'app-headline-export-example',
  template: `<div style ="height: 400px"><div style ="height: 330px" [id]="rootDomID"></div><app-example-with-export></app-example-with-export></div>`
})

export class HeadlineExportExampleComponent implements OnInit {
  constructor(private ExportComponent: ExampleWithExportComponent) { }

  primaryMeasure = Model.measure(franchiseFeesIdentifier).format("#,##0");
  secondaryMeasure = Model.measure(franchiseFeesAdRoyaltyIdentifier).format("#,##0");
  filters = [Model.absoluteDateFilter(dateDataSetUri, "2017-01-01", "2017-12-31")];
 
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
      primaryMeasure: this.primaryMeasure,
      secondaryMeasure: this.secondaryMeasure,
      filters: this.filters,
      onExportReady: this.ExportComponent.onExportReady,
      onLoadingChanged: this.onLoadingChanged,
      onError: this.onError
    };
  }

  protected render() {
    ReactDOM.render(
      React.createElement(Headline, this.getProps()), this.getRootDomNode());
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
