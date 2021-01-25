for (let i = 1995; i <= 2021; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", i);
    option.style.fontSize = "20px"
    option.textContent = i;
    document.getElementById("year").appendChild(option);
}



let button = document.createElement("button");
button.setAttribute("id", "submit");
button.textContent = "Check picture!";

document.getElementById("container").appendChild(button);

var arrDate =[];


class Calendary {
    constructor() {
        this.january = {
            name: "January",
            month: "01",
            range: "31"
        }

        this.february = {
            name: "February",
            month: "02",
            rangeBissextile: "29",
            range: "28"
        }

        this.march = {
            name: "March",
            month: "03",
            range: "31"
        }

        this.april = {
            name: "April",
            month: "04",
            range: "30"
        }

        this.may = {
            name: "May",
            month: "05",
            range: "31"
        }

        this.june = {
            name: "June",
            month: "06",
            range: "30"
        }

        this.july = {
            name: "July",
            month: "07",
            range: "31"
        }

        this.august = {
            name: "August",
            month: "08",
            range: "31"
        }

        this.september = {
            name: "September",
            month: "09",
            range: "30"
        }

        this.october = {
            name: "October",
            month: "10",
            range: "31"
        }

        this.november = {
            name: "November",
            month: "11",
            range: "30"
        }

        this.december = {
            name: "December",
            month: "12",
            range: "31"
        }
    }

    findMonth(chosenMonth){
        console.log("inicio findmonth ");
        console.log(this);
        for(let month in this){
            if(this[month].name == chosenMonth){
                console.log("No findMonth " + this[month]);
                return this[month];
            }
        }
    }

    rangeOfMonth(chosenMonth, arrDate){
        console.log("entrando no loop: " + chosenMonth);
        let chosen = this.findMonth.bind(this, chosenMonth);
        chosenMonth = chosen();
        console.log("Depois: " + chosenMonth);

        for (let i = 1; i <= parseInt(chosenMonth.range); i++) {
            let option = document.createElement("option");
            option.setAttribute("value", i);
            option.style.fontSize = "20px";
            option.textContent = i;
            document.getElementById("day").appendChild(option);

        }
        arrDate.splice(1, 1);
        console.log("QUAL MES " + chosenMonth.month);
        arrDate.push(chosenMonth);


    }

    nextMonth(lastMonth){
        let i = 0;
        for(let month in this){
            if(i == 1){
                return this[month];
            }
            if(this[month].name == lastMonth){
                i++;
            }
        }

    }

    previousMonth(nextMonth){
        let i = 0;
        for(let month in this){
            i++
            if(i == (parseInt(nextMonth.month) - 1)){
                return this[month];
            }
        }
    }
}


document.getElementById("year").addEventListener("click", function whichYear(){
    let year = document.getElementById("year").options[document.getElementById("year").selectedIndex].value;
    console.log(year);
    arrDate.splice(0, 1);
    arrDate.push(parseInt(year));
});

document.getElementById("month").addEventListener("click", function(){
    var chosenMonth = document.getElementById("month").options[document.getElementById("month").selectedIndex].value;
    console.log(chosenMonth);
    let date = new Calendary();
    date.rangeOfMonth(chosenMonth, arrDate);
});

document.getElementById("day").addEventListener("click", function(){
    var chosenDay = document.getElementById("day").options[document.getElementById("day").selectedIndex].value;
    arrDate.splice(2, 1);
    arrDate.push(parseInt(chosenDay));
});

function checkBissexto(arrDate){
    let year = parseInt(arrDate[0]);
    if(year % 100 != 0 && year % 4 == 0 || year % 400 == 0){
        return 1;
    }else{
        return 0;
    }
}

function firstPresentation(arrDate){
    console.log(arrDate);   

    let request = new XMLHttpRequest();


    request.open("GET", `https://api.nasa.gov/planetary/apod?api_key=dZ0ADNPSsU4rW5kvD3bv4Db4Pm5mTpPqIluU7WKt&date=${arrDate[0]}-${arrDate[1].month}-${arrDate[2]}`);
    document.getElementById("apresentation").innerText = "";
    document.getElementById("container").removeChild(document.getElementById("year"));
    document.getElementById("container").removeChild(document.getElementById("month"));
    document.getElementById("container").removeChild(document.getElementById("day"));
    document.getElementById("container").removeChild(document.getElementById("submit"));


    let p = document.createElement("p");
    p.setAttribute("id", "loading");
    p.textContent = "Carregando...";
    p.style.fontSize = "100px";
    p.style.color = "white";
    p.style.marginLeft = "150px";
    document.getElementById("container").appendChild(p);

    request.addEventListener("load", function () {
        document.getElementById("container").removeChild(document.getElementById("loading"));
        let title = document.getElementById("apresentation");
        title.textContent = JSON.parse(request.response).title;
        title.style.color = "white";
        title.style.textAlign = "center";
        title.style.fontSize = "60px";
        console.log(request.response);
        let whichDay = document.getElementById("date");
        whichDay.textContent = `${arrDate[0]} ${arrDate[1].name} ${arrDate[2]}`;
        whichDay.style.textAlign = "center";
        whichDay.style.color = "white";
        let img = document.createElement("img");
        img.src = JSON.parse(request.response).url;
        img.style.marginLeft = "auto";
        img.style.marginRight = "auto";
        let explanation = document.getElementById("explanation");
        explanation.textContent = `${JSON.parse(request.response).explanation}.`;
        explanation.style.color = "white";

        document.getElementById("container").setAttribute("class", "newContainer");
        document.getElementsByClassName("newContainer")[0].removeAttribute("id", "container");
        document.getElementsByClassName("newContainer")[0].appendChild(img);
    });
    
    request.send();

}

function SecondPresentation(arrDate){
    let request = new XMLHttpRequest();

    request.open("GET", `https://api.nasa.gov/planetary/apod?api_key=dZ0ADNPSsU4rW5kvD3bv4Db4Pm5mTpPqIluU7WKt&date=${arrDate[0]}-${arrDate[1].month}-${arrDate[2]}`);
    document.getElementById("apresentation").innerText = "";

    document.getElementById("apresentation").textContent = "";
    document.getElementById("date").textContent = "";
    document.getElementById("explanation").textContent = "";
    document.getElementsByClassName("newContainer")[0].removeChild(document.getElementsByTagName("img")[0]);

    let p = document.createElement("p");
    p.setAttribute("id", "loading");
    p.textContent = "Carregando...";
    p.style.fontSize = "100px";
    p.style.color = "white";
    p.style.marginLeft = "150px";
    document.getElementsByClassName("newContainer")[0].appendChild(p);

    request.addEventListener("load", function () {
        document.getElementsByClassName("newContainer")[0].removeChild(document.getElementById("loading"));
        let title = document.getElementById("apresentation");
        title.textContent = JSON.parse(request.response).title;
        title.style.color = "white";
        title.style.textAlign = "center";
        title.style.fontSize = "60px";
        console.log(request.response);
        let whichDay = document.getElementById("date");
        whichDay.textContent = `${arrDate[0]} ${arrDate[1].name} ${arrDate[2]}`;
        whichDay.style.textAlign = "center";
        whichDay.style.color = "white";
        let img = document.createElement("img");
        img.src = JSON.parse(request.response).url;
        img.style.marginLeft = "auto";
        img.style.marginRight = "auto";
        let explanation = document.getElementById("explanation");
        explanation.textContent = `${JSON.parse(request.response).explanation}.`;
        explanation.style.color = "white";

        document.getElementsByClassName("newContainer")[0].appendChild(img);
    });
    
    request.send();


}


button.addEventListener("click", function () {

    
    firstPresentation(arrDate)


    let nextButton = document.createElement("button");
    let lastButton = document.createElement("button");
    nextButton.setAttribute("id", "next");
    nextButton.setAttribute("class", "surfButtons");
    lastButton.setAttribute("id", "last");
    lastButton.setAttribute("class", "surfButtons");
    nextButton.textContent = "Next day";
    lastButton.textContent = "Previous day";
    document.getElementById("utils").appendChild(lastButton);
    document.getElementById("utils").appendChild(nextButton);


    nextButton.addEventListener("click", function(){

        if((arrDate[2] + 1) <= parseInt(arrDate[1].range)){
            arrDate[2]++;
            console.log("Depois " + arrDate);
            SecondPresentation(arrDate);

        }else if((arrDate[2] + 1) > parseInt(arrDate[1].range) && arrDate[1].name != "December"){
            arrDate[2] = 1;
            let newMonth = new Calendary();
            arrDate[1] = newMonth.nextMonth(arrDate[1].name);
            SecondPresentation(arrDate);
        }else if((arrDate[2] + 1) > parseInt(arrDate[1].range) && arrDate[1].name == "December"){
            arrDate[2] = 1;
            arrDate[1] = {
                name: "January",
                range: "31",
                month: "01"
            }
            arrDate[0]++;
            SecondPresentation(arrDate);
        }
    });

    lastButton.addEventListener("click", function(){
        if((arrDate[2] - 1) >= 1 ){
            arrDate[2]--;
            SecondPresentation(arrDate);
        }else if((arrDate[2] - 1) < 1  && arrDate[1].name != "January"){
            let newMonth = new Calendary();
            arrDate[1] = newMonth.previousMonth(arrDate[1]);
            arrDate[2] = arrDate[1].range;
            console.log(arrDate);
            SecondPresentation(arrDate);
        }else if((arrDate[2] - 1) < 1  && arrDate[1].name == "January"){
            arrDate[0]--;
            arrDate[1] = {
                name: "December",
                range: "31",
                month: "12"
            }
            arrDate[2] = 31;
            SecondPresentation(arrDate);
        }
    });

    


});





