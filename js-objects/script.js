// an object is in javascript is a data structure used to store related data collection
// data is stored in key value pair
// objects are dynamic, which means data can be add, update, delete at runtime
// objects are container for properties and method
// In JavaScript, almost "everything" is an object.

// methods for defining object in js : -
// 1. using an object literal
// 2. using the new keyword
// 3. using an object constructor

// creation using object literal ---------------
let obj = {
    name: "saurabh",
    age: 13,
    job: "developer",
}
console.log(obj); // { name: 'saurabh', age: 13, job: 'developer' }
console.log("ex1 " + obj); // ex1 [object Object] // when you concatenate obj with a string, js converts obj into string
console.log("ex1 " + JSON.stringify(obj)); // ex1 {"name":"saurabh","age":13,"job":"developer"} // convert a string into json method


// create empty object ------------------------------------------------
const obj1 = {};  // create empty object
// add properties
obj1.firstName = "tushar";
obj1.lastName = "gupta"
console.log(obj1) // { firstName: 'tushar', lastName: 'gupta' }


// using new keyword we create object -------------------------------------------
const obj2 = new Object(); // create object using new keyword
// add properties
obj2.firstName = "sohem";
obj2.lastName = "kumar";
console.log(obj2); // { firstName: 'sohem', lastName: 'kumar' }


// accessing properties -----------------------
console.log(obj2.firstName); // sohem
console.log(obj2["firstName"]); // sohem


// object methods ----------------------------------------------------
const obj3 = {
    firstName : "rohan",
    lastName : "kumar",
    fullName : function () {
        return this.firstName + " " + this.lastName;
    }
}
console.log(obj3.fullName) // [Function: fullName] // you have to call function
console.log(obj3.fullName()); // rohan kumar


//  js objects are mutable -------------------------------------------------------
const x = obj3;
x.firstName = "ramesh";
console.log(x.firstName); // ramesh
console.log(obj3.firstName); // ramesh

// you want to add, delete, update, read -----------------------------------
x.nationality = "hindu";
console.log(x); 
// console.log( delete x.nationality); // true
console.log(delete["nationality"]); // true

// nested objects ------------------------------------------------------------------
const obj4 = {
    firstName: "shibam",
    lastName : "dubey",
    myCarsObj : {
        car1 : "ford",
        car2 : "mustang",
        car3 : "endeavor"
    }
}

console.log(obj4); 
//  output - 
// {
//     firstName: 'shibam',
//     lastName: 'dubey',
//     myCarsObj: { car1: 'ford', car2: 'mustang', car3: 'endeavor' }
//   }

console.log(obj4.myCarsObj.car1); // ford
console.log(obj4.myCarsObj["car2"]); // mustang

// adding a method into an object ------------------------------------------------------------
obj4.fullName = function () {
    return this.firstName + " " + this.lastName
}
console.log(obj4.fullName()); // shibam dubey


// using Object.values() create an array for the properties value -------------------------------------------------------------------
const obj5 = {
    firstName: "suraj",
    lastName: "mahale",
}

const myArr = Object.values(obj5)
console.log(myArr);  // [ 'suraj', 'mahale' ]


// using Object.entries() make it simple to use object in loops ----------------------------------------------------------
const obj6 = {
    firstName: "ravi",
    lastName: "gore",
    age: 34,
    city: "pune"
}
let text = "";
for (let [objectsLoop, value] of Object.entries(obj6)) {
    text += objectsLoop + " - " + value  + "; " 
    
}console.log(text); // firstName - ravi; lastName - gore; age - 34; city - pune;


// create object constructor function ----------------------------------------------------------------------
// sometimes we need to create many objects of the same type
// to create an object type we use an object constructor function
function obj7(first, last, age){
    this.firstName = first;
    this.lastName = last;
    this.age = age;
}

const objConst1 = new obj7("sagar", "yadav", 24);
console.log(objConst1); // obj7 { firstName: 'sagar', lastName: 'yadav', age: 24 }
console.log(objConst1.firstName); // sagar

const objConst2 = new obj7("ayush", "kumar");
console.log(objConst2);
console.log(objConst2.firstName); // ayush


 
objConst1.nationality= "English";   // update objConst1
console.log(objConst1); 
// output ---
// obj7 {
//     firstName: 'sagar',
//     lastName: 'yadav',
//     age: 24,
//     nationality: 'English'
//  }

obj7.prototype.nationality= "hindu";
console.log(objConst2.nationality); // hindu



// a constructor function can also have methods ------------------------------------------
function obj9(first, last, age) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.fullName = function () {
        return this.firstName + this.lastName;
    }
}

const obj9Constr = new obj9("sagar", "yadav", 32);
console.log(obj9Constr.fullName());



 



