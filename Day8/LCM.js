// 计算两个数的最大公约数
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// 计算数组中所有数字的最小公倍数
function lcmOfArray(arr) {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = (result * arr[i]) / gcd(result, arr[i]);
  }
  return result;
}

// 示例用法
function start() {
  const numbers = [15871, 19637, 12643, 14257, 21251, 19099];
  const result = lcmOfArray(numbers);
  console.log(`数组 ${numbers} 的最小公倍数是: ${result}`);
}

start()