import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Headline, Model } from '@gooddata/react-components';

import {
  projectId,
  franchiseFeesIdentifier,
  totalSalesIdentifier,
} from '../../../utils/fixtures';

interface HeadlineBucketProps {
  primaryMeasure: any;
  secondaryMeasure?: any;
}

interface HeadlineProps {
  projectId: any;
}

@Component({
  selector: 'app-head-line',
  template: '<div class="head-line" style="height:100px" [id]="rootDomID"></div>',
})

export class HeadlineComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  primaryMeasure = Model.measure(totalSalesIdentifier).format("#,##0").alias("$ Total Sales")
  secondaryMeasure = Model.measure(franchiseFeesIdentifier).alias("Franchise Fee").format("$#,##0.00")
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  
  protected getProps(): HeadlineProps | HeadlineBucketProps {
    return {
      projectId: projectId,
      primaryMeasure: this.primaryMeasure,
      secondaryMeasure: this.secondaryMeasure,
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
