const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let users = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addUser(newUser);
}

function doubleMoney() {
  users = users.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
}

// sort users by richest
function sortByRichest() {
  users.sort((a, b) => b.money - a.money);
  updateDom();
}

function showMillionaires() {
  users = users.filter(user => user.money > 1000000);
  updateDom();
}

function sumWealth() {
  const wealth = users.reduce((sum, user) => (sum += user.money), 0);

  const wealthEl = document.createElement('div')
  wealthEl.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

// add new obj to data arr
function addUser(newUser) {
  users.push(newUser);
  updateDom();
}

function updateDom(providedData = users) {
  // clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// format num as money
function formatMoney(number) {
  return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', sumWealth)