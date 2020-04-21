import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as invariant from 'invariant';
import ExportDialog from '@gooddata/goodstrap/lib/Dialog/ExportDialog';
import get from 'lodash/get';
import { Component, OnInit, Injectable } from '@angular/core';
import { IExportConfig, IExportResponse } from '@gooddata/gooddata-js';
import { backendUrlForInfo } from '../../../../utils/fixtures';

const DOWNLOADER_ID = 'downloader';

let self: any;

export type IExportFunction = (exportConfig: IExtendedExportConfig) => Promise<IExportResponse>;
export type OnExportReady = (exportFunction: IExportFunction) => void;
export interface IExtendedExportConfig extends IExportConfig {
  includeFilterContext?: boolean;
}

@Component({
  selector: 'app-example-with-export',
  template: '<div [id]="rootDomIDExport"></div>'
})

@Injectable({
  providedIn: 'root'
})

export class ExampleWithExportComponent implements OnInit {
  exportResult: IExportFunction;
  
  public rootDomIDExport: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomIDExport);
    invariant(node, `Node '${this.rootDomIDExport} not found!`);
    return node;
  };

  state = {
    showExportDialog: false,
    errorMessage: null,
  }

  onExportReady = function onExportReady(exportResult: IExportFunction) {
    self.exportResult = exportResult;
  }

  getExportDialog = function getExportDialog() {
    return React.createElement(ExportDialog, {
      headline: 'Export to XLSX',
      cancelButtonText: 'Cancel',
      submitButtonText: 'Export',
      isPositive: true,
      seleniumClass: 's-dialog',
      mergeHeaders: true,
      mergeHeadersDisabled: false,
      mergeHeadersText: 'Keep attribute cells merged',
      mergeHeadersTitle: 'CELLS',
      onCancel: this.exportDialogCancel,
      onSubmit: this.exportDialogSubmit
    });
  }

  downloadFile = function downloadFile(uri) {
    let anchor = document.getElementById(DOWNLOADER_ID) as HTMLAnchorElement;
    if (!anchor) {
      anchor = document.createElement('a');
      anchor.id = DOWNLOADER_ID;
      document.body.appendChild(anchor);
    }
    anchor.href = backendUrlForInfo + uri;
    anchor.download = uri;
    anchor.click();
  }

  exportDialogCancel = () => {
    this.state.showExportDialog = false;
    this.render();
  }

  exportToCSV = () => {
    this.doExport({});
  }

  exportToXLSX = () => {
    this.doExport({ format: 'xlsx' });
  }

  exportWithCustomName = () => {
    this.doExport({ title: 'CustomName' });
  }

  exportWithDialog = () => {
    this.state.showExportDialog = true;
    this.render();
  }

  exportDialogSubmit = data => {
    const { mergeHeaders, includeFilterContext } = data;
    this.state.showExportDialog = false;
    const exportConfig = { format: 'xlsx', title: 'CustomName', includeFilterContext, mergeHeaders };
    this.doExport(exportConfig);
    this.render();
  }

  async doExport(exportConfig) {
    try {
      const result = await self.exportResult(exportConfig);
      ({ errorMessage: null });
      this.downloadFile(result.uri);
    } catch (error) {
      let errorMessage = error.message;
      if (error.responseBody) {
        errorMessage = get(JSON.parse(error.responseBody), 'error.message');
      }
      ({ errorMessage });
    }
  }

  protected render() {
    const { errorMessage, showExportDialog } = this.state;
    var errorComponent;

    if (errorMessage) {
      errorComponent = React.createElement(
        'div',
        {
          style: {
            color: 'red',
            marginTop: 5
          }
        },
        errorMessage
      );
    }

    var exportDialog;
    if (showExportDialog) {
      exportDialog = this.getExportDialog();
    }

    ReactDOM.render(
      React.createElement(
        'div',
        {
          style: {
            height: 50
          }
        },
        React.createElement(
          'div',
          {
            style: {
              marginTop: 15
            }
          },
          React.createElement(
            'button',
            {
              className: 'gd-button gd-button-secondary',
              onClick: this.exportToCSV
            },
            'Export CSV'
          ),
          React.createElement(
            'button',
            {
              className: 'gd-button gd-button-secondary',
              onClick: this.exportToXLSX
            },
            'Export XLSX'
          ),
          React.createElement(
            'button',
            {
              className: 'gd-button gd-button-secondary',
              onClick: this.exportWithCustomName
            },
            'Export with custom name CustomName'
          ),
          React.createElement(
            'button',
            {
              className: 'gd-button gd-button-secondary',
              onClick: this.exportWithDialog
            },
            'Export using Export Dialog'
          )
        ),
        errorComponent,
        exportDialog
      ), this.getRootDomNode());
  }

  ngOnInit() {
    self = this;
    this.rootDomIDExport = 'rootDomIDExport';
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }
}
