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

var clock= 20, 
    countDwn,
    correctAns=0,
    incorAns=0,
    unAns=0,
    pressResult,
    pressCount=0,
    timerCount,
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
    $('#quesChoices').attr('data',false)
    $('.hide').show();
    $('#startButton').hide();
    displayQues();
    timer();
 
});

$(document).on('click','.options',function click(){
    event.preventDefault();
    pressResult= $(this).text();
    newDiv=$('<div>');

    //Conditional statements that dictate what happens depending on if the user got the question correct or not 
    if(pressResult==quesBank[pressCount].answer){
        newDIv= newDiv.attr('class','hide').text('You got this right!');
        $('#message').html(newDiv);
        correctAns++
        $('#numCor').text(correctAns);
        $('.hideResults').show();
        restart();
        
    }
    else{
        newDiv= newDiv.attr('class','hide').text('Sorry you got this one wrong. Focus! Here comes the next one');
        $('#message').html(newDiv);
        incorAns++
        $('#numIncor').text(incorAns);
        $('.hideResults').show();
        restart();
    }
    $('#quesChoices').attr('data', true);
    timer();
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

//Timer controls the clock and runs the seconds down. 
function timer(){
    console.log($('#quesChoices').attr('data'));
    //Resets after button click.
    if($('#quesChoices').attr('data')=='true'){
        clearInterval(countDwn)
        clock= 20;
        $('#timeBox').text('Time Remaining: ' + clock);
        countDwn= setInterval(reduceTime,1000); 
        $('#quesChoices').attr('data',false);
    }
    //Resets after time expires.
    else{
        clearInterval(countDwn)
        clock= 20;
        $('#timeBox').text('Time Remaining: ' + clock);
        countDwn= setInterval(reduceTime,1000); 
        $('#quesChoices').attr('data',false);
    }
}; 

//Function that is called by timer. Reduces the time on the clock. 
function reduceTime(){
    
    //This will reduce the clock to zero and stop once it reaches zero
    if(clock>0){
        clock= clock-1;
        var newDiv= $('<div>').attr('class','hide').text('Time Remaining: ' + clock);
        $('#timeBox').html(newDiv);
  
    }
    
    //Once clock <0, it will restart display and timer.
    else{
        clearInterval(countDwn);
        restart();
        timer();
        $('#quesChoices').attr('data',false);
        pressCount++;
        unAns++;
        $('#numUnAns').text(unAns);
        $('#message').hmtl('<span>Sorry, you didn\'t answer this one.</span>')
    }
};