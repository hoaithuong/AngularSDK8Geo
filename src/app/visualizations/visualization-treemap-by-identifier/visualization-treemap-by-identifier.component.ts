import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { projectId, treemapVisualizationIdentifier } from "../../../utils/fixtures";
import { Visualization } from '@gooddata/react-components';

interface VisualizationTreemapByIdentifierProps {
  projectId: any;
  identifier: any;
}

@Component({
  selector: 'app-visualization-treemap-by-identifier',
  template: '<div class="visualization-treemap-by-identifier" style="height:400px" [id]="rootDomID"></div>',
})

export class VisualizationTreemapByIdentifierComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): VisualizationTreemapByIdentifierProps {
    return {
      projectId: projectId,
      identifier: treemapVisualizationIdentifier,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(Visualization, this.getProps()), this.getRootDomNode());
    }
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
