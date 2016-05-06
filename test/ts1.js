/*
 *@flow
 */
import 'babel-polyfill';
import {pgWrapper} from '../src/pg.js';
const conString = 'postgres://iamchenxin:135790@localhost:5432/iamchenxin';
async function ts() {
  console.log('begin. ...');
  try {
    const client = await pgWrapper.connect(conString);
    const result = await client.query('select * from post', undefined, (row, result) => {
    //  console.log(result);
      result.addRow(row);
    });
    console.log(result.rows);
  } catch (e) {
    console.log(`a error : ${e}`);
  } finally {

  }
}
ts();
