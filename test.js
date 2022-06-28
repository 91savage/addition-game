const arr1 = [
    [1, 2],
    [2, 3],
];

const arr2 = [
    [3, 4],
    [5, 6],
];

function solution(arr1, arr2) {
    var answer = [];

    for (let i = 0; i < arr1.length; i++) {
        // arr[0]   //arr[1]
        //[1,2][2,3]
        let sum = [];

        for (let j = 0; j < arr1[i].length; j++) {
            //arr[0][0] -> arr[0][1]     //arr[1][0]  arr[1][1]
            //arr1 안의 배열의 길이 (2번)
            sum.push(arr1[i][j] + arr2[i][j]); // 1번째 1+3, 2번째 2+4 / 3번째 2+5 4번째 3+6
        }

        //sum = [7, 9]

        answer.push(sum); // [4,6],[7,9]

        //answer = [[4,6], [7,9]]
    }
    return answer;
}
