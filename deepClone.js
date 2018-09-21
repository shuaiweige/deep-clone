
//可拷贝对象的原型，无法枚举的键，Symbol键，无法准确拷贝错误对象，浅拷贝空指针对象和函数对象（环形对象有待考虑）

const deepClone = function (obj) {
    if(obj === null) return null //空指针就返回
    if(obj.constructor===Date) return new Date(obj);   //日期对象就返回一个新的日期对象
    if(obj.constructor === RegExp) return new RegExp(obj);  //正则对象就返回一个新的正则对象
    if(obj.constructor === Error){return new Error(obj.message)}  //正则对象就返回一个新的正则对象

    let allDesc = Object.getOwnPropertyDescriptors(obj)      //遍历传入参数所有键的特性
    let newObj = Object.create(Object.getPrototypeOf(obj),allDesc)  //继承原型链

    for(let key of   Reflect.ownKeys(obj)){   //Reflect.ownKeys(obj) = [...Object.getOwnPropertyNames(obj),...Object.getOwnPropertySymbols(obj)]
        newObj[key] = typeof obj[key] === 'object' ? arguments.callee(obj[key]) : obj[key]; // 使用arguments.callee解除与函数名的耦合
    }
    return newObj;
};


let obj = {
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    obj: {
        name: '我是一个对象',
        id: 1
    },
    arr: [0, 1, 2],
    func: function() {
        console.log('我是一个函数')
    },
    date: new Date(0),
    reg: new RegExp('/我是一个正则/ig'),
    err: new Error('我是一个错误'),
    [Symbol('1')]:1
}
Object.defineProperty(obj,'unenumerable',{
    enumerable:false,
    value:'123'
})



let cloneObj = deepClone(obj)
console.log(obj)
console.log(cloneObj)


for (let key of Object.keys(cloneObj)) {
    if(typeof cloneObj[key] ==='object' || typeof cloneObj[key] ==='function'){
        console.log(`${key}相同吗？ `, cloneObj[key] === obj[key])
    }
}