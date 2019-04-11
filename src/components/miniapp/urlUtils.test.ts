import { appendUrlSearch } from './urlUtils';

describe('url utils', () => {
    it('append url search', () => {
       expect(appendUrlSearch('/just/path', '?a=2&b=3')).toEqual('/just/path?a=2&b=3');
       expect(appendUrlSearch('/just/path?c=3', '?a=2')).toEqual('/just/path?c=3&a=2');
    });
});