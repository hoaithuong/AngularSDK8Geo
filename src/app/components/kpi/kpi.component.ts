
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
// import { Kpi } from '@gooddata/react-components';
import { Kpi } from "@gooddata/sdk-ui";
import { Ldm } from "../../../ldm";
import { workspace } from "../../../utils/fixtures";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());

interface KpiProps {
  measure: any;
  workspace: any;
  backend: any;
}

@Component({
  selector: 'app-kpi',
  template: '<span [id]="rootDomID"></span>'
})

export class KpiComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): KpiProps {
    return {
      workspace: workspace,
      backend: backend,
      measure: Ldm.$TotalSales,
      // measure: LdmExt.totalSalesIdentifier,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(Kpi, this.getProps()), this.getRootDomNode());
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
