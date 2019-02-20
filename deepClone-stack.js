const deepClone = function (obj) {
    let root = {}
    let stack = [
        {
            parent:obj,
            key:null,
            data:obj
        }
    ]
    // debugger
    //Todo 非数组/对象的拷贝 循环引用
    while(stack.length){
        let item = stack.pop()
        let parent = item.parent
        let key = item.key
        let data = item.data
        let res
        //初始化克隆对象
        if(!key){
            res = root
        }else{
            //每次都给值是对象的属性做初始化
            res = parent[key] = Array.isArray(data) ? [] : {}
        }
        Object.keys(data).forEach(k=>{
            if(typeof data[k] === 'object'){
                stack.push({
                    //parent不能是data，需要是正在赋值的对象（该对象没有当前值是对象的属性）
                    parent:res,
                    key:k,
                    data:data[k]
                })
            }else{
                res[k] = data[k]
            }
        })
    }
    return root
}

let obj = {
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    // nul: null,
    obj: {
        name: '我是一个对象',
        id: 1
    },
    arr: [0, 1, 2],
    // func: function() {
    //     console.log('我是一个函数')
    // },
    // date: new Date(0),
    reg: new RegExp('/我是一个正则/ig'),
    // [Symbol('1')]:1,
};

// Object.defineProperty(obj,'innumerable',{
//     enumerable:false,
//     value:'不可枚举属性'
// });

// obj = Object.create(obj,Object.getOwnPropertyDescriptors(obj))

// obj.loop = obj

let cloneObj = deepClone(obj);

console.log('obj',obj);
console.log('cloneObj',cloneObj);


for (let key of Object.keys(cloneObj)) {
    if(typeof cloneObj[key] ==='object' || typeof cloneObj[key] ==='function'){
        console.log(`${key}相同吗？ `, cloneObj[key] === obj[key])
    }
}