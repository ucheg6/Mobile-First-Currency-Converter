
let CurrencyFrom = document.getElementById('inputState');
let CurrencyTo = document.getElementById('inputStates');
let amountInput = document.getElementById('amount');




const url = 'https://free.currencyconverterapi.com/api/v5/currencies';



fetch(url)
    .then(response => {
        if (response.status !== 200) {
            console.warn('Ooops!! There was a problem. Status code: ' + response.status);
            return
        }

        response.json().then(results => {
            for (const result in results) {
                for (const id in results[result]) {
                    const option = document.createElement('option');
                    option.value = results[result][id].id;

                    option.appendChild(document.createTextNode(`${results[result][id].currencyName} ${results[result][id].id}`));

                    CurrencyFrom.appendChild(option);
                    CurrencyTo.appendChild(option.cloneNode(true));



                }
            }
            console.log(results)
        });

    })
    .catch(err => console.error('Fetch error', err));


document.getElementById('convert').addEventListener('click', getConversion);




function getConversion(amount, from, to, cb) {
    from = CurrencyFrom.value.split('').splice(0, 3).join('');
    to = CurrencyTo.value.split('').splice(0, 3).join('');
    amount = amountInput.value;
    let query = `${from}_${to}`;
    console.log({ query })
    fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`)
        .then(response =>
            response.json()
        )
        .then(function (data) {
            console.log(data)
            let rate = data[query];
            console.log(data[query]);

            document.getElementById('result').value = Math.round(parseFloat(amount) * rate)
        })

}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js', { scope: './' })
        .then(function (registration) {
            console.log('service worker registered', registration)
        })
        .catch(function (err) {
            'service worker failed to register!!!.', err
        })
}



