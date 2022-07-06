import { CommunicationsPageComponent } from './communication-page/communications-page.component';
import { MobilesModalComponent } from './mobiles-page/mobiles-modal/mobiles-modal.component';
import { MobilesPageComponent } from './mobiles-page/mobiles-page.component';
import { SimsModalComponent } from './sims-page/sims-modal/sims-modal.component';
import { SimsPageComponent } from './sims-page/sims-page.component';

export const containers: any[] = [
  CommunicationsPageComponent,
  MobilesPageComponent,
  MobilesModalComponent,
  SimsPageComponent,
  SimsModalComponent
];

export * from './communication-page/communications-page.component';
export * from './mobiles-page/mobiles-page.component';
export * from './mobiles-page/mobiles-modal/mobiles-modal.component';
export * from './sims-page/sims-page.component';
export * from './sims-page/sims-modal/sims-modal.component';
