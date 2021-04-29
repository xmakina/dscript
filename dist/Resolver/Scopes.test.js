"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scopes_1 = require("./Scopes");
describe('with scope', () => {
    describe('with new scope', () => {
        const scopes = new Scopes_1.Scopes();
        test('the scope is empty', () => {
            expect(scopes.isEmpty()).toEqual(true);
        });
    });
    describe('after adding a scope', () => {
        let scopes;
        beforeEach(() => {
            scopes = new Scopes_1.Scopes();
            scopes.beginScope();
        });
        test('the scope is no longer empty', () => {
            expect(scopes.isEmpty()).toEqual(false);
        });
        test('scope can be peeked', () => {
            expect(scopes.peek()).toEqual([]);
        });
        describe('after adding a variable', () => {
            beforeEach(() => scopes.peek().push('foo'));
            test('peek returns the new scope', () => {
                expect(scopes.peek()[0]).toEqual('foo');
            });
            test('the distance is zero', () => {
                expect(scopes.getDistance('foo')).toEqual(0);
            });
            describe('after adding a scope', () => {
                beforeEach(() => {
                    scopes.beginScope();
                });
                test('the distance is one', () => {
                    expect(scopes.getDistance('foo')).toEqual(1);
                });
            });
        });
        describe('after removing the scope', () => {
            beforeEach(() => scopes.endScope());
            test('the scope is empty', () => {
                expect(scopes.isEmpty()).toEqual(true);
            });
        });
    });
});
