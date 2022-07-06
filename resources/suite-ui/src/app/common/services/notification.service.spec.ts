import {NotificationService} from './notification.service';

describe('common.services.NotificationService', () => {
    beforeAll(function () {
        this.subject = new NotificationService();
    });

    describe('register function,', function () {
        describe('if has not previous component\'s reference', function () {
            beforeAll(function () {
                this.component = Math.random();
                this.subject.register(this.component);
            });

            it('should save internally the given component\'s reference', function () {
                expect(this.subject._component).toEqual(this.component);
            });
        });

        describe('if has a previous component\'s reference', function () {
            beforeAll(function () {
                this.subject._component = this.oldComponent = Math.random();
                this.component = Math.random();

                this.subject.register(this.component);
            });

            it('should save internally the given component\'s reference replacing the old one', function () {
                expect(this.subject._component).toEqual(this.component);
                expect(this.subject._component).not.toEqual(this.oldComponent);
            });
        });
    });
});
