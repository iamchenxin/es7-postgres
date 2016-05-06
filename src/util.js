
function multiAssign(...srcKeyNames) {
  let rt={
    to: (target, tarKeyName) => {
      for (const name of srcKeyNames) {
        if (this[name]) {target[tarKeyName] = this[name];}
      }
    }
  };
  return rt;
}

function devError(condition, msg) {
  if (condition) {
    if(typeof msg == 'string'){
      throw new Error(msg);
    }else {
      throw msg;
    }
  }
}

export {
  multiAssign,
  devError
};
