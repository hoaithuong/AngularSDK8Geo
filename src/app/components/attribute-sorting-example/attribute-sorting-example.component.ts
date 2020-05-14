import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { ColumnChart, Model } from '@gooddata/react-components';

import {
  projectId,
  totalSalesIdentifier,
  locationResortIdentifier,
} from "../../../utils/fixtures";

interface AttributeSortingProps {
  projectId: any;
  measures: any[];
  viewBy?: any[];
  sortBy?: any[];
  config?: any;
}

@Component({
  selector: 'app-attribute-sorting',
  template: '<div class="attribute-sorting" style="height:350px" [id]="attributeSortingDomID"></div>',
})

export class AttributeSortingExampleComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  measures = [Model.measure(totalSalesIdentifier).format("#,##0").alias("$ Total Sales").localIdentifier(totalSalesIdentifier)];
  viewBy = [Model.attribute(locationResortIdentifier).localIdentifier(locationResortIdentifier)];
  sortByAttribute = [Model.attributeSortItem(locationResortIdentifier, "desc")];
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
  };
  public attributeSortingDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.attributeSortingDomID);
    invariant(node, `Node '${this.attributeSortingDomID} not found!`);
    return node;
  }

  protected getProps(): AttributeSortingProps {
    return {
      projectId: projectId,
      measures: this.measures,
      viewBy: this.viewBy,
      sortBy: this.sortByAttribute,
      config: this.config
    };
  }

  private isMounted(): boolean {
    return !!this.attributeSortingDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(ColumnChart, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    this.attributeSortingDomID = uuid.v1();
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
