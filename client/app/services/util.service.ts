import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  deepEquals(x, y) {
    if (x === y) {
      return true; // if both x and y are null or undefined and exactly the same
    } else if (!(x instanceof Object) || !(y instanceof Object)) {
      return false; // if they are not strictly equal, they both need to be Objects
    } else if (x.constructor !== y.constructor) {
      // they must have the exact same prototype chain, the closest we can do is
      // test their constructor.
      return false;
    } else {
      for (const p in x) {
        if (!x.hasOwnProperty(p)) {
          continue; // other properties were tested using x.constructor === y.constructor
        }
        if (!y.hasOwnProperty(p)) {
          return false; // allows to compare x[ p ] and y[ p ] when set to undefined
        }
        if (x[p] === y[p]) {
          continue; // if they have the same strict value or identity then they are equal
        }
        if (typeof (x[p]) !== 'object') {
          return false; // Numbers, Strings, Functions, Booleans must be strictly equal
        }
        if (!this.deepEquals(x[p], y[p])) {
          return false;
        }
      }
      for (const p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
          return false;
        }
      }
      return true;
    }
  }

  // /**
  //  * Return a callback or noop function
  //  *
  //  * @param  {Function|*} cb - a 'potential' function
  //  * @return {Function}
  //  */
  // safeCb(cb) {
  //   return angular.isFunction(cb) ? cb : angular.noop;
  // },
  //
  // /**
  //  * Parse a given url with the use of an anchor element
  //  *
  //  * @param  {String} url - the url to parse
  //  * @return {Object}     - the parsed url, anchor element
  //  */
  // urlParse(url) {
  //   let a = document.createElement('a');
  //   a.href = url;
  //
  //   // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
  //   if (a.host === '') {
  //     a.href = a.href;
  //   }
  //
  //   return a;
  // },
  //
  // /**
  //  * Test whether or not a given url is same origin
  //  *
  //  * @param  {String}           url       - url to test
  //  * @param  {String|String[]}  [origins] - additional origins to test against
  //  * @return {Boolean}                    - true if url is same origin
  //  */
  // isSameOrigin(url, origins) {
  //   url = Util.urlParse(url);
  //   origins = origins && [].concat(origins) || [];
  //   origins = origins.map(Util.urlParse);
  //   origins.push($window.location);
  //   origins = origins.filter(function (o) {
  //     let hostnameCheck = url.hostname === o.hostname;
  //     let protocolCheck = url.protocol === o.protocol;
  //     // 2nd part of the special treatment for IE fix (see above):
  //     // This part is when using well-known ports 80 or 443 with IE,
  //     // when $window.location.port==='' instead of the real port number.
  //     // Probably the same cause as this IE bug: https://goo.gl/J9hRta
  //     let portCheck = url.port === o.port || o.port === '' && (url.port === '80' || url
  //       .port === '443');
  //     return hostnameCheck && protocolCheck && portCheck;
  //   });
  //   return origins.length >= 1;
  // }

}
