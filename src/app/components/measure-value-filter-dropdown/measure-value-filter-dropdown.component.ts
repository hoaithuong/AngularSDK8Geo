import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { PivotTable, Model,MeasureValueFilterDropdown } from '@gooddata/react-components';
import { projectId, locationNameDisplayFormIdentifier, franchisedSalesIdentifier } from '../../../utils/fixtures';
import classNames from "classnames";

export interface PivotTableBucketProps {
  projectId: any;
  measures?: any[];
  rows?: any[];
  columns?: any[];
  totals?: any[];
  filters?: any[];
  sortBy?: any[];
}

export interface MeasureValueFilterDropdownProps{
  projectId: any;
  filter: any;
  onApply: any;
  onCancel: any;
  anchorEl: any;
}

const DropdownButton = ({isActive,measureTitle,onClick}) => {
  const className = classNames("gd-mvf-dropdown-button", "s-mvf-dropdown-button", "gd-button", "gd-button-secondary", "button-dropdown", "icon-right", 
  {
    "icon-navigateup": isActive,
    "icon-navigatedown": !isActive
  });
  return React.createElement("button", {
    className: className,
    onClick: onClick,
  }, measureTitle);
};

export interface DropdownButton{
  isActive: boolean;
  measureTitle: any;
  onClick: any;
}

@Component({
  selector: 'app-measure-value-filter-dropdown',
  templateUrl: './measure-value-filter-dropdown.component.html',
  styleUrls: ['./measure-value-filter-dropdown.component.css']
})

export class MeasureValueFilterDropdownComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit  {
  public buttonIDDropdownn: string;
  public rootDomIDDropdown: string;
  public tableRoomDataDropdown: string;
  ref: React.RefObject<any>;
  displayDropdown: boolean;
  filters: any[];
  filterValue:any;
  totalSales = Model.measure(franchisedSalesIdentifier).localIdentifier('franchisedSalesIdentifier').format('#,##0').title("Franchised Sales");
  locationResort = Model.attribute(locationNameDisplayFormIdentifier);
  defaultMeasureValueFilter = Model.measureValueFilter('franchisedSalesIdentifier');
  state = {
    displayDropdown: false,
    filters: [this.defaultMeasureValueFilter],
  };

onApply = filter => {
    this.filters= [filter];
    this.filterValue= filter;
    this.state ={
      displayDropdown: !this.state.displayDropdown,
      filters:  [this.defaultMeasureValueFilter]
    }
    this.render();   
};

onCancel = () => {
  this.displayDropdown= false;
  this.state ={
    displayDropdown: !this.state.displayDropdown,
    filters:  [this.defaultMeasureValueFilter]
  }
 this.renderFilterValue();
};

toggleDropdown = () => {    
    this.state = {
      displayDropdown: !this.state.displayDropdown,
      filters:  [this.defaultMeasureValueFilter]      
    }
    this.render();
};

//----------Get Element---------
  protected getButtonNode() {
    const node = document.getElementById(this.buttonIDDropdownn);
    invariant(node, `Node '${this.buttonIDDropdownn} not found!`);
    return node;
  }

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomIDDropdown);
    invariant(node, `Node '${this.rootDomIDDropdown} not found!`);
    return node;
  }
  
  protected getTableDataNode() {
    const node = document.getElementById(this.tableRoomDataDropdown);
    invariant(node, `Node tableRoomData not found!`);
    return node;
  }

//---------------Get Component-------------
  protected getMeasureValueProps(): MeasureValueFilterDropdownProps {
    //const { filters } = this.state;
    return {
      anchorEl: this.getButtonNode().getElementsByTagName('button')[0],
      projectId: projectId,
      filter: this.filterValue ? this.filterValue: this.defaultMeasureValueFilter,
      onApply: this.onApply,
      onCancel: this.onCancel,    
    };
  }

  protected getDropdownButtons(): DropdownButton {
    const { displayDropdown } = this.state;
    return {
      isActive: displayDropdown,
      measureTitle: "Custom button",
      onClick: this.toggleDropdown,
    };
  }

  protected getPivotTableProps(): PivotTableBucketProps {
    return {
      projectId: projectId,
      measures: [this.totalSales],
      rows: [this.locationResort],
      filters: this.filters,
    };
  }

//--------------Rendering----------------------
  protected render() {
    this.renderButton();  
    this.renderFilterValue(); 
    this.renderPivotTable();
  }

  public renderButton(){
    ReactDOM.render(React.createElement(DropdownButton, this.getDropdownButtons()), this.getButtonNode());
  }

  public renderFilterValue(){
    const  {displayDropdown} = this.state;
    if (displayDropdown)
    {
      ReactDOM.render(React.createElement(MeasureValueFilterDropdown, this.getMeasureValueProps()), this.getRootDomNode());
    }
    else {
      ReactDOM.unmountComponentAtNode(this.getRootDomNode())
    }
}

  public renderPivotTable() {
    ReactDOM.render(React.createElement(PivotTable, this.getPivotTableProps()), this.getTableDataNode());
}
//--------------

  ngOnInit() {
    this.rootDomIDDropdown = uuid.v4();
    this.tableRoomDataDropdown = uuid.v4();
    this.buttonIDDropdownn= uuid.v4();
    this.ref = React.createRef();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    this.render();
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}

