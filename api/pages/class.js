{"title":"","type":"page","uid":"1cd19fc71517798e2fa5b7457d1fb06e","text":" class As{ constructor(...args) { this.args = args } * [Symbol.iterator]() { for(let args of this.args) { yield args; } } } for(let x of new...","date":"2023-08-28T10:21:24.824Z","updated":"2023-08-28T10:21:24.824Z","comments":true,"path":"api/pages/class.js","covers":null,"excerpt":"","content":"\nclass As{\n  constructor(...args) {\n    this.args = args\n  }\n  * [Symbol.iterator]() {\n    for(let args of this.args) {\n      yield args;\n    }\n  }\n}\n\nfor(let x of new As('1','2')){\n  console.log(x)\n}\n","count_time":{"symbolsCount":201,"symbolsTime":"1 mins."},"toc":"","data":[]}