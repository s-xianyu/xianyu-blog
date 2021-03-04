
class As{
  constructor(...args) {
    this.args = args
  }
  * [Symbol.iterator]() {
    for(let args of this.args) {
      yield args;
    }
  }
}

for(let x of new As('1','2')){
  console.log(x)
}
