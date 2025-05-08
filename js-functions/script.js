// block of design to perform a particular task
// function is reusable
// you can write the code that we used many times
// you can use the code with diff arguments, to produce result
// create function with a function keyword

// ex-1 -----------------------------------------------------
function ex1 (a, b) {
    return a * b;
}

// console.log(ex1("ex1" + 3, 3)); // 9
let ans = ex1(3, 3);
console.log(ex1(3, 3)) // 9
console.log("ex1 " + ans)  // 9

// ex-2 ---------------------------------------
function ex2(a, b = 5) {
  return a * b;
}

console.log(ex2(2)) // 10

function sum(...args) { // using ..arg we can take many arguments
  let sum = 0;
  for (let arg of args) {
    sum += arg;
  }
  return sum;
}
console.log(sum(1, 2, 3, 4, 5, 6)) // 21

function sum1() {  // arguments.length to use parameters
  let sum = 0;   
  for (let i=0; i<arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

console.log(sum1(1, 2, 3, 4, 5))

// ex-3 ----------------------------------------------------
// function used as variable values
let text = "temperature is " + ex1(2, 3) + " celcious";
console.log("ex3 "+text) // ex3 temperature is 6 celcious


// function constructor
function funConst (first, second) {
  this.firstName = first;
  this.lastName = second;
}
let fullname = new funConst("rohit", "kumar");
console.log(fullname)  // funConst { firstName: 'rohit', lastName: 'kumar' }
console.log(fullname.firstName) // rohit
console.log(fullname.lastName) // kumar


// ex -4 ---------------------------------------------------------
// Call() - with the call() method, you can write a method that can used in different object
const person = {
  fullname: function() {
    return this.firstName + " " + this.lastName;
  }
}

const person1 = {
  firstName :  "rohan",
  lastName  : "kumar"
}

const person2 = {
  firstName: "akshay",
  lastName: "kumar"
}

const p1 = person.fullname.call(person1)
console.log(p1); // rohan kumar

const p2 = person.fullname.call(person2)
console.log(p2); // akshay kumar


// ex-2
const person4 ={
  fullname: function (city, country) {
    return this.firstName + " " + this.lastName + " " + city + ", " + country; 
  }
}

const p4 = person4.fullname.call(person2, "oslo", "norway")
console.log(p4); // akshay kumar oslo, norway

// apply() ---------------------------
// apply method similar to call()
// call method takes arguments separately
// apply method take arguments in array
const p5 = person4.fullname.apply(person2, ["oslo", "norway"])
console.log(p5);

// bind----------------------------------
// it binds and keep a copy of the method, and use it later
// rather then directly invoking it, it create copy and you can call latter
const p6 = person4.fullname.bind(person2, "oslo", "norway");
console.log(p6());

// when you use a callback, this is lost
// const p7 = setTimeout(person.fullname(person1), 3000);
// console.log(p7); // undefined undefined

const p7 = person4.fullname.bind(person2, "oslo", "norway");
setTimeout(p7, 3000);