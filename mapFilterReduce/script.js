const arr = [12, 42, 54, 65, 67];

arr.forEach((currVal, indx, arr)=>{
    console.log(currVal, indx, arr) // 12, 42, 54, 65, 67
})

let first = arr.forEach((x)=>{
    // console.log(x) // 12, 42, 54, 65, 67
    return x; 
})
console.log(first) // undefined

// map ------------------------------------------
arr.map((currVal, indx, arr)=>{
    console.log(currVal, indx, arr)
})

let second = arr.map((currVal)=>{
    // console.log(currVal, indx, arr)
    return currVal * 2
})
console.log(second) // [  24, 84, 108, 130, 134  ]

// filter ----------------------------------------
const evenNum = arr.filter((currVal, indx, arr)=>{
    // console.log(currVal)
    return currVal % 2 === 0;
})
console.log(evenNum) // [12, 42, 54]

// if i filter using map methods it gives us true and false
const even = arr.map((x)=>{
    return x % 2 == 0;
})
console.log(even) // [ true, true, true, false, false ]


// reduce ------------------------------------------------
const sum = arr.reduce((acc, num)=>{
    console.log("total " + acc);
    console.log("currVal " + num)

    return acc + num;
})
console.log(sum)