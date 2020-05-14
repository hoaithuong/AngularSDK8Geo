import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, Input, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { ComboChart, Model } from '@gooddata/react-components';

import {
  projectId,
  franchiseFeesIdentifier,
  totalSalesIdentifier,
  locationStateDisplayFormIdentifier,
} from '../../../utils/fixtures';

interface ComboChartBucketProps {
  primaryMeasures: any[];
  secondaryMeasures: any[];
  viewBy?: any;
  sortBy?: any[];
  config?: any;
  filters?: any[];
}

interface ComboChartProps {
  projectId: any;
}

@Component({
  selector: 'app-combo-chart',
  template: '<div class="combo-chart" style="height:500px" [id]="rootDomID"></div>',
})

export class ComboChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  primaryMeasures = [
    Model.measure(totalSalesIdentifier)
      .format("#,##0")
      .alias("$ Total Sales")]
      
  secondaryMeasures = [
    Model.measure(franchiseFeesIdentifier)
      .format("#,##0")
      .alias("$ Franchise Fees")]

  viewBy = Model.attribute(locationStateDisplayFormIdentifier)

  config = {
    primaryChartType: 'column',
    secondaryChartType: 'area',

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

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  protected getProps(): ComboChartProps | ComboChartBucketProps {
    return {
      projectId: projectId,
      primaryMeasures: this.primaryMeasures,
      secondaryMeasures: this.secondaryMeasures,
      viewBy: this.viewBy,
      config: this.config,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(ComboChart, this.getProps()), this.getRootDomNode());
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
