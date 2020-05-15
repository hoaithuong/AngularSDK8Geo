import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { ColumnChart, Model } from '@gooddata/react-components';

import {
  projectId,
  totalSalesIdentifier,
  locationResortIdentifier,
} from "../../../utils/fixtures";

interface MeasureSortingProps {
  projectId: any;
  measures: any[];
  viewBy?: any[];
  stackBy?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
}

@Component({
  selector: 'app-measure-sorting',
  template: '<div class="measure-sorting" style="height:350px" [id]="rootDomID"></div>',
})

export class MeasureSortingExampleComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  measures = [Model.measure(totalSalesIdentifier).format("#,##0").alias("$ Total Sales").localIdentifier(totalSalesIdentifier)]

  viewBy = [Model.attribute(locationResortIdentifier).localIdentifier(locationResortIdentifier)]

  sortByMeasure = [Model.measureSortItem(totalSalesIdentifier, "desc")]

  config = {
    colors: ['rgb(195, 49, 73)', 'rgb(168, 194, 86)', 'rgb(213, 214, 0)', 'rgb(65, 69, 195)'],
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
    stackMeasures: false,
    stackMeasuresToPercent: false,
  }

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): MeasureSortingProps {
    return {
      projectId: projectId,
      measures: this.measures,
      viewBy: this.viewBy,
      sortBy: this.sortByMeasure,
      config: this.config
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(ColumnChart, this.getProps()), this.getRootDomNode());
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
