import '@gooddata/react-components/styles/css/main.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as invariant from 'invariant';
import Select from 'react-select';

import { 
  Component, 
  OnInit } from '@angular/core';

import {  
  AttributeElements,
  BarChart, 
  Model } from '@gooddata/react-components';

import {  
  projectId, 
  totalSalesIdentifier, 
  locationNameDisplayFormIdentifier,
  locationStateDisplayFormIdentifier,
  locationCityDisplayFormIdentifier,
  locationIdAttributeIdentifier, 
  locationCityAttributeIdentifier,
  locationStateAttributeIdentifier} from '../../../utils/fixtures';

let self: any;

interface ChartProps {
  measures: any[];
  projectId: any;
  viewBy: any[];
  filters?: any[];
}

@Component({
  selector: 'app-parent-filter-example',
  templateUrl: './parent-filter-example.component.html',
  styleUrls: ['./parent-filter-example.component.css']
})

export class ParentFilterExampleComponent implements OnInit {
  afm: any;
  filters: any[];
  measures = [
    Model.measure(totalSalesIdentifier)
    .format('#,##0')
    .alias('$ Total Sales')
  ]
  viewBy = [
    Model.attribute(locationNameDisplayFormIdentifier).localIdentifier('location_name')
  ]
  
  stateFilterValues = [];
  cityFilterValues = [];

  onStateChange = stateFilterValues => {
    if (stateFilterValues == null) {
      self.stateFilterValues = [];
    } else {
      self.stateFilterValues= stateFilterValues;
    }
    self.render();
  }
    
  onCityChange = cityFilterValues => {
    if (cityFilterValues == null) {
      self.cityFilterValues = [];

    } else {
      self.cityFilterValues = cityFilterValues;

    }
    self.render();
  }

  public ChartrootDomID: string;
  public StaterootDomID: string;
  public CityrootDomID: string;

  protected getChartRootDomNode() {
    const node = document.getElementById(this.ChartrootDomID);
    invariant(node, `Node ChartrootDomID not found!`);
    return node;
  }

  protected getStateRootDomNode() {
    const node = document.getElementById(this.StaterootDomID);
    invariant(node, `Node StaterootDomID not found!`);
    return node;
  }

  protected getCityRootDomNode() {
    const node = document.getElementById(this.CityrootDomID);
    invariant(node, `Node CityrootDomID not found!`);
    return node;
  }

  protected getChartProps(filters): ChartProps {
    return {
      projectId: projectId,
      measures: this.measures,
      viewBy: this.viewBy,
      filters: filters,
    };
  }

  protected getStateProps(filters): ChartProps {
    return {
      projectId: projectId,
      measures: this.measures,
      viewBy: this.viewBy,
      filters: filters,
    };
  }

  protected renderChart(filters) {
    ReactDOM.render(React.createElement(BarChart, this.getChartProps(filters)), this.getChartRootDomNode());
  }
  
  renderVisualization(stateFilterValues, cityFilterValues) {
    const visFilters = [];
    if (stateFilterValues.length) {
      visFilters.push(
        Model.positiveAttributeFilter(
          locationStateDisplayFormIdentifier,
          stateFilterValues.map(filter => filter.value),
        ),
      )
    }
    if (cityFilterValues.length) {
      visFilters.push(
        Model.positiveAttributeFilter(
          locationCityDisplayFormIdentifier,
          cityFilterValues.map(filter => filter.value),
        ),
      );
    }
    self.renderChart(visFilters)
  }
  
  renderFilter(key, displayFormIdentifier, filterValues, placeholder, options, onChange) {
    return (
      React.createElement(AttributeElements, {
        key: key,
        identifier: displayFormIdentifier,
        projectId: projectId,
        options: options
      }, ({
        validElements,
        isLoading,
        error
      }) => {
        if (error) {
          console.error('Loading attribute elements failed!', error);
        }
        const selectOptions = validElements ? validElements.items.map(item => ({
          label: item.element.title,
          value: item.element.uri
        })) : [];
        return React.createElement('span', {
          style: {
            display: 'inline-block',
            minWidth: '10em',
            verticalAlign: 'middle'
          }
        }, React.createElement(Select, {
          onChange: onChange,
          className: `s-select-${key}`,
          options: selectOptions,
          isMulti: true,
          isLoading: isLoading,
          placeholder: placeholder,
          value: filterValues
        }), error && React.createElement('span', {
          style: {
            color: '#e54d42'
          }
        }, 'Loading failed!'));
      })
    );
  }

  render() {
    // State (parent) filter
    const stateFilter = this.renderFilter(
      'state',
      locationStateDisplayFormIdentifier,
      this.stateFilterValues,
      'all states',
      {limit: 20},
      this.onStateChange,
    );

    // City (child) filter
    const cityOptions: any = { limit: 20 };
    if (this.stateFilterValues.length) {
      // parent value uris need to be surrounded by '[]' and separated by ','
      const selectedParentItems = this.stateFilterValues
        .map(parentItem => `[${parentItem.value}]`)
        .join(', ');
      const afm = {
        attributes: [{
          displayForm: {
            identifier: locationCityDisplayFormIdentifier,
          },
          localIdentifier: 'childAttribute',
        }],
        filters: [{
          expression: {
            value:
            // parent attribute identifier surrounded by '{}'
            `({${locationStateAttributeIdentifier}}` +
            // selected parent values surrounded by '[]' and separated by ','
            ` IN (${selectedParentItems}))` +
            // attribute identifier of common attribute between parent
            // and child attributes surrounded by '{}'
            ` OVER {${locationIdAttributeIdentifier}}` +
            // child attribute identifier surrounded by '{}'
            ` TO {${locationCityAttributeIdentifier}}`,
          },
        }],
      };
      cityOptions.afm = afm;
    }
    const cityFilter = this.renderFilter(
      'city',
      locationCityDisplayFormIdentifier,
      this.cityFilterValues,
      'all cities',
      cityOptions,
      this.onCityChange
    );
   ReactDOM.render(stateFilter, this.getStateRootDomNode());
   ReactDOM.render(cityFilter, this.getCityRootDomNode());
   this.renderVisualization(self.stateFilterValues, self.cityFilterValues)
  }

  ngOnInit() {
    self = this;
    this.ChartrootDomID = 'ChartrootDomID';
    this.StaterootDomID = 'StaterootDomID';
    this.CityrootDomID = 'CityrootDomID';
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
