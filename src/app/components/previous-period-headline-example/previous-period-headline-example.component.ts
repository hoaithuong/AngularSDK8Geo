import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Headline, Model } from '@gooddata/react-components';
import { totalSalesIdentifier, dateDataSetUri, projectId } from "../../../utils/fixtures";

interface PreviousPeriodHeadLineExampleBucketProps {
  primaryMeasure: any;
  secondaryMeasure?: any;
  filters?: any[];
  onLoadingChanged?: any;
  onError?: any;
}

interface PreviousPeriodHeadLineExampleProps {
  projectId: any;
}

@Component({
  selector: 'app-previous-period-headline-example',
  template: '<div class="previous-period-headline-example" style="height:200px" [id]="rootDomID"></div>',
})

export class PreviousPeriodHeadLineExampleComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  primaryMeasure = Model.measure(totalSalesIdentifier).localIdentifier("totalSales").alias("$ Total Sales")
  secondaryMeasure = Model.previousPeriodMeasure("totalSales", [{ dataSet: dateDataSetUri, periodsAgo: 1 },]).alias("$ Total Sales - period ago")
  filters = [Model.relativeDateFilter(dateDataSetUri, "GDC.time.year", -2, -1)]

  onLoadingChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("PreviousPeriodHeadLineExampleComponent onLoadingChanged", ...params);
  }

  onError(...params) {
    // eslint-disable-next-line no-console
    return console.log("PreviousPeriodHeadLineExampleComponent onError", ...params);
  }

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): PreviousPeriodHeadLineExampleProps | PreviousPeriodHeadLineExampleBucketProps {
    return {
      projectId: projectId,
      primaryMeasure: this.primaryMeasure,
      secondaryMeasure: this.secondaryMeasure,
      filters: this.filters,
      onLoadingChanged: this.onLoadingChanged,
      onError: this.onError,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(Headline, this.getProps()), this.getRootDomNode());
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
