export function currentUrl() {
    return document.location.pathname + '?' + document.location.search;
}

export function currentUrlMatchesRegexp(urlRegexp: RegExp) {
    return urlRegexp.test(currentUrl());
}

export function appendUrlSearch(originalUrl: string, search: string) {
    const hasSearch = originalUrl.indexOf('?') !== -1;
    return originalUrl + (hasSearch ? '&' : '?') + search.replace('?', '');
}