import { Component, OnInit } from '@angular/core';
import { GeoPushpinChartClusteringExampleComponent } from '../../components/geo-pushpin-chart-clustering-example/geo-pushpin-chart-clustering-example.component';
import  GeoPushpinChartClusteringExampleComponentSRC  from '!!raw-loader!../../components/geo-pushpin-chart-clustering-example/geo-pushpin-chart-clustering-example.component.ts';
import  GeoPushpinChartClusteringExampleComponentHTML  from '!!raw-loader!../../components/geo-pushpin-chart-clustering-example/geo-pushpin-chart-clustering-example.component.html';
import  GeoPushpinChartClusteringExampleComponentCSS  from '!!raw-loader!../../components/geo-pushpin-chart-clustering-example/geo-pushpin-chart-clustering-example.component.css';

import { GeoPushpinChartWithColorLegendExampleComponent } from '../../components/geo-pushpin-chart-with-color-legend-example/geo-pushpin-chart-with-color-legend-example.component';
import  GeoPushpinChartWithColorLegendExampleComponentSRC  from '!!raw-loader!../../components/geo-pushpin-chart-with-color-legend-example/geo-pushpin-chart-with-color-legend-example.component.ts';
import  GeoPushpinChartWithColorLegendExampleComponentHTML  from '!!raw-loader!../../components/geo-pushpin-chart-with-color-legend-example/geo-pushpin-chart-with-color-legend-example.component.html';
import  GeoPushpinChartWithColorLegendExampleComponentCSS  from '!!raw-loader!../../components/geo-pushpin-chart-with-color-legend-example/geo-pushpin-chart-with-color-legend-example.component.css';

import { GeoPushpinChartWithCategoryLegendExampleComponent } from '../../components/geo-pushpin-chart-with-category-legend-example/geo-pushpin-chart-with-category-legend-example.component';
import  GeoPushpinChartWithCategoryLegendExampleComponentSRC  from '!!raw-loader!../../components/geo-pushpin-chart-with-category-legend-example/geo-pushpin-chart-with-category-legend-example.component.ts';
import  GeoPushpinChartWithCategoryLegendExampleComponentHTML  from '!!raw-loader!../../components/geo-pushpin-chart-with-category-legend-example/geo-pushpin-chart-with-category-legend-example.component.html';
import  GeoPushpinChartWithCategoryLegendExampleComponentCSS  from '!!raw-loader!../../components/geo-pushpin-chart-with-category-legend-example/geo-pushpin-chart-with-category-legend-example.component.css';

import { GeoPushpinChartConfigurationExampleComponent } from '../../components/geo-pushpin-chart-configuration-example/geo-pushpin-chart-configuration-example.component';
import  GeoPushpinChartConfigurationExampleComponentSRC  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-example/geo-pushpin-chart-configuration-example.component.ts';
import  GeoPushpinChartConfigurationExampleComponentHTML  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-example/geo-pushpin-chart-configuration-example.component.html';
import  GeoPushpinChartConfigurationExampleComponentCSS  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-example/geo-pushpin-chart-configuration-example.component.css';

import { GeoPushpinChartConfigurationLegendExampleComponent } from '../../components/geo-pushpin-chart-configuration-legend-example/geo-pushpin-chart-configuration-legend-example.component';
import  GeoPushpinChartConfigurationLegendExampleComponentSRC  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-legend-example/geo-pushpin-chart-configuration-legend-example.component.ts';
import  GeoPushpinChartConfigurationLegendExampleComponentHTML  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-legend-example/geo-pushpin-chart-configuration-legend-example.component.html';
import  GeoPushpinChartConfigurationLegendExampleComponentCSS  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-legend-example/geo-pushpin-chart-configuration-legend-example.component.css';

import { GeoPushpinChartConfigurationViewportExampleComponent } from '../../components/geo-pushpin-chart-configuration-viewport-example/geo-pushpin-chart-configuration-viewport-example.component';
import  GeoPushpinChartConfigurationViewportExampleComponentSRC  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-viewport-example/geo-pushpin-chart-configuration-viewport-example.component.ts';
import  GeoPushpinChartConfigurationViewportExampleComponentHTML  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-viewport-example/geo-pushpin-chart-configuration-viewport-example.component.html';
import  GeoPushpinChartConfigurationViewportExampleComponentCSS  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-viewport-example/geo-pushpin-chart-configuration-viewport-example.component.css';

import { GeoPushpinChartConfigurationColorMappingExampleComponent } from '../../components/geo-pushpin-chart-configuration-color-mapping-example/geo-pushpin-chart-configuration-color-mapping-example.component';
import  GeoPushpinChartConfigurationColorMappingExampleComponentSRC  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-color-mapping-example/geo-pushpin-chart-configuration-color-mapping-example.component.ts';
import  GeoPushpinChartConfigurationColorMappingExampleComponentHTML  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-color-mapping-example/geo-pushpin-chart-configuration-color-mapping-example.component.html';
import  GeoPushpinChartConfigurationColorMappingExampleComponentCSS  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-color-mapping-example/geo-pushpin-chart-configuration-color-mapping-example.component.css';

import { GeoPushpinChartConfigurationPointsGroupNearbyExampleComponent } from '../../components/geo-pushpin-chart-configuration-points-group-nearby-example/geo-pushpin-chart-configuration-points-group-nearby-example.component';
import  GeoPushpinChartConfigurationPointsGroupNearbyExampleComponentSRC  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-points-group-nearby-example/geo-pushpin-chart-configuration-points-group-nearby-example.component.ts';
import  GeoPushpinChartConfigurationPointsGroupNearbyExampleComponentHTML  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-points-group-nearby-example/geo-pushpin-chart-configuration-points-group-nearby-example.component.html';
import  GeoPushpinChartConfigurationPointsGroupNearbyExampleComponentCSS  from '!!raw-loader!../../components/geo-pushpin-chart-configuration-points-group-nearby-example/geo-pushpin-chart-configuration-points-group-nearby-example.component.css';

@Component({
  selector: 'app-geo-chart-example',
  templateUrl: './geo-chart-example.component.html',
  styleUrls: ['./geo-chart-example.component.css']
})
export class GeoChartExampleComponent implements OnInit {

  constructor() { }
  basicComponentsArray = [
    {
      title: 'Example of Geo Pushpin Chart with Clustering',
      for: GeoPushpinChartClusteringExampleComponent,
      ts: GeoPushpinChartClusteringExampleComponentSRC,
      html: GeoPushpinChartClusteringExampleComponentHTML,
      css: GeoPushpinChartClusteringExampleComponentCSS
    },
    {
      title: 'Example of Geo Pushpin Chart with Size and Color Legend',
      for: GeoPushpinChartWithColorLegendExampleComponent,
      ts: GeoPushpinChartWithColorLegendExampleComponentSRC,
      html: GeoPushpinChartWithColorLegendExampleComponentHTML,
      css: GeoPushpinChartWithColorLegendExampleComponentCSS
    },
    {
      title: 'Example of Geo Pushpin Chart with Size and Category Legend',
      for: GeoPushpinChartWithCategoryLegendExampleComponent,
      ts: GeoPushpinChartWithCategoryLegendExampleComponentSRC,
      html: GeoPushpinChartWithCategoryLegendExampleComponentHTML,
      css: GeoPushpinChartWithCategoryLegendExampleComponentCSS
    },
    {
      title: 'Example of Geo Pushpin Chart with Geo Configuration',
      for: GeoPushpinChartConfigurationExampleComponent,
      ts: GeoPushpinChartConfigurationExampleComponentSRC,
      html: GeoPushpinChartConfigurationExampleComponentHTML,
      css: GeoPushpinChartConfigurationExampleComponentCSS
    },
    {
      title: 'Example of Geo Pushpin Chart with Configuration - Legend',
      for: GeoPushpinChartConfigurationLegendExampleComponent,
      ts: GeoPushpinChartConfigurationLegendExampleComponentSRC,
      html: GeoPushpinChartConfigurationLegendExampleComponentHTML,
      css: GeoPushpinChartConfigurationLegendExampleComponentCSS
    },
    {
      title: 'Example of Geo Pushpin Chart with Configuration - Viewport',
      for: GeoPushpinChartConfigurationViewportExampleComponent,
      ts: GeoPushpinChartConfigurationViewportExampleComponentSRC,
      html: GeoPushpinChartConfigurationViewportExampleComponentHTML,
      css: GeoPushpinChartConfigurationViewportExampleComponentCSS
    },
    {
      title: 'Example of Geo Pushpin Chart with Configuration - Custom Palette and Color Mapping',
      for: GeoPushpinChartConfigurationColorMappingExampleComponent,
      ts: GeoPushpinChartConfigurationColorMappingExampleComponentSRC,
      html: GeoPushpinChartConfigurationColorMappingExampleComponentHTML,
      css: GeoPushpinChartConfigurationColorMappingExampleComponentCSS
    },
    {
      title: 'Example of Geo Pushpin Chart with Configuration - Group nearby points',
      for: GeoPushpinChartConfigurationPointsGroupNearbyExampleComponent,
      ts: GeoPushpinChartConfigurationPointsGroupNearbyExampleComponentSRC,
      html: GeoPushpinChartConfigurationPointsGroupNearbyExampleComponentHTML,
      css: GeoPushpinChartConfigurationPointsGroupNearbyExampleComponentCSS
    },
  ]

  ngOnInit() {
  }

}
