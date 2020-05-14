import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, Input, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Heatmap, Model } from '@gooddata/react-components';

import {
  projectId,
  locationResortIdentifier,
  totalSalesIdentifier,
  locationStateDisplayFormIdentifier,
} from '../../../utils/fixtures';

interface HeatMapBucketProps {
  measure: any
  columns?: any;
  rows?: any;
  sortBy?: any[];
  locale?: any;
  config?: any;
  filters?: any[];
}

interface HeatMapProps {
  projectId: any;
}

@Component({
  selector: 'app-heat-map',
  template: '<div class="heat-map" style="height:500px" [id]="rootDomID"></div>',
})

export class HeatMapComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  measures = Model.measure(totalSalesIdentifier).format("#,##0").alias("$ Total Sales")

  columns = Model.attribute(locationResortIdentifier)

  rows = Model.attribute(locationStateDisplayFormIdentifier)

  filterLocationResort = [Model.positiveAttributeFilter(locationResortIdentifier, ["Irving", "Montgomery", "San Jose", "Deerfield Beach"], true)]

  config = {
    dataLabels: {
      visible: 'auto'
    },
    legend: {
      enabled: true,
      position: 'top',
    },
    separators: {
      thousand: ',',
      decimal: '.'
    },
  }

  public rootDomID: string;
  protected getProps(): HeatMapProps | HeatMapBucketProps {
    return {
      projectId: projectId,
      measure: this.measures,
      columns: this.columns,
      rows: this.rows,
      filters: this.filterLocationResort,
      config: this.config,
    };
  }

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(Heatmap, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
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
