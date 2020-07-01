let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let d = new Date();
let getWeekday = days[d.getDay()];
let getDay = d.getDate();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let getMonth = months[d.getMonth()];
console.log(getWeekday, getDay, getMonth);
let today = d.getFullYear()+"-0"+(d.getMonth()+1)+"-0"+d.getDate();
console.log("today: " + today);
let dataArray = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
}
let dayOneTemp = [];
let dayTwoTemp = [];
let dayThreeTemp = [];
let dayFourTemp = [];
let dayFiveTemp = [];

document.getElementById("searchCityBtn").addEventListener('click', function(){
    let cityName = document.getElementById('searchCityInput').value;

    console.log(cityName);
    if (cityName === "") {
        document.getElementById('searchInputValidation').innerText = "Please enter the name of the city you want to see the forecast of.";
        document.getElementById('searchCityInput').style.borderBottom = "1px solid tomato";
    } else {
        console.log(cityName);
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=3efb175fb30db3cf8c944f5f93b36640&units=metric')
            .then(response => response.json())
            .then(data => {
                console.log(data.list);

                //show 'main' + h2 tag
                document.getElementById('searchResult').style.display = "block";
                document.getElementById('cityNameResult').innerText = data.city.name + ", " + data.city.country;

                //loop over entire array + show info for each item inside array
                data.list.forEach(item => { showForecast(item)})
                function showForecast(item){
                let getYearOfItem = item.dt_txt.slice(0, 4);
                let getMonthOfItem = item.dt_txt.slice(5, 7);
                let getDayOfItem = item.dt_txt.slice(8, 10);
                let getDateOfItem = getYearOfItem+"-"+getMonthOfItem+"-"+getDayOfItem;

                //check if date is today;
                if (item.dt_txt.includes(today)){
                    console.log("this data is for today");
                    dataArray[0].push(item);
                    dataArray[0].forEach(dayOneItem => { getOneInfo(dayOneItem)})
                    function getOneInfo(dayOneItem){
                        dayOneTemp.push(dayOneItem.main.temp);
                    }
                    console.log(dayOneTemp);
                    let sum = 0;
                    for (let counter=0; counter<dayOneTemp.length; counter++){
                        sum += dayOneTemp[counter];
                    }
                    let avg = sum/dayOneTemp.length;
                    console.log(Math.floor(avg));

                } else if (item.dt_txt.includes(d.getFullYear()+"-0"+(d.getMonth()+1)+"-0"+(d.getDate()+1))){
                    console.log("this data is for day 2");
                    dataArray[1].push(item);
                    dataArray[1].forEach(dayTwoItem => { getTwoInfo(dayTwoItem)})
                    function getTwoInfo(dayTwoItem){
                        dayTwoTemp.push(dayTwoItem.main.temp);
                    }
                    console.log(dayTwoTemp);
                    let sum = 0;
                    for (let counter=0; counter<dayTwoTemp.length; counter++){
                        sum += dayTwoTemp[counter];
                    }
                    let avg = sum/dayTwoTemp.length;
                    console.log(Math.floor(avg));
                } else if (item.dt_txt.includes(d.getFullYear()+"-0"+(d.getMonth()+1)+"-0"+(d.getDate()+2))){
                    console.log("this data is for day 3");
                    dataArray[2].push(item);
                    dataArray[2].forEach(dayThreeItem => { getThreeInfo(dayThreeItem)})
                    function getThreeInfo(dayThreeItem){
                        dayThreeTemp.push(dayThreeItem.main.temp);
                    }
                    console.log(dayThreeTemp);
                    let sum = 0;
                    for (let counter=0; counter<dayThreeTemp.length; counter++){
                        sum += dayThreeTemp[counter];
                    }
                    let avg = sum/dayThreeTemp.length;
                    console.log(Math.floor(avg));
                } else if (item.dt_txt.includes(d.getFullYear()+"-0"+(d.getMonth()+1)+"-0"+(d.getDate()+3))){
                    console.log("this data is for day 4");
                    dataArray[3].push(item);
                    dataArray[3].forEach(dayFourItem => { getFourInfo(dayFourItem)})
                    function getFourInfo(dayFourItem){
                        dayFourTemp.push(dayFourItem.main.temp);
                    }
                    console.log(dayFourTemp);
                    let sum = 0;
                    for (let counter=0; counter<dayFourTemp.length; counter++){
                        sum += dayFourTemp[counter];
                    }
                    let avg = sum/dayFourTemp.length;
                    console.log(Math.floor(avg));
                } else if (item.dt_txt.includes(d.getFullYear()+"-0"+(d.getMonth()+1)+"-0"+(d.getDate()+4))){
                    console.log("this data is for day 5");
                    dataArray[4].push(item);
                    dataArray[4].forEach(dayFiveItem => { getFiveInfo(dayFiveItem)})
                    function getFiveInfo(dayFiveItem){
                        dayFiveTemp.push(dayFiveItem.main.temp);
                    }
                    console.log(dayFiveTemp);
                    let sum = 0;
                    for (let counter=0; counter<dayFiveTemp.length; counter++){
                        sum += dayFiveTemp[counter];
                    }
                    let avg = sum/dayFiveTemp.length;
                    console.log(Math.floor(avg));
                }

                //show forecast of each time period + get and set all required data
                let template = document.querySelector('#template-dayWeather');
                let clone = template.content.cloneNode(true);
                let setTarget = document.getElementById('target');
                let getDateDay = clone.querySelector('.dateDay');
                getDateDay.innerText = item.dt_txt.slice(0, 10);
                // getDateDay.innerText = getWeekday + " " + getDay + " " + getMonth;
                let tempMax = Math.round(item.main["temp_max"]);
                let tempMin = Math.round(item.main["temp_min"]);
                let getTempMax = clone.querySelector('.tempMax');
                let getTempMin = clone.querySelector('.tempMin');
                let getWeatherIcon = clone.querySelector('.weatherIcon');
                getTempMax.innerText = " " + tempMax + "°C";
                getTempMin.innerText = " " + tempMin + "°C";
                getWeatherIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + item.weather[0].icon + '@2x.png');
                getWeatherIcon.setAttribute('alt', item.weather[0].description);
                setTarget.appendChild(clone);
                }
                console.log(dataArray);
            })
    }

})
