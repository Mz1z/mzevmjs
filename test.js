const EVM = require("./core/evmjs");


var evm = new EVM();
console.log(evm);

let bytecode = "0x6080604061ffff0160106010026101000360016000030101600260040460040a1060901000ff"
evm.decompile(bytecode);   // test decompile

// evm.load_bytecode(bytecode);
// evm.run()   // test run