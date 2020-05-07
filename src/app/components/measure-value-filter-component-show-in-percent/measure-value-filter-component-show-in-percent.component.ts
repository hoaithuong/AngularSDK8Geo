import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { PivotTable, Model, MeasureValueFilter } from '@gooddata/react-components';
import {
  projectId,
  locationNameDisplayFormIdentifier,
  franchisedSalesIdentifier,
} from '../../../utils/fixtures';
import classNames from "classnames";

export interface PivotTableBucketProps {
  projectId: any;
  measures?: any[];
  rows?: any[];
  filters?: any[];
}

export interface MeasureValueFilterProps {
  projectId: any;
  onApply: any;
  filter: any;
  buttonTitle: string;
  warningMessage: string
}

@Component({
  selector: 'app-measure-value-filter-component-show-in-percent',
  templateUrl: './measure-value-filter-component-show-in-percent.component.html',
  styleUrls: ['./measure-value-filter-component-show-in-percent.component.css']
})

export class MeasureValueFilterComponentShowInPercentComponent implements OnInit {

  public rootDomID: string;
  public rootDomIDData: string;
  ref: React.RefObject<any>;
  filters: any[];
  filterValue: any;
  locationResort = Model.attribute(locationNameDisplayFormIdentifier);
  totalSales = [Model.measure(franchisedSalesIdentifier)
    .localIdentifier('franchisedSales')
    .title("Franchised Sales")];
  defaultMeasureValueFilter = Model.measureValueFilter('franchisedSales')
  state = {
    filters: [this.defaultMeasureValueFilter],
  };

  onApply = filter => {
    this.filters = [filter];
    this.filterValue = filter;
    this.state = {
      filters: [this.defaultMeasureValueFilter]
    }
    this.render();
  };

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getTableDataNode() {
    const node = document.getElementById(this.rootDomIDData);
    invariant(node, `Node '${this.rootDomIDData} not found!`);
    return node;
  }

  protected getMeasureValueProps(): MeasureValueFilterProps {
    const { filters } = this.state;
    return {
      projectId: projectId,
      filter: this.filterValue ? this.filterValue : this.defaultMeasureValueFilter,
      onApply: this.onApply,
      buttonTitle: "Franchised Sales in %",
      warningMessage: "The filter uses actual measure values, not percentage."
    };
  }

  protected getPivotTableProps(): PivotTableBucketProps {
    return {
      projectId: projectId,
      measures: this.totalSales,
      rows: [this.locationResort],
      filters: this.filters,
    };
  }

  protected render() {
    this.renderFilterValue();
    this.renderPivotTable();
  }

  public renderFilterValue() {
    ReactDOM.render(React.createElement(MeasureValueFilter, this.getMeasureValueProps()), this.getRootDomNode());
  }

  public renderPivotTable() {
    ReactDOM.render(React.createElement(PivotTable, this.getPivotTableProps()), this.getTableDataNode());
  }

  ngOnInit() {
    this.rootDomID = uuid.v4();
    this.rootDomIDData = uuid.v4();
    this.ref = React.createRef();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    this.render();
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
