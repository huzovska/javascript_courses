let bill = document.getElementById('start'),
		budget = document.getElementsByClassName('budget-value')[0],
		dayBudget = document.getElementsByClassName('daybudget-value')[0],
		level = document.getElementsByClassName('level-value')[0],
		expenses = document.getElementsByClassName('expenses-value')[0],
		optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
		incomeValue = document.getElementsByClassName('income-value')[0],
		monthSavings = document.getElementsByClassName('monthsavings-value')[0],
		yearSavings = document.getElementsByClassName('yearsavings-value')[0],

		expensesItem = document.getElementsByClassName('expenses-item'),
		btnExpenses = document.getElementsByTagName('button')[0],
		btnOptional = document.getElementsByTagName('button')[1],
		btnCount = document.getElementsByTagName('button')[2],
		optionalExpenses1 = document.querySelectorAll('.optionalexpenses-item'),
		maybe = document.querySelector('.choose-income'),
		checkbox = document.querySelector('#savings'),
		sumValue = document.querySelector('#sum'),
		percentValue = document.querySelector('#percent'),
		year = document.querySelector('.year-value'),
		month = document.querySelector('.month-value'),
		day = document.querySelector('.day-value');

let money, time;

console.log(btnExpenses);

btnExpenses.setAttribute('disabled', 'disabled');
btnOptional.setAttribute('disabled', 'disabled');
btnCount.setAttribute('disabled', 'disabled');

bill.addEventListener('click', function(){	
	btnExpenses.removeAttribute('disabled');
	btnOptional.removeAttribute('disabled');
	btnCount.removeAttribute('disabled');
	time = prompt("Введите дату в формате YYYY-MM-DD", "");
	money = +prompt("Ваш бюджет на месяц?", "");

	while(isNaN(money) || money == "" ||money == null) {
		money = +prompt("Ваш бюджет на месяц?", "");
	}
	appData.budget = money;
	appData.timeData = time;
	budget.textContent = money.toFixed();
	year.value = new Date(Date.parse(time)).getFullYear();
	month.value = new Date(Date.parse(time)).getMonth() + 1;
	day.value = new Date(Date.parse(time)).getDate();

});

btnExpenses.addEventListener('click', function(){
	let sum = 0;

	for (let i=0; i< expensesItem.length; i++) {
		let a = expensesItem[i].value,
				b = expensesItem[++i].value;

		if ((typeof(a)) === 'string' && (typeof(a) != null) && (typeof(b)) != null 
				&& a!= '' && b!= '' && a.length < 50){
				appData.expenses[a] = b;
				console.log("done");
				sum += +b;
		} else {
					i=i - 1;
				}
			}
	expenses.textContent = sum;
});



btnOptional.addEventListener('click', function(){

	for(let i = 0; i<optionalExpenses1.length; i++) {
		let opt = optionalExpenses1[i].value;
		appData.optionalExpenses[i] = opt;
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
		
	}
});

btnCount.addEventListener('click', function(){
	
	if (appData.budget != undefined && appData.expenses != undefined){

		appData.moneyPerDay = ((appData.budget- expenses.textContent)/30).toFixed();
				dayBudget.textContent = appData.moneyPerDay;
	
		if(appData.moneyPerDay <100) {
			level.textContent = "Минимальный уровень достатка";
		} else if (appData.moneyPerDay >100 && appData.moneyPerDay <2000) {
			level.textContent = "Средний уровень достатка";
		} else if (appData.moneyPerDay >2000) {
			level.textContent = "Высокий уровень достатка";
		} else {
			level.textContent = "произошла ошибка";
		}
	} else{
		dayBudget.textContent = "Произошла ошибка";
	}
});

maybe.addEventListener('input', function() {
	let items = maybe.value;
		// if ((typeof(items)) != 'string' || (typeof(items)) == null || items == '') {
		// 	console.log("Некорректные данные");
		// } else {
		appData.income = items.split(', ');
		incomeValue.textContent = appData.income;
});


checkbox.addEventListener('click', function(){
	if(appData.savings == true){
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

sumValue.addEventListener('input', function(){
	if(appData.savings == true){
		let sum = +sumValue.value,
				percent = +percentValue.value;
		
		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		monthSavings.textContent = appData.monthIncome.toFixed(1);
		yearSavings.textContent = appData.yearIncome.toFixed(1);
	}
});

percentValue.addEventListener('input', function(){
	if(appData.savings == true){
		let sum = +sumValue.value,
				percent = +percentValue.value;
		
		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		monthSavings.textContent = appData.monthIncome.toFixed(1);
		yearSavings.textContent = appData.yearIncome.toFixed(1);
	}
});

let appData = {
	budget: money,
	timeData : time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false};