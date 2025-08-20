/*

1. Let say you have given a number N and then you have to create a long string after
converting number from 1-N to binary. Given start and end index give the substring from it.


function getBinary(n: number) {
    let rem, res = [];
    while (n) {
        rem = n % 2;
        n = Math.floor(n / 2);
        res.push(rem);
    }
    
    return res.reverse().join("");
}

function result(n: number, start, end) {
    let bin = ""
    for (let i = 1; i <= n; i++) {
        let temp = getBinary(i);
        console.log(temp);
        bin += temp;
    }
    
    return bin.slice(start, end);
}


const r = result(5, 3, 8)
console.log(r);

*/
