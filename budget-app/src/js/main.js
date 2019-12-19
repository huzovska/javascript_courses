let bill = document.getElementById('start'),
    budget = document.getElementsByClassName('budget-value')[0],
    daybudget = document.getElementsByClassName('daybudget-value')[0],
    level = document.getElementsByClassName('level-value')[0],
    expenses = document.getElementsByClassName('expenses-value')[0],
    optionalExpenses = document.getElementsByClassName('optionalexpenses-value')[0],
    income = document.getElementsByClassName('income-value')[0],
    monthSavings = document.getElementsByClassName('monthsavings-value')[0],
    yearSavings = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    btnExpenses = document.getElementsByTagName('button')[0],
    btnOptional = document.getElementsByTagName('button')[1],
    btnCount = document.getElementsByTagName('button')[2],
    optionalExpenses1 = document.querySelectorAll('.optionalexpenses-item'),
    maybe = document.querySelector('.choose-income'),
    checkbox = document.querySelector('#savings'),
    sum = document.querySelector('#sum'),
    percent = document.querySelector('#percent'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value');


// console.log(bill);
// console.log(budget);
// console.log(level);
// console.log(expenses);
// console.log(optionalExpenses);
// console.log(income);
// console.log(monthSavings);
// console.log(yearSavings);
// console.log(expensesItem);
// console.log(btnExpenses);
// console.log(btnOptional);
// console.log(btnCount);
// console.log(optionalExpenses1);
// console.log(maybe);
// console.log(checkbox);
// console.log(sum);
// console.log(percent);
// console.log(year);
// console.log(month);
// console.log(day);

let money, time;

function start() {
  money = +prompt("Ваш бюджет на месяц?", "");
  time = prompt("Введите дату в формате YYYY-MM-DD", "");

  while(isNaN(money) || money == "" ||money == null) {
    money = +prompt("Ваш бюджет на месяц?", "");
  }

}

start();


let appData = {
  budget: money,
  timeData : time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: true,
  chooseExpenses: function(){
    for (let i=0; i< 2; i++) {
      let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
          b = prompt("Во сколько обойдется?", "");
          if ((typeof(a)) === 'string' && (typeof(a) != null) && (typeof(b)) != null 
          && a!= '' && b!= '' && a.length < 50){
            appData.expenses[a] = b;
            console.log("done");
          } else {
            i=i - 1;
          }
        }
  },
  detectDayBudget: function () {
    appData.moneyPerDay = (appData.budget/30).toFixed();
    alert("ежедневный бюджет: " + appData.moneyPerDay);
  },
  detectLevel: function () {
    if(appData.moneyPerDay <100) {
      console.log("Минимальный уровень достатка");
    } else if (appData.moneyPerDay >100 && appData.moneyPerDay <2000) {
      console.log("Средний уровень достатка");
    } else if (appData.moneyPerDay >2000) {
      console.log("Высокий уровень достатка");
    } else {
      console.log("произошла ошибка");
    }
  },
  checkSaving: function () {
    if (appData.savings == true){
      let save = +prompt("Какова сумма накоплений?"),
          percent = +prompt("Под какой процент?");
      appData.monthIncome = save/100/12*percent;
      alert ("Доход в месяц с вашего депозита: " + appData.monthIncome);
    }
  },
  chooseOptExpenses: function () {
    let n = 1;
    while (n<4) {
      let c = prompt("Статья необязательных расходов?", "");
      appData.optionalExpenses[n] = c;
      n++;      
        }
      },
  chooseIncome: function (){
    let items = prompt('Что принесет дополнительный доход? (перечислить через запятую)', '');
    if ((typeof(items)) != 'string' || (typeof(items)) == null || items == '') {
      console.log("Некорректные данные");
    } else {
    appData.income = items.split(', ');
    appData.income.push(prompt('Что-то еще?'));
    appData.income.sort();
    appData.income.forEach(function(massive, i){
      alert("Способы доп. заработка: " + (i+1) + " - " + massive);
      });
    }
  }
};

for (let key in appData) {
  console.log("Наша программа включает в себя данные:" + key + "-" + appData[key]);
}