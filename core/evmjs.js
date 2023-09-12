class EVM{
	constructor(env={}, setting={}){
		this.env = {
			address: "0x1234567890123456789012345678901234567890",    // tx.origin
			contract_address: "0x1234567890123456789012345678909999999999",
		};
		this.setting = {
			output: "stdout",     // file or stdout
		};
		Object.assign(this.env, env);     // combine env
		Object.assign(this.setting, setting)// combine setting
		this.vm = { 
			stack: [],          // call stack
			storage: [],
			memory: [],
			pc: 0,
			status: "wait",    // wait, run, end, error
		}       
		this.bytecode = null;

		// load opcodes
		/*
		op: name of opcode
		argsize: size used next to opcode
		func: which subfunction to call
		*/
		let that = this;
		// uniform func for PUSHXX
		this._push_func = function(argsize){
			that.vm.stack.push(
				that.bytecode.substring(
					(that.vm.pc+1)*2, (that.vm.pc+1+argsize)*2
					)
				);
			that.vm.pc += 1 +argsize;
		}
		this.opcode = {
			'10': { op: 'LT', argsize: 0, func: null },
			'11': { op: 'GT', argsize: 0, func: null },
			'12': { op: 'SLT', argsize: 0, func: null },
			'13': { op: 'SGT', argsize: 0, func: null },
			'14': { op: 'EQ', argsize: 0, func: null },
			'15': { op: 'ISZERO', argsize: 0, func: null },
			'16': { op: 'AND', argsize: 0, func: null },
			'17': { op: 'OR', argsize: 0, func: null },
			'18': { op: 'XOR', argsize: 0, func: null },
			'19': { op: 'NOT', argsize: 0, func: null },
			'20': { op: 'SHA3', argsize: 0, func: null },
			'30': { op: 'ADDRESS', argsize: 0, func: null },
			'31': { op: 'BALANCE', argsize: 0, func: null },
			'32': { op: 'ORIGIN', argsize: 0, func: null },
			'33': { op: 'CALLER', argsize: 0, func: null },
			'34': { op: 'CALLVALUE', argsize: 0, func: null },
			'35': { op: 'CALLDATALOAD', argsize: 0, func: null },
			'36': { op: 'CALLDATASIZE', argsize: 0, func: null },
			'37': { op: 'CALLDATACOPY', argsize: 0, func: null },
			'38': { op: 'CODESIZE', argsize: 0, func: null },
			'39': { op: 'CODECOPY', argsize: 0, func: null },
			'40': { op: 'BLOCKHASH', argsize: 0, func: null },
			'41': { op: 'COINBASE', argsize: 0, func: null },
			'42': { op: 'TIMESTAMP', argsize: 0, func: null },
			'43': { op: 'NUMBER', argsize: 0, func: null },
			'44': { op: 'PREVRANDAO', argsize: 0, func: null },
			'45': { op: 'GASLIMIT', argsize: 0, func: null },
			'46': { op: 'CHAINID', argsize: 0, func: null },
			'47': { op: 'SELFBALANCE', argsize: 0, func: null },
			'48': { op: 'BASEFEE', argsize: 0, func: null },
			'50': { op: 'POP', argsize: 0, func: null },
			'51': { op: 'MLOAD', argsize: 0, func: null },
			'52': { op: 'MSTORE', argsize: 0, func: null },
			'53': { op: 'MSTORE8', argsize: 0, func: null },
			'54': { op: 'SLOAD', argsize: 0, func: null },
			'55': { op: 'SSTORE', argsize: 0, func: null },
			'56': { op: 'JUMP', argsize: 0, func: null },
			'57': { op: 'JUMPI', argsize: 0, func: null },
			'58': { op: 'PC', argsize: 0, func: null },
			'59': { op: 'MSIZE', argsize: 0, func: null },
			'60': { op: 'PUSH1', argsize: 1, func: function(){
				that._push_func(this.argsize);
			} },
			'61': { op: 'PUSH2', argsize: 2, func: function(){
				that._push_func(this.argsize);
			} },
			'62': { op: 'PUSH3', argsize: 3, func: function(){
				that._push_func(this.argsize);
			} },
			'63': { op: 'PUSH4', argsize: 4, func: function(){
				that._push_func(this.argsize);
			} },
			'64': { op: 'PUSH5', argsize: 5, func: function(){
				that._push_func(this.argsize);
			} },
			'65': { op: 'PUSH6', argsize: 6, func: function(){
				that._push_func(this.argsize);
			} },
			'66': { op: 'PUSH7', argsize: 7, func: function(){
				that._push_func(this.argsize);
			} },
			'67': { op: 'PUSH8', argsize: 8, func: function(){
				that._push_func(this.argsize);
			} },
			'68': { op: 'PUSH9', argsize: 9, func: function(){
				that._push_func(this.argsize);
			} },
			'69': { op: 'PUSH10', argsize: 10, func: function(){
				that._push_func(this.argsize);
			} },
			'70': { op: 'PUSH17', argsize: 17, func: function(){
				that._push_func(this.argsize);
			} },
			'71': { op: 'PUSH18', argsize: 18, func: function(){
				that._push_func(this.argsize);
			} },
			'72': { op: 'PUSH19', argsize: 19, func: function(){
				that._push_func(this.argsize);
			} },
			'73': { op: 'PUSH20', argsize: 20, func: function(){
				that._push_func(this.argsize);
			} },
			'74': { op: 'PUSH21', argsize: 21, func: function(){
				that._push_func(this.argsize);
			} },
			'75': { op: 'PUSH22', argsize: 22, func: function(){
				that._push_func(this.argsize);
			} },
			'76': { op: 'PUSH23', argsize: 23, func: function(){
				that._push_func(this.argsize);
			} },
			'77': { op: 'PUSH24', argsize: 24, func: function(){
				that._push_func(this.argsize);
			} },
			'78': { op: 'PUSH25', argsize: 25, func: function(){
				that._push_func(this.argsize);
			} },
			'79': { op: 'PUSH26', argsize: 26, func: function(){
				that._push_func(this.argsize);
			} },
			'80': { op: 'DUP1', argsize: 0, func: null },
			'81': { op: 'DUP2', argsize: 0, func: null },
			'82': { op: 'DUP3', argsize: 0, func: null },
			'83': { op: 'DUP4', argsize: 0, func: null },
			'84': { op: 'DUP5', argsize: 0, func: null },
			'85': { op: 'DUP6', argsize: 0, func: null },
			'86': { op: 'DUP7', argsize: 0, func: null },
			'87': { op: 'DUP8', argsize: 0, func: null },
			'88': { op: 'DUP9', argsize: 0, func: null },
			'89': { op: 'DUP10', argsize: 0, func: null },
			'90': { op: 'SWAP1', argsize: 0, func: null },
			'91': { op: 'SWAP2', argsize: 0, func: null },
			'92': { op: 'SWAP3', argsize: 0, func: null },
			'93': { op: 'SWAP4', argsize: 0, func: null },
			'94': { op: 'SWAP5', argsize: 0, func: null },
			'95': { op: 'SWAP6', argsize: 0, func: null },
			'96': { op: 'SWAP7', argsize: 0, func: null },
			'97': { op: 'SWAP8', argsize: 0, func: null },
			'98': { op: 'SWAP9', argsize: 0, func: null },
			'99': { op: 'SWAP10', argsize: 0, func: null },
			'00': { op: 'STOP', argsize: 0, func: function(){
				that.vm.pc += 1;
				that.vm.status = 'stop';
			} },
			'01': { op: 'ADD', argsize: 0, func: null },
			'02': { op: 'MUL', argsize: 0, func: null },
			'03': { op: 'SUB', argsize: 0, func: null },
			'04': { op: 'DIV', argsize: 0, func: null },
			'05': { op: 'SDIV', argsize: 0, func: null },
			'06': { op: 'MOD', argsize: 0, func: null },
			'07': { op: 'SMOD', argsize: 0, func: null },
			'08': { op: 'ADDMOD', argsize: 0, func: null },
			'09': { op: 'MULMOD', argsize: 0, func: null },
			'0a': { op: 'EXP', argsize: 0, func: null },
			'0b': { op: 'SIGNEXTEND', argsize: 0, func: null },
			'1a': { op: 'BYTE', argsize: 0, func: null },
			'1b': { op: 'SHL', argsize: 0, func: null },
			'1c': { op: 'SHR', argsize: 0, func: null },
			'1d': { op: 'SAR', argsize: 0, func: null },
			'3a': { op: 'GASPRICE', argsize: 0, func: null },
			'3b': { op: 'EXTCODESIZE', argsize: 0, func: null },
			'3c': { op: 'EXTCODECOPY', argsize: 0, func: null },
			'3d': { op: 'RETURNDATASIZE', argsize: 0, func: null },
			'3e': { op: 'RETURNDATACOPY', argsize: 0, func: null },
			'3f': { op: 'EXTCODEHASH', argsize: 0, func: null },
			'5a': { op: 'GAS', argsize: 0, func: null },
			'5b': { op: 'JUMPDEST', argsize: 0, func: null },
			'5f': { op: 'PUSH0', argsize: 0, func: null },
			'6a': { op: 'PUSH11', argsize: 11, func: function(){
				that._push_func(this.argsize);
			} },
			'6b': { op: 'PUSH12', argsize: 12, func: function(){
				that._push_func(this.argsize);
			} },
			'6c': { op: 'PUSH13', argsize: 13, func: function(){
				that._push_func(this.argsize);
			} },
			'6d': { op: 'PUSH14', argsize: 14, func: function(){
				that._push_func(this.argsize);
			} },
			'6e': { op: 'PUSH15', argsize: 15, func: function(){
				that._push_func(this.argsize);
			} },
			'6f': { op: 'PUSH16', argsize: 16, func: function(){
				that._push_func(this.argsize);
			} },
			'7a': { op: 'PUSH27', argsize: 27, func: function(){
				that._push_func(this.argsize);
			} },
			'7b': { op: 'PUSH28', argsize: 28, func: function(){
				that._push_func(this.argsize);
			} },
			'7c': { op: 'PUSH29', argsize: 29, func: function(){
				that._push_func(this.argsize);
			} },
			'7d': { op: 'PUSH30', argsize: 30, func: function(){
				that._push_func(this.argsize);
			} },
			'7e': { op: 'PUSH31', argsize: 31, func: function(){
				that._push_func(this.argsize);
			} },
			'7f': { op: 'PUSH32', argsize: 32, func: function(){
				that._push_func(this.argsize);
			} },
			'8a': { op: 'DUP11', argsize: 0, func: null },
			'8b': { op: 'DUP12', argsize: 0, func: null },
			'8c': { op: 'DUP13', argsize: 0, func: null },
			'8d': { op: 'DUP14', argsize: 0, func: null },
			'8e': { op: 'DUP15', argsize: 0, func: null },
			'8f': { op: 'DUP16', argsize: 0, func: null },
			'9a': { op: 'SWAP11', argsize: 0, func: null },
			'9b': { op: 'SWAP12', argsize: 0, func: null },
			'9c': { op: 'SWAP13', argsize: 0, func: null },
			'9d': { op: 'SWAP14', argsize: 0, func: null },
			'9e': { op: 'SWAP15', argsize: 0, func: null },
			'9f': { op: 'SWAP16', argsize: 0, func: null },
			a0: { op: 'LOG0', argsize: 0, func: null },
			a1: { op: 'LOG1', argsize: 0, func: null },
			a2: { op: 'LOG2', argsize: 0, func: null },
			a3: { op: 'LOG3', argsize: 0, func: null },
			a4: { op: 'LOG4', argsize: 0, func: null },
			f0: { op: 'CREATE', argsize: 0, func: null },
			f1: { op: 'CALL', argsize: 0, func: null },
			f2: { op: 'CALLCODE', argsize: 0, func: null },
			f3: { op: 'RETURN', argsize: 0, func: null },
			f4: { op: 'DELEGATECALL', argsize: 0, func: null },
			f5: { op: 'CREATE2', argsize: 0, func: null },
			fa: { op: 'STATICCALL', argsize: 0, func: null },
			fd: { op: 'REVERT', argsize: 0, func: null },
			fe: { op: 'INVALID', argsize: 0, func: null },
			ff: { op: 'SELFDESTRUCT', argsize: 0, func: null }
		};
	}

	// run bytecode
	run(){
		this._output("> run!");
		this.bytecode = this._hexstr(this.bytecode);
		console.log(this.bytecode);
		this.vm.status = 'run';
		while(this.vm.status !== 'stop' && this.vm.status !== 'error'){
			let op = this.bytecode.substring(this.vm.pc*2, (this.vm.pc+1)*2);   // get opcode
			console.log(`[${hex(this.vm.pc)}]`);
			console.log(this.opcode[op]);
			this.opcode[op].func();     // execute code
			console.log(this.vm);
		}
		this._output("============================================");
		this._output("> end! vm status:");
		this._output(this.vm);
		this._output("============================================");
	}

	// debug bytecode
	debug(){
		this._output("> debug!");

	}

	load_bytecode(bytecode){
		this.bytecode = bytecode;
	}

	// use for unified output(file or stdout)
	_output(s){
		if(this.setting.output === "stdout"){
			console.log(s);
		}else{
			// TODO
		}
	}

	// input format: "0x************" or "************"(hex)
	decompile(bytecode){
		bytecode = this._hexstr(bytecode);
		if(bytecode === false){
			this._output("> wrong bytecode!");
			return false;
		}
		this._output(`> decompile (${bytecode.length}) bytes: \n${bytecode}`)
		// start decompile
		let _bytecode = bytecode;
		let index = 0;
		while (_bytecode.length > index){
			let _opcode = _bytecode.substring(index, index+2);
			try{
				this._output(
					`[${hex(index/2)}] ${this.opcode[_opcode].op}    ` +
					`${_bytecode.substring(index+2, index+2+2*this.opcode[_opcode].argsize)}`
					);
				index += 2 + 2*this.opcode[_opcode].argsize;
			}catch(err){
				// missing opcode
				this._output(
					`[0x${(index/2).toString(16)}] MISSING(${_opcode})    `
					);
				index += 2;
			}
		}

	}

	// check and remove "0x" for hex string
	// if not hex string return false, else return string
	_hexstr(s){
		let re = new RegExp("^[A-Fa-f0-9]*$");
		if (re.test(s)){
			return s;
		}
		re = new RegExp("^0x[A-Fa-f0-9]*$");
		if (re.test(s)){
			return s.substring(2);
		}
		return false;
	}
}

const hex = function(num){
	return "0x"+num.toString(16);
};

module.exports = EVM;

/*
backup
const opcode = {    // 144 opcodes
	'00': 'STOP',
	'01': 'ADD',
	'02': 'MUL',
	'03': 'SUB',
	'04': 'DIV',
	'05': 'SDIV',
	'06': 'MOD',
	'07': 'SMOD',
	'08': 'ADDMOD',
	'09': 'MULMOD',
	'0a': 'EXP',
	'0b': 'SIGNEXTEND',
	'10': 'LT',
	'11': 'GT',
	'12': 'SLT',
	'13': 'SGT',
	'14': 'EQ',
	'15': 'ISZERO',
	'16': 'AND',
	'17': 'OR',
	'18': 'XOR',
	'19': 'NOT',
	'1a': 'BYTE',
	'1b': 'SHL',
	'1c': 'SHR',
	'1d': 'SAR',
	'20': 'SHA3',
	'30': 'ADDRESS',
	'31': 'BALANCE',
	'32': 'ORIGIN',
	'33': 'CALLER',
	'34': 'CALLVALUE',
	'35': 'CALLDATALOAD',
	'36': 'CALLDATASIZE',
	'37': 'CALLDATACOPY',
	'38': 'CODESIZE',
	'39': 'CODECOPY',
	'3a': 'GASPRICE',
	'3b': 'EXTCODESIZE',
	'3c': 'EXTCODECOPY',
	'3d': 'RETURNDATASIZE',
	'3e': 'RETURNDATACOPY',
	'3f': 'EXTCODEHASH',
	'40': 'BLOCKHASH',
	'41': 'COINBASE',
	'42': 'TIMESTAMP',
	'43': 'NUMBER',
	'44': 'PREVRANDAO',
	'45': 'GASLIMIT',
	'46': 'CHAINID',
	'47': 'SELFBALANCE',
	'48': 'BASEFEE',
	'50': 'POP',
	'51': 'MLOAD',
	'52': 'MSTORE',
	'53': 'MSTORE8',
	'54': 'SLOAD',
	'55': 'SSTORE',
	'56': 'JUMP',
	'57': 'JUMPI',
	'58': 'PC',
	'59': 'MSIZE',
	'5a': 'GAS',
	'5b': 'JUMPDEST',
	'5f': 'PUSH0',
	'60': 'PUSH1',
	'61': 'PUSH2',
	'62': 'PUSH3',
	'63': 'PUSH4',
	'64': 'PUSH5',
	'65': 'PUSH6',
	'66': 'PUSH7',
	'67': 'PUSH8',
	'68': 'PUSH9',
	'69': 'PUSH10',
	'6a': 'PUSH11',
	'6b': 'PUSH12',
	'6c': 'PUSH13',
	'6d': 'PUSH14',
	'6e': 'PUSH15',
	'6f': 'PUSH16',
	'70': 'PUSH17',
	'71': 'PUSH18',
	'72': 'PUSH19',
	'73': 'PUSH20',
	'74': 'PUSH21',
	'75': 'PUSH22',
	'76': 'PUSH23',
	'77': 'PUSH24',
	'78': 'PUSH25',
	'79': 'PUSH26',
	'7a': 'PUSH27',
	'7b': 'PUSH28',
	'7c': 'PUSH29',
	'7d': 'PUSH30',
	'7e': 'PUSH31',
	'7f': 'PUSH32',
	'80': 'DUP1',
	'81': 'DUP2',
	'82': 'DUP3',
	'83': 'DUP4',
	'84': 'DUP5',
	'85': 'DUP6',
	'86': 'DUP7',
	'87': 'DUP8',
	'88': 'DUP9',
	'89': 'DUP10',
	'8a': 'DUP11',
	'8b': 'DUP12',
	'8c': 'DUP13',
	'8d': 'DUP14',
	'8e': 'DUP15',
	'8f': 'DUP16',
	'90': 'SWAP1',
	'91': 'SWAP2',
	'92': 'SWAP3',
	'93': 'SWAP4',
	'94': 'SWAP5',
	'95': 'SWAP6',
	'96': 'SWAP7',
	'97': 'SWAP8',
	'98': 'SWAP9',
	'99': 'SWAP10',
	'9a': 'SWAP11',
	'9b': 'SWAP12',
	'9c': 'SWAP13',
	'9d': 'SWAP14',
	'9e': 'SWAP15',
	'9f': 'SWAP16',
	a0: 'LOG0',
	a1: 'LOG1',
	a2: 'LOG2',
	a3: 'LOG3',
	a4: 'LOG4',
	f0: 'CREATE',
	f1: 'CALL',
	f2: 'CALLCODE',
	f3: 'RETURN',
	f4: 'DELEGATECALL',
	f5: 'CREATE2',
	fa: 'STATICCALL',
	fd: 'REVERT',
	fe: 'INVALID',
	ff: 'SELFDESTRUCT',
};
*/
