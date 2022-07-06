import { ControlPanelPageComponent } from './control-panel-page/control-panel-page.component';
import { GeneralPageComponent } from './general-page/general-page.component';
import { ProductionUnitsModalComponent } from './production-units-page/production-units-modal/production-units-modal.component';
import { ProductionUnitsPageComponent } from './production-units-page/production-units-page.component';

export const containers: any[] = [
  ControlPanelPageComponent,
  GeneralPageComponent,
  ProductionUnitsPageComponent,
  ProductionUnitsModalComponent
];

export * from './control-panel-page/control-panel-page.component';
export * from './general-page/general-page.component';
export * from './production-units-page/production-units-page.component';
export * from './production-units-page/production-units-modal/production-units-modal.component';
