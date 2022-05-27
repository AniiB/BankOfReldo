let btns = document.querySelectorAll('button')


btns.forEach(e => e.addEventListener('click', () => {

    btns.forEach(btn => {
        if (btn.classList.contains('active')) {
            btn.classList.remove('active')
        }
    })

    e.classList.add('active')
    getCurrency(e.innerText)
}))

function getCurrency(input) {

    const currencyArr = ['usd', 'jpy', 'nzd', 'eur', 'chf', 'cad', 'gbp', 'aud', 'sek', 'inr', 'cny']

    const country = ['US Dollar', 'Japanese Yen', 'New Zealand Dollar', 'Euro', 'Swiss Franc', 'Canadian Dollar', 'British Pound', 'Australian Dollar', 'Swedish Kronor', 'Indian Rupee', 'Chinese Yuan']

    let userInput = input.toLowerCase()

    let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${userInput}.json`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let filteredCountryList = filterCountry()
            let filteredCurrencyList = filterCurrency()
            let tableRow = document.createElement('tr')

            clearTable()
            addTableHeader(tableRow)
            displayCurrencies(data, filteredCountryList, filteredCurrencyList)

            let list = document.querySelectorAll('tr')
            list.forEach(e => e.addEventListener('click', () => {
                let currency = e.querySelector('td:last-child').textContent.toLowerCase()
                btns.forEach(btn => {
                    if (btn.classList.contains('active')) {
                        btn.classList.remove('active')
                    }
                    if(btn.innerText === currency.toUpperCase()){
                        btn.classList.add('active')
                    }
                })

                getCurrency(currency)
            }))
        })


    function filterCountry() {
        return country.filter((e, i) => i !== currencyArr.indexOf(userInput))
    }

    function filterCurrency() {
        return currencyArr.filter(e => e !== userInput)
    }

    function clearTable() {
        document.querySelector('tbody').innerText = ''
    }

    function addTableHeader(tableRow) {
        for (let i = 0; i < 3; i++) {
            let tableHeader = document.createElement('th')
            if (i === 0) tableHeader.appendChild(document.createTextNode('Country'))
            else if (i === 1) tableHeader.appendChild(document.createTextNode('Value'))
            else if (i === 2) tableHeader.appendChild(document.createTextNode('Code'))
            tableRow.appendChild(tableHeader)
        }
        document.querySelector('tbody').appendChild(tableRow)
    }

    function displayCurrencies(data, countryList, currencyList) {
        let currency = data[userInput]

        for (let keys in currency) {

            if (currencyList.includes(keys)) {

                let countryName = document.createTextNode(countryList[currencyList.indexOf(keys)])
                let currencyValue = document.createTextNode(currency[keys].toFixed(3))
                let currencyAcro = document.createTextNode(keys.toUpperCase())

                let tableRow = document.createElement('tr')

                for (let i = 0; i < 3; i++) {
                    let tableD = document.createElement('td')

                    if (i === 0) tableD.appendChild(countryName)
                    else if (i === 1) tableD.appendChild(currencyValue)
                    else if (i === 2) tableD.appendChild(currencyAcro)
                    tableRow.appendChild(tableD)
                }

                document.querySelector('tbody').appendChild(tableRow)

            }
        }
    }
}