describe('ts', () => {
  xit('The \'toThrowError\' matcher is for testing a specific thrown exception', function() {

    var foo = function(con) {
      if(con){
        throw new TypeError('foo bar baz');
      }
    };
    function bar(){
      foo(true);
    }

    expect(bar).toThrowError('foo bar baz');
  //  expect(foo).toThrowError(/bar/);
  //  expect(foo).toThrowError(TypeError);
  //  expect(foo).toThrowError(TypeError, 'foo bar baz');
  });

  async function pfoo(con){
    return new Promise(function(resolve, reject) {
      if(con){
        reject('e error');
      }else {
        resolve('ok');
      }
    });
  }
  async function pfoo2(con){
    if(con){
      return Promise.reject('e error');
    }else {
      return Promise.resolve('ok');
    }
  }

  xit('test promise',async function(){

    try{
      let rt = await pfoo(true);
    }catch (e){
      console.log('~~~~in catch');
      expect(e).toEqual('e error');
    }
  });

  xit('test tt', function() {

    expect(() => {
      async function a(){
        try{
          await pfoo(true);
        }catch(e){
          console.log(e);
        //  throw 'e error';
        }
      };
      let b = a().catch(e=>{
        console.log('i a()');
        throw 'e error';
      });
      console.log(b);
      return b;
    }).toThrowError('e error');

  });


  xit('test promise',async function(){

    async function pbar(){
      let rt = await pfoo(true);
    }
    expect(pbar).toThrowError('e error');

  });

  pit('test with promise', function() {
    console.log('\n begin test =======>');
    let rt = pfoo(true)
    .then(rt => {
      console.log(`'iam ok! [${rt}]`);
    })
    .catch(e => {
      console.log(`in catch [${e}]`);
      expect(e).toEqual('e error');
    });
    console.log(' <========== this tick');
    return rt;
  });

});
