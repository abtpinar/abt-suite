import { EmployeeModel } from 'src/app/employees/models/employee.model';
import { MobileModel } from 'src/app/parameters/communications/models/mobile.model';
import { SimModel } from 'src/app/parameters/communications/models/sim.model';
import { IEntity } from '../../common/models/IEntity';

export interface CommunicationContractModel extends IEntity {
  version?: string;
  origin?: string;
  state?: string;
  activation_date?: string;
  expiration_date?: string;
  employee_id?: number;
  employee?: { data: EmployeeModel }
  department?: string;
  occupation?: string;
  sim_id?: string;
  sim?: { data: SimModel }
  call_time?: string;
  sms_credit?: string;
  data_plan?: string;
  mobile_id?: string;
  mobile?: { data: MobileModel[] }
  mobile_accesories?: string;
  domain_access?: string;
  domain_user?: string;
  email_access?: string;
  internet_access?: string;
}

export enum CommunicationContractStates {
  InProgress = 'IN_PROGRESS',
  Accepted = 'ACCEPTED',
  Activated = 'ACTIVATED',
}
