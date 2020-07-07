/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'whatwg-fetch';

export default function httpFetch(url, method, headers, body) {
  let extraParams = {};
  if (method !== 'GET') {
    extraParams = {
      body: JSON.stringify(body),
    }
  }
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers,
      ...extraParams,
    }).then((response) => {
      response.json().then(function(data) {
        resolve(data);
      });
    }).catch((response) => {
      reject(response);
    });
  });
}
