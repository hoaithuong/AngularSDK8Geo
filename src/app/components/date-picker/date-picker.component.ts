import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import {AfmComponents, ErrorComponent } from "@gooddata/react-components";
import DatePicker from "react-datepicker";
import * as moment from 'moment';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import "@gooddata/react-components/styles/css/main.css";
import {
  totalSalesIdentifier,
  monthDateIdentifier,
  dateDatasetIdentifier,
  projectId,
} from '../../../utils/fixtures';
const dateFormat = "YYYY-MM-DD";
const { ColumnChart } = AfmComponents;
let self: any;

interface ColumnChartProps {
  projectId: any;
  afm: any;
}

interface DatapickerProps {
  className : any;
  selected: any;
  onChange: any;
}

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})

export class DatePickerComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public rootDomID: string;
  public rootToDomID: string;
  public rootFromDomID: string;
  state = {
    from: moment("2016-01-01", dateFormat),
    to: moment("2016-12-31", dateFormat),
    error: null,
  }

  onFromChange(value) {
    self.onDateChange("from", value);
    self.renderFrom();
    self.render();
  }

  onToChange(value) {
    self.onDateChange("to", value);
    self.renderTo();
    self.render();
  }

  onDateChange(prop, value) {
    console.log("onDateChange1")
    const { from, to } = this.state;
      const newState = {
          from,
          to,
          error: null,
      };
      newState[prop] = value;
      if (newState.to.isSameOrAfter(newState.from)) {
        this.state = newState
      } else {
        self.error = '"From" date must come before "To" date.';
      }
      console.log("onDateChange2")
  }

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getToRootDomNode() {
    const node = document.getElementById(this.rootToDomID);
    invariant(node, `Node '${this.rootToDomID} not found!`);
    return node;
  }

  protected getFromRootDomNode() {
    const node = document.getElementById(this.rootFromDomID);
    invariant(node, `Node '${this.rootFromDomID} not found!`);
    return node;
  }

  protected getProps() : ColumnChartProps  {
    return {
      projectId : projectId,
      afm :{
        measures: [
          {
            localIdentifier: "totalSales",
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
              identifier: monthDateIdentifier,
            },
              localIdentifier: "month",
          },
        ],
        filters: [
          {
            absoluteDateFilter: {
                dataSet: {
                    identifier: dateDatasetIdentifier,
                },
                from: this.state.from.format(dateFormat),
                to: this.state.to.format(dateFormat),
            },
          },
        ],
      },
    }
  } 

  protected getFromDatePicker() : DatapickerProps  {
    const { from } = this.state;
    return {
      className : "gd-input-field",
      selected: from,
      onChange: this.onFromChange,
    }
  }

  protected getToDatePicker() : DatapickerProps  {
    const { to } = this.state;
    return {
      className : "gd-input-field",
      selected: to,
      onChange: this.onToChange,
    }
  }

  protected renderTo() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(DatePicker, this.getToDatePicker()), this.getToRootDomNode());
    }
  }

  protected renderFrom() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(DatePicker, this.getFromDatePicker()), this.getFromRootDomNode());
    }
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(ColumnChart, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4(); 
    this.rootFromDomID = uuid.v4();
    this.rootToDomID = uuid.v4()
  }

  ngOnChanges() {
    this.renderFrom();
    this.renderTo();
    this.render();
  }

  ngAfterViewInit() {
    this.renderFrom();
    this.renderTo();
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

} 
