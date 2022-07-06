import * as sinon from 'sinon';
import {AbstractApiBaseService} from './abstract-api-base.service';
import {environment} from '../../../environments/environment';


describe('common.services.AbstractApiBaseService, ', () => {
    beforeAll(function () {
        this.httpClient = {
            delete: sinon.stub(),
            get: sinon.stub(),
            post: sinon.stub(),
            put: sinon.stub()
        };

        this.subject = new AbstractApiBaseService(this.httpClient);
    });

    describe('apiUrl property', function () {
        beforeAll(function () {
            this.result = this.subject.apiUrl;
        });

        it('should be equal to the environment variable "api"', function () {
            expect(this.result).toEqual(environment.api);
        });
    });

    describe('headers property', function () {
        beforeAll(function () {
            this.result = this.subject.headers;
        });

        it('should be an object with a "Content-Type" header defaulting to ' +
            '"application/json"', function () {
            expect(this.result).toEqual({'Content-Type': 'application/json'});
        });
    });

    describe('get function, ', function () {
        describe('when URL is relative, ', function () {
            beforeAll(function () {
                this.url = Math.random();
                this.pipeline = [Math.random()];

                this.pipe = sinon.stub();
                this.httpClient.get.returns({pipe: this.pipe});

                this.result = this.subject.get(this.url, true, this.pipeline);
            });

            afterAll(function () {
                this.httpClient.get.reset();
            });

            it('should issue the get with the URL appended to the base Web API URL', function () {
                sinon.assert.calledOnce(this.httpClient.get);
                sinon.assert.calledWithExactly(this.httpClient.get, `${this.subject.apiUrl}/${this.url}`, this.subject.headers);

                sinon.assert.calledOnce(this.pipe);
                sinon.assert.calledWith(this.pipe, ...this.pipeline);
            });
        });

        describe('when URL is absolute, ', function () {
            beforeAll(function () {
                this.url = Math.random();
                this.pipeline = [Math.random()];

                this.pipe = sinon.stub();
                this.httpClient.get.returns({pipe: this.pipe});

                this.result = this.subject.get(this.url, false, this.pipeline);
            });

            afterAll(function () {
                this.httpClient.get.reset();
            });

            it('should issue the get with the URL as is', function () {
                sinon.assert.calledOnce(this.httpClient.get);
                sinon.assert.calledWithExactly(this.httpClient.get, this.url, this.subject.headers);

                sinon.assert.calledOnce(this.pipe);
                sinon.assert.calledWith(this.pipe, ...this.pipeline);
            });
        });
    });

    describe('put function, ', function () {
        describe('when URL is relative, ', function () {
            beforeAll(function () {
                this.url = Math.random();
                this.pipeline = [Math.random()];
                this.data = {id: Math.random()};

                this.pipe = sinon.stub();
                this.httpClient.put.returns({pipe: this.pipe});

                this.result = this.subject.put(this.url, this.data, true, this.pipeline);
            });

            afterAll(function () {
                this.httpClient.put.reset();
            });

            it('should issue the put request with the URL appended to the base Web API ' +
                'URL', function () {
                sinon.assert.calledOnce(this.httpClient.put);
                sinon.assert.calledWithExactly(this.httpClient.put, `${this.subject.apiUrl}/${this.url}`, this.data,
                    this.subject.headers);

                sinon.assert.calledOnce(this.pipe);
                sinon.assert.calledWith(this.pipe, ...this.pipeline);
            });
        });

        describe('when URL is absolute, ', function () {
            beforeAll(function () {
                this.url = Math.random();
                this.pipeline = [Math.random()];
                this.data = {id: Math.random()};

                this.pipe = sinon.stub();
                this.httpClient.put.returns({pipe: this.pipe});

                this.result = this.subject.put(this.url, this.data, false, this.pipeline);
            });

            afterAll(function () {
                this.httpClient.put.reset();
            });

            it('should issue the put request with the URL as is', function () {
                sinon.assert.calledOnce(this.httpClient.put);
                sinon.assert.calledWithExactly(this.httpClient.put, this.url, this.data, this.subject.headers);

                sinon.assert.calledOnce(this.pipe);
                sinon.assert.calledWith(this.pipe, ...this.pipeline);
            });
        });
    });

    describe('delete function, ', function () {
        describe('when URL is relative, ', function () {
            beforeAll(function () {
                this.url = Math.random();
                this.pipeline = [Math.random()];

                this.pipe = sinon.stub();
                this.httpClient.delete.returns({pipe: this.pipe});

                this.result = this.subject.delete(this.url, true, this.pipeline);
            });

            afterAll(function () {
                this.httpClient.delete.reset();
            });

            it('should issue the delete request with the URL appended to the base Web API ' +
                'URL', function () {
                sinon.assert.calledOnce(this.httpClient.delete);
                sinon.assert.calledWithExactly(this.httpClient.delete, `${this.subject.apiUrl}/${this.url}`,
                    this.subject.headers);

                sinon.assert.calledOnce(this.pipe);
                sinon.assert.calledWith(this.pipe, ...this.pipeline);
            });
        });

        describe('when URL is absolute, ', function () {
            beforeAll(function () {
                this.url = Math.random();
                this.pipeline = [Math.random()];

                this.pipe = sinon.stub();
                this.httpClient.delete.returns({pipe: this.pipe});

                this.result = this.subject.delete(this.url, false, this.pipeline);
            });

            afterAll(function () {
                this.httpClient.get.reset();
            });

            it('should issue the delete request with the URL as is', function () {
                sinon.assert.calledOnce(this.httpClient.delete);
                sinon.assert.calledWithExactly(this.httpClient.delete, this.url, this.subject.headers);

                sinon.assert.calledOnce(this.pipe);
                sinon.assert.calledWith(this.pipe, ...this.pipeline);
            });
        });
    });

    describe('post function, ', function () {
        describe('when URL is relative, ', function () {
            beforeAll(function () {
                this.url = Math.random();
                this.pipeline = [Math.random()];
                this.data = {id: Math.random()};

                this.pipe = sinon.stub();
                this.httpClient.post.returns({pipe: this.pipe});

                this.result = this.subject.post(this.url, this.data, true, this.pipeline);
            });

            afterAll(function () {
                this.httpClient.post.reset();
            });

            it('should issue the post request with the URL appended to the base Web API ' +
                'URL', function () {
                sinon.assert.calledOnce(this.httpClient.post);
                sinon.assert.calledWithExactly(this.httpClient.post, `${this.subject.apiUrl}/${this.url}`, this.data,
                    this.subject.headers);

                sinon.assert.calledOnce(this.pipe);
                sinon.assert.calledWith(this.pipe, ...this.pipeline);
            });
        });

        describe('when URL is absolute, ', function () {
            beforeAll(function () {
                this.url = Math.random();
                this.pipeline = [Math.random()];
                this.data = {id: Math.random()};

                this.pipe = sinon.stub();
                this.httpClient.post.returns({pipe: this.pipe});

                this.result = this.subject.post(this.url, this.data, false, this.pipeline);
            });

            afterAll(function () {
                this.httpClient.post.reset();
            });

            it('should issue the post request with the URL as is', function () {
                sinon.assert.calledOnce(this.httpClient.post);
                sinon.assert.calledWithExactly(this.httpClient.post, this.url, this.data, this.subject.headers);

                sinon.assert.calledOnce(this.pipe);
                sinon.assert.calledWith(this.pipe, ...this.pipeline);
            });
        });
    });
});
