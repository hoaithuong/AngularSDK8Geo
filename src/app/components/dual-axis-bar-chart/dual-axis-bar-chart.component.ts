import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Visualization } from '@gooddata/react-components';
import "@gooddata/react-components/styles/css/main.css";
import {
  projectId,
  dualAxisBarVisualizationIdentifier,
  totalSalesLocalIdentifier,
  totalCostsLocalIdentifier,
} from "../../../utils/fixtures";

interface VisualizationDualProps {
  projectId: any;
  identifier: any;
  config: any
}

@Component({
  selector: 'app-dual-axis-bar-chart',
  template: '<div style="height: 300px" [id]="rootDomID"></div>',
})

export class DualAxisBarChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public rootDomID: string;
  config = {
    secondary_xaxis: {
      visible: true,
      labelsEnabled: true,
      rotation: "auto",
      min: "-75000000",
      max: "75000000",
      measures: [totalSalesLocalIdentifier],
    },
    xaxis: {
      visible: true,
      labelsEnabled: true,
      rotation: "auto",
      min: "-75000000",
      max: "75000000",
      measures: [totalCostsLocalIdentifier],
    },
  };

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): VisualizationDualProps {
    return {
      projectId: projectId,
      identifier: dualAxisBarVisualizationIdentifier,
      config: this.config
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(Visualization, this.getProps()), this.getRootDomNode());
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
