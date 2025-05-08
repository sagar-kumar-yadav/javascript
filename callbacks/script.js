// a callback is a function passed as an argument to another function
// this technique allow a function to call another function 
// a callback function can run after another function has finished


// a callback is a higher order function
function a (b) {    // this is called higher order function
    b();
}

function sayHi() {
    console.log("first")
}
a(sayHi)  // you pass a function inside arguments like this

a(function(){   // or you can pass a function like this, this is called callback function
    console.log("second");
})

// ex2
function sum (a, b) {
    console.log(a + b)
}
function calc(a, b, sumCallback){
    sumCallback(a, b)
}
calc(7, 3, sum);


//-----------------------------
// setTimeout, setInterval is a callback function


// ----------------------------------------------------------------------------------------------------------
// synchronous means code runs line by line, when first code id finish then its goes to the second code and then so on.
// async js function running in a parallel with other functions are called asynchronous function
// ex api call, weather api
// setTimeout(callback function(), timestamp) - setTimeout is a callback function
setTimeout(()=>{
    console.log("hi cb");
}, 1000)

// callback hell
// sometimes in code, we have nested callbacks, this style of programming difficult to understand and manage
// function getData(dataId, getNextData) {
//     setTimeout(()=>{
//         console.log("data "  + dataId);
//         if (getNextData){
//             getNextData()
//         }
//     }, 2000)
// }
// getData(1, ()=>{
//     getData(2, ()=>{
//         getData(3, ()=>{
//             getData(4)
//         })
//     })
// })

// promises solve the callback hell problems
// promises is solution of callback hell
// promise have three state pending state, fulfilled state, rejected state
// promise have .then() and .catch()
// using .then we can do promise chaining
let promise = new Promise(function(resolve, reject){  // resolve and reject are callback function
    console.log("promiss") 
    // resolve("success");
    // reject("some erroe")
})

// Async await
// async function return a promise 
// await pauses the execution, until the promise is settled

