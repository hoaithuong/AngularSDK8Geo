import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as invariant from 'invariant';
import { Component, OnInit } from '@angular/core';
import { projectId, columnVisualizationIdentifierExport, dateDataSetUri } from '../../../utils/fixtures';
import { Model, Visualization } from '@gooddata/react-components';
import { ExampleWithExportComponent } from '../../components/utils/example-with-export/example-with-export.component';

interface VisualizationBarChartProps {
  projectId: any;
  identifier:any;  
  filters: any[];
  onExportReady?: any;
}

@Component({
  selector: 'app-visualization-column-chart-export-example',
  template: `<div style ="height: 400px"><div style ="height: 330px" [id]="rootDomID"></div><app-example-with-export></app-example-with-export></div>`
})

export class VisualizationColumnChartExportExampleComponent implements OnInit {
  constructor(private ExportComponent: ExampleWithExportComponent) { }

  filters = [Model.absoluteDateFilter(dateDataSetUri, "2017-01-01", "2017-12-31")];

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): VisualizationBarChartProps {
    return {
      projectId:projectId,
      identifier: columnVisualizationIdentifierExport,
      filters: this.filters,
      onExportReady: this.ExportComponent.onExportReady,
    };
  }

  protected render() {
    ReactDOM.render(
      React.createElement(Visualization, this.getProps()), this.getRootDomNode());
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
