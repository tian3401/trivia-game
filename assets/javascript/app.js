//Variables====================================================================
var quesBank= [
    {
        question: 'What is John Snow\'s real name',
        choices: ['Aegon Targaryen','John Stark','Rhaegar Targaryen','Robb Stark'],
        answer: 'Aegon Targaryen'
    },
    {
        question: 'What is the surname given to bastards born in Dorne?',
        choices: ['Rivers','Sand','Waters','Stone'],
        answer: 'Sand'
    },
    {
        question: 'Who is Lord Commander of the Kingsguard at the beginning of Game of Thrones?',
        choices: ['Ser Jeor Mormont','Ser Loras Tyrell','Ser Jaime Lannister','Ser Barristan Selmy'],
        answer: 'Ser Barristan Selmy'
    },
    {
        question: 'Who was the Mad King\'s firstborn son?',
        choices: ['Viserys Targaryen','Rhaegar Targaryen','Aemon Targaryen','Aegon Targaryen'],
        answer: 'Rhaegar Targaryen'
    },
    {
        question: 'Who delivered the fatal blow to the Robb Stark?',
        choices: ['Ramsay Bolton','Walder Frey','Alliser Thorne','Roose Bolton'],
        answer: 'Roose Bolton'
    },
    {
        question: 'Davos Seaworth grew up in the slumps of which city?',
        choices: ['King\'s Landing','Lannisport','Gulltown','Oldtown'],
        answer: 'King\'s Landing'
    }
]

var clock= 5, 
    countDwn,
    correctAns=0,
    incorAns=0,
    unAns=0,
    pressResult,
    pressCount=0,
    newDiv;

//Functions====================================================================

//Displays the default timer count before button click 
newDiv= $('<div>').attr('class', 'hide').attr('id','countdown').text('Time Remaining: ' + clock);
$('#timeBox').append(newDiv);
    
//Function that hides the content until the start button is clicked 
$('.hide').hide();
$('.hideResults').hide();
$('#restartButton').hide();
$('#endMessage').hide();

//When the button is clicked it will display the question and time. It will also hide and show content accordingly. 
$('#startButton').on('click', function(){
    event.preventDefault();
    $('.hide').show();
    $('#startButton').hide();
    displayQues();
    timer();
    timerReset();
});

$(document).on('click','.options',function(){
    pressResult= $(this).text();
    newDiv=$('<div>');
    event.preventDefault();
    //Conditional statements that dictate what happens depending on if the user got the question correct or not 
    if(pressResult==quesBank[pressCount].answer){
        newDIv= newDiv.attr('class','hide').text('You got this right!');
        $('#message').html(newDiv);
        correctAns++
        $('#numCor').text(correctAns);
        console.log(correctAns);
        $('.hideResults').show();
    }
    else{
        newDiv= newDiv.attr('class','hide').text('Sorry you got this one wrong. Focus! Here comes the next one');
        $('#message').html(newDiv);
        incorAns++
        $('#numIncor').text(incorAns);
        console.log(incorAns);
        $('.hideResults').show();
        
    }
    $('#quesChoices').data('clicked',true);
    restart();
    pressCount++;

    if(pressCount==6){
        $('#message').hide();
        $('#endMessage').show();
    }
});

// variable that controls which question is displayed 
var m= 0;

//Restarts functions whenever time runs out or an answer button is clicked on
function restart(){
    clearButtons();
    displayQues();
};   

// displayQues is in charge of displaying the correct questions and creating answer buttons   
function displayQues(){
    if(m<quesBank.length){
        var qBank= quesBank[m];
        //Displays the question 
        var quesVar= $('<div>').text(qBank.question);  
        $('#quesBox').html(quesVar);

        //This loop will sort through choices, make a button, and display
        for(x in quesBank[m].choices){
        var newButton= $('<button>').attr('class','options').attr('id',qBank.choices[x]).text(qBank.choices[x]);
        $('#quesChoices').append(newButton);
        };    

        m++;
    }
    else{
        $('#timeBox').hide();
        $('#quesBox').hide();
        $('#restartButton').show();
        //Creates divs for results of the quiz ****
    }
};

function clearButtons(){
    $('.options').remove();
};

function timerReset(){
    var setTimer= setInterval(timer,5000);
    var setRestart= setInterval(restart,5000);
    if($('#quesChoices').data('clicked')==true){
        clearInterval(setTimer);
        clearInterval(setRestart);
        console.log('timerReset finally works');
    }
    else{
        console.log('timer still works');
    }
};

function timer(){
    clock= 5;
    $('#timeBox').text('Time Remaining: ' + clock);
    countDwn= setInterval(reduceTime,1000);
    setTimeout(function(){
        clearInterval(countDwn)}
    ,5000);
}; 

function reduceTime(){
    clock= clock-1;
    var newDiv= $('<div>').attr('class','hide').text('Time Remaining: ' + clock);
    $('#timeBox').html(newDiv);
};

//========================================================================================
//To avoid global variables, an improvement of the above would be:

function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {

       callback();

       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}
//Then you can call the new setInvervalX() function as follows:

// This will be repeated every for 5 times with 1 second intervals:
setIntervalX(function () {
    // Your logic here
}, 1000, 5);



