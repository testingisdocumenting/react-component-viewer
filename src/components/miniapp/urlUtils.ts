export function currentUrl() {
    return document.location.pathname + '?' + document.location.search;
}

export function currentUrlMatchesRegexp(urlRegexp: RegExp) {
    return urlRegexp.test(currentUrl());
}