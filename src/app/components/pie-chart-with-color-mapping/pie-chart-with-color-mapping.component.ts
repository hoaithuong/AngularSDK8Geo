import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit } from '@angular/core';
import { PieChart } from '@gooddata/react-components';
import "@gooddata/react-components/styles/css/main.css";
import {
  projectId,
  franchiseFeesAdRoyaltyIdentifier,
  franchiseFeesInitialFranchiseFeeIdentifier,
  franchiseFeesIdentifierOngoingRoyalty,
} from "../../../utils/fixtures";

interface PieChartProp {
  projectId: any,
  measures: any,
  config: any
}

@Component({
  selector: 'app-pie-chart-with-color-mapping',
  template: '<div class="s-pie-chart" style="height: 300px" [id]="rootDomID"></div>',
})

export class PieChartWithColorMappingComponent implements OnInit {
  public rootDomID: string;
  measures = [
    {
      measure: {
        localIdentifier: "franchiseFeesAdRoyaltyIdentifier",
        definition: {
          measureDefinition: {
            item: {
              identifier: franchiseFeesAdRoyaltyIdentifier,
            },
          },
        },
        format: "#,##0",
      },
    },
    {
      measure: {
        localIdentifier: "franchiseFeesInitialFranchiseFeeIdentifier",
        definition: {
          measureDefinition: {
            item: {
              identifier: franchiseFeesInitialFranchiseFeeIdentifier,
            },
          },
        },
        format: "#,##0",
      },
    },
    {
      measure: {
        localIdentifier: "franchiseFeesIdentifierOngoingRoyalty",
        definition: {
          measureDefinition: {
            item: {
              identifier: franchiseFeesIdentifierOngoingRoyalty,
            },
          },
        },
        format: "#,##0",
      },
    },
  ];
  config = {
    colorMapping: [
      {
        predicate: headerItem => {
          return headerItem.measureHeaderItem
            ? headerItem.measureHeaderItem &&
            headerItem.measureHeaderItem.localIdentifier ===
            "franchiseFeesAdRoyaltyIdentifier"
            : false;
        },
        color: {
          type: "guid",
          value: "5",
        },
      },
      {
        predicate: headerItem => {
          return headerItem.measureHeaderItem
            ? headerItem.measureHeaderItem &&
            headerItem.measureHeaderItem.localIdentifier ===
            "franchiseFeesIdentifierOngoingRoyalty"
            : false;
        },
        color: {
          type: "rgb",
          value: {
            r: 0,
            g: 0,
            b: 0,
          },
        },
      },
    ],
  }

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): PieChartProp {
    return {
      projectId: projectId,
      measures: this.measures,
      config: this.config
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(PieChart, this.getProps()), this.getRootDomNode());
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
