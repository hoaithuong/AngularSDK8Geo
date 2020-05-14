import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { PieChart, Model } from '@gooddata/react-components';
import {
  projectId,
  locationResortIdentifier,
  franchiseFeesAdRoyaltyIdentifier
} from '../../../utils/fixtures';

interface PieChartBucketProps {
  measures: any[];
  viewBy?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
}
interface PieChartProps {
  projectId: any;
}

@Component({
  selector: 'app-pie-chart',
  template: '<div class="pie-chart" style="height:300px" [id]="rootDomID"></div>',
})

export class PieChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  franchiseFee = [Model.measure(franchiseFeesAdRoyaltyIdentifier).alias("Franchise Fee").format("$#,##0.00")]
  locationState = Model.attribute(locationResortIdentifier)
  filterLocationResort = [Model.positiveAttributeFilter(locationResortIdentifier, ["Irving", "Montgomery", "San Jose", "Deerfield Beach"], true)]
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

  protected getProps(): PieChartProps | PieChartBucketProps {
    return {
      projectId: projectId,
      measures: this.franchiseFee,
      viewBy: this.locationState,
      filters: this.filterLocationResort,
      config: this.config
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(PieChart, this.getProps()), this.getRootDomNode());
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
