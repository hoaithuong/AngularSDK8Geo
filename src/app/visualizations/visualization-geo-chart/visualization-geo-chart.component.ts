import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit ,OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { InsightView, IInsightViewProps } from "@gooddata/sdk-ui-ext";
import { Ldm, LdmExt } from "../../../ldm";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
import { MAPBOX_TOKEN } from '../../../utils/fixturesGeoChart';
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());

interface VisualizationAreaChartProps {
  backend: any;
  workspace: any;
  insight: any;  
  config: any;
}

@Component({
  selector: 'app-visualization-geo-chart',
  template: '<div class="visualization-area-chart" style="height:500px" [id]="rootDomID"></div>',
})
export class VisualizationGeoChartComponent implements OnInit {
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): VisualizationAreaChartProps {
    return {
      workspace: workspace,
      backend: backend,
      insight: Ldm.Insights.GeoPushpinChart,
      config: {
        mapboxToken: MAPBOX_TOKEN,
      },
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(InsightView, this.getProps()), this.getRootDomNode());
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
