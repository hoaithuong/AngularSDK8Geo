import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit ,OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { 
  projectId, 
  visualizationhasMfvIdentifier, 
  totalSalesMFVLocalIdentifier
} from "../../../utils/fixtures";
import { 
  Visualization,
  Model,
  MeasureValueFilter 
} from '@gooddata/react-components';

export interface VisualizationHasMFVProps {
  projectId: any;
  identifier:any;  
  config?: any;
  filters?:any[];
}

export interface MeasureValueFilterProps {
  projectId: any;
  onApply: any;
  filter: any;
  buttonTitle: string;
}

@Component({
  selector: 'app-visualization-has-mvf',
  templateUrl: './visualization-has-mvf.component.html',
  styleUrls: ['./visualization-has-mvf.component.css']
})
export class VisualizationHasMvfComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  ref: React.RefObject<any>;
  public rootDomID: string;
  public rootDomIDData: string;
  filters: any[];
  filterValue: any;
  config = {
    maxHeight: 400,
  };
  defaultMeasureValueFilter = Model.measureValueFilter(totalSalesMFVLocalIdentifier)
  state = {
    filters: [this.defaultMeasureValueFilter],
  };

  onApply = filter => {
    this.filters = [filter];
    this.filterValue = filter;
    this.state = {
      filters: [this.defaultMeasureValueFilter]
    }
    this.render();
  };

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getDataNode() {
    const node = document.getElementById(this.rootDomIDData);
    invariant(node, `Node '${this.rootDomIDData} not found!`);
    return node;
  }

  protected getMeasureValueProps(): MeasureValueFilterProps {
    const { filters } = this.state;
    return {
      projectId: projectId,
      filter: this.filterValue ? this.filterValue : this.defaultMeasureValueFilter,
      onApply: this.onApply,
      buttonTitle: "Total Sales",
    };
  }

  protected getProps(): VisualizationHasMFVProps {
    return {
      projectId:projectId,
      identifier: visualizationhasMfvIdentifier,
      config: this.config,
      filters: this.filters,
    };
  }
  
  protected render() {
      this.renderVisualization();
      this.renderFilterValue();
      
  }

  protected renderVisualization() {
    ReactDOM.render(React.createElement(Visualization, this.getProps()), this.getDataNode());
  }

  public renderFilterValue() {
    ReactDOM.render(React.createElement(MeasureValueFilter, this.getMeasureValueProps()), this.getRootDomNode());
  }

  ngOnInit() {
    this.rootDomID = uuid.v4();
    this.rootDomIDData = uuid.v4();
    this.ref = React.createRef();
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
