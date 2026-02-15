## What is JavaScript?
- high level
- single-threaded
- interpreted
- dynamically typed
- event-driven

used for:-
- frontend
- backend

### Data Types
### primitive(store by value)
- string
- number
- boolean
- null
- undefiend
- symbol
- bigint
### non primitive(reference type)
- object
- array
- function

### typeof operator
- typeof "hello"    // string
- typeof 10         // number
- typeof null       // object 


##  Variables
### var vs let vs const
| Feature  | var      | let   | const |
|----------|----------|--------|--------|
| Scope    | Function | Block  | Block  |
| Reassign | Yes      | Yes    | No     |
| Hoisted  | Yes      | Yes*   | Yes*   |
| TDZ      | No       | Yes    | Yes    |

---

### hoisting
- Variables & functions are moved to top during compilation.
```js
console.log(a); // undefined
var a = 10;

console.log(b); // ReferenceError
let b = 20;
// b created in memory but not initilize
// lives in TDZ
// same happens with const
```

> let & const are hoisted but in Temporal Dead Zone (TDZ).
### TDZ - Temporal Dead Zone
```js
console.log(a); // ReferenceError
let a = 10;
// Here, a is hoisted but not initialized. So it is in TDZ until the line let a = 10.
```
```js
var a = 5;

function test() {
  console.log(a);
  let a = 10;
}

test(); // output - ReferenceError
// why ? 
// Inside test(), a new let a is created., it create TDZ
```
```js
let a = 10;

{
  console.log(a);
  let a = 20;
}
// output - ReferenceError
// why ? 
// A new a is declared , it creates a TDZ, it shadows outer a
```
```js
let a = 1;
function foo() {
  console.log(a);
  if (true) {
    let a = 2;
  }
}
foo(); // output - ReferenceError
// Because block-level a creates TDZ and shadows outer a
```
### TDZ + Closures tricky question
```js
// ex 1
function outer() {
  console.log(a);
  let a = 10;
  function inner() {
    console.log(a);
  }
  inner();
}
outer(); // output - ReferenceError
// TDZ starts beggning of outer loop

// ex 2
function outer() {
  let a = 10;
  function inner() {
    console.log(a);
  }
  inner();
}
outer(); // output - 10
```
```js
let a = 1;
function outer() {
  function inner() {
    console.log(a);
  }
  let a = 2;
  inner();
}
outer(); // output - 2
// a new let a is created in outer
// inner function is called after the a variable
let a = 1;
function outer() {
  function inner() {
    console.log(a);
  }
  inner();
  let a = 2;
}
outer(); // output - ReferenceError
// a new let a is created in outer
// inner function is called before the a variable
```
### setTimeout + Closure + TDZ
```js
function test(){
    setTimeout(()=>{
        console.log(a);
    }, 0);
    let a = 5;
}
test(); // output - 5
// why ? - setTimeout() is defined before a 
// the callback runs latter after execution finish
// so a is already initilize
// TDZ has ended
```
## Scope, Closures & Lexical Scope
- scope types
    - Global
    ```js
    let a = 10;
    function test() {
        console.log(a);
    }
    test(); // 10
    // Accessible everywhere.
    ```
    - Function
    ```js
    function test() {
        let b = 20;
        console.log(a);
    }
    test(); 
    console.log(b) // ReferenceError
    // only accessible inside the function 
    ```
    - Block
    ```js
    {
        let c = 30;
        console.log(c); // 30
    }
    console.log(c); // ReferenceError
    // let and const is a block scope
    ```
   
- Clouser
    - funtion remembers and accesses variables from it's outer(lexical) scope even after the outer function has finshed executing.
    - Closure works because of lexical scope.
    ```js
    function outer(){
        let count = 0;
        function inner() {
            count++
            console.log(count);
        }
        return inner;
    }
    const counter = outer();
    counter();  // 1
    counter();  // 2
    // when outer() finishes
    // local variable should be destroyed
    // but because inner() is returned
    // javascipt keeps count in memory
    // this preserve environment is called clouser
    ```
    ```js
    function createAccountBalance(balance) {
        return {
            deposit(amount){
                balance += amount;
                console.log("deposite "+amount);
            },
            checkBalance() {
                console.log("Current Balance: ", balance);
                return balance;
            }
        }
    }
    const account = createAccountBalance(100);
    account.deposit(50); // 50
    account.checkBalance(); // 150 
    // balance is private
    // cannot access directly
    // only accessble through methods
    // used for encapsulation
    ```
    ```js
    function greet(name) {
        setTimeout(function() {
            console.log("Hello " + name);
        }, 1000);
    }
    greet("Rahul");
    ```
    - used in 
        - data hiding
        - maintaing state
        - react hooks
        - currying
- Lexical Scope
    - accesibilty of variable and function based on their location in the source code 
    - when a variable is called, js resolve it by searching within the local scope first, then progressivly moving through parent scope
    ```js
    const fullName = "Oluwatobi Sofela"; // Global scope
    function profile() {
        function sayName() {
            function writeName() {
                return fullName;
            }
            return writeName();
        }
    return sayName();
    }
    console.log(profile()); // Output: "Oluwatobi Sofela"
    // in this example the fullname variable is defiend in the global scope. 
    // the writename function, nested within sayName and profile, acceses fullname by traversing the scope chain from it's local scope to parent scope
    ```
### currying
- where a function take one argument at a time and return another function
- it uses clouser to remember previous arugument
```js
// Normal function:
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5

// Curried version:
function add(a) {
  return function(b) {
    return a + b;
  };
}
console.log(add(2)(3)); // 5
// first call stores a
// second function remembers a
// that memory in closure
```
```js
// real-world example
function multiply(a) {
  return function(b) {
    return a * b;
  };
}
const double = multiply(2);
const triple = multiply(3);
double(5); // 10
triple(5); // 15
```
### Advanced Closure Pattern: Memoization
- is a performance optimization technique
- where we cache previously computed results. 
- It uses closure to maintain a private cache that persists across function calls.
```js
// Uses closure to store cache.
function memoizedAdd() {
  let cache = {};
  return function(num) {
    if (cache[num]) {
      console.log("From cache");
      return cache[num];
    }
    console.log("Calculated");
    cache[num] = num + 10;
    return cache[num];
  };
}
const add = memoizedAdd();
console.log(add(5));
console.log(add(5));
// cache belongs to outer function
// Inner function remembers it
// Cache persists across calls
// That persistence = closure
```
- where memoization is used
    - Expensive calculations
    - API caching
    - React performance optimization
    - Fibonacci optimization
### Closure & Memory Leaks
- What is the Issue?
    - Closures keep references to outer variables.
    - If those variables reference large data and are never released → memory cannot be garbage collected.
    - That can cause memory leaks.
    
    to be continue.....
## this keyword
- this in Global Scope
```js
console.log(this) 
// in node js print {}
// in browser print windows object
```
- this inside function
```js
function test() {
  console.log(this);
}
test(); // undefined
```
- this Inside a Regular Function
```js
const user = {
  name: "Rahul",
  greet() {
    console.log(this.name);
  }
};
user.greet(); // Rahul
// this refers to user or you can call object
```
- this in Arrow Functions
```js
const user = {
  name: "Rahul",
  greet: () => {
    console.log(this.name);
  }
};
user.greet(); // undefined
```
- Problem with Normal Function in Callback
```js
const person = {
    name: "John",
    greet: function () {
        setTimeout(function () {
            console.log(this.name);
        }, 1000);
    }
};
person.greet(); // undefined
```
- Arrow Function Fix (Lexical this)
```js
const person = {
    name: "John",
    greet: function () {
        setTimeout(() => {
            console.log(this.name);
        }, 1000);
    }
};
person.greet(); // John
// The arrow function does NOT create a new this
// It takes this from the outer function (greet)
// And greet's this is person
// That’s lexical this.
```
- this in Constructor Function
```js
function Person(name) {
  this.name = name;
}
const p1 = new Person("Rahul");
console.log(p1.name); // Rahul
// this refers to new object created by new
```
- this in class
```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(this.name);
    console.log(this.age);
  }
}
const p = new Person("Rahul", 23);
p.greet();
// this refer to the instance
```
- this with call, apply, bind
```js
function greet() {
  console.log(this.name);
}
const user = { name: "Rahul" };
greet.call(user);   // Rahul
greet.apply(user);  // Rahul
const newFunc = greet.bind(user);
newFunc();          // Rahul
```
## call, apply, bind
- call() invoke a function immediately and allows you to pass arguments individually
```js
function greet(age, city) {
  console.log(this.name, age, city);
}
const user = { name: "Rahul" };
greet.call(user, 25, "Delhi"); // Rahul 25 Delhi
```
- apply() invokes a function immediately but takes arguments as an array.
```js
greet.apply(user, [25, "Delhi"]); // Rahul 25 Delhi
```
- bind() does NOT call the function immediately.
- It returns a new function with this permanently bound.
```js
// const newFunc = functionName.bind(thisArg, arg1, arg2)
const boundGreet = greet.bind(user, 25, "Delhi");
boundGreet(); // Rahul 25 Delhi
```
### Real-World Example (Very Important)
```js
const user = {
  name: "Rahul",
  greet() {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  }
};
user.greet(); // undefined
// this inside setTimeout is global
```
- fix using bind() or arrow function also works because it uses lexical this
```js
const user = {
  name: "Rahul",
  greet() {
    setTimeout(function () {
    console.log(this.name);
    }.bind(this), 1000);
  }
};
user.greet(); // Rahul

// arrow function also works because it uses lexical this
const user = {
  name: "Rahul",
  greet() {
    setTimeout(() => {
    console.log(this.name);
    }, 1000);
  }
};
user.greet(); // Rahul
```
## function
- Function Declaration
```js
function greet() {}
// Hoisted fully.
```
- Function Expression
```js
const greet = function() {}
// Not hoisted.
```
- Arrow Function
```js
const greet = () => {}
// No own this
// Cannot use as constructor
```
## Arrays
- an array is a special object in js used to store multiple values in a single variable
- can store mixed data type
```js
let arr = [10, 20, 30];
```
- Common Array Methods
  - push() → Add to end
  - pop() → Remove from end
  - unshift() → Add to start
  - shift() → Remove from start
- map()
  - Returns new array.
  ```js
  arr.map((x) => x * 2) // [ 20, 40, 60 ]
  ```
- foreach()
  ```js
  let a1 = arr.forEach((x)=>x*2)
  console.log(a1) // undefined
  ```
  - No return.
  ```js
  let result = [];
  arr.forEach((x)=>{
    result.push(x*2)
  })
  console.log(result)
  ```
- filter()
  ```js
  let even = arr.filter(n => n % 2 !== 0);
  console.log(even) // []
  ```
  - Returns filtered array.
- reduce()
  ```js
  let sum = arr.reduce((acc, curr) => acc + curr, 0);
  console.log(sum) // 60
  ```
  - Reduces array to single value.
    ```js
    arr.reduce((acc, curr) => acc + curr, 0)
    ```
- find()
  ```js
  let result = arr.find((x) => x > 10);
  console.log(result); // 30
  ```
  - Returns first match.
- filter()
  ```js
  arr.filter(x => x > 15); // [20, 30]
  ```
- some() & every()
  - some() → if at least one true
  ```js
  let result = arr.some(x => x > 25); // true
  // Because 30 is greater than 25
  ```
  - every() → if all true
  ```js
  let result = arr.some(x => x > 5); // true
  // All numbers are greater than 5
  ```