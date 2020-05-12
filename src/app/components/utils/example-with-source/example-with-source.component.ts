import { Component, OnInit, Injectable, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import * as React from 'react';
import * as invariant from 'invariant';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import { MatTabGroup } from '@angular/material/tabs';

let self: any;

@Component({
  selector: 'app-example-with-source',
  templateUrl: './example-with-source.component.html'
})

@Injectable({
  providedIn: 'root'
})

export class ExampleWithSourceComponent implements OnInit {
  @Input() ts: string;
  @Input() html?: string;
  @Input() css?: string;
  @Input() for: any;
  
  @ViewChild('container', {
    read: ViewContainerRef,
    static: false
  }) container: ViewContainerRef;

  @ViewChild('tabGroup',{
    static: false
  }) tabGroup: MatTabGroup;

  renderComponent() {
    const container = this.container; 
    container.clear();
    const injector = container.injector;
    const cfr: ComponentFactoryResolver = injector.get(ComponentFactoryResolver);
    const componentFactory = cfr.resolveComponentFactory(this.for);
    container.createComponent(componentFactory, 0, injector).changeDetectorRef.detectChanges();;
  }

  state = { 
    hidden: true,
    emptyHtml: true,
    emptyCss: true
  };

  toggle() {
    this.state.hidden = !this.state.hidden;
    if (this.html != "") {
      this.state.emptyHtml = false;
    }
    if (this.css != "") {
      this.state.emptyCss = false;
    }
    this.tabGroup.selectedIndex = 0;
    this.tabGroup.realignInkBar();
    this.render();
  }

  public rootDomIDSRC: string;
  public rootDomIDHTML: string;
  public rootDomIDCSS: string;

  protected getRootDomNodeSRC() {
    const node = document.getElementById(this.rootDomIDSRC);
    invariant(node, `Node '${this.rootDomIDSRC} not found!`);
    return node;
  };

  protected getRootDomNodeHTML() {
    const node = document.getElementById(this.rootDomIDHTML);
    invariant(node, `Node '${this.rootDomIDHTML} not found!`);
    return node;
  };

  protected getRootDomNodeCSS() {
    const node = document.getElementById(this.rootDomIDCSS);
    invariant(node, `Node '${this.rootDomIDCSS} not found!`);
    return node;
  };

  tabChange(event) {
    var tabIndex = event.index;
    switch (tabIndex) {
      case 0: this.renderSRC(); break;
      case 1: this.renderHTML(); break;
      case 2: this.renderCSS(); break;
      default: break;
    }
  }

  renderSRC(){
    ReactDOM.render(React.createElement(
      "div",
      {
        className: "example-with-source"
      },
      React.createElement(
        SyntaxHighlighter,
        {
          language: "tsx",
          style: okaidia
        },
        this.ts
      )
    ),this.getRootDomNodeSRC())
  }

  renderHTML(){
    ReactDOM.render(React.createElement(
      "div",
      {
        className: "example-with-source"
      },
      React.createElement(
        SyntaxHighlighter,
        {
          language: "jsx",
          style: okaidia
        },
        this.html
      )
    ),this.getRootDomNodeHTML())
  }

  renderCSS(){
    ReactDOM.render(React.createElement(
      "div",
      {
        className: "example-with-source"
      },
      React.createElement(
        SyntaxHighlighter,
        {
          language: "css",
          style: okaidia
        },
        this.css
      )
    ),this.getRootDomNodeCSS())
  }

  render(){
    this.renderSRC();
  }
  
  ngOnInit() {
    self = this;
    this.rootDomIDSRC = uuid.v4();
    this.rootDomIDHTML = uuid.v4();
    this.rootDomIDCSS = uuid.v4();
  }

  ngAfterViewInit() {
    this.renderComponent();
    this.render();
  }
}
