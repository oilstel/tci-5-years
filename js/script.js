

// Time Capsule

const d = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const on_this_day_el = document.querySelector('#on-this-day');
const time_capsule_el = document.querySelector('#time-capsule-piece');

let current_date = monthNames[d.getMonth()] + ' ' + String(d.getDate()).padStart(2, '0');
let current_year = d.getFullYear();

console.log(current_date + current_year);

fetch('/data/interviews.json')
.then(response => response.json())
.then(data => {
    console.log(data);

    let query_by_date = data.filter(data => data.date.includes(current_date));
    let past_years = query_by_date.filter(data => !data.date.includes(current_year));

    console.log(past_years);

    var interview = past_years[Math.floor(Math.random()*past_years.length)];

    console.log(interview);
    let this_day_last_calc = current_year - (interview.date.split(", ").pop());
    console.log(this_day_last_calc);
    let this_day_last = this_day_last_calc == '1' ? 'last year' : this_day_last_calc + ' years ago';
    on_this_day_el.innerText = `On this day ${this_day_last} we published:`
    time_capsule_el.innerText = interview.title;
    time_capsule_el.href = interview.permalink;
});


// Some Things

const some_things_el = document.querySelector('#some-things');
const years = document.querySelectorAll('.year-button');
const year_items = document.querySelectorAll('.year-items');

for (year of years) {
    year.addEventListener('click', e => {

        for (year of years) {
            year.classList.remove('active');
        }

        for (item of year_items) {
            console.log(e.target.innerText + item.id)
            if (item.id == e.target.innerText) {
                item.style.display = 'flex';
                e.target.classList.add('active');
            } else {
                item.style.display = 'none';
            }
        }

    });
}

// Voicemails

function playVoicemail(e) {
    console.log(e.dataset.file);

    e.classList.add('playing');

    let voicemail = e.getElementsByTagName('audio')[0];

    console.log(voicemail);

    if (voicemail.duration > 0 && !voicemail.paused) {

        //Its playing...do your job
        voicemail.pause();
    
    } else {
    
        voicemail.play();
        //Not playing...maybe paused, stopped or never played.
    
    }
    

    // if (e.classList.includes('playing')) {
    //     e.classList.remove('playing');

    //     voicemail.play();
    // } else {
    //     e.classList.add('playing');

    //     voicemail.play();
    // }
}

function progressBar(e) {
    console.log();
    let length = e.duration
    let current_time = e.currentTime;
    let percent = Math.ceil((current_time / length) * 100);

    // console.log(e.parentNode.);

    console.log(e.parentNode.style);

    e.parentNode.style.background = `linear-gradient(90deg, rgba(0,0,0,0.08865544508819156) ${percent}%, rgba(255,255,255,0) ${percent}%)`;

    // background: linear-gradient(270deg, rgba(0,9,255,0) 60%, rgba(0,9,255,1) 60%);

    console.log(percent);
}

// Scroll Some Things

function slide(direction){
    var container = document.getElementById('items');
    scrollCompleted = 0;
    var slideVar = setInterval(function(){
        if(direction == 'left'){
            container.scrollLeft -= 100;
        } else {
            container.scrollLeft += 100;
        }
        scrollCompleted += 10;
        if(scrollCompleted >= 100){
            window.clearInterval(slideVar);
        }
    }, 50);
}
