import {AbstractCrudService} from './abstract-crud.service';
import {IEntity} from '../models/IEntity';
import * as sinon from 'sinon';
import {HttpClient} from '@angular/common/http';


interface IPerson extends IEntity {
    name: string;
}


class TestService extends AbstractCrudService<IPerson> {
    constructor(http: HttpClient) {
        super(http);
    }


    protected get modelName(): string {
        return 'person';
    }

    protected get newEntity(): IPerson {
        return {name: 'New Person'};
    }
}


describe('common.services.AbstractCrudService', () => {
    beforeAll(function () {
        this.http = {
            get: sinon.stub(),
            delete: sinon.stub(),
            post: sinon.stub(),
            put: sinon.stub()
        };

        this.subject = new TestService(this.http);
    });

    describe('items property', function () {
        beforeAll(function () {
            this.expectedItems = Math.random();

            this.http.get.withArgs(this.subject.getModelUrl(), this.subject.headers).returns({pipe: () => this.expectedItems});

            this.result = this.subject.items;
        });

        afterAll(function () {
            this.http.get.reset();
        });

        it('should return correctly all items of entity type by issuing the correct HTTP GET ' +
            'request', function () {
            expect(this.result).toEqual(this.expectedItems);
        });
    });

    describe('getModelUrl function', function () {
        beforeAll(function () {
            this.result = this.subject.getModelUrl();
        });

        it('should return the correctly formed model URL', function () {
            expect(this.result).toEqual(`${this.subject.apiUrl}/${this.subject.modelName}/`);
        });
    });

    describe('createItem function', function () {
        beforeAll(function () {
            this.observable = Math.random();
            this.data = {};
            this.pipeline = [Math.random()];

            this.pipe = sinon.stub();
            this.pipe.returns(this.observable);

            this.http.post.returns({pipe: this.pipe});

            this.result = this.subject.createItem(this.data, this.pipeline);
        });

        afterAll(function () {
            this.http.post.reset();
        });

        it('should issue the correct HTTP POST request to the proper endpoint URL', function () {
            sinon.assert.calledOnce(this.http.post);
            sinon.assert.calledWith(this.http.post, this.subject.getModelUrl(), this.data, this.subject.headers);
        });

        it('should pass the pipeline to the pipe function at the end of the call', function () {
            sinon.assert.calledOnce(this.pipe);
            sinon.assert.calledWithExactly(this.pipe, ...this.pipeline);
        });

        it('should return the correct observable at the end', function () {
            expect(this.result).toEqual(this.observable);
        });

        describe('when not passed initial entity data', function () {
            beforeAll(function () {
                this.http.post.resetHistory();
                this.pipe.resetHistory();

                this.result = this.subject.createItem(null, this.pipeline);
            });

            it('should issue the correct HTTP POST request to the proper endpoint URL', function () {
                sinon.assert.calledOnce(this.http.post);
                sinon.assert.calledWith(this.http.post, this.subject.getModelUrl(), {name: 'New Person'}, this.subject.headers);
            });

            it('should pass the pipeline to the pipe function at the end of the call', function () {
                sinon.assert.calledOnce(this.pipe);
                sinon.assert.calledWithExactly(this.pipe, ...this.pipeline);
            });

            it('should return the correct observable at the end', function () {
                expect(this.result).toEqual(this.observable);
            });
        });
    });

    describe('updateItem function', function () {
        beforeAll(function () {
            this.person = <IPerson>{id: Math.random()};
            this.pipeline = [Math.random()];

            this.pipe = sinon.stub();
            this.http.put.returns({pipe: this.pipe});

            this.result = this.subject.updateItem(this.person, this.pipeline);
        });

        afterAll(function () {
            this.http.put.reset();
        });

        it('should perform the correct HTTP PUT request to the model URL', function () {
            sinon.assert.calledOnce(this.http.put);
            sinon.assert.calledWithExactly(this.http.put, this.subject.getSpecificModelUrl(this.person), this.person,
                this.subject.headers);

            sinon.assert.calledOnce(this.pipe);
            sinon.assert.calledWithExactly(this.pipe, ...this.pipeline);
        });
    });

    describe('deleteItem function', function () {
        beforeAll(function () {
            this.person = <IPerson>{id: Math.random()};
            this.pipeline = [Math.random()];

            this.pipe = sinon.stub();
            this.http.delete.returns({pipe: this.pipe});

            this.result = this.subject.deleteItem(this.person, this.pipeline);
        });

        afterAll(function () {
            this.http.delete.reset();
        });

        it('should perform the correct HTTP DELETE request to the model URL', function () {
            sinon.assert.calledOnce(this.http.delete);
            sinon.assert.calledWithExactly(this.http.delete, this.subject.getSpecificModelUrl(this.person),
                this.subject.headers);

            sinon.assert.calledOnce(this.pipe);
            sinon.assert.calledWithExactly(this.pipe, ...this.pipeline);
        });
    });

    describe('getSpecificModelUrl function', function () {
        beforeAll(function () {
            this.person = <IPerson>{id: Math.random()};

            this.result = this.subject.getSpecificModelUrl(this.person);
        });

        it('should returns the specific model URL for the given domain object', function () {
            expect(this.result).toEqual(`${this.subject.getModelUrl()}${this.person.id}/`);
        });
    });
});
