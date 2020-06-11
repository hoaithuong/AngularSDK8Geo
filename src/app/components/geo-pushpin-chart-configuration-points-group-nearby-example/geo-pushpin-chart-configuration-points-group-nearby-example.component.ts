import { Component, OnInit, Input, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import "@gooddata/react-components/styles/css/main.css";

import { GeoPushpinChart } from '@gooddata/sdk-ui-geo';
import { locationAttribute } from "../../../ldm/geoModel";
import { MAPBOX_TOKEN } from '../../../utils/fixturesGeoChart';
import { Ldm } from "../../../ldm";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";

let self: any;

const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());
type State = {
  groupNearbyPoints: boolean;
};

interface GeoChartProps {
  backend: any;
  workspace: any;
  location: any;
  size?: any;
  color?: any;
  segmentBy?: any;
  config?: any;
  onZoomChanged?: any;
  onCenterPositionChanged?: any;
  onLoadingChanged?: any;
  onError?: any;
}

@Component({
  selector: 'app-geo-pushpin-chart-configuration-points-group-nearby-example',
  template: `<div class="example">
              <span [id]="rootDombtnID"></span>
              <div class="s-geo-pushpin-chart-configuration-points-group-nearby" style="height:500px" [id]="rootDomID"></div>
            </div>`,
})

export class GeoPushpinChartConfigurationPointsGroupNearbyExampleComponent implements OnInit {
  state = {
    groupNearbyPoints: false,
  };
  
  geoConfig = {
    mapboxToken: MAPBOX_TOKEN,
    points: {
        groupNearbyPoints: this.state.groupNearbyPoints,
    },
  };
  public rootDomID: string;
  public rootDombtnID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getbtnRootDomNode() {
    const node = document.getElementById(this.rootDombtnID);
    invariant(node, `Node '${this.rootDombtnID} not found!`);
    return node;
  }

  protected getProps(): GeoChartProps {
    return {      
      backend: backend,
      workspace: workspace,
      location: locationAttribute,
      config: this.geoConfig,
      onZoomChanged: this.onZoomChanged,
      onCenterPositionChanged: this.onCenterPositionChanged,
      onLoadingChanged: this.onLoadingChanged,
      onError: this.onError
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  private toggleGroupNearbyPoints = () => {
      this.state.groupNearbyPoints = !this.state.groupNearbyPoints
  };

private onLoadingChanged(...params: any[]) {
    // tslint:disable-next-line:no-console
    return console.log(
        "GeoPushpinChartConfigurationPointsGroupNearbyExample onLoadingChanged",
        ...params,
    );
    
}

private onError(...params: any[]) {
    // tslint:disable-next-line:no-console
    return console.log("GeoPushpinChartConfigurationPointsGroupNearbyExample onError", ...params);
}

private onZoomChanged(...params: any[]) {
    // tslint:disable-next-line:no-console
    return console.log("GeoPushpinChartConfigurationPointsGroupNearbyExample onZoomChanged", ...params);
}

private onCenterPositionChanged(...params: any[]) {
    // tslint:disable-next-line:no-console
    return console.log(
        "GeoPushpinChartConfigurationPointsGroupNearbyExample onCenterPositionChanged",
        ...params,
    );
}

  protected render() {
    ReactDOM.render(React.createElement("button", {
      className: "s-change-group-nearby-points",
      onClick: this.toggleGroupNearbyPoints()
    }, "Toggle Group nearby points"),this.getbtnRootDomNode());
    this.renderchart();
  }

  protected renderchart() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(GeoPushpinChart, this.getProps()), this.getRootDomNode());
    }
    }


  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4();
    this.rootDombtnID = uuid.v4();
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
