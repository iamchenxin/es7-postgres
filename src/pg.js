/*
 * @flow
 */

const pg = require('pg');

import ClientWrapper from './client.js';

const pgWrapper = {
  pg:pg,
  async connect(conString : string):Promise<ClientWrapper> {
    return new Promise(function(resolve, reject) {
      pg.connect(conString, (err, client, done) => {
        console.log('not called');
        if (err) {
          reject(`[pg.connect]: ${err}`);
        }
        const clientWrapper = new ClientWrapper(client, done);
        resolve(clientWrapper);
      });
    });
  },
};

export {
  pgWrapper
};
