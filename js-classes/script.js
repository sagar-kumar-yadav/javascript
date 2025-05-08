// in es6 js introduce classes
// js classes are templates to js object
// js class in not an object
// when you have class you can use to create objects using class
class Ex1 {  
    constructor (name , year) {
        console.log("first");
        this.name = name;
        this.year = year;
    }
}

const myCar1 = new Ex1("audi", "2022");
const myCar2 = new Ex1("bmw", "2025");
console.log(myCar1) //Ex1 {name: 'audi', year: '2022'}
console.log(typeof myCar1) // object

console.log(myCar2.name) // bmw


class Ex2 {
    constructor(name, year){
        console.log("second");
        this.name = name;
        this.year = year;
    }
    age(){
        const date = new Date();
        return date.getFullYear() - this.year;
    }
}

const myCar3 = new Ex2("ford", 2014);
console.log(myCar3.age()); // 11


class Ex3 {
    constructor(name, year) {
        console.log("third");
        this.name = name;
        this.year = year;
    }
    age(x) {
        return x - this.year;
    }
}

const myCar4 = new Ex3("sujuki", 2015);
const date = new Date();
console.log(myCar4.age(date.getFullYear()))

// inheritance ---------------------------------------------------------
// its useful for code reusability
// reuse properties and method of existing class
class Ex4 {
    constructor(name) {
        this.carName = name;
    }
    present(){
        return "I have a " + this.carName;
    }
}

class Model extends Ex4 {
    constructor(brand, mod) {
        super(brand); // The super() method refers to the parent class.
        this.model = mod;
    }
    show() {
        return this.present() + ' it s a '+ this.model;
    }
}

let myCar5 = new Model("ford", "mustang");
console.log(myCar5.show())

// classes allows to use getter and setter methods
// set method you have to add at least one parameters
// classes are not hoisted in js, you have to first initialize class and then use it
class Ex5 {
    constructor(brand) {
        this.carBrand = brand;
    }
    get cName(){
        return this.carBrand;
    }
    set cName(x) {
        this.carBrand = x;
    }
}

const myCar6 = new Ex5("Ford");
console.log(myCar6.cName) // Ford

