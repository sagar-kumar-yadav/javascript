// array is a special variable that stores multiple values in one variable.
// using square brancket we create array
const arr = [1, 2, 3, 4];
let fruits = ["orange", "Banana", "Mango"];

// also we create using new keyword
let number = new Array(1, 2, 3, 4)

// we can access using index
console.log(arr[1]);  // 2
console.log(fruits[1]); // Banana

// we can change using index value
arr[1] = 10;
console.log(arr);  // [ 1, 10, 3, 4 ]

// common arrays method ------------------------------------------------------------------
// using push we can add array element at the end
fruits.push("grapes");
console.log(fruits); // [ 'orange', 'Banana', 'Mango', 'grapes' ]

// using pop we can remove element at the end of the array
fruits.pop();
console.log(fruits); // [ 'orange', 'Banana', 'Mango' ]

// using unshift method we can add elements on begning
fruits.unshift("Pineapple");
console.log(fruits); // [ 'Pineapple', 'orange', 'Banana', 'Mango' ]

// using shift we can remove elements on begning
fruits.shift();
console.log(fruits); // [ 'orange', 'Banana', 'Mango' ]

// looping through arrays -------------------------------------------------
// for loop
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
// for each loop
fruits.forEach((i) => {
    console.log(i);
});

// important modern methods using in react/node
// transform data
let doubled = arr.map((i)=>{
    return i * 2;  // 2, 20, 6, 8
})
console.log("map " + doubled);

// filter data
let even = arr.filter((i)=>{
    return i % 2  == 0;
})
console.log(even);  // [10, 4]

// find - find first match
let users = [
    { id: 1, name: "Sagar" },
    { id: 2, name: "Rahul" }
];
let user = users.find((x)=>x.id === 2);
console.log(user.name);

// reduce Accumulate values
console.log(arr);
let sum = arr.reduce((total, num) => total + num, 0)
console.log(sum);

// ex-1
let loans = [
    { id: 1, amount: 50000 },
    { id: 2, amount: 30000 }
];
let totalAmount = loans.reduce((sum, loan)=> sum+loan.amount, 0);
console.log(totalAmount);

// arrays are in js orderd of collections of elemennt, they support method like push, pop, unshift, shift, map, filter, reduce for manipulating array in js.
