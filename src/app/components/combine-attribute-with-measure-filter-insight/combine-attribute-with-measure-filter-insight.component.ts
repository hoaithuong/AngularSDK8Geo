import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';

import { newMeasureValueFilter } from "@gooddata/sdk-model";
import { ErrorComponent } from "@gooddata/sdk-ui";
import { AttributeFilter } from "@gooddata/sdk-ui-filters";
import { isPositiveAttributeFilter, isAttributeElementsByRef, IPositiveAttributeFilter, INegativeAttributeFilter, IAttributeFilter } from "@gooddata/sdk-model";
import { Ldm, LdmExt } from "../../../ldm";
import { newPositiveAttributeFilter } from "@gooddata/sdk-model";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());
import { InsightView, IInsightViewProps } from "@gooddata/sdk-ui-ext";
import { VisualizationInput } from '@gooddata/typings';

let self: any;

interface NewAttributeFilterProps {
  fullscreenOnMobile: boolean;
  onApplyWithFilterDefinition?: any;
  filter: any;
  locale?: any;
  backend: any;
  workspace: any;
  onApply: any;
}

interface VisualizationPivotTableProps {
  backend: any;
  workspace: any;
  insight: any;
  filters: any[];
}

export interface ErrorProps {
  code?: string;
  icon?: string;
  message: string;
  description?: string;
  className?: string;
  style?: object;
  width?: any;
  height?: any;
}

@Component({
  selector: 'app-combine-attribute-with-measure-filter-insight',
  templateUrl: './combine-attribute-with-measure-filter-insight.component.html',
  styleUrls: ['./combine-attribute-with-measure-filter-insight.component.css']
})
export class CombineAttributeWithMeasureFilterInsightComponent implements OnInit {
  message: string;
  filters: any[];
  public all: string;
  public greater: string;
  public bewteen: string;
  isActive: boolean;

  rows = [
    Ldm.LocationName.Default,
    Ldm.LocationResort,
    Ldm.MenuCategory,
  ]

  filter = newPositiveAttributeFilter(Ldm.LocationCity, ['Irving']);

  totalSales = [LdmExt.FranchisedSales];
  locationResort = [Ldm.LocationName.Default];
  greaterThanFilter = newMeasureValueFilter(LdmExt.FranchisedSales, "GREATER_THAN", 7000000);
  betweenFilter = newMeasureValueFilter(LdmExt.FranchisedSales, "BETWEEN", 5000000, 8000000);

  state = {
    isActive: false,
  };

  public rootDomID: string;

  public pivotTableRoomDataID: string;

  onApply(filter: IAttributeFilter) {
    // tslint:disable-next-line:no-console
    console.log("AttributeFilterExample onApply", filter);
    self.message = null;
    if (isPositiveAttributeFilter(filter)) {
      self.filters = self.filterPositiveAttribute(filter);
    } else {
      self.filters = self.filterNegativeAttribute(filter);
    }
    self.renderPivotTable(self.filters);
  }

  public filterPositiveAttribute(filter: IPositiveAttributeFilter) {
    let filters;
    const {
      positiveAttributeFilter,
      positiveAttributeFilter: { displayForm },
    } = filter;
    const inElements = filter.positiveAttributeFilter.in;
    const checkLengthOfFilter = isAttributeElementsByRef(positiveAttributeFilter.in)
      ? positiveAttributeFilter.in.uris.length !== 0
      : positiveAttributeFilter.in.values.length !== 0;

    console.log(checkLengthOfFilter);
    if (checkLengthOfFilter) {
      filters = [
        {
          positiveAttributeFilter: {
            displayForm,
            in: inElements,
          },
        },
      ];
    } else {
      self.message = 'The filter must have at least one item selected';
    }
    return filters;
  }

  public filterNegativeAttribute(filter: INegativeAttributeFilter) {
    let filters;
    const {
      negativeAttributeFilter: { notIn, displayForm },
    } = filter;
    const checkLengthOfFilter = isAttributeElementsByRef(notIn)
      ? notIn.uris.length !== 0
      : notIn.values.length !== 0;

    if (checkLengthOfFilter) {
      filters = [
        {
          negativeAttributeFilter: {
            displayForm,
            notIn,
          },
        },
      ];
    }
    return filters;
  }

  onLoadingChanged(...params) {
    // tslint:disable-next-line: no-console
    console.info('NewAttributeFilterComponent onLoadingChanged', ...params);
  }

  onError(...params) {
    // tslint:disable-next-line: no-console
    console.info('NewAttributeFilterComponent onLoadingChanged', ...params);
  }

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getLineDataNode() {
    const node = document.getElementById(this.pivotTableRoomDataID);
    invariant(node, `Node ${this.pivotTableRoomDataID} not found!`);
    return node;
  }

  protected getAttributeProps(): NewAttributeFilterProps {
    return {
      workspace: workspace,
      backend: backend,
      fullscreenOnMobile: false,
      onApply: this.onApply,
      filter: this.filter
    };
  }

  protected getPivotTableProps(filters): VisualizationPivotTableProps {
    return {
      workspace: workspace,
      backend: backend,
      insight: Ldm.Insights.AreachartThg,
      filters: filters
    };
  }

  protected getErrorProps(): ErrorProps {
    return {
      message: this.message,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(
        React.createElement(AttributeFilter, this.getAttributeProps()), this.getRootDomNode());
      // this.onApply(this.filter);
    }
    this.renderPivotTable(this.filters);
  }

  public renderPivotTable(filters) {
    if (this.message) {
      ReactDOM.render(React.createElement(ErrorComponent, this.getErrorProps()), this.getLineDataNode());
    } else {
      ReactDOM.render(React.createElement(InsightView, this.getPivotTableProps(filters)), this.getLineDataNode());
    }
  }

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4();
    this.pivotTableRoomDataID = uuid.v4();
    this.all = uuid.v4();
    this.bewteen = uuid.v4();
    this.greater = uuid.v4();
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
