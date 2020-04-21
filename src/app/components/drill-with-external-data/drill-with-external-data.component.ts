import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';

import '@gooddata/react-components/styles/css/main.css';
import {
  Table,
  ColumnChart,
  HeaderPredicateFactory,
  Model,
} from "@gooddata/react-components";

import {
  projectId,
  employeeNameIdentifier,
  averageDailyTotalSales,
  locationStateDisplayFormIdentifier,
  locationStateAttributeUri,
  totalSalesIdentifier,
  locationNameDisplayFormIdentifier,
  locationNameAttributeUri,
} from '../../../utils/fixtures.js';

let self: any;
const dateFormat = "YYYY-MM-DD";

interface TableDrillExampleProps {
  projectId: any;
  measures?: any[];
  attributes?: any[];
  drillableItems?: any[];
  onFiredDrillEvent?: any;
  totals?: any[];
  filters?: any[];
  sortBy?: any[];
}

export interface ColumnChartDrillExampleProps {
  projectId: string;
  measures: any[];
  viewBy?: any[];
  stackBy?: any;
  drillableItems?: any[];
  onFiredDrillEvent?: any;
  filters?: any[];
  sortBy?: any[];
}

@Component({
  selector: 'app-drill-with-external-data',
  templateUrl: './drill-with-external-data.component.html',
  styleUrls: ['./drill-with-external-data.component.css']
})

export class DrillWithExternalDataComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  location: any;
  state: any;
  employeeName: any;
  dob: any;
  gender: any;
  id: any;
  born_city: any;
  born_location: any;
  phone: any;
  registeredDate: any;
  born_state: any;

  employee3rdPartyData: {
    error: null,
    isLoading: false,
    data: null,
  }

  onLocationDrill = drillTarget => {
    const { title: name, id } =
      drillTarget.drillContext.element === "bar"
        ? drillTarget.drillContext.intersection[1]
        : drillTarget.drillContext.points[0].intersection[1];
    const location = {
      name,
      uri: `${locationNameAttributeUri}/elements?id=${id}`,
    };
    self.renderEmployeesTable(self.getFilters(null, location));
    self.renderSalesColumChart(self.getFilters(null, location));
  };

  onStateDrill = drillTarget => {
    const { name, id } = drillTarget.drillContext.row[0];
    const state = {
      name,
      uri: `${locationStateAttributeUri}/elements?id=${id}`,
    };
    self.state = name;
    self.renderEmployeesTable(self.getFilters(state, null));
    self.renderSalesColumChart(self.getFilters(state, null));
  };

  onStateClear = () => {
    self.state = null;
  };

  onLocationClear = () => {
    self.location = null;
  };

  onEmployeeDrill = drillTarget => {
    const employee = drillTarget.drillContext.row[0];
    console.log("Drill on employee = " + employee.name);
    self.employeeName = employee.name;
    const firstName = employee.name.split(" ")[0];
    fetch(`https://api.genderize.io/?name=${firstName}&country_id=us`)
      .then(res => res.json())
      .then(({ gender }) => {
        return fetch(
          `https://randomuser.me/api/?nat=us&inc=dob,cell,registered,location&gender=${gender}&seed=gooddata-${employee.id}`,
        )
          .then(res => res.json())
          .then(
            ({ results }) => {
              self.isLoading = false;
              self.error = null;
              self.id = parseInt(employee.id, 10) % 100;
              self.dob = moment(results[0].dob.date).format(dateFormat);
              self.gender = gender === "male" ? "men" : "women";
              self.born_city = results[0].location.city;
              self.born_state = results[0].location.state;
              self.registeredDate = moment(results[0].registered.date).format(dateFormat);
              self.phone = results[0].cell;
            },
            error => {
              self.isLoading = false;
              self.error = error;
              self.data = null
            },
          );
      });
  }

  public tableStatesDomID: string;
  public columnSalesDomID: string;
  public tableEmployeesDomID: string;

  protected getTableStatesDomNode() {
    const node = document.getElementById(this.tableStatesDomID);
    invariant(node, `Node '${this.tableStatesDomID} not found!`);
    return node;
  }

  protected getColumnSalesDomNode() {
    const node = document.getElementById(this.columnSalesDomID);
    invariant(node, `Node '${this.columnSalesDomID} not found!`);
    return node;
  }

  protected getTableEmployeesDomNode() {
    const node = document.getElementById(this.tableEmployeesDomID);
    invariant(node, `Node '${this.tableEmployeesDomID} not found!`);
    return node;
  }

  getFilters = (state, location) => {
    const filters = [];
    if (state) {
      filters.push(Model.positiveAttributeFilter(locationStateDisplayFormIdentifier, [state.uri]));
    }
    if (location) {
      filters.push(Model.positiveAttributeFilter(locationNameDisplayFormIdentifier, [location.uri]));
    }
    return filters;
  };

  getMeasure = (identifier, localIdentifier, alias) =>
    Model.measure(identifier)
      .localIdentifier(localIdentifier)
      .alias(alias);

  getAttribute = (identifier, localIdentifier) => ({
    visualizationAttribute: {
      localIdentifier,
      displayForm: {
        identifier,
      },
    },
  });

  averageDailySalesMeasure = this.getMeasure(
    averageDailyTotalSales,
    "averageDailyTotalSales",
    "Average Sales",
  );

  stateAttribute = this.getAttribute(locationStateDisplayFormIdentifier, "locationState");
  employeeNameAttribute = this.getAttribute(employeeNameIdentifier, "employeeName");
  locationNameAttribute = this.getAttribute(locationNameDisplayFormIdentifier, "locationName");
  totalSalesMeasure = this.getMeasure(totalSalesIdentifier, "totalSales", "Total Sales");

  protected getTableStateProps(): TableDrillExampleProps {
    return {
      projectId: projectId,
      measures: [this.averageDailySalesMeasure],
      attributes: [this.stateAttribute],
      drillableItems: [
        HeaderPredicateFactory.identifierMatch(locationStateDisplayFormIdentifier),
      ],
      onFiredDrillEvent: this.onStateDrill,
    };
  }

  protected getTableEmployeesProps(filters): TableDrillExampleProps {
    return {
      projectId: projectId,
      measures: [this.averageDailySalesMeasure],
      attributes: [this.employeeNameAttribute],
      filters: filters,
      drillableItems: [HeaderPredicateFactory.identifierMatch(employeeNameIdentifier)],
      onFiredDrillEvent: this.onEmployeeDrill,
    };
  }

  protected getColumnSalesProps(filters): ColumnChartDrillExampleProps {
    return {
      projectId: projectId,
      measures: [this.totalSalesMeasure],
      viewBy: [this.locationNameAttribute],
      filters: filters,
      drillableItems: [
        HeaderPredicateFactory.identifierMatch(locationNameDisplayFormIdentifier),
      ],
      onFiredDrillEvent: this.onLocationDrill,
    };
  }

  protected render() {
    this.renderStatesTable();
    this.renderEmployeesTable(this.getFilters(this.state, this.location));
    this.renderSalesColumChart(this.getFilters(this.state, this.location));
  }

  public renderStatesTable() {
    ReactDOM.render(React.createElement(Table, this.getTableStateProps()), this.getTableStatesDomNode());
  }

  public renderEmployeesTable(filters) {
    ReactDOM.render(React.createElement(Table, this.getTableEmployeesProps(filters)), this.getTableEmployeesDomNode());
  }

  public renderSalesColumChart(filters) {
    ReactDOM.render(React.createElement(ColumnChart, this.getColumnSalesProps(filters)), this.getColumnSalesDomNode());
  }

  ngOnInit() {
    self = this;
    this.tableEmployeesDomID = "tableEmployeesDomData";
    this.tableStatesDomID = "tableStatesDomData";
    this.columnSalesDomID = "columnSalesDomData";
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
  
}
