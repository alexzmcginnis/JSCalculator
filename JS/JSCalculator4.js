//define variables for buttons with values
let zero = document.getElementById('zero');
let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
let four = document.getElementById('four');
let five = document.getElementById('five');
let six = document.getElementById('six');
let seven = document.getElementById('seven');
let eight = document.getElementById('eight');
let nine = document.getElementById('nine');

//define variable for +/- button
let positiveNegativeButton = document.getElementById('positivenegative')

//define array of number buttons
let numArray = [zero, one, two, three, four, five, six, seven, eight, nine]

//define variable for decimal button, decimal button handled differently
let decimalButton = document.getElementById('decimal');

//define variables for buttons with artithmetic functions
let plusButton = document.getElementById('add');
let minusButton = document.getElementById('subtract');
let divideButton = document.getElementById('divide');
let multiplyButton = document.getElementById('multiply');

//equals button handled differently 
let equalsButton= document.getElementById('equals');

//clear button and clear entry button
let clearButton = document.getElementById('clear');
let clearEntryButton = document.getElementById('clearEntry')

//define the screen and what goes in screen
let screen = document.getElementById('entry');
let screenstring = '0';
//the megastring will be all the entries and operations
let allEntries = document.getElementById(['allEntries'])

//element that will show the numbers and operations
let megastring = ''; 

//the button array will collect number and operator values
let buttonArray = [];

//this variable will be so after hitting equals can resume arithmetic
let afterEquals = false; 
//this will let know if continuing a calculation after hitting the equals sign
let continuingEquation = false;
//boolean true when no number has been entered yet
let beginning = true;

//this function takes the current entry and makes it negative (or pos if already neg)
function positiveNegativeFunction() {
    if(screenstring[0] != '-' ){
        screenstring = '-' + screenstring;
    }else if (screenstring[0] === '-'){
        screenstring = screenstring.slice(1,);
    }
    if( screenstring != 0){
    screen.innerHTML = screenstring;
    }
}
//event listener for the +/- button
positiveNegativeButton.addEventListener('click', positiveNegativeFunction);


//this function puts the number of the button onto the screen
function numFunction (event) {
    //this conditional is so cannot enter more characters than the screen can hold
    if(screenstring.length >= 9){
        //if the number is 9 characters, do not add more digits
        screenstring = screenstring;
        //remove hover and active class so obvious cannot add more numbers
        numArray.forEach(button => button.className='numberButtonOverflow')
    }
    //this will concat the value of whatever button pressed to the string.  the conditional is so whole numbers do not lead with a 0
    else if ( screenstring === '0'){
        screenstring = event.target.value
    }else if ( screenstring === '-0'){
        screenstring = '-' + event.target.value
    }
    else if(screenstring !== 0 && afterEquals === false) {
        screenstring = screenstring + event.target.value;
    }
    else if (afterEquals === true && continuingEquation === true){
        //this conditional is for if after hitting equals keep doing operations to answer
        screenstring = event.target.value;
        afterEquals = false; //reset
    }
    else if (afterEquals === true && continuingEquation === false){
        //this conditional is if afer hitting equals, just enter new number without hitting clear
        beginning = true;
        buttonArray = [];
        megastring = '0';
        screenstring = event.target.value;
        afterEquals = false;


    }
    //display screenstring in screen
    screen.innerHTML = screenstring;
    
    //need to make this an input string    
    //should probably take decimal out of hte array and create a separate event listner for it to append to string, but include removeEventListener if it is clicked once so it cannot be clicked twice
        
    }

//this function is to resume normal hover/active for buttons after an overflow
function numReturnToNormal () {
    if(megastring[megastring.length-1] === '+' || megastring[megastring.length-1] === '-' || megastring[megastring.length-1] === '*' || megastring[megastring.length-1] === '/'   ){
        numArray.forEach(button => button.className='numberButton')
    }
}

//named event handler --> this will add the number of the button to the string when clicking.
let buttonHandler = function (numButton) {
    numButton.addEventListener('mouseover', numReturnToNormal)
    numButton.addEventListener('click', numFunction);
    
}
//use iteration foreach to do num function to each array numbutton
numArray.forEach(buttonHandler);

function decimalFunction () {
    //concat screenstring with a decimal pt
    screenstring = screenstring + '.'
    screen.innerHTML = screenstring;
    decimalButton.removeEventListener('click', decimalFunction);
}
//add event listener to the decimal button so runs decimalFunction when clicked
decimalButton.addEventListener('click', decimalFunction)

//this function will run when an operator button is hit (+,-,*,/)
let operatorFunction = function(event){
    //this conditional to use result if just used the equals sign
    if(afterEquals === true && screenstring.length!== 0){
        megastring = screenstring;
        megastring += event.target.value; 
        buttonArray=[parseFloat(screenstring)];
        buttonArray.push(event.target.value)
        console.log(buttonArray)
        continuingEquation = true;
        
           
    }
    
    else if(screenstring.length !== 0){ //make sure screestring not empty otherwise will keep adding NaN to array
        //numberArray.push(parseFloat(screenstring));
        buttonArray.push(parseFloat(screenstring));
        //this conditional is just so if it is the first entry, the 0 
        //does not hang out at the beginning of megastring.  set 
        //beginning to false after the first number is added to megastring
        if (beginning === false){
            megastring += screenstring;
        }
        if (beginning === true){
            megastring = screenstring;
            beginning = false;
        }
        screenstring = '';
        //console.log(numberArray);
        //operatorArray.push(event.target.value);
        buttonArray.push(event.target.value);
        megastring += event.target.value;
        console.log(buttonArray);
        console.log(megastring);
        //right now the h3 happening is overwritten , need to add code to keep track of all operations/numbers
        allEntries.innerHTML = megastring;

    }  
    
}
//plusButton event handler to add plus function on click
plusButton.addEventListener('click', operatorFunction);
minusButton.addEventListener('click', operatorFunction);
divideButton.addEventListener('click', operatorFunction);
multiplyButton.addEventListener('click', operatorFunction);

//function for equals button.  



//define a reusable function to solve multiplication and division in the aray 
//and leave only + - operations
let multiplyDivideFunction = (bArray) => {
    let i=1;
    while(i<bArray.length){
        //every odd index because those are the operators
        if(bArray[i] === '+' || bArray[i] === '-'){
            i = i+ 2;
        }
        if(bArray[i] === '*'){
            let x = bArray[i-1] * bArray[i+1];
            bArray.splice(i-1, 3, x);
            //use recursion to do same thing until all multiplies are done
            multiplyDivideFunction(bArray)
   
        }
        if(bArray[i] === '/'){
            //put conditional if bArray[i+1] === 0 because cannot divide by 0
            if( bArray[i+1] === 0){
                console.log ('error')
                screen.innerHTML = 'ERROR';
                screenstring = 0;
                return bArray = [];
                
            }else{
            let x = bArray[i-1] / bArray[i+1];
            console.log('x:  ' + x)
            bArray.splice(i-1, 3, x);
            //use recursion to do same thing until all multiplies are done
            multiplyDivideFunction(bArray)
            }
   
        }
        
        return bArray;
}
}

//now do a reusable function for add subtract,
//this will be applied ot the array that has multiplication/division 
//removed after performing those operations

let addSubtractFunction = (bArray) =>{
    let i = 1;
    while(i<bArray.length){
        if(bArray[i] === '+'){
            let x = bArray[i-1] + bArray[i+1];
            bArray.splice(i-1, 3, x);
            //use recursion to do same thing until all multiplies are done
            addSubtractFunction(bArray)
   
        }else if(bArray[i] === '-'){
            let x = bArray[i-1] - bArray[i+1];
            console.log('x:  ' + x)
            bArray.splice(i-1, 3, x);
            //use recursion to do same thing until all multiplies are done
            addSubtractFunction(bArray)
   
        }

    }
    return bArray;
}

let equalsFunction = function () {
    //numberArray.push(parseFloat(screenstring));
    buttonArray.push(parseFloat(screenstring));
    console.log('equals: [' + buttonArray + ']')
    megastring += screenstring;
    allEntries.innerHTML = megastring;
    //use previously defined functions
    //first do mult/divide for PEMDOS
    //then do add subtract
    //then since the functions return an array, use resultArray[0]
    //to retrieve the correct result
    let addSubArray = multiplyDivideFunction(buttonArray);
    let resultArray = addSubtractFunction(addSubArray);
    let result = resultArray[0];
    console.log(result);
    screenstring = result;
    let floatToString = screenstring.toString();
    if(floatToString.length > 9){
        screenstring = 'ERROR';
        megastring += '<br /> Error: Too Big!';
        allEntries.innerHTML = megastring;
    }
    screenstring = screenstring.toString();
    screen.innerHTML = screenstring;
    afterEquals = true; 
}
//equals event handler
equalsButton.addEventListener('click', equalsFunction);

//function for CE to delete last number or operator
let clearEntryFunction = function(){
    //slice last digit of screenstring
    console.log(screenstring)
    screenstring = screenstring.slice(0,-1);
    console.log(screenstring);
    screen.innerHTML = screenstring;
    //this function handles numbers... for operators idk?
}
//eventhandler for CE button
clearEntryButton.addEventListener('click', clearEntryFunction)

function negativeButton () {
    //add code for negative button
}

//the function for clear button to clear the screen
let clearFunction = function (event) {
    screenstring = event.target.value;
    screen.innerHTML = screenstring;
    decimalButton.addEventListener('click', decimalFunction)
    buttonArray = [];
    megastring = '0';
    allEntries.innerHTML = megastring;
    afterEquals = false; //resets this
    beginning = true;
}
//the event handler so clear will do clearFunction when clicked
clearButton.onclick = clearFunction;


                              
