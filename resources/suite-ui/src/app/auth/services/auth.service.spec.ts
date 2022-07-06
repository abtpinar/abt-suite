import * as sinon from 'sinon';
import {AuthService} from './auth.service';
import {IUser} from '../models/IUser';
import {environment} from '../../../environments/environment';


describe('auth.guards.AuthService', () => {
    beforeAll(function () {
        this.username = Math.random();
        this.password = Math.random();

        this.http = {
            post: sinon.stub()
        };

        this.localStorageGetItem = sinon.stub(localStorage, 'getItem');
        this.localStorageSetItem = sinon.stub(localStorage, 'setItem');

        this.userData = JSON.stringify(({id: Math.random(), username: `user ${Math.random()}`} as IUser));
        this.localStorageGetItem.withArgs('user_data').returns(this.userData);

        this.subject = new AuthService(this.http);
    });

    afterAll(function () {
        this.localStorageGetItem.restore();
        this.localStorageSetItem.restore();
    });

    describe('constructor function', function () {
        describe('user was previously authenticated', function () {
            beforeAll(function () {
                this.subject = new AuthService(this.http);
            });

            afterAll(function () {
                this.localStorageGetItem.reset();
            });

            it('should have a reference to the authenticated user de-serialized from ' +
                'local storage', function () {
                expect(this.subject.user).toEqual(JSON.parse(this.userData));
            });
        });

        describe('no user was previously authenticated', function () {
            beforeAll(function () {
                this.localStorageGetItem.withArgs('user_data').returns(undefined);

                this.subject = new AuthService(this.http);
            });

            afterAll(function () {
                this.localStorageGetItem.reset();
            });

            it('should not have any reference', function () {
                expect(this.subject.user).toBeUndefined();
            });
        });
    });

    describe('user property', function () {
        afterAll(function () {
            this.localStorageSetItem.reset();
        });

        it('should get and set the current User (also in local storage)', function () {
            const user = <IUser>{username: `user ${Math.random()}`, id: Math.random()};
            this.subject.user = user;
            expect(this.subject.user).toEqual(user);
            sinon.assert.calledOnce(this.localStorageSetItem);
            sinon.assert.calledWithExactly(this.localStorageSetItem, 'user_data', JSON.stringify(user));
        });
    });

    describe('token property', function () {
        afterAll(function () {
            this.localStorageSetItem.reset();
            this.localStorageGetItem.reset();
        });

        it('should get and set the current token (also in local storage)', function () {
            const token = Math.random().toString();
            this.subject.token = token;
            sinon.assert.calledOnce(this.localStorageSetItem);
            sinon.assert.calledWithExactly(this.localStorageSetItem, 'access_token', token);

            const savedToken = this.subject.token;
            sinon.assert.calledOnce(this.localStorageGetItem);
            sinon.assert.calledWithExactly(this.localStorageGetItem, 'access_token');
        });
    });

    describe('userAuthenticated property, ', function () {
        describe('when a user is authenticated', function () {
            beforeAll(function () {
                this.subject.user = {};
                this.result = this.subject.userAuthenticated;
            });

            it('returns true', function () {
                expect(this.result).toBeTruthy();
            });
        });

        describe('when a user is not authenticated', function () {
            beforeAll(function () {
                this.subject.user = undefined;
                this.result = this.subject.userAuthenticated;
            });

            it('returns false', function () {
                expect(this.result).toBeFalsy();
            });
        });
    });

    describe('login function', function () {
        beforeAll(function () {
            this.pipe = sinon.stub();
            this.http.post.returns({pipe: this.pipe});

            this.subject.login(this.username, this.password);
        });

        afterAll(function () {
            this.http.post.reset();
        });

        it('should send correctly login request using given credentials', function () {
            const url = `${environment.api}/login/`;

            sinon.assert.calledOnce(this.http.post);
            sinon.assert.calledWith(
                this.http.post, url, {username: this.username, password: this.password}, this.subject.headers
            );
        });
    });

    describe('register function', function () {
        beforeAll(function () {
            this.pipe = sinon.stub();
            this.http.post.returns({pipe: this.pipe});

            this.subject.register(this.username, this.password);
        });

        afterAll(function () {
            this.http.post.reset();
        });

        it('should send correctly register request using given credentials', function () {
            const url = `${environment.api}/register/`;

            sinon.assert.calledOnce(this.http.post);
            sinon.assert.calledWith(
                this.http.post, url, {username: this.username, password: this.password}, this.subject.headers
            );
        });
    });
});
