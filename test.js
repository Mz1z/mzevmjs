const EVM = require("./core/evmjs");


var evm = new EVM();
console.log(evm);

let bytecode = "0x6080604061ffff016010601002610100036001600003010100ff"
evm.decompile(bytecode);   // test decompile

evm.load_bytecode(bytecode);
evm.run()   // test run