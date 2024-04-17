document.addEventListener('DOMContentLoaded', function () {
    const exchangeButton = document.querySelector(".btn");
    const dropList = document.querySelector(".drop-list");
    const fromSelect = document.querySelector(".from select");
    const toSelect = document.querySelector(".to select");
    const amountInput = document.querySelector(".amount input");

    const addClass = function(element, className) {
        element.classList.add(className);
    };

    const convertCurrency = function(amount, fromCurrency, toCurrency) {
        const fixedRates = {
            'USD': { 'EUR': 0.85, 'GBP': 0.72, 'JPY': 108.73 },
            'EUR': { 'USD': 1.18, 'GBP': 0.85, 'JPY': 129.02 },
            'GBP': { 'USD': 1.39, 'EUR': 1.18, 'JPY': 152.04 },
            'JPY': { 'USD': 0.0092, 'EUR': 0.0078, 'GBP': 0.0066 }
        };

        if (fromCurrency === toCurrency) {
            return amount;
        }

        if (fixedRates[fromCurrency] && fixedRates[fromCurrency][toCurrency]) {
            return amount * fixedRates[fromCurrency][toCurrency];
        }

        return null;
    };

    exchangeButton.addEventListener("click", (event) => {
        event.preventDefault();
        addClass(dropList, "down");

        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromSelect.value;
        const toCurrency = toSelect.value;

        const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);

        if (convertedAmount !== null) {
            // Выводим результат на страницу
            const resultElement = document.querySelector(".result");
            resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        } else {
            console.log('Ошибка: Курс валюты не найден');
        }
    });

    // Функция для создания опций
    const createOption = function(value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        return option;
    };

    // Заполнение списка "From" и "To" опциями
    for (let currencyCode in country_list) {
        fromSelect.appendChild(createOption(currencyCode, currencyCode));
        toSelect.appendChild(createOption(currencyCode, currencyCode));
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const amountInput = document.querySelector(".amount input");
    const buttons = document.querySelectorAll(".num-btn, .clear-btn");

    // Добавление обработчика события для каждой кнопки
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.textContent;

            if (value === 'X') {
                amountInput.value = ''; // Очистить поле ввода, если нажата кнопка "X"
            } else {
                amountInput.value += value; // Добавить значение кнопки к текущему значению в поле ввода
            }
        });
    });

    // Функция для создания опций
    const createOption = function(value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        return option;
    };

    // Заполнение списка "From" и "To" опциями
    for (let currencyCode in country_list) {
        fromSelect.appendChild(createOption(currencyCode, currencyCode));
        toSelect.appendChild(createOption(currencyCode, currencyCode));
    }
});