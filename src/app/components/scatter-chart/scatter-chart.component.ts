import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { ScatterPlot, Model } from '@gooddata/react-components';
import {
  projectId,
  locationResortIdentifier,
  franchiseFeesIdentifier,
  totalSalesIdentifier,
} from '../../../utils/fixtures';

interface ScatterPlotBucketProps {
  xAxisMeasure?: any;
  yAxisMeasure?: any;
  attribute?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
}

interface ScatterPlotProps {
  projectId: any;
}

@Component({
  selector: 'app-scatter-plot',
  template: '<div class="scatter-plot" style="height:300px" [id]="rootDomID"></div>',
})

export class ScatterPlotComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  xAxismeasure = Model.measure(totalSalesIdentifier).format("#,##0").alias("$ Total Sales")
  yAxismeasure = Model.measure(franchiseFeesIdentifier).alias("Franchise Fee").format("$#,##0.00")
  attribute = Model.attribute(locationResortIdentifier)
  config = {
    dataLabels: {
      visible: true
    },
    legend: {
      enabled: true,
      position: 'left',
    },
    separators: {
      thousand: ',',
      decimal: '.'
    }
  }

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): ScatterPlotProps | ScatterPlotBucketProps {
    return {
      projectId: projectId,
      xAxisMeasure: this.xAxismeasure,
      yAxisMeasure: this.yAxismeasure,
      attribute: this.attribute,
      config: this.config,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(ScatterPlot, this.getProps()), this.getRootDomNode());
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
