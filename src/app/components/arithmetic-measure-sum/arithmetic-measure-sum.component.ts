import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Table, Model } from '@gooddata/react-components';

import {
  projectId,
  franchiseFeesAdRoyaltyIdentifier,
  franchiseFeesIdentifierOngoingRoyalty,
  locationStateDisplayFormIdentifier,
} from '../../../utils/fixtures.js';

interface ArithmeticMeasureSumBucketProps {
  projectId: any;
  measures?: any[];
  attributes?: any[];
}

interface ArithmeticMeasureSumProps {
  projectId: any;
}

@Component({
  selector: 'app-arithmetic-measures-sum',
  template: '<div class="arithmetic-measures-sum" style="height:200px" [id]="rootDomID"></div>'
})

export class ArithmeticMeasureSumComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  localIdentifiers = {
    franchiseFeesAdRoyalty: "franchiseFeesAdRoyalty",
    franchiseFeesOngoingRoyalty: "franchiseFeesOngoingRoyalty",
    franchiseFeesSum: "franchiseFeesSum",
    franchiseFeesDifference: "franchiseFeesDifference",
  }

  measures = [
    Model.measure(franchiseFeesAdRoyaltyIdentifier)
      .localIdentifier(this.localIdentifiers.franchiseFeesAdRoyalty)
      .format("#,##0"),
    Model.measure(franchiseFeesIdentifierOngoingRoyalty)
      .localIdentifier(this.localIdentifiers.franchiseFeesOngoingRoyalty)
      .format("#,##0"),
    Model.arithmeticMeasure(
      [this.localIdentifiers.franchiseFeesOngoingRoyalty, this.localIdentifiers.franchiseFeesAdRoyalty],
      "sum",
    )
      .localIdentifier(this.localIdentifiers.franchiseFeesSum)
      .format("#,##0")
      .title("$ Ongoing / Ad Royalty Sum"),
    Model.arithmeticMeasure(
      [this.localIdentifiers.franchiseFeesOngoingRoyalty, this.localIdentifiers.franchiseFeesAdRoyalty],
      "difference",
    )
      .localIdentifier(this.localIdentifiers.franchiseFeesDifference)
      .format("#,##0")
      .title("$ Ongoing / Ad Royalty Difference"),
  ]

  attributes = [Model.attribute(locationStateDisplayFormIdentifier).localIdentifier("month")]

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): ArithmeticMeasureSumProps | ArithmeticMeasureSumBucketProps {
    return {
      projectId: projectId,
      measures: this.measures,
      attributes: this.attributes
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
