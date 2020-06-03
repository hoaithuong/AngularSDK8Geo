import { Component, OnInit } from '@angular/core';
import { CombineAttributeWithMeasureFilterInsightComponentComponent } from '../../components/combine-attribute-with-measure-filter-insight-component/combine-attribute-with-measure-filter-insight-component.component';
import  CombineAttributeWithMeasureFilterInsightComponentComponentSRC  from '!!raw-loader!../../components/combine-attribute-with-measure-filter-insight-component/combine-attribute-with-measure-filter-insight-component.component.ts';
import  CombineAttributeWithMeasureFilterInsightComponentComponentHTML  from '!!raw-loader!../../components/combine-attribute-with-measure-filter-insight-component/combine-attribute-with-measure-filter-insight-component.component.html';
import  CombineAttributeWithMeasureFilterInsightComponentComponentCSS  from '!!raw-loader!../../components/combine-attribute-with-measure-filter-insight-component/combine-attribute-with-measure-filter-insight-component.component.css';


@Component({
  selector: 'app-combine-filter-insight-component-examples',
  templateUrl: './combine-filter-insight-component-examples.component.html',
  styleUrls: ['./combine-filter-insight-component-examples.component.css']
})
export class CombineFilterInsightComponentExamplesComponent implements OnInit {

  constructor() { }

  combineFilterArray = [
    {
      title: 'Attribute and Measure Value Filter in Insight',
      content: [
        `Combine Filter with Attribute Filter and Measure Value Filter in Insight view`
      ],
      for: CombineAttributeWithMeasureFilterInsightComponentComponent,
      ts: CombineAttributeWithMeasureFilterInsightComponentComponentSRC,
      html: CombineAttributeWithMeasureFilterInsightComponentComponentHTML,
      css: CombineAttributeWithMeasureFilterInsightComponentComponentCSS
    }
  ]
  ngOnInit() {
  }

}
