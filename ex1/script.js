const arr1 = [2, 8, 10, 1, 4, 4];
// function findMax(arr1) {
//     let ans = arr1[0];
//     for (let i=0; i<arr1.length; i++) {
//         if (arr1[i] > ans) {
//             ans = arr1[i];
//         }
//     }
//     return ans;
// }
// console.log(findMax(arr1));

//  ---------------------------------------------------------------
// let max = arr1[0];
// arr1.forEach((x) => {
//   if (x > max) {
//     max = x;
//   }
// });
// console.log(max)

// --------------------------------------------------------------
// function findDuplicate(arr1) {
//   for (let i = 0; i < arr1.length; i++) {
//     for (let j = i + 1; j < arr1.length; j++) {
//       if (arr1[i] === arr1[j]) {
//         return arr1[i];
//       }
//     }
//   }
//   return null;
// }
// console.log(findDuplicate(arr1))

// how many characters appears in a string --------------------------------------

// function countCharacters (str) {
//     let charCount = {};

//     for (let i = 0; i < str.length; i++) {
//         let count = 0;
//         for (let j = 0; j < str.length; j++) {
//             if (str[i] == str[j]) {
//                 count++;
//             }
//         }
//         charCount[str[i]] = count;
//     }
//     return charCount;
// }
let str = "sagar";
// console.log(countCharacters(str))

function countCharacters(str) {
    return str.split("").reduce((acc, char) =>{
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {})
}
console.log(countCharacters(str))