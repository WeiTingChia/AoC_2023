const names = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]
const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

//give me a array of 1 to 30
const days = Array.from({ length: 30 }, (_, i) => i + 1)

const gender = [1, 2]

async function vote() {
  const nowTime = new Date().getTime()
  let i = 0
  while (i < 200) {
    const { randomName, randomYear, randomMonth, randomDay, randomGender } = CreateRandomData()
    const res = await postVote(randomName, randomYear, randomMonth, randomDay, randomGender)
    console.log(res)
    i++
  }
  console.log('Total time:', (new Date().getTime() - nowTime) / 1000, 'seconds')
}

function CreateRandomData() {
  const randomName = generateRandomName();
  const randomYear = Math.floor(Math.random() * 40 + 1966);
  const randomMonth = month[Math.floor(Math.random() * month.length)].toString();
  const randomDay = days[Math.floor(Math.random() * days.length)].toString();
  const randomGender = gender[Math.floor(Math.random() * gender.length)];
  console.log(randomName, randomYear, randomMonth, randomDay, randomGender)
  return {
    randomName,
    randomYear,
    randomMonth,
    randomDay,
    randomGender
  }
}
function generateRandomName() {
  function getRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return letters[Math.floor(Math.random() * letters.length)];
  }

  function getRandomName(length) {
    let name = "";
    for (let i = 0; i < length; i++) {
      name += getRandomLetter();
    }
    return name;
  }

  const nameLength = Math.floor(Math.random() * (16 - 4 + 1)) + 4; // Random length between 4 and 16
  let randomName = getRandomName(nameLength);

  // Ensure the first letter is uppercase and the rest are lowercase
  randomName = randomName.charAt(0).toUpperCase() + randomName.slice(1).toLowerCase();

  return randomName;
}
function postVote(name, year, month, day, gender) {
  return fetch('https://cjenm.api.we-ar.kr/program/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickName: name, month: month, day: day, year: year, gender: gender, programId: "2" }),
  }).then((res) => res.json())
}
vote()