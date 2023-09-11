---
typora-root-url: ./
typora-copy-images-to: img
---

# MzEVMJS

基于js的evm虚拟机环境和反编译工具。

> start data: 2023/9/11



```
core/emvjs.js      # EVM类，用于加载和执行bytecode，可以反编译bytecode
```







## 文档

EVM类(evm为实例化对象)

### evm.run()    TODO

运行机器码，输出最终的栈帧。

### evm.decompile(bytecode)

反编译bytecode为evm汇编。

![image-20230911173139105](/img/image-20230911173139105.png)

### evm.analyse(bytecode) TODO

分析字节码的函数块，入口信息