import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { AttributeFilter, Model } from '@gooddata/react-components';
import { VisualizationInput } from '@gooddata/typings';

import {
  locationResortIdentifier,
  locationResortUri,
  employeeNameDisplayFormUri,
  employeeNameIdentifier,
  projectId
} from '../../../utils/fixtures';

let self: any;

interface AttributeFilterProps {
  projectId: any;
  identifier: any;
  fullscreenOnMobile: boolean;
  onApply: any;
}

interface AttributeFilterByURIProps {
  projectId: any;
  uri: any;
  fullscreenOnMobile: boolean;
  onApply: any;
}

interface AttributeFilterDefinitionProps {
  projectId: any;
  filter: any;
  fullscreenOnMobile: boolean;
  onApply: any;
}

interface AttributeFilterOnApplyWithFilterDefinitionProps {
  projectId: any;
  filter: any;
  fullscreenOnMobile: boolean;
  onApplyWithFilterDefinition: any;
}

@Component({
  selector: 'app-attribute-filter',
  templateUrl: './attribute-filter.component.html',
})

export class AttributeFilterComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  public rootDomID: string;
  public rootFilterByURI: string;
  public rootFilterDefinition: string;
  public rootOnApplyWithFilterDefinition: string;

  filter = Model.positiveAttributeFilter(employeeNameIdentifier, ['Abbie Adams'], true);

  onApply(filter) {
    self.message = null;
    if (filter.in) {
      self.filters = self.filterPositiveAttribute(filter);
    } else {
      self.filters = self.filterNegativeAttribute(filter);
    }
    console.log('NewAttributeFilterComponent onApply', filter);
  }

  public filterPositiveAttribute(filter) {
    const filters = [
      {
        positiveAttributeFilter: {
          displayForm: {
            identifier: filter.id,
          },
          in: filter.in.map(element => `${locationResortUri}/elements?id=${element}`),
        },
      },
    ];
    if (filter.in.length === 0) {
      self.message = 'The filter must have at least one item selected';
    }
    return filters;
  }

  public filterNegativeAttribute(filter) {
    const filters = [
      {
        negativeAttributeFilter: {
          displayForm: {
            identifier: filter.id,
          },
          notIn: filter.notIn.map(element => `${locationResortUri}/elements?id=${element}`),
        },
      },
    ];
    return filters;
  }

  onApplyWithFilterDefinition = filter => {
    self.message = null;
    console.log('NewAttributeFilterComponent onApplyWithFilterDefinition', filter);
    const isPositiveFilter = VisualizationInput.isPositiveAttributeFilter(filter);
    const inType = isPositiveFilter ? 'in' : 'notIn';
    const filterItems = isPositiveFilter
      ? filter.positiveAttributeFilter[inType]
      : filter.negativeAttributeFilter[inType];
    if (!filterItems.length && isPositiveFilter) {
      self.message = 'The filter must have at least one item selected';
    } else {
      self.filters = [filter];
    }
  }

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getRootFilterByURI() {
    const node = document.getElementById(this.rootFilterByURI);
    invariant(node, `Node rootFilterByURI not found!`);
    return node;
  }

  protected getRootFilterDefinition() {
    const node = document.getElementById(this.rootFilterDefinition);
    invariant(node, `Node rootFilterDefinition not found!`);
    return node;
  }

  protected getRootOnApplyWithFilterDefinition() {
    const node = document.getElementById(this.rootOnApplyWithFilterDefinition);
    invariant(node, `Node rootOnApplyWithFilterDefinition not found!`);
    return node;
  }

  protected getProps(): AttributeFilterProps {
    return {
      projectId: projectId,
      identifier: locationResortIdentifier,
      onApply: this.onApply,
      fullscreenOnMobile: false,
    };
  }

  protected getAttributeFilterByUri(): AttributeFilterByURIProps {
    return {
      projectId: projectId,
      uri: employeeNameDisplayFormUri,
      onApply: this.onApply,
      fullscreenOnMobile: false,
    };
  }

  protected getFilterDefinition(): AttributeFilterDefinitionProps {
    return {
      projectId: projectId,
      filter: this.filter,
      onApply: this.onApply,
      fullscreenOnMobile: false,
    };
  }

  protected getOnApplyWithFilterDefinition(): AttributeFilterOnApplyWithFilterDefinitionProps {
    return {
      projectId: projectId,
      filter: this.filter,
      onApplyWithFilterDefinition: this.onApplyWithFilterDefinition,
      fullscreenOnMobile: false,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  private isMounted1(): boolean {
    return !!this.rootFilterByURI;
  }

  private isMounted2(): boolean {
    return !!this.rootFilterDefinition;
  }

  private isMounted3(): boolean {
    return !!this.rootOnApplyWithFilterDefinition;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(AttributeFilter, this.getProps()), this.getRootDomNode());
    }
  }

  protected renderAttributeFilterByURI() {
    if (this.isMounted1()) {
      ReactDOM.render(React.createElement(AttributeFilter, this.getAttributeFilterByUri()), this.getRootFilterByURI());
    }
  }

  protected renderFilterDefinition() {
    if (this.isMounted2()) {
      ReactDOM.render(React.createElement(AttributeFilter, this.getFilterDefinition()), this.getRootFilterDefinition());
    }
  }

  protected renderAttributeFilterApplyWithFilterDefinition() {
    if (this.isMounted3()) {
      // tslint:disable-next-line: max-line-length
      ReactDOM.render(React.createElement(AttributeFilter, this.getOnApplyWithFilterDefinition()), this.getRootOnApplyWithFilterDefinition());
    }
  }

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4();
    this.rootFilterByURI = uuid.v4();
    this.rootFilterDefinition = uuid.v4();
    this.rootOnApplyWithFilterDefinition = uuid.v4();
  }

  ngOnChanges() {
    this.render();
    this.renderAttributeFilterByURI();
    this.renderFilterDefinition();
    this.renderAttributeFilterApplyWithFilterDefinition();
  }

  ngAfterViewInit() {
    this.render();
    this.renderAttributeFilterByURI();
    this.renderFilterDefinition();
    this.renderAttributeFilterApplyWithFilterDefinition();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
