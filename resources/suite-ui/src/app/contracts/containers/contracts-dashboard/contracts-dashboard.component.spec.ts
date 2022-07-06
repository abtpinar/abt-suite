import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContractsDashboard} from './contracts-dasboard.component'

describe('ContractsDashboard', () => {
    let component: ContractsDashboard;
    let fixture: ComponentFixture<ContractsDashboard>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContractsDashboard]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContractsDashboard);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
