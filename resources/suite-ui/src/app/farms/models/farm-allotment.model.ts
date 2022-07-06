import {IEntity} from '../../common/models/IEntity';
import {FarmModel} from './farm.model';

export interface FarmAllotmentModel extends IEntity {
    position?: number;
    return_entity?: boolean;

    area?: number;
    number?: number;
    division?: number;
    usage_type_code?: string;
    farm_id?: number;

    farm: { data: FarmModel };
}
