import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { BarChart, Model } from '@gooddata/react-components';
import "@gooddata/react-components/styles/css/main.css";
import {
  menuCategoryAttributeDFIdentifier,
  projectId, totalSalesIdentifier,
  locationResortIdentifier
} from "../../../utils/fixtures";
import { CUSTOM_COLOR_PALETTE } from "../../../utils/colors";

interface BarchartProps {
  projectId: any;
  measures: any[];
  viewBy: any;
  stackBy: any;
  config: any;
}

let self: any;

@Component({
  selector: 'app-barchart-config',
  templateUrl: './barchart-config.component.html',
  styleUrls: ['./barchart-config.component.css']
})

export class BarchartConfigComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public rootDomID: string;
  defaultProperties = {};

  state = {
    config: this.defaultProperties,
    customPaletteUsed: false,
    customLegendUsed: true,
    customSeparatorUsed: true,
  }
  
  config = this.state;
  
  amount = [Model.measure(totalSalesIdentifier)
    .format("#,##0")
    .alias("$ Total Sales")];

  locationResort = Model.attribute(locationResortIdentifier).localIdentifier("location_resort");
  
  menuCategory = Model.attribute(menuCategoryAttributeDFIdentifier).localIdentifier(
    menuCategoryAttributeDFIdentifier,
  );

  onPaletteChange() {
    const { config: currentConfig, customPaletteUsed } = self.state;
    const colorPaletteProp = {
      colorPalette: customPaletteUsed ? undefined : CUSTOM_COLOR_PALETTE,
    };
    self.state = {
      config: {
        ...currentConfig,
        ...colorPaletteProp,
      },
      customPaletteUsed: !customPaletteUsed,
    };
    self.render();
  }

  onLegendChange() {
    const { config: currentConfig, customLegendUsed } = self.state;
    const legendProp = {
      legend: {
        enabled: customLegendUsed,
        position: "right",
      },
    };
    self.state = {
      config: {
        ...currentConfig,
        ...legendProp,
      },
      customLegendUsed: !customLegendUsed,
    };
    self.render();
  }

  onSeparatorChange() {
    const { config: currentConfig, customSeparatorUsed } = self.state;
    const separatorProp = {
      separators: customSeparatorUsed
        ? { thousand: ".", decimal: "," }
        : { thousand: ",", decimal: "." },
    };
    self.state = {
      config: {
        ...currentConfig,
        ...separatorProp,
      },
      customSeparatorUsed: !customSeparatorUsed,
    };
    self.render();
  }

  protected getProps(): BarchartProps {
    const { config } = this.state;
    return {
      projectId: projectId,
      measures: this.amount,
      viewBy: this.locationResort,
      stackBy: this.menuCategory,
      config: config
    };
  }

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(BarChart, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    self = this;
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
