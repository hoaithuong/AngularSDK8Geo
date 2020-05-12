import '@gooddata/react-components/styles/css/main.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as invariant from 'invariant';
import {EMPLOYEES} from './mockEmployees';
import { 
  Component, 
  OnInit } from '@angular/core';

import {
  Kpi,
  BarChart,
  PieChart,
  Model } from '@gooddata/react-components';

import {
  projectId,
  employeeNameIdentifier,
  averageDailyTotalSales,
  averageCheckSizeByServer,
  menuItemNameAttributeDFIdentifier,
  menuCategoryAttributeDFIdentifier } from '../../../utils/fixtures.js';

let self: any;

export interface Employees {
  name: any;
  gender: any;
  avatarUrl: any;
  startDate: any;
  uri?: any;
  job_title?: any;
}

interface KpiCheckAmountProps {
  measure: any;
  projectId: any;
  filters?: any[];
}

interface KpiDailySalesProps {
  measure: any;
  projectId: any;
  filters: any[];
}

interface BarChartProps {
  measures: any[];
  projectId: any;
  viewBy: any[];
  filters: any[];
}

interface PieChartProps {
  measures: any[];
  projectId: any;
  viewBy: any;
  filters: any[];
  config: any;
}

@Component({
  selector: 'app-global-filters-example',
  templateUrl: './global-filters-example.component.html',
  styleUrls: ['./global-filters-example.component.css']
})

export class GlobalFiltersExampleComponent implements OnInit {
  employees = EMPLOYEES;
  selectedEmployee: Employees;
  employeefilter: any;
  message: string;
  measures = [
    Model.measure(averageDailyTotalSales).localIdentifier('AverageDailyTotalSales').format('#,##0')
  ]
  viewByItem = [
    Model.attribute(menuItemNameAttributeDFIdentifier).localIdentifier('MenuItem')
  ]
  viewByCategory = Model.attribute(menuCategoryAttributeDFIdentifier).localIdentifier('MenuCategory')
  xconfig = {
    legend: {
      enabled: true,
      position: 'bottom', 
    }
  }

  onSelect(employees: Employees): void{
    this.selectedEmployee = employees;
    self.employeefilter = {
      name: employees.name,
      uri: employees.uri,
    };
    self.selectedEmployee.isLoading = false;
    self.selectedEmployee.error = null;
    self.selectedEmployee.gender = employees.gender === 'M' ? 'men' : 'women';
    self.selectedEmployee.job_title = employees.gender === 'men' ? 'waiter' : 'waitress';
    self.renderKpiCheckAmount(self.getFilters(self.employeefilter.name, null));
    self.renderKpiDailySales(self.getFilters(self.employeefilter.name, null));
    self.renderBarChart(self.getFilters(self.employeefilter.name, null));
    self.renderPieChart(self.getFilters(self.employeefilter.name, null));
  }

  public kpiCheckAmountRootDomID: string;
  public kpiDailySalesRootDomID: string;
  public barRoomDataID: string;
  public pieRoomDataID: string;

  protected getKpiCheckAmountRootDomNode() {
    const node = document.getElementById(this.kpiCheckAmountRootDomID);
    invariant(node, `Node kpiCheckAmountRootDomID not found!`);
    return node;
  }

  protected getKpiDailySalesRootDomNode() {
    const node = document.getElementById(this.kpiDailySalesRootDomID);
    invariant(node, `Node kpiDailySalesRootDomID not found!`);
    return node;
  }

  protected getBarDataNode() {
    const node = document.getElementById(this.barRoomDataID);
    invariant(node, `Node barRoomDataID not found!`);
    return node;
  }

  protected getPieDataNode() {
    const node = document.getElementById(this.pieRoomDataID);
    invariant(node, `Node pieRoomDataID not found!`);
    return node;
  }

  getFilters = (employeefilter) => {
    const filters = [];
    if (employeefilter) {
      filters.push(Model.positiveAttributeFilter(employeeNameIdentifier, [self.employeefilter.uri]));
    }
    return filters;
  };

  protected getKpiCheckAmountProps(employeefilter): KpiCheckAmountProps {
    return {
      projectId: projectId,
      measure: averageCheckSizeByServer,
      filters: employeefilter,
    };
  }

  protected getKpiDailySalesProps(employeefilter): KpiDailySalesProps {
    return {
      projectId: projectId,
      measure: averageDailyTotalSales,
      filters: employeefilter,
    };
  }

  protected getBarChartProps(employeefilter): BarChartProps {
    return {
      projectId: projectId,
      measures: this.measures,
      viewBy: this.viewByItem,
      filters: employeefilter,
    };
  }

  protected getPieChartProps(employeefilter): PieChartProps {
    return {
      projectId: projectId,
      measures: this.measures,
      viewBy: this.viewByCategory,
      filters: employeefilter,
      config: this.xconfig
    };
  }

  protected render() {
    this.renderKpiCheckAmount(this.getFilters(this.employeefilter));
    this.renderKpiDailySales(this.getFilters(this.employeefilter));
    this.renderBarChart(this.getFilters(this.employeefilter));
    this.renderPieChart(this.getFilters(this.employeefilter));
  }

  public renderKpiCheckAmount(employeefilter) {
    ReactDOM.render(React.createElement(Kpi, this.getKpiCheckAmountProps(employeefilter)), this.getKpiCheckAmountRootDomNode());
  }

  public renderKpiDailySales(employeefilter) {
    ReactDOM.render(React.createElement(Kpi, this.getKpiDailySalesProps(employeefilter)), this.getKpiDailySalesRootDomNode());
  }

  public renderBarChart(employeefilter) {
    ReactDOM.render(React.createElement(BarChart, this.getBarChartProps(employeefilter)), this.getBarDataNode());
  }

  public renderPieChart(employeefilter) {
    ReactDOM.render(React.createElement(PieChart, this.getPieChartProps(employeefilter)), this.getPieDataNode());
  }

  ngOnInit() {
    self = this;
    this.kpiCheckAmountRootDomID = 'kpiCheckAmountRootDomID';
    this.kpiDailySalesRootDomID = 'kpiDailySalesRootDomID';
    this.barRoomDataID = 'barRoomDataID';
    this.pieRoomDataID = 'pieRoomDataID';

    // Filter default value
    self.employeefilter = {
      name: this.employees[0].name,
      uri: this.employees[0].uri,
    };
    // Select default value
    this.selectedEmployee = this.employees[0]; 
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
