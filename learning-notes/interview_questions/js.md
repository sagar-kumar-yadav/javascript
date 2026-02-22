## What is JavaScript?
- high level
- single-threaded
- interpreted
- dynamically typed
- event-driven

- used for:-
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

## Hoisting
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
### Spread Operator
- Used for:
  - Copying arrays
  - Merging arrays
  ```js
  let newArr = [...arr];  // [ 10, 20, 30 ]
  ```
- Destructuring
```js
// insted of
let a = arr[0];
let b = arr[1];
console.log(a); // 10
console.log(b); // 20

// Use destructuring
let [a, b, c] = arr;
console.log(a); // 10
console.log(b); // 20
console.log(c); // 30

// skip values
let [first, , third] = arr;
console.log(third); // 30

// default values
let arr = [10];
let [a, b = 50] = arr;
console.log(b); // 50
```
## Shallow Copy vs Deep Copy
  - Shallow Copy
    - Copies only the first level
    - Nested objects/arrays still share the same reference
    - Changing nested data affects the original
  ```js
  let user = {
      name: "John",
      address: {
          city: "New York"
      }
  };
  let copy = { ...user }; // shallow copy
  copy.name = "Mike";
  copy.address.city = "Los Angeles";
  console.log(user.name);          // John (separate)
  console.log(user.address.city);  // Los Angeles (changed!)
  // name (primitive) → copied by value
  // address (object) → copied by reference
  ```
- Deep Copy
  - Copies everything, including nested objects
  - No shared references
  - Changes do NOT affect original
  ```js
  let user = {
    name: "John",
    address: {
      city: "New York"
    }
  };
  let copy = structuredClone(user); // deep copy
  copy.name = "Mike";
  copy.address.city = "Los Angeles";
  console.log(copy) // { name: 'Mike', address: { city: 'Los Angeles' } }
  console.log(user.name);          // John
  console.log(user.address.city);  // New York
  // NOTE:- structuredClone() cannot clone functions
    ```
- React state bug exapmles
```js
let state = {
  user: {
    name: "John"
  }
};
let newState = { ...state };
newState.user.name = "Mike";
console.log(state); // { user: { name: 'Mike' } }
console.log(newState); // { user: { name: 'Mike' } }
// fix  shallow copy in react
let newState = {
  ...state,
  name : "Mike"
}
console.log(state); // { user: { name: 'John' } }
console.log(newState); // { user: { name: 'John' }, name: 'Mike' }
// React may NOT re-render properly
// because nested object reference didn’t change.
```
- When is shallow copy actually good?
  - When object contains only primitive values
  - When you intentionally want shared references
  - For performance optimization in some cases
```js
// shallow copy
const obj2 = { ...obj1 };

// deep copy
const deep = JSON.parse(JSON.stringify(obj));
// note : Not recommended for functions/undefined/Date.
// modern way - 
structuredClone(obj);
```
## Objects
- key-value pairs
- used to store structured data
- Objects are stored in heap memory
### object creation
```js
// 1. object literal
const obj = {
  name: "Sagar",
  age: 25,
  isAdmin: false
  greet() {}
}
console.log(obj) // { name: 'Sagar', greet: [Function: greet] }
// Keys are called properties

// 2. using new object
const obj1 = new Object();
obj1.name = "Sagar";
obj1.age = 24
console.log(obj1) // { name: 'Sagar', age: 24 }

// 3. Constructor Function
function User(name, age) {
  this.name = name;
  this.age = age;
}
const user1 = new User("Sagar", 25);
const user2 = new User("yadav", 26);
console.log(user1) // User { name: 'Sagar', age: 25 }
console.log(user1) // User { name: 'yadav', age: 26 }

// ES6 Class
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// Object.create()
const person = {
  greet() { console.log("Hello"); }
};
const user = Object.create(person);
```
### Accessing Object Properties
```js
const user = { name: "Sagar", age: 25 };
// Dot Notation
console.log(user.name) // Sagar 

// Bracket Notation
console.log(user["age"]) // 25
// Use bracket when: Property name has spaces, Dynamic key
const key = "name";
console.log(user[key]); // Sagar
```
### Adding, Updating & Deleting Properties
```js
// Add
user.city = "Noida";        
console.log(user.city); // Noida
// Update
user.age = 26;          
console.log(user.age);  // 26
// Delete
delete user.city;      
console.log(user.city); // undefined
```
### Object Methods
- Functions inside objects are called methods.
```js
const user = {
  name: "Sagar",
  greet() {
    return `Hello ${this.name}`;
  }
};
// note - this refers to the current object.
```
### Object Iteration
```js
// for in
for (let key in user) {
  console.log(key, user[key]);
} 
// name Sagar
// age 26

// Object.keys()
console.log(Object.keys(user)) // ["name", "age"]

// Object.values()
console.log(Object.values(user)); // [ 'Sagar', 26 ]

// Object.entries()
console.log(Object.entries(user)); //[ [ 'name', 'Sagar' ], [ 'age', 26 ] ]
```
### Object Destructuring (ES6)
```js
const user = { name: "Sagar", age: 25 };
const { name, age } = user; 
// With rename:
const { name: username } = user;

// Spread Operator with Objects
const user = { name: "Sagar" };
const updatedUser = { ...user, age: 25 };
// Used for:
    // Cloning
    // Merging
    // Updating state (React)
```
### Object.freeze() & Object.seal()
```js
Object.freeze(obj);
// Cannot add/update/delete
// ex - 1
const obj = { address: { city: "Noida" } };
Object.freeze(obj);
obj.address.city = "Delhi";
console.log(obj.address.city); // Delhi
// Nested object still mutable.

Object.seal(obj);
// Cannot add/delete
// Can update
```
### Optional Chaining (ES2020)
```js
user?.address?.city
// Prevents error if property doesn't exist.
```
### Nullish Coalescing
```js
const value = user.address ?? "Ranchi";
console.log(value);
// Returns default only if null or undefined
```
## Prototype & Inheritance in JavaScript
### Object Prototypes (Very Important)
- In JavaScript, every object has a hidden property called [[Prototype]].
- It allows objects to inherit properties and methods from another object.
- Every object has a prototype.
```js
// we can access using 
object.__proto__

// Or the standard way:
Object.getPrototypeOf(object)
```
- Why Prototype is Important?
  - Because JavaScript uses Prototype-based inheritance, not classical inheritance like Java or C++.
  - Instead of copying methods, objects share methods through prototypes → memory efficient.
  ```js
  // Example Without Prototype (Wrong Way)
  function Person(name) {
    this.name = name;
    this.greet = function () {
      console.log("Hello " + this.name);
    };
  }
  const p1 = new Person("Sagar");
  const p2 = new Person("Rahul");
  // What actually happens in memory?
  // Every time you create a new object:
    // A new copy of greet() is created.
    // So p1.greet and p2.greet are two different functions.
    console.log(p1.greet === p2.greet); // false
    // That means two separate function instances in memory.

  // Using Prototype (Correct Way)
  function Person(name) {
    this.name = name;
  }

  Person.prototype.greet = function () {
    console.log("Hello " + this.name);
  };
  const p1 = new Person("Sagar");
  const p2 = new Person("Rahul");
  // now check
  console.log(p1.greet === p2.greet); // true
  // Both objects share ONE function in memory.
  ```
  - why Prototype is Used (Real Reason)
    - Memory Efficiency (Very Important)
    - Imagine:
      - 10,000 users
      - Each has 5 methods
    - Without prototype:
      - 10,000 × 5 = 50,000 function copies 
    - With prototype:
      - Only 5 functions total
  - when not to use Prototype
    - If a method depends on private variables inside constructor, don’t use prototype.
    ```js
    function Counter() {
      let count = 0; // private

      this.increment = function () {
        count++;
        console.log(count);
      };
    }
    // Here count is private.
    // If you move increment to prototype, it cannot access count.
    // When only one object exists
    ```
### Getters & Setters
- Getters and Setters are special methods that allow you to:
  - Control how a property is accessed
  - Control how a property is modified
  - Add validation or logic
  - Protect internal data
```js
const person = {
  firstName: "Sagar",
  lastName: "Yadav",
  get fullName() {
    return this.firstName + " " + this.lastName;
  },

  set fullName(value) {
    const parts = value.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
  }
};
console.log(person.fullName);  // Sagar Yadav

person.fullName = "Rahul Sharma";
console.log(person.firstName); // Rahul
console.log(person.lastName);  // Sharma
// Notice: we used person.fullName like a property, not a function.
```
- Why Use Getters & Setters
  - Validation
  - Data Protection (Encapsulation)
- Getter must return something
- Setter must take exactly one parameter
- You cannot have only setter without getter (good practice to have both)
## Asynchronous JavaScript
- JavaScript is single-threaded.
- That means:
  - It can do one task at a time.
- But many operations take time:
  - API calls
  - Database queries
  - File reading
  - Timers
  - Payment processing
- To avoid blocking the app, JavaScript uses asynchronous programming.
```js
console.log("Start");

setTimeout(() => {
  console.log("Inside Timeout");
}, 2000);

console.log("End");
// output : -
  // Start
  // End
  // Inside Timeout

// Because setTimeout is asynchronous.
```
- How JavaScript Handles Async
  - Call Stack
  - Web APIs / Node APIs
  - Callback Queue
  - Event Loop
    - Event Loop Flow
      - Call Stack
          ↓
      - Web APIs
          ↓
      - Callback Queue
          ↓
      - Event Loop
          ↓
      - Back to Call Stack
  ```js
  setTimeout(() => {
    console.log("Hello");
  }, 0);
  // Even with 0ms, it doesn't run immediately.
  // why?
    - Goes to Web API
    - After timer completes → goes to Queue
    - Event Loop waits for stack to be empty
    - Then executes
  ```
## Types of Asynchronous Patterns
### Callbacks
```js
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
```
- Problem: Callback Hell
```js
getUser(function(user){
  getOrders(user.id, function(orders){
    getPayment(orders, function(payment){
      ...
    });
  });
});
```
### Promises (Better Solution)
```js
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Data received");
  }, 1000);
});

fetchData
  .then(data => console.log(data))
  .catch(err => console.log(err));
```
- States of Promise:
  - Pending
  - Fulfilled
  - Rejected
### Async / Await (Best & Cleanest)
```js
async function getData() {
  try {
    const response = await fetch("https://api.example.com");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```
- Looks synchronous but works asynchronously.
### Microtasks vs Macrotasks (Advanced Interview)
- Macrotask:  
  - setTimeout  
  - setInterval
  - setImmediate
- Microtask:  
  - Promise.then()
  - async/await
- Microtasks run before macrotasks.
```js
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
// output:-
  // Start
  // End
  // Promise
  // Timeout
// Why?
- Microtask queue runs before macrotask queue.
```
## Memory Management
- JavaScript has automatic garbage collection.
- You don’t manually free memory like in C/C++.
### Memory Lifecycle in JavaScript
- There are 3 steps:
  - Allocation – Memory is assigned
  - Usage – Program reads/writes memory
  - Release – Garbage Collector frees unused memory
### Types of Memory in JS
- Stack Memory
  - Stores primitive values
  - Stores function calls
  - Fast
  - Fixed size
  ```js
  let name = "Sagar";
  let age = 25;
  // Stored in stack.
  ```
- Heap Memory
  - Stores objects
  - Dynamic memory
  - Slower than stack
  ```js
  let user = {
    name: "Sagar",
    role: "Admin"
  };
  // Objects live in heap.
  ```
- Garbage Collection (Very Important)
  -  JavaScript uses Mark-and-Sweep Algorithm.
    - How it works:
      - GC marks all reachable objects
      - Unreachable objects are removed
      ```js
      let user = { name: "Sagar" };
      user = null; // Now previous object becomes unreachable
      ```
      - GC will remove it automatically.
- Memory Leak (Important for Interviews)
  - Memory leak happens when:
    - Memory is no longer needed but still referenced.
    - Common Causes of Memory Leaks
    ```js
    // Global Variables
    function test() {
      data = "Hello"; // accidentally global
    }
    // Never released
    ```
## ES6+ Features
- ES6 (ECMAScript 2015) is a major update to JavaScript.
### let & const (Block Scope)
```js
let age = 25;
const PI = 3.14;
// Block scoped
// const cannot be reassigned
// Cleaner & safer
```
### Arrow Functions
```js
const greet = (name) => {
  return "Hello " + name;
};
// const greet = name => "Hello " + name;
const greet = name => "Hello " + name;
// Arrow functions do not have their own this.
// Used heavily in React.
```
### Template Literals
```js
const name = "Sagar";
console.log(`Hello ${name}`);
// Multiline support
// Expression support
```
### Destructuring
```js
// Object Destructuring
const user = { name: "Sagar", age: 25 };
const { name, age } = user;

// Array Destructuring
const arr = [1, 2, 3];
const [a, b] = arr;
```
- Very common in React props.
### Spread & Rest Operator (...)
```js
// Spread
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
```
- Used in React state updates.
```js
// rest
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}
```
### Default Parameters
```js
function greet(name = "Guest") {
  console.log(name);
}
```
### Classes
```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log("Hello " + this.name);
  }
}
// Syntactic sugar over prototype
```
### Modules (Very Important)
```js
// export
export const add = (a, b) => a + b;

// import
import { add } from "./file.js";
```
- Used everywhere in React + Node.
### Promises
### Async / Await (ES8)
### Optional Chaining (?.)
```js
console.log(user?.address?.city);
// Prevents errors if undefined.
```
### Nullish Coalescing (??)
```js
const name = user.name ?? "Guest";
// Different from || because it only checks null or undefined.
```
### Object Shorthand
```js
const name = "Sagar";
const user = { name };
```
## Debouncing & Throttling
- Debouncing & Throttling are very important for React + frontend performance
### Why Do We Need Debouncing & Throttling?
- Some events fire too frequently:
  - onChange (search input)
  - scroll
  - resize
  - mousemove
  - button clicks
- If we call API on every keystroke → server overload 
So we control execution frequency.
### Debouncing
- Debouncing ensures a function runs only after a delay, and only if no new event occurs during that delay.
- simple meaning
  - “Wait until user stops typing.”
- Example (Search Input)
  - Without debouncing:
  ```js
  input.addEventListener("input", () => {
    fetchData(); // called on every key press
  });
  ```
  - If user types “Sagar” → 5 API calls
  - Debounce Implementation
  ```js
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  // Usage:
  const handleSearch = debounce(() => {
    console.log("API Call");
  }, 500);
  input.addEventListener("input", handleSearch);
  // Only 1 API call
  // Runs after 500ms of inactivity
  ```
### Throttling
- Throttling ensures a function runs at most once in a specified time interval.
- Simple Meaning
  - “Run every X milliseconds.”
  ```js
  // Throttle Implementation
  function throttle(func, delay) {
    let lastCall = 0;

    return function (...args) {
      const now = Date.now();

      if (now - lastCall >= delay) {
        lastCall = now;
        func.apply(this, args);
      }
    };
  }

  // Usage:
  window.addEventListener("scroll", throttle(() => {
    console.log("Scroll event");
  }, 1000));
  // Runs only once every 1 second
  // Even if user scrolls continuously
  ```
 - React Example
 ```js
 useEffect(() => {
   const handler = setTimeout(() => {
    fetchUsers(searchTerm);
  }, 500);

  return () => clearTimeout(handler);
  }, [searchTerm]);
  // That’s debouncing inside React.
 ```
## Execution Context
### What is Execution Context?
- Execution Context is the environment in which JavaScript code is evaluated and executed.
- Whenever JS runs code, it creates an execution context.
- Types of Execution Context
  - There are 3 types:
    - Global Execution Context (GEC)
    - Function Execution Context (FEC)
    - Eval Execution Context (rarely used)
### Global Execution Context (GEC)
- Created when JS file starts running.
  - Creates global object (window in browser, global in Node)
  - Sets this
  - Allocates memory for variables & functions
- There is only one global execution context.
### Function Execution Context (FEC)
- Created whenever a function is invoked.
- Each function call creates a new execution context.
- Execution Context Has 2 Phases
  - Memory Creation Phase (Hoisting Phase)
    - Variables → stored as undefined
    - Functions → stored completely
    - this is set
  - Execution Phase
    - Code runs line by line
    - Variables get actual values
    ```js
    console.log(a);
    var a = 10; 
    function test() {
      console.log("Hello");
    }
    // Memory Phase:
      // a → undefined
      // test → full function stored
    // Execution Phase:
      // console.log(a); // undefined
      // a = 10
    // That’s why it prints undefined.
    ```
### Call Stack
- Execution contexts are managed using Call Stack.
```js
function one() {
  two();
}
function two() {
  console.log("Hello");
}
one();
// Call Stack Flow:
  // Global()
  // → one()
  // two()
  // → console.log()
  // Then they pop out one by one.

  // Visual Representation
  | two() |
  | one() |
  | GEC   |
```
- Interview-Ready Answer

  - Execution context is the environment where JavaScript code runs. It consists of memory creation and execution phases. JavaScript creates a global execution context first, and then creates new execution contexts for every function call, which are managed by the call stack.
## Error Handling
- Error handling is the process of detecting, managing, and responding to runtime errors in a program without crashing the application.
- Types of Errors in JavaScript:
  - Syntax Error
  - Reference Error
