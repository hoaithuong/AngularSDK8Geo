import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { BulletChart, Model } from '@gooddata/react-components';
import {
  projectId,
  franchiseFeesIdentifier,
  franchisedSalesIdentifier,
  sameStoreSalesIdentifier,
  locationResortIdentifier,
} from '../../../utils/fixtures';

interface BulletChartProps {
  projectId: any;
  primaryMeasure: any;
  targetMeasure?: any;
  comparativeMeasure?: any;
  viewBy?: any[];
  filters?: any[];
}

@Component({
  selector: 'app-bullet-chart-has-measure-value-filter',
  template: '<div class="bullet-has-measure-value-filter" style="height:400px" [id]="rootDomID"></div>',
})

export class BulletChartHasMeasureValueFilterComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  primaryMeasure = Model.measure(franchiseFeesIdentifier)
                        .localIdentifier('franchiseFees')
                        .format('#,##0')
                        .alias('$ Franchise Fees');

  targetMeasure = Model.measure(sameStoreSalesIdentifier).localIdentifier('sameStoreSales').format("#,##0").alias("$ Same Store Sales");

  comparativeMeasure = Model.measure(franchisedSalesIdentifier).localIdentifier('franchisedSales').format("#,##0").alias("$ Franchised Sales");
                      
  viewBy = [
    Model.attribute(locationResortIdentifier).localIdentifier('locationResortIdentifier'),
  ];
  
  betweenFilter = [ Model.measureValueFilter('sameStoreSales').condition('BETWEEN', { from: 4500000, to: 14000000 })];

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): BulletChartProps {
    return {
      projectId: projectId,
      primaryMeasure: this.primaryMeasure,
      targetMeasure: this.targetMeasure,
      comparativeMeasure: this.comparativeMeasure,
      viewBy: this.viewBy,
      filters: this.betweenFilter,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(BulletChart, this.getProps()), this.getRootDomNode());
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
