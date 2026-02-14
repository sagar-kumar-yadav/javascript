// Difference between map() and forEach()
// map() - return a new array
// used to transform data
// can be chained

// filter() - return undefiend
// used to perform sideeffcts
// cannot be chained

// ---------------------------------------------------------
// map()
let numbers = [1, 2, 3];
let doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]   -- returns a new array

// foreach()
let doubledUsingForeach = numbers.forEach((num)=>num * 2);
console.log(doubledUsingForeach);  // undefiend -- foreach does not return anything

// when to use
// -- if you want a new modified array 
// -- in react when i render the list

// map() can chain
console.log(numbers);
let res = numbers.map((num) => num *2).filter((num)=> num > 2)
console.log(res); // [4, 6]

// both don't modify the orginal array
// for each contains parammeter value, index, array
const notModiArr = [10, 20, 30];
console.log(notModiArr);
notModiArr.forEach((num, index, arr) => {
    arr[index] = num * 2;
})
console.log(notModiArr);  // this is possible with foreach