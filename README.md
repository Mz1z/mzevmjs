---
typora-root-url: ./
typora-copy-images-to: img
---

# MzEVMJS

基于js的evm虚拟机环境和反编译工具。

**由于已经有相应的js evm解释器了，所以功能侧重点在反汇编和反编译上，虚拟机环境可能不会完成**

> start data: 2023/9/11



```
core/emvjs.js      # EVM类，用于加载和执行bytecode，可以反编译bytecode
```

目前还需要增加对大整数的处理2^256。





## 文档

EVM类(evm为实例化对象)

### evm.decompile(bytecode)

反编译bytecode为evm汇编。

![image-20230911173139105](/img/image-20230911173139105.png)

### evm.run()    TODO

运行机器码，输出最终的栈帧。

```
目前完成指令
PUSHXX
ADD
MUL
SUB
DIV      待区分有无符号
SDIV    待区分有无符号
MOD      待区分有无符号
SMOD      待区分有无符号
ADDMOD     待测试
MULMOD     待测试
EXP
LT
```



### evm.analyse(bytecode) TODO

分析字节码的函数块，入口信息