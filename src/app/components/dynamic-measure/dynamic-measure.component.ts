import { Component, OnInit } from '@angular/core';
import '@gooddata/react-components/styles/css/main.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as invariant from 'invariant';
import { LineChart, ColumnChart, ErrorComponent, Model } from "@gooddata/react-components";
import sdk from "@gooddata/gooddata-js";
import { monthDateIdentifier, projectId, franchiseFeesTag } from "../../../utils/fixtures";

let self: any;

export interface LineChartBucketProps {
  projectId: any;
  measures: any[];
  trendBy?: any;
  segmentBy?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
  locale?: any;
}

export interface ColumnChartBucketProps {
  projectId: any;
  measures: any[];
  viewBy?: any;
  stackBy?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
  locale?: any;
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
  selector: 'app-dynamic-measure',
  templateUrl: './dynamic-measure.component.html',
  styleUrls: ['./dynamic-measure.component.css']
})

export class DynamicMeasureComponent implements OnInit {
  attribute = Model.attribute(monthDateIdentifier);
  measureList: any;
  error: any;
  root: any;
  lineChartDM: string;
  columnChartDM: string;
  
  constructor() {
    this.measureList = null;
    this.error = null;
    this.onMeasureChange = this.onMeasureChange.bind(this);
  }

  protected getLineChartNode() {
    const node = document.getElementById(this.lineChartDM);
    invariant(node, `Node ` + this.lineChartDM + ` not found!`);
    return node;
  }

  protected getLineChartProps(measures): LineChartBucketProps {
    return {
      projectId: projectId,
      measures: measures,
      trendBy: this.attribute
    };
  }

  protected getColumnChartNode() {
    const node = document.getElementById(this.columnChartDM);
    invariant(node, `Node ` + this.columnChartDM + ` not found!`);
    return node;
  }

  protected getColumnChartProps(measures): ColumnChartBucketProps {
    return {
      projectId: projectId,
      measures: measures,
    };
  }
  
  protected getRootNode() {
    const node = document.getElementById(this.root);
    invariant(node, `Node ` + this.root + ` not found!`);
    return node;
  }

  protected getErrorProps(message): ErrorProps {
    return {
      message: message,
    };
  }

  onMeasureChange(selectedItemLink) {
    this.measureList.forEach(element => {
      if (element.link == selectedItemLink) {
        element.isSelected = !element.isSelected;
      }
    });
    self.render();
  }

  componentWillMount() {
    sdk.xhr
      .get(`/gdc/md/${projectId}/tags/${franchiseFeesTag}`)
      .then(response => {
        if (!response.data.entries.length) {
          this.measureList = null;
          this.error = `There was Error while requesting measures by tag ${franchiseFeesTag}`;
          self.render();
        }
        else {
          this.measureList = response.data.entries.map(entry => ({
            ...entry,
            isSelected: true,
            afmMeasure: Model.measure(entry.link).format("#,##0"),
          })),
            this.error = null;
          self.render();
        }
      }
      )
      .catch(error => {
        this.measureList = null;
        this.error = `There was Error while requesting measures by tag ${franchiseFeesTag}`
        self.render();
      }
      );
  }

  render() {
    if (this.measureList != null && this.measureList.length > 0) {
      const selectedMeasures = this.measureList.filter(measure => measure.isSelected);
      const measures = selectedMeasures.map(item => item.afmMeasure);
      this.renderLineChart(measures);
      this.renderColumnChart(measures);
    }
    if (this.error) {
      ReactDOM.render(React.createElement(ErrorComponent, this.getErrorProps(this.error)), this.getRootNode());
    }
  }

  public renderLineChart(measures) {
    if (measures != null && measures.length > 0) {
      ReactDOM.render(React.createElement(LineChart, this.getLineChartProps(measures)), this.getLineChartNode());
    }
    else {
      ReactDOM.render(React.createElement(ErrorComponent, this.getErrorProps("The measures must have at least one item selected")), this.getLineChartNode());
    }
  }

  public renderColumnChart(measures) {
    if (measures != null && measures.length > 0) {
      ReactDOM.render(React.createElement(ColumnChart, this.getColumnChartProps(measures)), this.getColumnChartNode());
    }
    else {
      ReactDOM.render(React.createElement(ErrorComponent, this.getErrorProps("The measures must have at least one item selected")), this.getColumnChartNode());
    }
  }

  ngOnInit() {
    self = this;
    this.root = 'root';
    this.lineChartDM = 'lineChartDM';
    this.lineChartDM = 'columnChartDM';
    this.componentWillMount();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
  }

}
