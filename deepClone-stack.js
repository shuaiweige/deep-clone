const deepClone = function (obj) {
    let root = {}
    let stack = [
        {
            parent: obj,
            key: null,
            data: obj
        }
    ]
    //设置哈希表
    let s = new Set() 

    while (stack.length) {
        let item = stack.pop()
        let parent = item.parent
        let key = item.key
        let data = item.data
        let res
        //初始化克隆对象
        if (!key) {
            res = root
        } else {
            //每次都给值是对象的属性做初始化
            res = parent[key] = Array.isArray(data) ? [] : {}
        }
        //存在循环引用直接返回
        if (s.has(data)) {
            parent[key] = data
            continue
        }

        Object.keys(data).forEach(k => {
            if (typeof data[k] === 'object' && data[k]) {
                stack.push({
                    //parent不能是data，需要是正在赋值的对象（该对象没有当前值是对象的属性）
                    parent: res,
                    key: k,
                    data: data[k]
                })
                s.add(data)
            } else {
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
    nul: null,
    obj: {
        name: '我是一个对象',
        id: 1
    },
    arr: [0, 1, 2],
};

obj.loop = obj

let cloneObj = deepClone(obj);

console.log('obj', obj);
console.log('cloneObj', cloneObj);

console.log(cloneObj.loop === obj.loop)
for (let key of Object.keys(cloneObj)) {
    if (typeof cloneObj[key] === 'object' || typeof cloneObj[key] === 'function') {
        console.log(`${key}相同吗？ `, cloneObj[key] === obj[key])
    }
}
