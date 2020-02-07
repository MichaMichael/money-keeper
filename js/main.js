let money,
	time,
	items,
	startBtn = document.querySelector('#start'),
	budgetValue = document.querySelector('.budget-value'),
	daybudgetValue = document.querySelector('.daybudget-value'),
	valueLevel = document.querySelector('.level-value'),
	expensesValue = document.querySelector('.expenses-value'),
	optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
	incomeValue = document.querySelector('.income-value'),
	monthSavingsValue = document.querySelector('.monthsavings-value'),

	yearSavingsValue = document.querySelector('.yearsavings-value'),
	expensesItems = document.querySelectorAll('.expenses-item'),
	optionalExpensesItems = document.querySelectorAll('.optionalexpenses-item'),
	expensesItemBtn = document.querySelector('.expenses-item-btn'),
	optionalExpensesBtn = document.querySelector('.optionalexpenses-btn'),
	countBudgetBtn = document.querySelector('.count-budget-btn'),
	chooseIncome = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	chooseSum = document.querySelector('.choose-sum'),
	choosePercent = document.querySelector('.choose-percent'),
	year = document.querySelector('.year-value'),
	month = document.querySelector('.month-value'),
	day = document.querySelector('.day-value');


startBtn.addEventListener('click', function(e) {
	expensesItemBtn.disabled = false;
	optionalExpensesBtn.disabled = false;
	countBudgetBtn.disabled = false;

	while (typeof(time) != 'string' || time == null || time == '') {
		time = prompt("Enter the date in the format YYYY-MM-DD", '');
	}
	while (isNaN(money) || money == '' || money == null) {
		money = +prompt("What is your monthly budget?", '');
	}
	appData.budjet = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();
	year.value = new Date(Date.parse(time)).getFullYear();
	month.value = new Date(Date.parse(time)).getMonth() + 1;
	day.value = new Date(Date.parse(time)).getDate() + 1;
});

expensesItemBtn.addEventListener('click', function() {
	let sumExpenses = 0;

	for (let i = 0; i < expensesItems.length; i++) {
		let a = expensesItems[i].value,
			b = expensesItems[++i].value;

		if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null &&
			a != '' && b != '' && a.length < 50) {
			console.log('done');
			appData.expenses[a] = b;
			sumExpenses += +b;
		} else {
			i--
		}
	}
	expensesValue.textContent = sumExpenses;
	appData.sumExpenses = sumExpenses;
});

optionalExpensesBtn.addEventListener('click', function() {
	for (i = 0; i < optionalExpensesItems.length; i++) {
		let opt = optionalExpensesItems[i].value;
		appData.optionalExpenses[i] = opt;
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}
});

countBudgetBtn.addEventListener('click', function() {
	if(appData.budjet != undefined) {
		appData.moneyPerDay = ((appData.budjet - appData.sumExpenses)/30).toFixed();
		daybudgetValue.textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 100) {
			valueLevel.textContent = "Lower income";
		} else if (100 < appData.moneyPerDay && appData.moneyPerDay < 2000) {
			valueLevel.textContent = "Middle income";
		} else if (appData.moneyPerDay > 2000) {
			valueLevel.textContent = "Upper class";
		} else {
			valueLevel.textContent = "Input error";
		}
	} else {
		alert("Please click on 'Start calculation'");
	}
});

chooseIncome.addEventListener('input', function() {
	let items = chooseIncome.value;
	appData.income = items.split(',');
	incomeValue.textContent = appData.income
});

checkSavings.addEventListener('click', function() {
	if (appData.savings == false){
		appData.savings = true;
	} else {
		appData.savings = false;
	}
});

chooseSum.addEventListener('input', function(){
	if (appData.savings === true){
		let sum = +chooseSum.value,
			percent = +choosePercent.value;

		appData.monthIncome = (sum * (percent / 100) / 12).toFixed(1);
		appData.yearIncome = (sum * (percent / 100)).toFixed(1);

		monthSavingsValue.textContent = appData.monthIncome;
		yearSavingsValue.textContent = appData.yearIncome;
	}
});

choosePercent.addEventListener('input', function(){
	if (appData.savings === true){
		let sum = +chooseSum.value,
			percent = +choosePercent.value;

		appData.monthIncome = (sum * (percent / 100) / 12).toFixed(1);
		appData.yearIncome = (sum * (percent / 100)).toFixed(1);

		monthSavingsValue.textContent = appData.monthIncome;
		yearSavingsValue.textContent = appData.yearIncome;
	}
});

let appData = {
	budjet: money,
	expenses: {},
	optionalExpenses: {},
	income: [],
	timeData: time,
	savings: false
};
