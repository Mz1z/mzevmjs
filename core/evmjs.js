class EVM{
	constructor(env = {}){
		this.env = {
			address: "0x1234567890123456789012345678901234567890",    // tx.origin
			contract_address: "0x1234567890123456789012345678909999999999",
		};
		Object.assign(this.env, env);     // combine env
		this.stack = [];         // call stack
		this.bytecode = null;
		this.storage = [];
	}

	// run bytecode
	run(){
		console.log("> run!");
		
	}

	load_bytecode(bytecode){
		this.bytecode = bytecode;
	}
}

module.exports = EVM;