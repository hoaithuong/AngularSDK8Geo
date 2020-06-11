import { Component, OnInit, Input, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import "@gooddata/react-components/styles/css/main.css";

import { GeoPushpinChart } from '@gooddata/sdk-ui-geo';
import { CUSTOM_COLOR_PALETTE } from "../../../utils/colors";
import {
    tooltipTextAttribute,
    sizeMeasure,
    locationAttribute,
    segmentByAttribute,
    colorMeasure,
    attributeUriPredicate,
} from "../../../ldm/geoModel";
import { HeaderPredicates } from "@gooddata/sdk-ui";
import { IColorMapping } from "@gooddata/sdk-ui-charts";
import { MAPBOX_TOKEN } from '../../../utils/fixturesGeoChart';
import { Ldm } from "../../../ldm";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());

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
  selector: 'app-geo-pushpin-chart-configuration-color-mapping-example',
  template: '<div class="example"><div class="s-geo-pushpin-chart-configuration-color-mapping" style="height:500px" [id]="rootDomID"></div></div>',
})
export class GeoPushpinChartConfigurationColorMappingExampleComponent implements OnInit {

  colorMapping: IColorMapping[] = [
    {
        predicate: attributeUriPredicate, // find attribute item by uri
        color: {
            type: "guid",
            value: "03",
        },
    },
    {
        predicate: HeaderPredicates.attributeItemNameMatch("Hawaii"),
        color: {
            type: "rgb",
            value: { r: 162, g: 37, b: 34 },
        },
    },
  ];

  geoConfig = {
    tooltipText: tooltipTextAttribute,
    mapboxToken: MAPBOX_TOKEN,
    colorPalette: CUSTOM_COLOR_PALETTE,
    colorMapping: this.colorMapping
  };
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): GeoChartProps {
    return {      
      backend: backend,
      workspace: workspace,
      location: locationAttribute,
      size: sizeMeasure,
      color: colorMeasure,
      segmentBy: segmentByAttribute,
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

  onLoadingChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartClusteringExample onLoadingChanged", ...params);
  }

  onError(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartClusteringExample onError", ...params);
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
      ReactDOM.render(React.createElement(GeoPushpinChart, this.getProps()), this.getRootDomNode());
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
