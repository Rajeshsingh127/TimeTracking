const timeFrames = document.querySelectorAll("input[type='radio'].duration-time");
const cards = document.querySelectorAll(".card");
console.log(cards)
let currTime = 'weekly';

async function initialize(){
    let resp = await fetch('./data.json');
    let data = await resp.json();
    [...timeFrames].find(el => el.value == currTime).checked = true;
    updateData(data);
    handleTimeFrames(data);

}
initialize().catch(console.log);


// function to handle time frames

function handleTimeFrames(data){
    timeFrames.forEach(timeframe =>
        {
            timeframe.addEventListener('click', (el) => {
                currTime = el.target.value;
                updateData(data);
            })
        })
}


const helper = { 
    daily: 'Yesterday',
    weekly: 'Last Week',
    monthly: 'Last Month'
}

// update function that update values according to timeframe changes


// 
function displayHr(value){return value <= 1 ? value+'hr' : value+"hrs";}

function updateData(data){

    cards.forEach((card,idx) => {
        let elmData = data[idx];
        
        const {current, previous } = elmData.timeframes[currTime];
        const currDisp = card.querySelector('.card-body .stats');
        const prevDisp = card.querySelector('.card-body .stats-prev');

        currDisp.textContent = `${displayHr(current)}`;
        prevDisp.textContent = `${helper[currTime]} - ${displayHr(current)}`
    })
}