import { Component, OnInit } from '@angular/core';
import { CombineAttributeWithMeasureFilterInsightComponent } from '../../components/combine-attribute-with-measure-filter-insight/combine-attribute-with-measure-filter-insight.component';
import  CombineAttributeWithMeasureFilterInsightComponentSRC  from '!!raw-loader!../../components/combine-attribute-with-measure-filter-insight/combine-attribute-with-measure-filter-insight.component.ts';
import  CombineAttributeWithMeasureFilterInsightComponentHTML  from '!!raw-loader!../../components/combine-attribute-with-measure-filter-insight/combine-attribute-with-measure-filter-insight.component.html';
import  CombineAttributeWithMeasureFilterInsightComponentCSS  from '!!raw-loader!../../components/combine-attribute-with-measure-filter-insight/combine-attribute-with-measure-filter-insight.component.css';


@Component({
  selector: 'app-combine-filter-insight-examples',
  templateUrl: './combine-filter-insight-examples.component.html',
  styleUrls: ['./combine-filter-insight-examples.component.css']
})
export class CombineFilterInsightExamplesComponent implements OnInit {

  constructor() { }
  combineFilterArray = [
    {
      title: 'Attribute and Measure Value Filter in Insight',
      content: [
        `Combine Filter with Attribute Filter and Measure Value Filter in Insight view`
      ],
      for: CombineAttributeWithMeasureFilterInsightComponent,
      ts: CombineAttributeWithMeasureFilterInsightComponentSRC,
      html: CombineAttributeWithMeasureFilterInsightComponentHTML,
      css: CombineAttributeWithMeasureFilterInsightComponentCSS
    }
  ]
  ngOnInit() {
  }

}
