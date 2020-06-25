import { Component, OnInit } from '@angular/core';
import {CombineAttributeWithMeasureFilterComponent} from '../../components/combine-attribute-with-measure-filter/combine-attribute-with-measure-filter.component';
import  CombineAttributeWithMeasureFilterComponentSRC  from '!!raw-loader!../../components/combine-attribute-with-measure-filter/combine-attribute-with-measure-filter.component.ts';
import  CombineAttributeWithMeasureFilterComponentHTML  from '!!raw-loader!../../components/combine-attribute-with-measure-filter/combine-attribute-with-measure-filter.component.html';
import  CombineAttributeWithMeasureFilterComponentCSS  from '!!raw-loader!../../components/combine-attribute-with-measure-filter/combine-attribute-with-measure-filter.component.css';

import {CombineDateAndAttributeWithMeasureFilterComponent} from '../../components/combine-date-and-attribute-with-measure-filter/combine-date-and-attribute-with-measure-filter.component';
import  CombineDateAndAttributeWithMeasureFilterComponentSRC  from '!!raw-loader!../../components/combine-date-and-attribute-with-measure-filter/combine-date-and-attribute-with-measure-filter.component.ts';
import  CombineDateAndAttributeWithMeasureFilterComponentHTML  from '!!raw-loader!../../components/combine-date-and-attribute-with-measure-filter/combine-date-and-attribute-with-measure-filter.component.html';
import  CombineDateAndAttributeWithMeasureFilterComponentCSS  from '!!raw-loader!../../components/combine-date-and-attribute-with-measure-filter/combine-date-and-attribute-with-measure-filter.component.css';

import {CombineDateWithMeasureFilterComponent} from '../../components/combine-date-with-measure-filter/combine-date-with-measure-filter.component';
import  CombineDateWithMeasureFilterComponentSRC  from '!!raw-loader!../../components/combine-date-with-measure-filter/combine-date-with-measure-filter.component.ts';
import  CombineDateWithMeasureFilterComponentHTML  from '!!raw-loader!../../components/combine-date-with-measure-filter/combine-date-with-measure-filter.component.html';
import  CombineDateWithMeasureFilterComponentCSS  from '!!raw-loader!../../components/combine-date-with-measure-filter/combine-date-with-measure-filter.component.css';


@Component({
  selector: 'app-combine-filter-examples',
  templateUrl: './combine-filter-examples.component.html',
  styleUrls: ['./combine-filter-examples.component.css']
})
export class CombineFilterExamplesComponent implements OnInit {

  constructor() { }

  combineFilterArray = [
    {
      title: 'Attribute and Measure Value Filter',
      content: [
        `Combine Filter with Attribute Filter and Measure Value Filter`
      ],
      for: CombineAttributeWithMeasureFilterComponent,
      ts: CombineAttributeWithMeasureFilterComponentSRC,
      html: CombineAttributeWithMeasureFilterComponentHTML,
      css: CombineAttributeWithMeasureFilterComponentCSS
    },
    {
      title: 'Date and Measure Value Filter',
      content: [
        `Combine Filter with Date Filter and Measure Value Filter`
      ],
      for: CombineDateWithMeasureFilterComponent,
      ts: CombineDateWithMeasureFilterComponentSRC,
      html: CombineDateWithMeasureFilterComponentHTML,
      css: CombineDateWithMeasureFilterComponentCSS
    },
    {
      title: 'Date, Attribute and Measure Value Filter',
      content: [
        `Combine Filter with Date Filter, Attribute Filter and Measure Value Filter`
      ],
      for: CombineDateAndAttributeWithMeasureFilterComponent,
      ts: CombineDateAndAttributeWithMeasureFilterComponentSRC,
      html: CombineDateAndAttributeWithMeasureFilterComponentHTML,
      css: CombineDateAndAttributeWithMeasureFilterComponentCSS
    }
  ]

  ngOnInit() {
  }
}

