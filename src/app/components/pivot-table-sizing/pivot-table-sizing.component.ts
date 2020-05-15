import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { PivotTable, Model } from '@gooddata/react-components';

import {
  employeeNameIdentifier,
  franchisedSalesIdentifier,
  locationNameDisplayFormIdentifier,
  projectId,
} from '../../../utils/fixtures.js';

interface PivotTableProps {
  projectId: any;
  measures?: any[];
  rows?: any[];
  columns?: any[];
  config?: any;
  pageSize?: any;
}

@Component({
  selector: 'app-pivot-table-sizing',
  template: '<div class="pivot-table-sizing" style="height:350px" [id]="rootDomID"></div>',
})

export class PivotTableSizingComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  measures = [
    Model.measure(franchisedSalesIdentifier)
      .format("#,##0")
      .alias("Sales"),
  ];
  attributes = [Model.attribute(employeeNameIdentifier)];
  columns = [Model.attribute(locationNameDisplayFormIdentifier).localIdentifier("location")];
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): PivotTableProps {
    return {
      projectId: projectId,
      measures: this.measures,
      rows: this.attributes,
      columns: this.columns,
      config: {
        columnSizing: {
          defaultWidth: "viewport",
        },
      },
      pageSize: 20,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(PivotTable, this.getProps()), this.getRootDomNode());
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
