import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { BulletChart, Model, HeaderPredicateFactory } from '@gooddata/react-components';
import { CUSTOM_COLOR_PALETTE } from '../../../utils/colors';
import {
  projectId,
  franchiseFeesIdentifier,
  locationResortIdentifier,
  locationNameDisplayFormIdentifier,
  dateYearIdentifier,
  dateDataSetUri,
  monthDateIdentifier,
} from '../../../utils/fixtures';

interface BulletChartProps {
  projectId: any;
  primaryMeasure: any;
  targetMeasure?: any;
  comparativeMeasure?: any;
  viewBy?: any[];
  filters?: any[];
  sortBy?: any[];
  drillableItems?: any[];
  onFiredDrillEvent?: any;
  config?: any;
}

@Component({
  selector: 'app-bullet-chart-has-am-measure',
  template: '<div class="bullet-has-am-measure" style="height:400px" [id]="rootDomID"></div>',
})

export class BulletChartHasAmMeasureComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  primaryMeasure = Model.measure(franchiseFeesIdentifier).localIdentifier('franchiseFees').format('#,##0').alias('$ Franchise Fees');

  targetMeasure = Model.previousPeriodMeasure('franchiseFees', [{ dataSet: dateDataSetUri, periodsAgo: 1 },])
    .alias('$ Franchise Fees - year ago')
    .localIdentifier('franchiseFees_pp');

  comparativeMeasure = Model.arithmeticMeasure(
    [
      this.primaryMeasure.measure.localIdentifier,
      this.targetMeasure.measure.localIdentifier,      
    ],
    'sum')
    .title('% Franchise Fees Sum')
    .localIdentifier('franchiseFees_sum')

  viewBy = [
    Model.attribute(dateYearIdentifier).localIdentifier('dateYearIdentifier'),
    Model.attribute(monthDateIdentifier).localIdentifier('month')
  ];

  filters = [
    Model.positiveAttributeFilter(locationNameDisplayFormIdentifier,['Aventura','Irving'],true),
    Model.negativeAttributeFilter(locationResortIdentifier,['Deerfield Beach'],true),
    Model.relativeDateFilter(dateDataSetUri, 'GDC.time.year', -4, -3),
    Model.absoluteDateFilter(dateDataSetUri, '2016-07-01', '2017-06-31')
  ];

  onDrill = drillEvent => {
    console.log(
      'onFiredDrillEvent',
      drillEvent,
      JSON.stringify(drillEvent.drillContext.intersection, null, 2),
    );
    return true;
  };

  renderDrillValue() {
    let drillEvent;
    if (!drillEvent) {
      return null;
    }
  };

  drillableItems = [
    HeaderPredicateFactory.composedFromIdentifier(franchiseFeesIdentifier),
    HeaderPredicateFactory.identifierMatch(franchiseFeesIdentifier),
  ];

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
      filters: this.filters,
      drillableItems: this.drillableItems,
      onFiredDrillEvent: this.onDrill,
      config: {
        colorPalette: CUSTOM_COLOR_PALETTE,
      },
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
