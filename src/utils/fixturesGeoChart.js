import { projectId } from "./fixtures";

import { environment } from '@environments/environment';
export const MAPBOX_TOKEN = environment.EXAMPLE_MAPBOX_ACCESS_TOKEN;
// export const MAPBOX_TOKEN = "pk.eyJ1IjoidGh1b25nZ29vZGRhdGEiLCJhIjoiY2s5aThtb3NrMTF1MjNsdGIxOTdqcXlvcyJ9.n0dhhtSmKxTZZYLBo8sfbw";
export const cityCoordinatesUri = `/gdc/md/${projectId}/obj/9459`;
export const populationUri = `/gdc/md/${projectId}/obj/9466`;
export const densityUri = `/gdc/md/${projectId}/obj/9467`;
export const stateNamesUri = `/gdc/md/${projectId}/obj/9462`;
export const cityNamesUri = `/gdc/md/${projectId}/obj/9460`;
export const geoPushpinChartVisualizationIdentifier = "acebcI3fhaRI";
export const geoPushpinChartVisualizationUri = `/gdc/md/${projectId}/obj/9480`;
export const predicateAttributeHeaderItemUri = `/gdc/md/${projectId}/obj/9461/elements?id=10456587`;
export const predicateAttributeHeaderItemName = `Hawaii`;
