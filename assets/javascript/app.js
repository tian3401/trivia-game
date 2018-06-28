//Variables====================================================================
var quesBank= [
    {
        question: 'What is question 0.....',
        choices: ['a','b','c','d'],
        answer: 'blah blah'
    },
    {
        question: 'What is .....',
        choices: ['a','b','c','d'],
        answer: 'blah blah'
    },
    {
        question: 'What is .....',
        choices: ['a','b','c','d'],
        answer: 'blah blah'
    },
    {
        question: 'What is .....',
        choices: ['a','b','c','d'],
        answer: 'blah blah'
    },
    {
        question: 'What is .....',
        choices: ['a','b','c','d'],
        answer: 'blah blah'
    },
    {
        question: 'What is .....',
        choices: ['a','b','c','d'],
        answer: 'blah blah'
    }
]

var clock= 5, 
    correctAns,
    incorAns,
    unAns,
    newDiv= $('<div>');

//Functions====================================================================

//Displays the default timer count before button click 
newDiv= newDiv.attr('class', 'hide').attr('id','countdown').text ('Time Remaining: ' + clock);
$('#timeBox').append(newDiv);
    
//Function that hides the content until the start button is clicked 
$('.hide').hide();

//When the button is clicked it will display the question and time. It will also hide and show content accordingly.  

$('#startButton').on('click', function(){
    event.preventDefault();
    $('.hide').show();
    $('#startButton').hide();
    displayQues();
});

$(document).on('click','.options',function(){
    event.preventDefault();
    restart();
});

//Restarts functions whenever time runs out or an answer button is clicked on
function restart(){
   
    resetTimer();
};   

// displayQues is in charge of displaying the correct questions and creating answer buttons   
function displayQues(){
    //need to write the function that displays new questions
    // variable that controls which question is displayed 
    var m= 0;
    //variable that controls which answer choice is displayed
    var n= 0;
    var qBank= quesBank[m];
    var quesVar= $('<div>').text(qBank.question);  
    $('#quesBox').append(quesVar);

    //This loop will sort through choices, make a button, and display
    for(x in quesBank[m].choices){
    var newButton= $('<button>').attr('class','options').attr('id','choice ' + n).text(qBank.choices[x]);
        $('#quesChoices').append(newButton);
        n++;
    };
};

//This section of the code deals with the timing of the game 
var countDwn= setInterval(reduceTime,1000);

function timer(){
    clock= 5;
    $('#timeBox').text('Time Remaining: ' + clock);
    countDwn= setInterval(reduceTime,1000);
}; 

function reduceTime(){
    clock= clock-1;
    var newDiv= $('<div>').attr('class', 'hide').text('Time Remaining: ' + clock);
    $('#timeBox').html(newDiv);
};

function resetTimer(){
    clearInterval(countDwn);
    timer();
};





