import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import {  
  projectId, 
  totalSalesIdentifier,
  locationResortIdentifier } from '../../../utils/fixtures.js';

import { Component, OnInit } from '@angular/core';
import { AfmComponents } from '@gooddata/react-components';

let self: any;

interface ChartProps {
  projectId: any;
  afm: any;
  width?: any;
  height?: any;
}

@Component({
  selector: 'app-responsive-example',
  templateUrl: './responsive-example.component.html',
  styleUrls: ['./responsive-example.component.css']
})

export class ResponsiveExampleComponent implements OnInit {
  state = { size: [500, 400] };
  afm = {
    measures: [
      {
        localIdentifier: "amount",
        definition: {
          measure: {
            item: {
              identifier: totalSalesIdentifier,
            },
          },
        },
        alias: "$ Total Sales",
        format: "#,##0",
      },
    ],
    attributes: [
      {
        displayForm: {
          identifier: locationResortIdentifier,
        },
        localIdentifier: "location_resort",
      },
    ],
  }
 
  public rootDomID: string;
  public btn8x2RootID: string;
  public btn5x4RootID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getbtn8x2RootDomNode() {
    const node = document.getElementById(this.btn8x2RootID);
    invariant(node, `Node btn8x2RootID not found!`);
    return node;
  }

  protected getbtn5x4RootDomNode() {
    const node = document.getElementById(this.btn5x4RootID);
    invariant(node, `Node btn5x4RootID not found!`);
    return node;
  }

  protected getProps() : ChartProps{
    var [width, height] = this.state.size;
    return {
      projectId: projectId,
      afm: this.afm,
      width: width,
      height: height
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    var [width, height] = this.state.size;
    if (this.isMounted()) {
      ReactDOM.render(
        React.createElement(
          "div",
          {
            style: {
              width: width,
              height: height
            },
            className: "s-resizable-vis"
          },
          React.createElement(
            "div",
            {
              style: {
                width: "100%",
                height: "100%"
              },
            },
            React.createElement(AfmComponents.BarChart, this.getProps())
          )
        ), this.getRootDomNode()
      );
    };

    ReactDOM.render(React.createElement(
      "button",
      {
        onClick: function() {
          self.state.size=[500, 400];
          self.render();
        }.bind(self),
        className: "gd-button gd-button-secondary"
      },
      "500x400"
    ), this.getbtn5x4RootDomNode());

    ReactDOM.render(React.createElement(
      "button",
      {
        onClick: function() {
          console.log("dsadas_");
          self.state.size=[800, 200];
          self.render();
        }.bind(self),
        className: "gd-button gd-button-secondary s-resize-800x200"
      },
      "800x200"
    ), this.getbtn8x2RootDomNode())
  }

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v1();
    this.btn5x4RootID = 'btn5x4RootID';
    this.btn8x2RootID = 'btn8x2RootID';
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
