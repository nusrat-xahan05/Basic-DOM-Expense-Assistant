
// ------ GET INPUT FIELD VALUE FUNCTION
function inputFieldValue(idName) {
    return parseFloat(document.getElementById(idName).value);
}


// ------ INPUT FIELD VALIDATION FUNCTION
function inputValidation(fieldValue, idName) {
    if ((idName === 'income-error' && (fieldValue <= 0 || isNaN(fieldValue))) || ((fieldValue < 0 || isNaN(fieldValue)))) {
        document.getElementById(idName).classList.remove('hidden');
        return;
    }
}


// ------ LIVE INPUT VALIDATION FOR INCOME FIELD
document.getElementById('income').addEventListener('input', function () {
    const totalIncome = parseFloat(document.getElementById('income').value);
    if (totalIncome <= 0 || isNaN(totalIncome)){
        document.getElementById('income-error').classList.remove('hidden');
        return;
    }
})


// ---------------- CALCULATE EXPENSES
document.getElementById('calculate').addEventListener('click', function () {
    // ------ GET INPUT FIELDS VALUE
    const totalIncome = inputFieldValue('income');
    const softwareExpense = inputFieldValue('software');
    const coursesExpense = inputFieldValue('courses');
    const internetExpense = inputFieldValue('internet');


    // ------ INPUT FIELDS VALIDATION
    inputValidation(softwareExpense, 'software-error');
    inputValidation(coursesExpense, 'courses-error');
    inputValidation(internetExpense, 'internet-error');


    const totalExpenses = softwareExpense + coursesExpense + internetExpense;
    if (totalExpenses > totalIncome) {
        document.getElementById('logic-error').classList.remove('hidden');
        return;
    }
    const balanceAfterExpenses = totalIncome - totalExpenses;

    // console.table({totalExpenses, balanceAfterExpenses});


    // ------ SET CALCULATED VALUES
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('total-expenses').innerText = totalExpenses.toFixed(2);
    document.getElementById('balance').innerText = balanceAfterExpenses.toFixed(2);


    // ------ SET HISTORY LIST
    const historyItem = document.createElement('div');
    historyItem.classList.add('bg-white');
    historyItem.innerHTML = `
        <p class='text-xs text-gray-500'>${new Date().toLocaleDateString()}</p>
        <p class='text-xs text-gray-500'>Income: $${totalIncome.toFixed(2)}</p>
        <p class='text-xs text-gray-500'>Expenses: $${totalExpenses.toFixed(2)}</p>
        <p class='text-xs text-gray-500'>Balance: $${balanceAfterExpenses.toFixed(2)}</p>
    `
    document.getElementById('history-list').appendChild(historyItem);
})


// ---------------- CALCULATE SAVINGS
document.getElementById('calculate-savings').addEventListener('click', function () {
    // ------ GET INPUT FIELDS VALUE
    const savingsPercentage = inputFieldValue('savings')
    const totalIncome = inputFieldValue('income');
    const softwareExpense = inputFieldValue('software');
    const coursesExpense = inputFieldValue('courses');
    const internetExpense = inputFieldValue('internet');


    const totalExpenses = softwareExpense + coursesExpense + internetExpense;
    if (totalExpenses > totalIncome) {
        document.getElementById('logic-error').classList.remove('hidden');
        return;
    }
    const balanceAfterExpenses = totalIncome - totalExpenses;

    const savingsAmount = (savingsPercentage * balanceAfterExpenses) / 100;
    if (savingsAmount > balanceAfterExpenses) {
        document.getElementById('logic-error').classList.remove('hidden');
        return;
    }
    const balanceAfterSavings = balanceAfterExpenses - savingsAmount;

    // ------ SET CALCULATED VALUES
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('savings-amount').innerText = savingsAmount.toFixed(2);
    document.getElementById('remaining-balance').innerText = balanceAfterSavings.toFixed(2);

})


// ---------------- DISPLAY HISTORY
document.getElementById('history-tab').addEventListener('click', function () {
    document.getElementById('history-tab').classList.add('text-white', 'bg-gradient-to-r', 'from-blue-500', 'to-purple-600');
    document.getElementById('assistant-tab').classList.remove('text-white', 'bg-gradient-to-r', 'from-blue-500', 'to-purple-600');
    document.getElementById('assistant-tab').classList.add('text-gray-600');
    document.getElementById('expense-form').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');

    document.getElementById('history-section').classList.remove('hidden');
})


// ---------------- DISPLAY ASSISTANT TAB
document.getElementById('assistant-tab').addEventListener('click', function () {
    document.getElementById('assistant-tab').classList.add('text-white', 'bg-gradient-to-r', 'from-blue-500', 'to-purple-600');
    document.getElementById('history-tab').classList.remove('text-white', 'bg-gradient-to-r', 'from-blue-500', 'to-purple-600');
    document.getElementById('expense-form').classList.remove('hidden');
    document.getElementById('history-section').classList.add('hidden');
})
