## What is JavaScript?
- high level
- single-threaded
- interpreted
- dynamically typed
- event-driven

used for:-
- frontend
- backend

## Data Types
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

## typeof operator
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

## hoisting
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
