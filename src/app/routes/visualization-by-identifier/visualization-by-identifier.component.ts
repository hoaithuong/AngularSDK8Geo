import { Component, OnInit } from '@angular/core';
import { VisualizationAreaChartComponent } from '../../visualizations/visualization-area-chart/visualization-area-chart.component';
import  VisualizationAreaChartComponentSRC  from '!!raw-loader!../../visualizations/visualization-area-chart/visualization-area-chart.component.ts';
import  VisualizationAreaChartComponentHTML  from '!!raw-loader!../../visualizations/visualization-area-chart/visualization-area-chart.component.html';
import  VisualizationAreaChartComponentCSS  from '!!raw-loader!../../visualizations/visualization-area-chart/visualization-area-chart.component.css';

import { VisualizationTableComponent } from '../../visualizations/visualization-table/visualization-table.component';
import  VisualizationTableComponentSRC  from '!!raw-loader!../../visualizations/visualization-table/visualization-table.component.ts';
import  VisualizationTableComponentHTML  from '!!raw-loader!../../visualizations/visualization-table/visualization-table.component.html';
import  VisualizationTableComponentCSS  from '!!raw-loader!../../visualizations/visualization-table/visualization-table.component.css';

import { VisualizationBarChartComponent } from '../../visualizations/visualization-bar-chart/visualization-bar-chart.component';
import  VisualizationBarChartComponentSRC  from '!!raw-loader!../../visualizations/visualization-bar-chart/visualization-bar-chart.component.ts';
import  VisualizationBarChartComponentHTML  from '!!raw-loader!../../visualizations/visualization-bar-chart/visualization-bar-chart.component.html';
import  VisualizationBarChartComponentCSS  from '!!raw-loader!../../visualizations/visualization-bar-chart/visualization-bar-chart.component.css';

import { VisualizationColumnChartComponent } from '../../visualizations/visualization-column-chart/visualization-column-chart.component';
import  VisualizationColumnChartComponentSRC  from '!!raw-loader!../../visualizations/visualization-column-chart/visualization-column-chart.component.ts';
import  VisualizationColumnChartComponentHTML  from '!!raw-loader!../../visualizations/visualization-column-chart/visualization-column-chart.component.html';
import  VisualizationColumnChartComponentCSS  from '!!raw-loader!../../visualizations/visualization-column-chart/visualization-column-chart.component.css';

import { VisualizationLineChartComponent } from '../../visualizations/visualization-line-chart/visualization-line-chart.component';
import  VisualizationLineChartComponentSRC  from '!!raw-loader!../../visualizations/visualization-line-chart/visualization-line-chart.component.ts';
import  VisualizationLineChartComponentHTML  from '!!raw-loader!../../visualizations/visualization-line-chart/visualization-line-chart.component.html';
import  VisualizationLineChartComponentCSS  from '!!raw-loader!../../visualizations/visualization-line-chart/visualization-line-chart.component.css';

import { VisualizationTreemapByIdentifierComponent } from '../../visualizations/visualization-treemap-by-identifier/visualization-treemap-by-identifier.component';
import  VisualizationTreemapByIdentifierComponentSRC  from '!!raw-loader!../../visualizations/visualization-treemap-by-identifier/visualization-treemap-by-identifier.component.ts';
import  VisualizationTreemapByIdentifierComponentHTML  from '!!raw-loader!../../visualizations/visualization-treemap-by-identifier/visualization-treemap-by-identifier.component.html';
import  VisualizationTreemapByIdentifierComponentCSS  from '!!raw-loader!../../visualizations/visualization-treemap-by-identifier/visualization-treemap-by-identifier.component.css';

import { VisualizationHeatmapByIdentifierComponent } from '../../visualizations/visualization-heatmap-by-identifier/visualization-heatmap-by-identifier.component';
import  VisualizationHeatmapByIdentifierComponentSRC  from '!!raw-loader!../../visualizations/visualization-heatmap-by-identifier/visualization-heatmap-by-identifier.component.ts';
import  VisualizationHeatmapByIdentifierComponentHTML  from '!!raw-loader!../../visualizations/visualization-heatmap-by-identifier/visualization-heatmap-by-identifier.component.html';
import  VisualizationHeatmapByIdentifierComponentCSS  from '!!raw-loader!../../visualizations/visualization-heatmap-by-identifier/visualization-heatmap-by-identifier.component.css';

import { VisualizationPieChartByIdentifierComponent } from '../../visualizations/visualization-pie-chart-by-identifier/visualization-pie-chart-by-identifier.component';
import  VisualizationPieChartByIdentifierComponentSRC  from '!!raw-loader!../../visualizations/visualization-pie-chart-by-identifier/visualization-pie-chart-by-identifier.component.ts';
import  VisualizationPieChartByIdentifierComponentHTML  from '!!raw-loader!../../visualizations/visualization-pie-chart-by-identifier/visualization-pie-chart-by-identifier.component.html';
import  VisualizationPieChartByIdentifierComponentCSS  from '!!raw-loader!../../visualizations/visualization-pie-chart-by-identifier/visualization-pie-chart-by-identifier.component.css';

import { VisualizationDonutChartByIdentifierComponent } from '../../visualizations/visualization-donut-chart-by-identifier/visualization-donut-chart-by-identifier.component';
import  VisualizationDonutChartByIdentifierComponentSRC  from '!!raw-loader!../../visualizations/visualization-donut-chart-by-identifier/visualization-donut-chart-by-identifier.component.ts';
import  VisualizationDonutChartByIdentifierComponentHTML  from '!!raw-loader!../../visualizations/visualization-donut-chart-by-identifier/visualization-donut-chart-by-identifier.component.html';
import  VisualizationDonutChartByIdentifierComponentCSS  from '!!raw-loader!../../visualizations/visualization-donut-chart-by-identifier/visualization-donut-chart-by-identifier.component.css';

import { VisualizationBulletChartByIdentifierComponent } from '../../visualizations/visualization-bullet-chart-by-identifier/visualization-bullet-chart-by-identifier.component';
import  VisualizationBulletChartByIdentifierComponentSRC  from '!!raw-loader!../../visualizations/visualization-bullet-chart-by-identifier/visualization-bullet-chart-by-identifier.component.ts';
import  VisualizationBulletChartByIdentifierComponentHTML  from '!!raw-loader!../../visualizations/visualization-bullet-chart-by-identifier/visualization-bullet-chart-by-identifier.component.html';
import  VisualizationBulletChartByIdentifierComponentCSS  from '!!raw-loader!../../visualizations/visualization-bullet-chart-by-identifier/visualization-bullet-chart-by-identifier.component.css';

@Component({
  selector: 'app-visualization-by-identifier',
  templateUrl: './visualization-by-identifier.component.html',
  styleUrls: ['./visualization-by-identifier.component.css']
})
export class VisualizationByIdentifierComponent implements OnInit {
  constructor() { }

  visualizationByIdentifierComponentArray = [
    {
      title: 'Area Chart',
      for: VisualizationAreaChartComponent,
      ts: VisualizationAreaChartComponentSRC,
      html: VisualizationAreaChartComponentHTML,
      css: VisualizationAreaChartComponentCSS
    },
    {
      title: 'Pivot Table',
      for: VisualizationTableComponent,
      ts: VisualizationTableComponentSRC,
      html: VisualizationTableComponentHTML,
      css: VisualizationTableComponentCSS
    },
    {
      title: 'Bar Chart',
      for: VisualizationBarChartComponent,
      ts: VisualizationBarChartComponentSRC,
      html: VisualizationBarChartComponentHTML,
      css: VisualizationBarChartComponentCSS
    },
    {
      title: 'Column Chart',
      for: VisualizationColumnChartComponent,
      ts: VisualizationColumnChartComponentSRC,
      html: VisualizationColumnChartComponentHTML,
      css: VisualizationColumnChartComponentCSS
    },
    {
      title: 'Line Chart',
      for: VisualizationLineChartComponent,
      ts: VisualizationLineChartComponentSRC,
      html: VisualizationLineChartComponentHTML,
      css: VisualizationLineChartComponentCSS
    },
    {
      title: 'Treemap',
      for: VisualizationTreemapByIdentifierComponent,
      ts: VisualizationTreemapByIdentifierComponentSRC,
      html: VisualizationTreemapByIdentifierComponentHTML,
      css: VisualizationTreemapByIdentifierComponentCSS
    },
    {
      title: 'Heatmap',
      for: VisualizationHeatmapByIdentifierComponent,
      ts: VisualizationHeatmapByIdentifierComponentSRC,
      html: VisualizationHeatmapByIdentifierComponentHTML,
      css: VisualizationHeatmapByIdentifierComponentCSS
    },
    {
      title: 'Pie Chart',
      for: VisualizationPieChartByIdentifierComponent,
      ts: VisualizationPieChartByIdentifierComponentSRC,
      html: VisualizationPieChartByIdentifierComponentHTML,
      css: VisualizationPieChartByIdentifierComponentCSS
    },
    {
      title: 'Donut Chart',
      for: VisualizationDonutChartByIdentifierComponent,
      ts: VisualizationDonutChartByIdentifierComponentSRC,
      html: VisualizationDonutChartByIdentifierComponentHTML,
      css: VisualizationDonutChartByIdentifierComponentCSS
    },
    {
      title: 'Bullet Chart',
      for: VisualizationBulletChartByIdentifierComponent,
      ts: VisualizationBulletChartByIdentifierComponentSRC,
      html: VisualizationBulletChartByIdentifierComponentHTML,
      css: VisualizationBulletChartByIdentifierComponentCSS
    }
  ]

  ngOnInit() {
  }
}
