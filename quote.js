const display_quote = document.querySelector('.display_quote');
const gBtn = document.querySelector('.gBtn');
const author = document.querySelector('.author');
const quote = document.querySelector('.quote');

const randInt = (min, max) =>{
    return (Math.floor(Math.random() * (max-min))+ min)
};

const quoteGen = (callback) =>{
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () =>{
        if(request.readyState === 4 && request.status === 200){
            const data = JSON.parse(request.responseText);
            // console.log(data);
            callback(undefined, data);
        }else if (request.readyState === 4){
            // console.log('Cannot fetch the datas');
            callback('Cannot fetch the datas', undefined);
        }
    });
    request.open('GET', 'https://type.fit/api/quotes');
    // request.open('GET', 'quote.json');
    request.send();
};

gBtn.addEventListener('click', e =>{
    quoteGen((err, data) =>{
        if(err){
            console.log('Cannot fetch the data');
        }else{
            const newInt = randInt(0, data.length);
            var prevInt = -1;
            if(newInt != prevInt){
                quote.textContent = `" ${data[newInt].text} "`;
                author.textContent = `- ${data[newInt].author}`;
                prevInt = newInt;
                console.log('same value', newInt, prevInt);
            }else{
                console.log('same value', newInt, prevInt);
            }
        }
    });
});