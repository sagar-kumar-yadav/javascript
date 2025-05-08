
function fn1(){
    setTimeout((resolve, reject)=>{
        console.log("first")
        resolve("success");
    }, 1000)
}
fn1();