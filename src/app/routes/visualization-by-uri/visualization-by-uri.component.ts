import { Component, OnInit } from '@angular/core';
import { VisualizationAreaChartByUriComponent } from '../../visualizations/visualization-area-chart-by-uri/visualization-area-chart-by-uri.component';
import  VisualizationAreaChartByUriComponentSRC  from '!!raw-loader!../../visualizations/visualization-area-chart-by-uri/visualization-area-chart-by-uri.component.ts';
import  VisualizationAreaChartByUriComponentHTML  from '!!raw-loader!../../visualizations/visualization-area-chart-by-uri/visualization-area-chart-by-uri.component.html';
import  VisualizationAreaChartByUriComponentCSS  from '!!raw-loader!../../visualizations/visualization-area-chart-by-uri/visualization-area-chart-by-uri.component.css';

import { VisualizationColumnChartByUriComponent } from '../../visualizations/visualization-column-chart-by-uri/visualization-column-chart-by-uri.component';
import  VisualizationColumnChartByUriComponentSRC  from '!!raw-loader!../../visualizations/visualization-column-chart-by-uri/visualization-column-chart-by-uri.component.ts';
import  VisualizationColumnChartByUriComponentHTML  from '!!raw-loader!../../visualizations/visualization-column-chart-by-uri/visualization-column-chart-by-uri.component.html';
import  VisualizationColumnChartByUriComponentCSS  from '!!raw-loader!../../visualizations/visualization-column-chart-by-uri/visualization-column-chart-by-uri.component.css';

import { VisualizationLineChartByUriComponent } from '../../visualizations/visualization-line-chart-by-uri/visualization-line-chart-by-uri.component';
import  VisualizationLineChartByUriComponentSRC  from '!!raw-loader!../../visualizations/visualization-line-chart-by-uri/visualization-line-chart-by-uri.component.ts';
import  VisualizationLineChartByUriComponentHTML  from '!!raw-loader!../../visualizations/visualization-line-chart-by-uri/visualization-line-chart-by-uri.component.html';
import  VisualizationLineChartByUriComponentCSS  from '!!raw-loader!../../visualizations/visualization-line-chart-by-uri/visualization-line-chart-by-uri.component.css';

import { VisualizationHeadlineByUriComponent } from '../../visualizations/visualization-headline-by-uri/visualization-headline-by-uri.component';
import  VisualizationHeadlineByUriComponentSRC  from '!!raw-loader!../../visualizations/visualization-headline-by-uri/visualization-headline-by-uri.component.ts';
import  VisualizationHeadlineByUriComponentHTML  from '!!raw-loader!../../visualizations/visualization-headline-by-uri/visualization-headline-by-uri.component.html';
import  VisualizationHeadlineByUriComponentCSS  from '!!raw-loader!../../visualizations/visualization-headline-by-uri/visualization-headline-by-uri.component.css';

import { VisualizationBubbleChartByUriComponent } from '../../visualizations/visualization-bubble-chart-by-uri/visualization-bubble-chart-by-uri.component';
import  VisualizationBubbleChartByUriComponentSRC  from '!!raw-loader!../../visualizations/visualization-bubble-chart-by-uri/visualization-bubble-chart-by-uri.component.ts';
import  VisualizationBubbleChartByUriComponentHTML  from '!!raw-loader!../../visualizations/visualization-bubble-chart-by-uri/visualization-bubble-chart-by-uri.component.html';
import  VisualizationBubbleChartByUriComponentCSS  from '!!raw-loader!../../visualizations/visualization-bubble-chart-by-uri/visualization-bubble-chart-by-uri.component.css';

import { VisualizationScatterPlotByUriComponent } from '../../visualizations/visualization-scatter-plot-by-uri/visualization-scatter-plot-by-uri.component';
import  VisualizationScatterPlotByUriComponentSRC  from '!!raw-loader!../../visualizations/visualization-scatter-plot-by-uri/visualization-scatter-plot-by-uri.component.ts';
import  VisualizationScatterPlotByUriComponentHTML  from '!!raw-loader!../../visualizations/visualization-scatter-plot-by-uri/visualization-scatter-plot-by-uri.component.html';
import  VisualizationScatterPlotByUriComponentCSS  from '!!raw-loader!../../visualizations/visualization-scatter-plot-by-uri/visualization-scatter-plot-by-uri.component.css';

import { VisualizationPieChartByUriComponent } from '../../visualizations/visualization-pie-chart-by-uri/visualization-pie-chart-by-uri.component';
import  VisualizationPieChartByUriComponentSRC  from '!!raw-loader!../../visualizations/visualization-pie-chart-by-uri/visualization-pie-chart-by-uri.component.ts';
import  VisualizationPieChartByUriComponentHTML  from '!!raw-loader!../../visualizations/visualization-pie-chart-by-uri/visualization-pie-chart-by-uri.component.html';
import  VisualizationPieChartByUriComponentCSS  from '!!raw-loader!../../visualizations/visualization-pie-chart-by-uri/visualization-pie-chart-by-uri.component.css';

import { VisualizationDonutChartByUriComponent } from '../../visualizations/visualization-donut-chart-by-uri/visualization-donut-chart-by-uri.component';
import  VisualizationDonutChartByUriComponentSRC  from '!!raw-loader!../../visualizations/visualization-donut-chart-by-uri/visualization-donut-chart-by-uri.component.ts';
import  VisualizationDonutChartByUriComponentHTML  from '!!raw-loader!../../visualizations/visualization-donut-chart-by-uri/visualization-donut-chart-by-uri.component.html';
import  VisualizationDonutChartByUriComponentCSS  from '!!raw-loader!../../visualizations/visualization-donut-chart-by-uri/visualization-donut-chart-by-uri.component.css';

import { VisualizationBulletChartByUriComponent } from '../../visualizations/visualization-bullet-chart-by-uri/visualization-bullet-chart-by-uri.component';
import  VisualizationBulletChartByUriComponentSRC  from '!!raw-loader!../../visualizations/visualization-bullet-chart-by-uri/visualization-bullet-chart-by-uri.component.ts';
import  VisualizationBulletChartByUriComponentHTML  from '!!raw-loader!../../visualizations/visualization-bullet-chart-by-uri/visualization-bullet-chart-by-uri.component.html';
import  VisualizationBulletChartByUriComponentCSS  from '!!raw-loader!../../visualizations/visualization-bullet-chart-by-uri/visualization-bullet-chart-by-uri.component.css';

@Component({
  selector: 'app-visualization-by-uri',
  templateUrl: './visualization-by-uri.component.html',
  styleUrls: ['./visualization-by-uri.component.css']
})
export class VisualizationByUriComponent implements OnInit {
  constructor() { }

  visualizationByUriComponentArray = [
    {
      title: 'Area Chart',
      for: VisualizationAreaChartByUriComponent,
      ts: VisualizationAreaChartByUriComponentSRC,
      html: VisualizationAreaChartByUriComponentHTML,
      css: VisualizationAreaChartByUriComponentCSS
    },
    {
      title: 'Column Chart',
      for: VisualizationColumnChartByUriComponent,
      ts: VisualizationColumnChartByUriComponentSRC,
      html: VisualizationColumnChartByUriComponentHTML,
      css: VisualizationColumnChartByUriComponentCSS
    },
    {
      title: 'Line Chart',
      for: VisualizationLineChartByUriComponent,
      ts: VisualizationLineChartByUriComponentSRC,
      html: VisualizationLineChartByUriComponentHTML,
      css: VisualizationLineChartByUriComponentCSS
    },
    {
      title: 'Headline',
      for: VisualizationHeadlineByUriComponent,
      ts: VisualizationHeadlineByUriComponentSRC,
      html: VisualizationHeadlineByUriComponentHTML,
      css: VisualizationHeadlineByUriComponentCSS
    },
    {
      title: 'Bubble Chart',
      for: VisualizationBubbleChartByUriComponent,
      ts: VisualizationBubbleChartByUriComponentSRC,
      html: VisualizationBubbleChartByUriComponentHTML,
      css: VisualizationBubbleChartByUriComponentCSS
    },
    {
      title: 'Scatter Chart',
      for: VisualizationScatterPlotByUriComponent,
      ts: VisualizationScatterPlotByUriComponentSRC,
      html: VisualizationScatterPlotByUriComponentHTML,
      css: VisualizationScatterPlotByUriComponentCSS
    },
    {
      title: 'Pie Chart',
      for: VisualizationPieChartByUriComponent,
      ts: VisualizationPieChartByUriComponentSRC,
      html: VisualizationPieChartByUriComponentHTML,
      css: VisualizationPieChartByUriComponentCSS
    },
    {
      title: 'Donut Chart',
      for: VisualizationDonutChartByUriComponent,
      ts: VisualizationDonutChartByUriComponentSRC,
      html: VisualizationDonutChartByUriComponentHTML,
      css: VisualizationDonutChartByUriComponentCSS
    },
    {
      title: 'Bullet Chart',
      for: VisualizationBulletChartByUriComponent,
      ts: VisualizationBulletChartByUriComponentSRC,
      html: VisualizationBulletChartByUriComponentHTML,
      css: VisualizationBulletChartByUriComponentCSS
    }
  ]

  ngOnInit() {
  }
}
