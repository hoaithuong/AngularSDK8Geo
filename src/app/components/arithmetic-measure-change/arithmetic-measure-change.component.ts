import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Table, Model } from '@gooddata/react-components';

import {
  projectId,
  monthDateIdentifier,
  totalSalesIdentifier,
  dateDataSetUri
} from '../../../utils/fixtures.js';

interface ArithmeticMeasureChangeBucketProps {
  projectId: any;
  measures?: any[];
  attributes?: any[];
  filters?: any[];
}

interface ArithmeticMeasureChangeProps {
  projectId: any;
}

@Component({
  selector: 'app-arithmetic-measures-change',
  template: '<div class="arithmetic-measures-change" style="height:400px" [id]="rootDomID"></div>',
})
export class ArithmeticMeasureChangeComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  totalSalesYearAgoBucketItem = Model.previousPeriodMeasure("totalSales", [{ dataSet: dateDataSetUri, periodsAgo: 1 },])
    .alias("$ Total Sales - year ago")
    .localIdentifier("totalSales_sp");
  totalSalesBucketItem = Model.measure(totalSalesIdentifier)
    .localIdentifier("totalSales")
    .alias("$ Total Sales");
  measures = [
    this.totalSalesYearAgoBucketItem,
    this.totalSalesBucketItem,
    Model.arithmeticMeasure(
      [
        this.totalSalesBucketItem.measure.localIdentifier,
        this.totalSalesYearAgoBucketItem.measure.localIdentifier,
      ],
      "change",
    )
      .title("% Total Sales Change")
      .localIdentifier("totalSalesChange"),
  ]
  attributes = [Model.attribute(monthDateIdentifier).localIdentifier("month")]
  filters = [Model.absoluteDateFilter(dateDataSetUri, "2017-01-01", "2017-12-31")];
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): ArithmeticMeasureChangeProps | ArithmeticMeasureChangeBucketProps {
    return {
      projectId: projectId,
      measures: this.measures,
      attributes: this.attributes,
      filters: this.filters,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(Table, this.getProps()), this.getRootDomNode());
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
