//1 // https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=f57a144803808ce82b7c0f4f05b07edc
//5 // https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=f57a144803808ce82b7c0f4f05b07edc
// https://reqres.in/api/users?page=1

var divWeatherToday = document.querySelector(".weatherToday");
var divWeatherTomorrow = document.querySelector(".weatherTomorrow");

//// ПОГОДА НА СЕГОДНЯ
var xhrToday = new XMLHttpRequest();
xhrToday.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=f57a144803808ce82b7c0f4f05b07edc", true);
xhrToday.onload = function () {
	var resultToday = JSON.parse(xhrToday.response);
	
	console.log("JSON Today");
	console.log(resultToday);

	renderArrToday(resultToday);
	console.log("Mass Today");
	console.log(arrToday);
	
	renderMarkupToday(arrToday);
}

xhrToday.send();

var arrToday = [];
function renderArrToday(pogoda) {
	arrToday.push(pogoda);
}

function renderMarkupToday(pogoda) {
	for (var i = 0; i < pogoda.length; i++) {
		createWeatherToday(pogoda[0], pogoda[0].sys, pogoda[0], pogoda[0].weather[0], pogoda[0].weather[0],	
			pogoda[0].main, pogoda[0].wind, pogoda[0].wind);
	}
}

function createWeatherToday(name, nameCountry, dateTime, weatherIcon, weatherIconTitle,
	mainTemp, windDeg, windSpeed) {

	var newName = document.createElement("p");
	newName.className = "nameCountryToday";
	newName.textContent = name.name + ", " + nameCountry.country;
	divWeatherToday.appendChild(newName);

	var date = new Date(dateTime.dt * 1000);
	var options = {
		//era: 'long',
		//year: 'numeric',
		// month: 'long',
		// day: 'numeric',
		// weekday: 'long',
		//timezone: 'UTC',
		hour: '2-digit',
		minute: '2-digit',
		//second: 'numeric'
	};
	var newTime = document.createElement("p");
	newTime.className = "dateTimeToday";
	newTime.textContent = date.toLocaleString("en-US", options);
	//newTime.textContent = date.toLocaleString("ru", options);
	//newTime.textContent = date.getHours() + ":" + date.getMinutes();
	divWeatherToday.appendChild(newTime);

	var spanNewTime = document.createElement("span");
	spanNewTime.className = "spanNewTime";
	newTime.appendChild(spanNewTime);

	var newWeatherIcon = document.createElement("img");
	newWeatherIcon.className = "weatherIconToday";
	newWeatherIcon.src = "http://openweathermap.org/img/w/" + weatherIcon.icon + ".png";
	newWeatherIcon.alt = "img weather";
	newWeatherIcon.title = weatherIconTitle.description;
	divWeatherToday.appendChild(newWeatherIcon);

	var newMainTemp = document.createElement("p");
	newMainTemp.className = "mainTempToday";
	newMainTemp.textContent = (mainTemp.temp - 273).toFixed(1) + " °C";
	divWeatherToday.appendChild(newMainTemp);

	var newWindDeg = document.createElement("p");
	newWindDeg.className = "windDegToday";
	newWindDeg.textContent = getDirectionByDegree(windDeg.deg);
	divWeatherToday.appendChild(newWindDeg);

	function getDirectionByDegree(windDeg) {
		var directions = ['North', 'North-West', 'West', 'South-West', 'South', 'South-East', 'East', 'North-East'];
		return directions[Math.round(((windDeg %= 360) < 0 ? windDeg + 360 : windDeg) / 45) % 8];
	}

	var newWindSpeed = document.createElement("p");
	newWindSpeed.className = "windSpeedToday";
	newWindSpeed.textContent = windSpeed.speed + " m/s";
	divWeatherToday.appendChild(newWindSpeed);

	var spanNewWindDeg = document.createElement("span");
	spanNewWindDeg.className = "spanNewWindDeg";
	newWindDeg.appendChild(spanNewWindDeg);

	var spanNewWindSpeed = document.createElement("span");
	spanNewWindSpeed.className = "spanNewWindSpeed";
	newWindSpeed.appendChild(spanNewWindSpeed);
}


/// ПОГОДА НА СЛЕДУЮЩИХ 5 ДНЕЙ
var xhrTomorrow = new XMLHttpRequest();
xhrTomorrow.open("GET", "https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=f57a144803808ce82b7c0f4f05b07edc", true); // формирование вопроса
xhrTomorrow.onload = function () {
	var resultTomorrow = JSON.parse(xhrTomorrow.response);
	
	console.log("JSON Tomorrow");
	console.log(resultTomorrow);

	renderArrTomorrow(resultTomorrow);
	console.log("Mass Tomorrow");
	console.log(arrTomorrow);
	
	renderMarkupTomorrow(arrTomorrow);
}

xhrTomorrow.send();

var arrTomorrow = [];
function renderArrTomorrow(pogoda) {
	arrTomorrow.push(pogoda);
}

function renderMarkupTomorrow(pogoda) {
	for (var i = 0; i < 40; i+=8) {
		createWeatherTomorrow(pogoda[0].city, pogoda[0].city, pogoda[0].list[i], pogoda[0].list[i].weather[0], 
			pogoda[0].list[i].weather[0], pogoda[0].list[i].main, pogoda[0].list[i].wind, pogoda[0].list[i].wind);
	}
}

function createWeatherTomorrow(name, nameCountry, dateTime, weatherIcon, weatherIconTitle,
	mainTemp, windDeg, windSpeed) {

	var newLi = document.createElement("li");
	newLi.setAttribute("class", "liGroupContainer");
	divWeatherTomorrow.appendChild(newLi);

	var date = new Date(dateTime.dt * 1000);
	var options = {
		//era: 'long',
		//year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'short',
		//timezone: 'UTC',
		hour: '2-digit',
		minute: '2-digit',
		//second: 'numeric'
	};
	var newTime = document.createElement("p");
	newTime.className = "dateTimeTomorrow";
	//newTime.textContent = dateTime.dt_txt;
	//newTime.textContent = date.getDate() + "." + (date.getMonth()+1) + " " + date.getHours() + ":" + date.getMinutes();
	newTime.textContent = date.toLocaleString("en-US", options);
	//newTime.textContent = date.toLocaleString("ru", options);
	newLi.appendChild(newTime);

	var newWeatherIcon = document.createElement("img");
	newWeatherIcon.src = "http://openweathermap.org/img/w/" + weatherIcon.icon + ".png";
	newWeatherIcon.className = "weatherIconTomorrow";
	newWeatherIcon.alt = "img weather";
	newWeatherIcon.title = weatherIconTitle.description;
	newLi.appendChild(newWeatherIcon);

	var newMainTemp = document.createElement("p");
	newMainTemp.className = "mainTempTomorrow";
	newMainTemp.textContent = (mainTemp.temp - 273).toFixed(1) + " °C";
	newLi.appendChild(newMainTemp);
}





// /// AJAX
// //reqres.in

// var xhr = new XMLHttpRequest();
// // xhr.open(1, 2, 3);
// // 1. GET - прлучить/ POST - отправить
// // 2. куда задать вопрос
// // 3. false - страница зависает, но это уже отмирает
// // https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247
// // https://reqres.in/api/users?page=1
// xhr.open("GET", "https://reqres.in/api/users?page=1", true); // формирование вопроса
// xhr.onload = function (){ // отлавливаем ответ и предупреждает нас
// 	console.log(xhr.response);
// 	var result = JSON.parse(xhr.response);
// 	var user = result.data;
// 	console.log(user);

// 	renderMarkup(user);
// }

// xhr.send();


// function renderMarkup(users){
// 	for (var i = 0; i < users.length; i++) {
// 		createLi(users[i]);
// 	}
// }

// var nUl = document.querySelector("ul");

// function createLi(user){
// 	var newLiNote = document.createElement("Li");
// 	newLiNote.textContent = user.first_name + " " + user.last_name;
// 	nUl.appendChild(newLiNote);

// 	var img = document.createElement("img");
// 	img.src = user.avatar;
// 	img.alt = "аватор";
// 	nUl.appendChild(img);

// 	console.log(user);
// }

/// API application programming interface





































// var newNote = document.querySelector(".newnote");
// var board = document.querySelector(".board");
// //var btnOkTextNote = document.querySelector(".okTextNote");

// var notes = [];
// var numberInt = parseInt("1");

// /// 1. Creating Note Data
// function go(){

// 	var newPosX = Math.floor(Math.random() * (250 - 20 + 1)) + 20;
// 	console.log("pos X " + newPosX);
// 	var newPosY = Math.floor(Math.random() * (250 - 20 + 1)) + 20;
// 	console.log("pos Y " + newPosY);

// 	var eachNote = {
// 		text: "",
// 		posX: newPosX,
// 		posY: newPosY,
// 	};
// 	notes.push(eachNote);
// 	//console.log(notes);
// 	createHtml(notes);
// }

// function createEachNote(text, posX, posY, index){

// 	var newDivNote = document.createElement("div");
// 	newDivNote.setAttribute("class", "note");
// 	newDivNote.style.left = posX + "px";
// 	newDivNote.style.top = posY + "px";
// 	board.appendChild(newDivNote);

// 	var newDivTextInfoNote = document.createElement("div");
// 	newDivTextInfoNote.setAttribute("class", "textInfoNote");
// 	newDivTextInfoNote.textContent = index + numberInt + " - Title";
// 	newDivNote.appendChild(newDivTextInfoNote);

// 	var newTextareaNote = document.createElement("textarea");
// 	newTextareaNote.setAttribute("class", "textareaNote");
// 	newTextareaNote.placeholder = "Введите вашу заметку";
// 	newTextareaNote.textContent = text;
// 	newDivNote.appendChild(newTextareaNote);

// 	var newPTextFromTextarea = document.createElement("p");
// 	newPTextFromTextarea.setAttribute("class", "textFromTextarea");
// 	if (text == "") {
// 		newDivNote.appendChild(newPTextFromTextarea);
// 	} else {
// 		newPTextFromTextarea.textContent = newTextareaNote.value;
// 		newDivNote.appendChild(newPTextFromTextarea);
// 		newTextareaNote.style.display = "none";
// 		newPTextFromTextarea.style.display = "block";
// 	}

// 	var spanRemoveNote = document.createElement("span");
// 	spanRemoveNote.setAttribute("class", "removeNote");
// 	newDivTextInfoNote.appendChild(spanRemoveNote);
// 	spanRemoveNote.onclick = function(){
// 		notes.splice(index, 1);
// 		console.log("после удаления элМас");
// 		console.log(notes);
// 		createHtml(notes);
// 	}

// 	newDivNote.ondblclick = function(){
// 		newTextareaNote.style.display = "block";
// 		newPTextFromTextarea.style.display = "none";
// 		spanRemoveNote.style.display = "none";
// 		spanSaveNote.style.display = "inline";
// 	}

// 	var spanSaveNote = document.createElement("span");
// 	spanSaveNote.setAttribute("class", "saveNote");
// 	newDivTextInfoNote.appendChild(spanSaveNote);

// 	/// Dimensions
// 	var width = newDivNote.clientWidth;
// 	var innerWidth = newDivNote.scrollWidth;
// 	var offTop = newDivNote.offsetTop;

// 	////Tracking Mouse
// 	window.onmousemove = function(e){
// 		var clX = e.clientX;
// 		var clY = e.clientY;
//   	//console.log("Client mouse pos is " + clX + " " + clY); /// Relative to visible area
//   	var scrX = e.screenX;
//   	var scrY = e.screenY;
//   	// console.log("Screen mouse pos is " + scrX + " " + scrY); /// Relative to computer screen
//   	var pX = e.pageX;
//   	var pY = e.pageY;
//   	//console.log("Page mouse pos is " + pX + " " + pY); /// Relative to page dimentions
//   }

//   var deltaX, deltaY;

//   function trackMouse(e){
//   	var mouseX = e.pageX;
//   	var mouseY = e.pageY;
//   	newDivNote.style.top = (mouseY - deltaY) + "px";
//   	newDivNote.style.left = (mouseX - deltaX) + "px";
//   	notes[index].posX = mouseX - deltaX;
// 	notes[index].posY = mouseY - deltaY; 
// }

// newDivNote.onmousedown = function(e){
// 	var mouseX = e.pageX;
// 	var mouseY = e.pageY;
// 	var offLeft = newDivNote.offsetLeft;
// 	var offTop = newDivNote.offsetTop;
// 	deltaX = mouseX - offLeft;
// 	deltaY = mouseY - offTop;
// 	window.addEventListener("mousemove", trackMouse);
// }

// newDivNote.onmouseup = function(){
// 	window.removeEventListener("mousemove", trackMouse);
// }

// spanSaveNote.onclick = function(){
// 	newPTextFromTextarea.textContent = newTextareaNote.value;
// 	newTextareaNote.style.display = "none";
// 	newPTextFromTextarea.style.display = "block";
// 	notes[index].text = newTextareaNote.value;
// 	spanSaveNote.style.display = "none";
// 	spanRemoveNote.style.display = "inline";

//   	console.log("добавили текст ");
//   	console.log(notes);

//   	createHtml(notes);
//   }

// }

// function createHtml(arr) {
// 	board.innerHTML = "";
// 	for(var i = 0; i < arr.length; i++){
// 		createEachNote(arr[i].text, arr[i].posX, arr[i].posY, i);
// 	}
// }

// newNote.onclick = go;