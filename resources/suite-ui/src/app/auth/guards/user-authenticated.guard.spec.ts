import {UserAuthenticatedGuard} from './user-authenticated.guard';
import * as sinon from 'sinon';

describe('auth.guards.UserAuthenticatedGuard', () => {
    beforeAll(function () {
        this.navigationService = {
            goTo: sinon.stub()
        };
        this.authService = {
            token: ''
        };

        this.subject = new UserAuthenticatedGuard(this.navigationService, this.authService);
    });

    describe('isUserLoggedIn function', function () {
        describe('there is an access token', function () {
            beforeAll(function () {
                this.authService.token = Math.random();

                this.result = this.subject.isUserLoggedIn;
            });

            it('should return true', function () {
                expect(this.result).toBeTruthy();
            });
        });

        describe('there is no access token', function () {
            beforeAll(function () {
                this.authService.token = undefined;

                this.result = this.subject.isUserLoggedIn;
            });

            it('should return false', function () {
                expect(this.result).toBeFalsy();
            });
        });
    });

    describe('canActivate function', function () {
        describe('a user is authenticated', function () {
            beforeAll(function () {
                this.authService.token = Math.random();

                this.result = this.subject.canActivate(sinon.stub(), sinon.stub());
            });

            it('should return true', function () {
                expect(this.result).toBeTruthy();
            });
        });

        describe('no user is authenticated', function () {
            beforeAll(function () {
                this.authService.token = undefined;

                this.result = this.subject.canActivate(sinon.stub(), sinon.stub());
            });

            it('should return false', function () {
                expect(this.result).toBeFalsy();
            });

            it('should navigate to the Login Form', function () {
                sinon.assert.calledOnce(this.navigationService.goTo);
                sinon.assert.calledWithExactly(this.navigationService.goTo, 'auth/login');
            });
        });
    });
});
