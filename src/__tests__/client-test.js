jest.unmock('../client');
jest.unmock('tagged-literals');
//jest.unmock('babel-polyfill');
//import 'babel-polyfill';
import ClientWrapper from '../client';
import {SQL} from 'tagged-literals';

describe('test ClientWrapper', function() {
  let pg_client;
  let done ;
  let client ;
  const content = 'abc';
  const name = 'jack';

  beforeEach(function(){
    pg_client = {
      query:jest.fn()
    };
    done = jest.fn();
    client = new ClientWrapper(pg_client, done);
  });

  it('test SQL query', function() {

    const sql = SQL`insert into post (content,name) values (${content},${name})`;
    let rt = client.query(sql);

    expect(pg_client.query).toBeCalledWith(
      {
        text: 'insert into post (content,name) values ($1,$2)',
        values: ['abc', 'jack']
      },
      jasmine.any(Function)
    );
    expect(rt).toEqual(jasmine.any(Promise));
  });

  pit('query must be async function',
  async function() {
    const sql = 'select * from post';
    try{
      await client.query(sql);
    }catch(e){
      expect(e).toEqual(new Error('ClientWrapper.query only accept sqlCommand'
      +`return from SQL tagged template,but the input is [${sql}]`));
    }
  });

  xit('query must be async function',
  function() {
    const sql = 'select * from post';
    try{
      return client.query(sql).catch((e)=>{
        console.log(e);
        expect(e).toEqual(new Error('ClientWrapper.query only accept sqlCommand'
        +`return from SQL tagged template,but the input is [${sql}]`));
      });
    }catch(e){
      expect(e).toBe('async function should never do a normal throw');
    }
  });

  pit('do not accept string ~',async function() {
    const sql = 'select * from post';
    try{
      await client.query(sql);
    }catch(e){
      expect(e).toEqual(new Error('ClientWrapper.query only accept sqlCommand'
      +`return from SQL tagged template,but the input is [${sql}]`));
    }
  });

});
/*
function tmp(){
  console.log(pg_client.query.mock.calls[0][0]);
  console.log(pg_client.query.mock.calls[0][1]);
  expect(pg_client.query.mock.calls[0][1]).toEqual(jasmine.any(Function));
}
*/
