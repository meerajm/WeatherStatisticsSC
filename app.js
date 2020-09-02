document.addEventListener('DOMContentLoaded',function(){
    console.log("DOM has been loaded")    
});

var weather=[];

function addWeather(temperature,date){
        weather.push({temperature: temperature, date: date});
        console.log('Weather array contains: ');
    for(var i=0;i<weather.length;i++){
        console.log(weather[i]);
    }
}

function getWeather() {
    var temp = document.getElementById('temperature').value;
    console.log('Temperature to be added: '+temp);
    var date=document.getElementById('date').value;
    console.log('Date to be added: '+date);
    addWeather(temp,date);
}

function displayResults(){
    var tab=document.getElementById("resultsTable");
    tab.style.visibility="visible";
    //for creating rows and columns and assigning values
    for(var i=0;i<weather.length;i++){    
            var row=tab.insertRow(i+1);
            var cell1=row.insertCell(0);
            var cell2=row.insertCell(1);
           cell1.innerHTML=weather[i].temperature;
           cell2.innerHTML=weather[i].date;
    }
}

//function to reset the tepmperature and date input fields
function resetData(){
    var elements=document.getElementsByTagName("input");
    for(var i=0;i<elements.length;i++){
        elements[i].value="";
    }
    //console.log(elements);
}

var addBtn=document.getElementById('add');
var seedBtn=document.getElementById('seed');

addBtn.addEventListener('click',getWeather);
addBtn.addEventListener('click',function(event){
    event.preventDefault()  
});
addBtn.addEventListener('click',resetData);

seedBtn.addEventListener('click',displayResults);
seedBtn.addEventListener('click',function(event){
    event.preventDefault()  
});



