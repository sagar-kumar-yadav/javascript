// Remove duplicates from array. ----------------------------
let arr = [1, 2, 2, 3, 4, 4, 5];
let ans = [];
// bruteforce
for (let i=0; i<arr.length; i++) {
    let isDuplicate = false;
    for (let j=i+1; j<arr.length; j++) {
        if (arr[i] === arr[j]) {
            isDuplicate = true;
            break
        }
    }
    if (isDuplicate) {
        ans.push(arr[i]);
    }
}
console.log(ans);

// using reduce
// reduce take previous value, current value, current index, array
let unique = arr.reduce((acc, curr)=>{
    if (!acc.includes(curr)) {
        acc.push(curr)
    }
    return acc
}, [])

console.log(unique); // [ 1, 2, 3, 4, 5 ]