// closures--------
// a closure is the combination of function that bundled together with reference to its surrounding state(the lexical environment you can call)
// js variables belongs to local scope and global scope
// using closures we can create global variables to make private

function myFunction () {
    let a = 4; // a is a local variable
    return a * a;
}
let fn = myFunction();
console.log(fn)
// ------------------------------------------------------------
let counter = 0;
function add () {
    counter += 1;
}

add();
console.log(counter); // 1
add();
console.log(counter); // 2
add();
console.log(counter); // 3

// ----------------------------------------------------------