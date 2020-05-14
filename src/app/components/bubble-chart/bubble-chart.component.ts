import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { BubbleChart, Model } from '@gooddata/react-components';
import {
  projectId,
  locationResortIdentifier,
  franchiseFeesIdentifier,
  totalSalesIdentifier,
  grossProfitIdentifier,
} from '../../../utils/fixtures';

interface BubbleChartBucketProps {
  xAxisMeasure?: any;
  yAxisMeasure?: any;
  size?: any;
  viewBy?: any;
  config?: any;
}

interface BubbleChartProps {
  projectId: any;
}

@Component({
  selector: 'app-bubble-chart',
  template: '<div class="bubble-chart" style="height:300px" [id]="rootDomID"></div>',
})

export class BubbleChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  xAxismeasure = Model.measure(totalSalesIdentifier).format("#,##0").alias("$ Total Sales")

  yAxismeasure = Model.measure(franchiseFeesIdentifier).alias("Franchise Fee").format("$#,##0.00")

  size = Model.measure(grossProfitIdentifier).alias("Gross Profit").format("$#,##0.00")

  viewBy = Model.attribute(locationResortIdentifier)

  config = {
    dataLabels: {
      visible: 'auto'
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
  protected getProps(): BubbleChartProps | BubbleChartBucketProps {
    return {
      projectId: projectId,
      xAxisMeasure: this.xAxismeasure,
      yAxisMeasure: this.yAxismeasure,
      size: this.size,
      viewBy: this.viewBy,
      config: this.config,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(BubbleChart, this.getProps()), this.getRootDomNode());
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
