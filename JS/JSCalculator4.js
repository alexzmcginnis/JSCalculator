//***!!still need to do function/eventhandler of positive/negative button  */

//define variables for buttons with values and decimal
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

//define array of number buttons
let numArray = [zero, one, two, three, four, five, six, seven, eight, nine]

//decimal button handled differently
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
let screen = document.getElementById('screen');
let screenstring = '0';

//element that will show the numbers and elements
let happening = document.getElementById('happening');
//string to add all that is happening
let megastring = ''; //then put this to happenings innerhtml

//define the arrays that will hold number and operator values to be operated upon as app is used
let numberArray = [];
let operatorArray = [];
let buttonArray = [];

function numFunction (event) {
    //this will concat the value of whatever button pressed to the string.  the conditional is so whole numbers do not lead with a 0
    if ( screenstring === '0'){
        screenstring = event.target.value
    }
    else if(screenstring !== 0 && afterEquals === false) {
        screenstring = screenstring + event.target.value;
        
    }
    else if (afterEquals === true){
        screenstring = event.target.value;
        afterEquals = false; //reset
    }
      //display screenstring in screen
    screen.innerHTML = screenstring;
    //need to make this an input string    
    //should probably take decimal out of hte array and create a separate event listner for it to append to string, but include removeEventListener if it is clicked once so it cannot be clicked twice
        
    }



//named event handler --> this will add the number of the button to the string when clicking.
let buttonHandler = function (numButton) {
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

//when arithmetic operation is clicked, need to slice this string and the number parts need to be converted into numbers instead of strings.
//how to handle parenthesees?
//should it give total after hitting each arithmetic sign or only when hit equal?
//each time an arithmetic operator hit, should push the numbers on screen into an array ...then use for each iterator to make each array item from str-->number
//should probably keep screenstring with string values for operators to display in small font... and have a separate screen to display whatever numbers typing in/ value as calculations are done

//start the plus function
let operatorFunction = function(event){
  
    if(afterEquals === true && screenstring.length!== 0){
        //function so can resume normal arithmetic
        megastring += event.target.value; 
        happening.innerHTML = megastring;
           
    }
    
    else if(screenstring.length !== 0){ //make sure screestring not empty otherwise will keep adding NaN to array
        numberArray.push(parseFloat(screenstring));
        buttonArray.push(parseFloat(screenstring));
        
        megastring += screenstring;
        screenstring = '';
        //console.log(numberArray);
        operatorArray.push(event.target.value);
        buttonArray.push(event.target.value);
        megastring += event.target.value;
        console.log(buttonArray);
        console.log(megastring);
        //right now the h3 happening is overwritten , need to add code to keep track of all operations/numbers
        happening.innerHTML = megastring;

    }  
}
//plusButton event handler to add plus function on click
plusButton.addEventListener('click', operatorFunction);
minusButton.addEventListener('click', operatorFunction);
divideButton.addEventListener('click', operatorFunction);
multiplyButton.addEventListener('click', operatorFunction);

//function for equals button.  

//this variable will be so after hitting equals can resume arithmetic
let afterEquals = false; 

//define a reusable function to solve multiplication and division in the aray 
//and leave only + - operations
let multiplyDivideFunction = (bArray) => {
    let i=1;
    while(i<bArray.length){
        //console.log(i);
        //every odd i because those are the operators
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
            let x = bArray[i-1] / bArray[i+1];
            console.log('x:  ' + x)
            bArray.splice(i-1, 3, x);
            //use recursion to do same thing until all multiplies are done
            multiplyDivideFunction(bArray)
   
        }
        
        return bArray;
}
}

//now do a reusable function for add subtract,
//this will be applied ot the array that has multiplication/division 
//removed

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
    numberArray.push(parseFloat(screenstring));
    buttonArray.push(parseFloat(screenstring));
    console.log('equals: [' + buttonArray + ']')
    megastring += screenstring;
    happening.innerHTML = megastring;

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
    numberArray = [];
    operatorArray = [];
    buttonArray = [];
    megastring = '';
    happening.innerHTML = '';
    afterEquals = false; //resets this
}
//the event handler so clear will do clearFunction when clicked
clearButton.onclick = clearFunction;


                              
