document.addEventListener('DOMContentLoaded',function(){
    console.log("DOM has been loaded")    
});

var weather=[];// Global array to store weather details(temperature and date)
var tab=document.getElementById("resultsTable");
var result=document.getElementById("printResults");


function getWeather(event) {// Function to get weather data from input fields
    event.preventDefault();
    tab.style.visibility="hidden";
    result.style.visibility="hidden";
    var temp = document.getElementById('temperature').value;
    var date=document.getElementById('date').value;
    var tempValidator=document.getElementById('temperatureValidator');
    var dateValidator=document.getElementById('dateValidator');

    if(temp==""){
        tempValidator.style.display='inline';  
    }
    if(!date){
        dateValidator.style.display='inline';
    }
    else if(temp!=""&&date!=""){
        temp=parseInt(temp);//Convert the temperature to a number
        console.log('Temperature to be added: '+temp);
        console.log('Date to be added: '+date);
        addWeather(temp,date);
        tempValidator.style.display='none';  
        dateValidator.style.display='none';
        }    
    }    

function addWeather(temperature,date){// Function to enter the weather data into our array
    weather.push({temperature: temperature, date: date});
    console.log('Weather array contains: ');
    for(var i=0;i<weather.length;i++){
        console.log(weather[i]);
    }
    displayResults();
    resetData();
 }

 function resetData(){//function to reset the tepmperature and date input fields
    var elements=document.getElementsByTagName("input");
    for(var i=0;i<elements.length;i++){
        elements[i].value="";
    }
}

function genRandomWeather(event){// Function to generate seed data
    event.preventDefault();
    tab.style.visibility="hidden";
    result.style.visibility="hidden";
    weather=[];
    var months=[1,2,3,4,5,6,7,8,9,10,11,12];
    var mlength=months.length;
    var randomDate;
    var randomTemp;
    for(var i=0;i<12;i++){
        randomTemp= Math.floor(Math.random()*51);//Getting a random temperature
        //To get a random month without repetition
        var index=Math.floor(Math.random() * (mlength));
        m=months[index];
        months.splice(index,1);
        mlength--;  
        if(m<10){
            m='0'+m+'';
        }
        var d=Math.floor(Math.random()*31)+1;
        if(d<10){
            d='0'+d+'';
        }
        randomDate='2020-'+m+'-'+d+'';//Random date
        weather.push({temperature: randomTemp, date: randomDate});
    }
    displayResults();    
}

function displayResults(){// Function to dyanamicaly create rows of the table and display data
    
    tab.style.visibility="visible";
    var rowCount=tab.rows.length;
    for(var i=1;i<rowCount;i++){//Deleting all previous rows
        tab.deleteRow(1);
    }
    var length=weather.length;
    for(var i=0;i<length;i++){
        weather[i].date=weather[i].date.replace(/-/g,'');
        weather[i].date=parseInt(weather[i].date);
    }
    bubbleSort(weather,"date");
    for(var i=0;i<length;i++){
        weather[i].date=weather[i].date.toString();
        var y=weather[i].date.substring(0,4);
        var m=weather[i].date.substring(4,6);
        var d=weather[i].date.substring(6,8);
        weather[i].date=y+'-'+m+'-'+d;
    }

    console.log(weather);
    //for creating rows and columns and assigning values
    for(var i=0;i<weather.length;i++){    
            var row=tab.insertRow(i+1);
            var cell1=row.insertCell(0);
            var cell2=row.insertCell(1);
            cell1.innerHTML=weather[i].temperature;
            cell2.innerHTML=weather[i].date;
    }
    createChart();
}

function getAverage(event){// Function to get the average temperature
    event.preventDefault();
    result.style.visibility="visible";
    if (weather === undefined || weather.length == 0){
        console.log(result.style.visibility);
        result.innerHTML="No data found. Please enter records";
    }
    else{
    var length=weather.length;
    var total=0;
    console.log('total is:'+total+'');
    for(var i=0;i<length;i++){
        total+=weather[i].temperature;
    }
    console.log(total);
    console.log(length);
    var average=total/length;
    document.getElementById("printResults").innerHTML='The average temperature is '+average+' ';
    }
}

function getMax(event){// Function to get the maximum temperature
    event.preventDefault();
    result.style.visibility="visible";
    if (weather === undefined || weather.length == 0){
        console.log(result.style.visibility);
        result.innerHTML="No data found. Please enter records";
    }
    else{
    var weatherCopy=weather;
    weatherCopy=bubbleSort(weatherCopy);
    console.log(weatherCopy);
    var size=weatherCopy.length;
    var max=weatherCopy[size-1].temperature;
    result.innerHTML='The maximum temperature is '+max+' ';
    }
}

function getMin(event){// Function to get the minimum temperature
    event.preventDefault();
    result.style.visibility="visible";
    if (weather === undefined || weather.length == 0){
        console.log(result.style.visibility);
        result.innerHTML="No data found. Please enter records";
    }
    else{
    var weatherCopy=weather;
    weatherCopy=bubbleSort(weatherCopy);
    console.log(weatherCopy);
    var min=weather[0].temperature;
    result.innerHTML='The minimum temperature is '+min+' ';
    }
}

function bubbleSort(weatherCopy,sortBy="temperature"){
    //function to sort the data in ascending order of temperature
    var length=weatherCopy.length;
    for(var i=0;i<length;i++){
        for(var j=0;j<length-1;j++){
            if(weatherCopy[j][sortBy]>weatherCopy[j+1][sortBy]){
            //Swap
                var hold=weatherCopy[j];
                weatherCopy[j]=weatherCopy[j+1];
                weatherCopy[j+1]=hold;
                }
            }            
        }
        return weatherCopy;
    }

function createChart(){
    var myChart=document.getElementById("myChart").getContext("2d");
    var months =["Jan-", "Feb-", "Mar-", "Apr-", "May-", "Jun-","Jul-", "Aug-", "Sep-", "Oct-", "Nov-", "Dec-"];
    var tempArr=weather.map(a=>a.temperature);// Store the temperatures in the new array
    var dateArr=weather.map(a=>a.date);
    var getMonths=dateArr.map(a=>a.substring(5,7));
    getMonths=getMonths.map(a=>parseInt(a));
    getMonths=getMonths.map(a=>months[a-1]);
    getYears=dateArr.map(a=>a.substring(0,4));
    var displayDates=[];
    for(var i=0;i<getMonths.length;i++){
        displayDates[i]=getMonths[i].concat(getYears[i]);
    }
    new Chart(myChart,{
        type: 'line',
        data:{
            labels: displayDates,
            datasets:[{
                label: 'Weather Statistics',
                backgroundColor: 'pink',
                borderColor: 'red',
                data:tempArr
            }]
        },
        options:{}
    });
    myChart.canvas.parentNode.style.height = '50%';
    myChart.canvas.parentNode.style.width = '50%';
    myChart.canvas.parentNode.style.float = 'right';
}

var addBtn=document.getElementById('add'); // Add button element
var seedBtn=document.getElementById('seed');// Seed button element
var avgBtn=document.getElementById('average');// Average button element
var maxBtn=document.getElementById('maxTemp');// Max button element
var minBtn=document.getElementById('minTemp');// Min button elements

addBtn.addEventListener('click',getWeather);
seedBtn.addEventListener('click',genRandomWeather);
avgBtn.addEventListener('click',getAverage);
maxBtn.addEventListener('click',getMax);
minBtn.addEventListener('click',getMin);