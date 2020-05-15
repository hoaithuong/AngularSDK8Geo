import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Model, DateFilter, Visualization,  DateFilterHelpers } from '@gooddata/react-components';
import {
  dateDatasetIdentifier,
  columnVisualizationIdentifier,
  projectId,
} from '../../../utils/fixtures';

let self: any;

interface DateFilterExampleBucketProps {
  filterOptions: any;
  availableGranularities: any;
  excludeCurrentPeriod: boolean;
  selectedFilterOption: any;
  dateFilterMode: any;
  customFilterName: string;
  onApply: any;
}

interface VisualizationColumnChartProps {
  projectId: any;
  identifier: any;
  filters: any[];
}

const dateFrom = new Date();
dateFrom.setMonth(dateFrom.getMonth() - 1);
const availableGranularities = ['GDC.time.date', 'GDC.time.month', 'GDC.time.week_us', 'GDC.time.quarter', 'GDC.time.year'];

@Component({
  selector: 'app-date-filter-visualization-example',
  template: `<div style="width:200px; height:50px" [id]="rootDomID"></div>
             <div style="height:500px; margin-top: 5px;" [id]="visRoomData"></div>`,
})

export class DateFilterVisComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  message: string;

  defaultDateFilterOptions = {
    allTime: {
      localIdentifier: 'ALL_TIME',
      type: 'allTime',
      name: '',
      visible: true,
    },
    absoluteForm: {
      localIdentifier: 'ABSOLUTE_FORM',
      type: 'absoluteForm',
      from: dateFrom.toISOString().substr(0, 10), // 'YYYY-MM-DD'
      to: new Date().toISOString().substr(0, 10), // 'YYYY-MM-DD'
      name: '',
      visible: true,
    },
    absolutePreset: [
      {
        from: '2019-12-24',
        to: '2019-12-26',
        name: 'Christmas 2019',
        localIdentifier: 'christmas-2019',
        visible: true,
        type: 'absolutePreset',
      },
      {
        from: '2018-01-01',
        to: '2018-12-31',
        name: 'Year 2018',
        localIdentifier: 'year-2018',
        visible: true,
        type: 'absolutePreset',
      },
    ],
    relativeForm: {
      localIdentifier: 'RELATIVE_FORM',
      type: 'relativeForm',
      granularity: 'GDC.time.month',
      from: undefined,
      to: undefined,
      name: '',
      visible: true,
      availableGranularities,
    },
    relativePreset: {
      'GDC.time.date': [
        {
          from: -6,
          to: 0,
          granularity: 'GDC.time.date',
          localIdentifier: 'LAST_7_DAYS',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
         from: -29,
          to: 0,
          granularity: 'GDC.time.date',
          localIdentifier: 'LAST_30_DAYS',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -89,
          to: 0,
          granularity: 'GDC.time.date',
          localIdentifier: 'LAST_90_DAYS',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
      ],
      'GDC.time.week_us': [
        {
          from: 0,
          to: 0,
          granularity: 'GDC.time.week_us',
          localIdentifier: 'THIS_WEEK',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -1,
          to: -1,
          granularity: 'GDC.time.week_us',
          localIdentifier: 'LAST_WEEK',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -5,
          to: 0,
          granularity: 'GDC.time.week_us',
          localIdentifier: 'LAST_6_WEEKS',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
      ],
      'GDC.time.month': [
        {
          from: 0,
          to: 0,
          granularity: 'GDC.time.month',
          localIdentifier: 'THIS_MONTH',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -1,
          to: -1,
          granularity: 'GDC.time.month',
          localIdentifier: 'LAST_MONTH',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -11,
          to: 0,
          granularity: 'GDC.time.month',
          localIdentifier: 'LAST_12_MONTHS',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
      ],
      'GDC.time.quarter': [
        {
          from: 0,
          to: 0,
          granularity: 'GDC.time.quarter',
          localIdentifier: 'THIS_QUARTER',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -1,
          to: -1,
          granularity: 'GDC.time.quarter',
          localIdentifier: 'LAST_QUARTER',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -3,
          to: 0,
          granularity: 'GDC.time.quarter',
          localIdentifier: 'LAST_4_QUARTERS',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
      ],
      'GDC.time.year': [
        {
          from: 0,
          to: 0,
          granularity: 'GDC.time.year',
          localIdentifier: 'THIS_YEAR',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
        {
          from: -1,
          to: -1,
          granularity: 'GDC.time.year',
          localIdentifier: 'LAST_YEAR',
          type: 'relativePreset',
          visible: true,
          name: '',
        },
      ],
    },
  };

  selectedFilterOption = this.defaultDateFilterOptions.allTime;
  excludeCurrentPeriod = false;
  public rootDomID: string;
  public visRoomData: string;
  filters: any[];

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getLineDataNode() {
    const node = document.getElementById(this.visRoomData);
    invariant(node, `Node visRoomData not found!`);
    return node;
  }

  onApply = (selectedFilterOption, excludeCurrentPeriod) => {
    this.selectedFilterOption = selectedFilterOption;
    this.excludeCurrentPeriod = excludeCurrentPeriod;
    console.log(
      'DateFilterExample onApply',
      'selectedFilterOption:',
      selectedFilterOption,
      'excludeCurrentPeriod:',
      excludeCurrentPeriod,
    );
    const dateFilter = DateFilterHelpers.mapOptionToAfm(
      selectedFilterOption,
      { identifier: dateDatasetIdentifier },
      excludeCurrentPeriod,
    );
    self.filters = dateFilter ? [dateFilter] : [];
    self.render();
  }

  protected getDateFilterProps(): DateFilterExampleBucketProps {
    return {
      excludeCurrentPeriod: this.excludeCurrentPeriod,
      selectedFilterOption: this.selectedFilterOption,
      filterOptions: this.defaultDateFilterOptions,
      availableGranularities: availableGranularities,
      customFilterName: 'Selected date range',
      dateFilterMode: 'active',
      onApply: this.onApply,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(
        React.createElement(DateFilter, this.getDateFilterProps()), this.getRootDomNode());
    }
    self.renderVisColumnChart();
  }

  public renderVisColumnChart() {
    ReactDOM.render(React.createElement(Visualization, this.getVisColumnChartProps()), this.getLineDataNode());
  }

  protected getVisColumnChartProps(): VisualizationColumnChartProps {
    return {
      projectId: projectId,
      identifier: columnVisualizationIdentifier,
      filters: self.filters,
    };
  }

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4();
    this.visRoomData = 'visRoomData';
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
