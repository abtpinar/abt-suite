import { ContractModel } from 'src/app/contracts/models/contract.model';
import { IEntity } from '../../common/models/IEntity';
import {CommunicationContractModel} from '../../communication-contracts/models/communication-contract.model';

export interface EmployeeModel extends IEntity {
  code?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  picture?: string | ArrayBuffer;
  unit?: string;
  active?: string;
  communication_contracts?: { data: CommunicationContractModel[] }
}
