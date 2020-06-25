import { Component, OnInit, Input, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
// import "@gooddata/react-components/styles/css/main.css";
import { GeoPushpinChart, IGeoConfig, PushpinSizeOption } from '@gooddata/sdk-ui-geo';
import { MAPBOX_TOKEN } from "../../../utils/fixturesGeoChart";
import { Ldm } from "../../../ldm";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
import { sizeMeasure, locationAttribute } from 'src/ldm/geoModel';
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());
const POINT_SIZE_OPTIONS = ["default", "0.5x", "0.75x", "normal", "1.25x", "1.5x"];
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
  selector: 'app-geo-pushpin-chart-configuration-points-size-example',
  templateUrl: './geo-pushpin-chart-configuration-points-size-example.component.html',
})
export class GeoPushpinChartConfigurationPointsSizeExampleComponent implements OnInit {

  public rootDomID: string;
  state = {
    minSize: "default",
    maxSize: "default",
  };
  onPointSizeChange = (event: any) => {
    const { id, value } = event.target;
    this.state = ({
      [id]: value,
    } as any);
    this.render();
  };
  renderPointSizeDropDown = (id, label) => React.createElement("span", {
    style: {
      display: "inline-block",
      minWidth: "10em",
      verticalAlign: "middle"
    }
  }, `${label}: `, React.createElement("select", {
    id: id,
    onChange: this.onPointSizeChange
  }, POINT_SIZE_OPTIONS.map(size => React.createElement("option", {
    key: size,
    value: size
  }, size))));

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  
  protected getProps(): GeoChartProps {
    const { minSize, maxSize } = this.state;
    const geoConfig = {
      mapboxToken: MAPBOX_TOKEN,
      points: {
        minSize,
        maxSize,
      },
    };
    return {
      backend: backend,
      workspace: workspace,
      location: locationAttribute,
      size: sizeMeasure,
      config: geoConfig,
      onZoomChanged: this.onZoomChanged,
      onCenterPositionChanged: this.onCenterPositionChanged,
    };
  }
  private isMounted(): boolean {
    return !!this.rootDomID;
  }
  onZoomChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartClusteringExample onZoomChanged", ...params);
  }
  onCenterPositionChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartClusteringExample onCenterPositionChanged", ...params);
  }
  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement("div", {
        className: "s-geo-chart"
      }, React.createElement("div", {
        style: {
          marginTop: "10px"
        }
      }, this.renderPointSizeDropDown("minSize", "Min Size"), this.renderPointSizeDropDown("maxSize", "Max Size")), React.createElement("div", {
        style: {
          height: "500px",
          position: "relative"
        },
        className: "s-geo-pushpin-chart-configuration-points-size"
      }, React.createElement(GeoPushpinChart, this.getProps()))), this.getRootDomNode());
    }
  }
  ngOnInit() {
    this.rootDomID = uuid.v4();
    // this.rootDombtnIDMin = uuid.v4()
  }
  ngOnChanges() {
    this.render();
    // this.renderButton()
  }
  ngAfterViewInit() {
    this.render();
    // this.renderButton()
  }
  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}