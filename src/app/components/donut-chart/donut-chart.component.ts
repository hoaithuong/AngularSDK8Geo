import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { DonutChart, Model } from '@gooddata/react-components';
import {
  projectId,
  locationResortIdentifier,
  franchiseFeesAdRoyaltyIdentifier
} from '../../../utils/fixtures';

interface DonutChartBucketProps {
  measures: any[];
  viewBy?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
}

interface DonutChartProps {
  projectId: any;
}

@Component({
  selector: 'app-donut-chart',
  template: '<div class="donut-chart" style="height:300px" [id]="rootDomID"></div>',
})

export class DonutChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  franchiseFee = [Model.measure(franchiseFeesAdRoyaltyIdentifier)
    .alias("Franchise Fee")
    .format("[>=100000][color=2190c0] #,##0.##$; [>=50000][color=A7BC0A] #,##0.##$; [>=20000][color=A7BC0A] #,##0.##$; [>=10000][color=EF3333] #,##0.##$; [>=0][color=c02190] #,##0.##$; [=Null] No data")
    .filters(Model.positiveAttributeFilter(locationResortIdentifier, ["Irving", "Montgomery", "San Jose", "Deerfield Beach"], true))
  ]

  locationState = Model.attribute(locationResortIdentifier)

  config = {
    colors: ['rgb(195, 49, 73)', 'rgb(168, 194, 86)', 'rgb(213, 214, 0)', 'rgb(65, 69, 195)'],
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

  protected getProps(): DonutChartProps | DonutChartBucketProps {
    return {
      projectId: projectId,
      measures: this.franchiseFee,
      viewBy: this.locationState,
      config: this.config
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(DonutChart, this.getProps()), this.getRootDomNode());
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
