const display_quote = document.querySelector('.display_quote');
const gBtn = document.querySelector('.gBtn');
const author = document.querySelector('.author');
const quote = document.querySelector('.quote');

//generate random interger between numbers
const randInt = (min, max) => {
    return (Math.floor(Math.random() * (max - min)) + min)
};

//request data from api (promise used)
const quoteGen = (resource) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                const data = JSON.parse(request.responseText);
                // callback(undefined, data);
                resolve(data);
            } else if (request.readyState === 4) {
                // callback('Cannot fetch the datas', undefined);
                reject('Cannot fetch the resources');
            }
        });
        request.open('GET', resource);
        // request.open('GET', 'quote.json');
        request.send();
    });
};

gBtn.addEventListener('click', () => {
    quoteGen('https://type.fit/api/quotes').then((data) => {
        const newInt = randInt(0, data.length);
        var prevInt = -1;
        if (newInt != prevInt) {
            quote.textContent = `" ${data[newInt].text} "`;
            author.textContent = `- ${data[newInt].author}`;
            // prevInt = newInt;
            // console.log('same value', newInt, prevInt);
        } else {
            console.log('same value', newInt, prevInt);
        }
    }).catch((err) =>{
        console.log('promise rejected: ', err);
    });
});
