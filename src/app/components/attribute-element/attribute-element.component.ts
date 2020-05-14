import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { AttributeElements } from '@gooddata/react-components';
import { employeeNameIdentifier, projectId } from '../../../utils/fixtures';

interface AttributeElement {
  title: any;
  uri: any;
}

export class AttributeFilterItem extends React.Component<AttributeElement> {
  onChange(uri) {
    return event => console.log("AttributeFilterItem onChange", uri, event.target.value === "on");
  };

  render() {
    const { title, uri } = this.props;
    return (
      React.createElement("label", {
        className: "gd-list-item s-attribute-filter-list-item",
        style: {
          display: "inline-flex"
        }
      }, React.createElement("input", {
        type: "checkbox",
        className: "gd-input-checkbox",
        onChange: this.onChange(uri)
      }), React.createElement("span", null, title)));

  };
}

@Component({
  selector: 'app-attribute-element',
  templateUrl: './attribute-element.component.html',
})

export class AttributeElementComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  public rootDomID: string;
  isLoading: any;
  offset: any;
  count: any;
  total: any;
  nextOffset: any;
  loadMore: any;
  validElements: any[];
  disabled: boolean = this.isLoading || this.offset+ this.count === this.total;
  

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  buildAttributeFilterItem(item) {
    const {
      element: { title, uri },
    } = item;

    return React.createElement(AttributeFilterItem, {
      key: uri,
      uri: uri,
      title: title
    });
  }
  
  render() {
    ReactDOM.render(React.createElement(AttributeElements, {
      identifier: employeeNameIdentifier,
      projectId: projectId,
      options: {
        limit: 20
      }
    }, ({
      validElements,
      loadMore,
      isLoading,
      error
    }) => {
      const {
        offset = null,
        count = null,
        total = null
      } = validElements ? validElements.paging : {};

      if (error) {
        return React.createElement("div", null, error);
      }

      return this.loadMore = loadMore,
        this.isLoading = isLoading.toString(),
        this.offset = offset,
        this.count = count,
        this.total = total,
        this.nextOffset = offset + count,
        React.createElement("div", null,
          React.createElement("div", null, validElements ? validElements.items.map(this.buildAttributeFilterItem) : null),
          validElements ? React.createElement("pre", null, JSON.stringify(validElements, null, "  ")) : null)

    }), this.getRootDomNode())
  }

  ngOnInit() {
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
