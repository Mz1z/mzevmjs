const EVM = require("./core/evmjs");


var evm = new EVM();
console.log(evm);

let bytecode = "0x6080604052610278806100136000396000f3fe6080604052600436106100225760003560e01c806372dfd1781461003057610023565b5b600061002e57600080fd5b005b34801561003c57600080fd5b5061005760048036038101906100529190610125565b610059565b005b60008173ffffffffffffffffffffffffffffffffffffffff16661ff973cafa8000604051610086906101a8565b60006040518083038185875af1925050503d80600081146100c3576040519150601f19603f3d011682016040523d82523d6000602084013e6100c8565b606091505b505090508061010c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610103906101bd565b60405180910390fd5b5050565b60008135905061011f8161022b565b92915050565b60006020828403121561013757600080fd5b600061014584828501610110565b91505092915050565b600061015b6000836101dd565b9150600082019050919050565b60006101756003836101e8565b91507f65727200000000000000000000000000000000000000000000000000000000006000830152602082019050919050565b60006101b38261014e565b9150819050919050565b600060208201905081810360008301526101d681610168565b9050919050565b600081905092915050565b600082825260208201905092915050565b60006102048261020b565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b610234816101f9565b811461023f57600080fd5b5056fea264697066735822122037745f31a1d34fc0cdd6cf4faf7674276941b0b040c6b05aa9c4c322f2fb6a6464736f6c63430008000033";
let deployedBytecode = "6080604052600436106100225760003560e01c806372dfd1781461003057610023565b5b600061002e57600080fd5b005b34801561003c57600080fd5b5061005760048036038101906100529190610125565b610059565b005b60008173ffffffffffffffffffffffffffffffffffffffff16661ff973cafa8000604051610086906101a8565b60006040518083038185875af1925050503d80600081146100c3576040519150601f19603f3d011682016040523d82523d6000602084013e6100c8565b606091505b505090508061010c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610103906101bd565b60405180910390fd5b5050565b60008135905061011f8161022b565b92915050565b60006020828403121561013757600080fd5b600061014584828501610110565b91505092915050565b600061015b6000836101dd565b9150600082019050919050565b60006101756003836101e8565b91507f65727200000000000000000000000000000000000000000000000000000000006000830152602082019050919050565b60006101b38261014e565b9150819050919050565b600060208201905081810360008301526101d681610168565b9050919050565b600081905092915050565b600082825260208201905092915050565b60006102048261020b565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b610234816101f9565b811461023f57600080fd5b5056fea264697066735822122037745f31a1d34fc0cdd6cf4faf7674276941b0b040c6b05aa9c4c322f2fb6a6464736f6c63430008000033";
evm.decompile(deployedBytecode);   // test decompile

evm.load_bytecode("0x6080604061ffff00ff");
evm.run()   // test run