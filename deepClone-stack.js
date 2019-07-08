
const getType = obj => Object.prototype.toString.call(obj).match(/\[object\s(.*)]/)[1]

function deepClone(obj) {
    let res = {}
    let stack = []
    let root = {
        parent: obj,
        prop: null,
        data: res
    }
    let wm = new WeakMap()
    stack.push(root)

    while (stack.length) {
        let item = stack.pop()
        Reflect.ownKeys(item.parent).forEach(key => {
            if (wm.get(item.parent[key])) {
                item.data[key] = wm.get(item.parent[key])
                return
            }
            switch (getType(item.parent[key])) {
                case 'Object': {
                    item.data[key] = {}
                    stack.push({
                        parent: item.parent[key],
                        prop: key,
                        data: item.data[key]
                    })
                    wm.set(item.parent[key], item.parent[key])
                    break
                }
                case 'Array': {
                    item.data[key] = []
                    stack.push({
                        parent: item.parent[key],
                        prop: key,
                        data: item.data[key]
                    })
                    wm.set(item.parent[key], item.parent[key])
                    break
                }
                case 'Date': {
                    item.data[key] = new Date(item.parent[key])
                    break
                }
                case 'RegExp': {
                    item.data[key] = new RegExp(item.parent[key])
                    break
                }
                default: {
                    item.data[key] = item.parent[key]
                }
            }
        })
    }

    return res
}


let obj = {
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    obj: {
        name: '我是一个对象',
        id: 1,
        qwe: {
            a: 1
        }
    },
    arr: [0, 1, 2, {b: 2}],
    date: new Date(0),
    reg: /我是一个正则/ig,
    [Symbol('1')]: 1,
    func() {
        console.log(123)
    }
};

obj.loop = obj

let cloneObj = deepClone(obj);

console.log('obj', obj);
console.log('cloneObj', cloneObj);

// 对比两个对象引用类型的值是相同
Object.keys(cloneObj).filter(key => key !== 'nul').forEach(key => {
    if (typeof cloneObj[key] === 'object' || typeof cloneObj[key] === 'function') {
        console.log(`${key}相同吗？ `, cloneObj[key] === obj[key])
    }
})

