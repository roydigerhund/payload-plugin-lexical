"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrl = exports.sanitizeUrl = void 0;
function sanitizeUrl(url) {
    /** A pattern that matches safe  URLs. */
    const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
    /** A pattern that matches safe data URLs. */
    const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
    url = String(url).trim();
    if (url.match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN))
        return url;
    return 'https://';
}
exports.sanitizeUrl = sanitizeUrl;
// Source: https://stackoverflow.com/a/8234912/2013580
const urlRegExp = new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i);
const phoneNumberRegExp = new RegExp(/tel:[\+\(\)\-0-9]+/i);
const emailRegExp = new RegExp(/mailto:[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i);
function validateUrl(url) {
    // TODO Fix UI for link insertion; it should never default to an invalid URL such as https://.
    // Maybe show a dialog where they user can type the URL before inserting it.
    if (urlRegExp.test(url)) {
        console.log('URL is valid:', url);
        return true;
    }
    if (phoneNumberRegExp.test(url)) {
        console.log('Phone number is valid:', url);
        return true;
    }
    if (emailRegExp.test(url)) {
        console.log('Email is valid:', url);
        return true;
    }
    return url === 'https://';
}
exports.validateUrl = validateUrl;
//# sourceMappingURL=url.js.map