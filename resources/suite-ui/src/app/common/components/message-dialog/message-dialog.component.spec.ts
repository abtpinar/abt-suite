import {MessageDialogComponent} from './message-dialog.component';
import * as sinon from 'sinon';

describe('common.components.MessageDialogComponent', () => {
    beforeAll(function () {
        this.notificationService = {
            register: sinon.stub()
        };

        this.clearTimeout = sinon.stub(window, 'clearTimeout');
        this.setTimeout = sinon.stub(window, 'setTimeout');

        this.subject = new MessageDialogComponent(this.notificationService);
    });

    afterAll(function () {
        this.clearTimeout.restore();
        this.setTimeout.restore();
    });

    describe('isError property', function () {
        describe('if message type is equals to ERROR constant', function () {
            beforeAll(function () {
                this.subject.messageType = this.subject.ERROR;

                this.result = this.subject.isError;
            });

            it('should return true', function () {
                expect(this.result).toBeTruthy();
            });
        });

        describe('if message type is equal to other value than ERROR constant', function () {
            beforeAll(function () {
                this.subject.messageType = this.subject.ERROR + 1000 * Math.random();

                this.result = this.subject.isError;
            });

            it('should return false', function () {
                expect(this.result).toBeFalsy();
            });
        });
    });

    describe('close function', function () {
        beforeAll(function () {
            this.timeout = this.subject._timeoutHandler = Math.random();
            this.subject.visible = true;

            this.subject.close();
        });

        afterAll(function () {
            this.clearTimeout.reset();
        });

        it('should close the current timeout', function () {
            sinon.assert.calledOnce(this.clearTimeout);
            sinon.assert.calledWithExactly(this.clearTimeout, this.timeout);
        });

        it('should hide the message dialog component', function () {
            expect(this.subject.visible).toBeFalsy();
        });
    });

    describe('showError function', function () {
        beforeAll(function () {
            this.message = Math.random().toString();
            this.interval = Math.random();

            this.subject.showError(this.message, this.interval);
        });

        afterAll(function () {
            this.setTimeout.reset();
        });

        it('should show the message dialog service showing in error mode', function () {
            expect(this.subject.message).toEqual(this.message);
            expect(this.subject.messageType).toEqual(this.subject.ERROR);
            expect(this.subject.visible).toBeTruthy();
        });

        it('should set a timeout to auto-close the message dialog after given timeout interval', function () {
            sinon.assert.calledOnce(this.setTimeout);
            const timeoutFunction = this.setTimeout.lastCall.args[0];
            const timeoutValue = this.setTimeout.lastCall.args[1];
            expect(typeof timeoutFunction).toEqual('function');
            expect(timeoutValue).toEqual(this.interval);
        });

        describe('timeout\'s function', function () {
            beforeAll(function () {
                this.subject.visible = true;
                this.setTimeout.lastCall.args[0]();
            });

            it('should hide the message dialog', function () {
                expect(this.subject.visible).toBeFalsy();
            });
        });
    });
});
