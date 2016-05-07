/*
 * @flow
 */
import type {pgQueryConfig} from 'tagged-literals';
import { devError} from './util';

type Result = {
  command:string,
  rowCount:number,
  oid:mixed,
  rows:Array<mixed>,
  addRow: (row:mixed) => void
};

type queryParams = {
  V?:mixed[],
  values?:mixed[],
  N?:string,
  name?:string,
  rowHandle?:(row:mixed, result:Result) =>void
};

// function inside a class must be arrow function!
// for binding this to the class
class ClientWrapper {
  client: any;
  done: ()=>any;
  constructor(client: mixed, done:()=>any) {
    this.client = client;
    this.done = done;
  }
  async query(sqlCommand:pgQueryConfig, params: ?queryParams ):Promise<Result> {
    devError(sqlCommand.text==null, 'ClientWrapper.query only accept sqlCommand'
      +`return from SQL tagged template,but the input is [${sqlCommand}]`);

    let rowHandle;
    if (params) {
/*    // set N|name => name, V|values => values;
      params.assign = multiAssign;
      params.assign('V','values').to(sqlCommand,'values');
      params.assign('N','name').to(sqlCommand,'name');
*/
      // fast set ~ N|name => name, V|values => values;
      params.name && (sqlCommand.name = params.name);
      params.N && (sqlCommand.name = params.N);
      params.values && (sqlCommand.values = params.values);
      params.V && (sqlCommand.values = params.V);

      rowHandle = params.rowHandle;
    }

    let pgCommand: pgQueryConfig|string = sqlCommand;
    // if there is no values in sqlCommand
    // just set pgCommand passed to pg to string. for fast speed?
    if ( (sqlCommand.values==null) || (sqlCommand.values == [])) {
      pgCommand = sqlCommand.text;
    }

    if (rowHandle) { // use node-postgres 's event system
      return new Promise( (resolve, reject) => {
        const query = this.client.query(pgCommand);
        query.on('row', rowHandle);
        query.on('error', error => {
          this.done();
          reject(`[ClientWrapper.query]: ${error}`);
        });
        query.on('end', (result) => {
          this.done();
          resolve(result);
        });
      });
    } else { // the node-postgres's directly callback
      return new Promise( (resolve, reject) => {
        this.client.query(pgCommand, (err, result) => {
          this.done();
          if (err) {
            reject(`[ClientWrapper.query]: ${err}`);
          } else {
            resolve(result);
          }
        });
      });
    }

  }
}


export default ClientWrapper;
