var arrTable = [`<tr id="tableRow0">\
<th>Employee ID</th>\
<th>Name</th>\
<th>Age</th>\
<th>City</th>\
<th>Salary</th>\
</tr>`];
var arrValue = [["Employee Id", "Name", "Age", "City", "Salary"]];
var position = 0;
var highlight = false;

var arrEmployeeId = ["001", "002", "003", "004", "005", "006", "007", "008", "009", "010"];
var arrNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var arrAge = ["30", "30", "30", "30", "30", "30", "30", "30", "30", "30"];
var arrCity = ["Delhi", "Bangalore", "Mumbai", "Delhi", "Delhi", "Delhi", "Delhi", "Delhi", "Delhi", "Hyderabad"];
var arrSalary = ["100000", "200000", "300000", "400000", "500000", "600000", "700000", "800000", "900000", "1000000"];

for (let j in arrEmployeeId) {
    arrValue.push([arrEmployeeId[j], arrNames[j], arrAge[j], arrCity[j], arrSalary[j]]);
    arrTable.push(`<tr id="${"tableRow" + (parseFloat(j) + 1)}">\
        <td>${arrEmployeeId[j]}</td>\
        <td>${arrNames[j]}</td>\
        <td>${arrAge[j]}</td>\
        <td>${arrCity[j]}</td>\
        <td>${arrSalary[j]}</td>\
    </tr>`)
}

function add() {
    // we take the input values from the form
    let employeeId = document.getElementById("employee-id").value;
    let names = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let city = document.getElementById("city").value;
    let salary = document.getElementById("salary").value;

    // the input values are fed to two different arrays in two different ways
    // first we feed it to 'arrValue' array which just stores all the input values as arrays
    arrValue.push([employeeId, names, age, city, salary]);
    // console.log([employeeId, names, age, city, salary]);

    for (let check of [employeeId, names, age, city, salary]) {
        if (check == "") {
            alert("Invalid input was provided");
            console.log("Invalid input was provided");

            arrValue.pop();
            showAll(arrTable.join(""));

            return arrTable;
        }
    }
    // then we feed it to 'arrTable' array which stores it in '<tr>' syntax to create table values
    arrTable.push(`<tr id=\"${"tableRow" + arrTable.length}\">\
        <td>${employeeId}</td>\
        <td>${names}</td>\
        <td>${age}</td>\
        <td>${city}</td>\
        <td>${salary}</td>\
    </tr>`);

    // calling show table so that each change can be seen as it is made
    showAll(arrTable.join(""));

    return arrTable;
}
function del() {
    // we are allowing the user to delete elements of the table using either employee ID or their name
    // any other value may easily have multiple occurences and hence we are not allowing deletion through them
    let employeeId = document.getElementById("employee-id").value;
    let names = document.getElementById("name").value;

    for (var i in arrValue) {
        if (arrValue[i][0] == employeeId || arrValue[i][1] == names) {
            // splice(start, number of elements to remove, elements to add = "")
            arrTable.splice(i, 1);
            arrValue.splice(i, 1);
            changeIds(i, arrTable.length);

            break;
        }
    }
    
    showAll(arrTable.join(""));
    return arrTable;
}
function update() {
    let employeeId = document.getElementById("employee-id").value;

    for (var i in arrValue) {
        if (arrValue[i][0] == employeeId) {
            break;
        }
    }

    let names = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let city = document.getElementById("city").value;
    let salary = document.getElementById("salary").value;

    let tempArray = [employeeId, names, age, city, salary];

    for (let check in tempArray) {
        if (tempArray[check] != "") {
            arrValue[i][check] = tempArray[check];
        }
    }

    tempString = `<tr id=\"${"tableRow" + i}\">\
        <td>${arrValue[i][0]}</td>\
        <td>${arrValue[i][1]}</td>\
        <td>${arrValue[i][2]}</td>\
        <td>${arrValue[i][3]}</td>\
        <td>${arrValue[i][4]}</td>\
    </tr>`;
    arrTable.splice(i, 1, tempString);
    showAll(arrTable.join(""));

    return NaN;
}
function search() {
    let employeeId = document.getElementById("employee-id").value;
    let names = document.getElementById("name").value;
    let broke = false;

    for (var i in arrValue) {
        if (arrValue[i][0] == employeeId || arrValue[i][1] == names) {
            broke = true;
            break;
        }
    }

    if (broke) {
        document.getElementById("employee-id").value = arrValue[i][0];
        document.getElementById("name").value = arrValue[i][1];
        document.getElementById("age").value = arrValue[i][2];
        document.getElementById("city").value = arrValue[i][3];
        document.getElementById("salary").value = arrValue[i][4];
    }
    else {
        document.getElementById("employee-id").value = "000";
        document.getElementById("name").value = "Data not found";
        document.getElementById("age").value = "000";
        document.getElementById("city").value = "Data not found";
        document.getElementById("salary").value = "000";
    }

    return arrTable;
}
function first() {
    if (highlight) unhighlight();

    position = 1;
    document.getElementById(`${"tableRow" + position}`).style.backgroundColor = "rgb(111,208,239)";

    fillInput(position);
    highlight = true;
}
function previous() {
    if (highlight) unhighlight();
 
    if (position <= 1) {position = arrTable.length - 1;}
    else {position --;}

    document.getElementById(`${"tableRow" + position}`).style.backgroundColor = "rgb(111,208,239)";

    fillInput(position);
    highlight = true;
}
function next() {
    if (highlight) unhighlight();

    if (position == arrTable.length - 1) {position = 1;}
    else {position ++;}
    document.getElementById(`${"tableRow" + position}`).style.backgroundColor = "rgb(111,208,239)";

    fillInput(position);
    highlight = true;
}
function last() {
    if (highlight) unhighlight();
 
    position = arrTable.length - 1;
    document.getElementById(`${"tableRow" + position}`).style.backgroundColor = "rgb(111,208,239)";

    fillInput(position);
    highlight = true;
}
function showAll(stringOut = arrTable.join("")) {   
    document.getElementById("input-table").innerHTML = stringOut;
    highlight = false;
}
function unhighlight() {
    document.getElementById(`${"tableRow" + position}`).style.backgroundColor = ""
    highlight = false;
}
function fillInput(position) {
    document.getElementById("employee-id").value = arrValue[position][0];
    document.getElementById("name").value = arrValue[position][1];
    document.getElementById("age").value = arrValue[position][2];
    document.getElementById("city").value = arrValue[position][3];
    document.getElementById("salary").value = arrValue[position][4];
}
function changeIds(start, end) {
    let index = parseInt(start) + 1;
    while (index <= end) {
        console.log(`${"tableRow" + index}`, `${"tableRow" + (parseInt(index) - 1)}`);
        
        document.addEventListener("DOMContentLoaded", function () {
            document.getElementById(`${"tableRow" + index}`).id = `${"tableRow" + (parseInt(index) - 1)}`;
        });

        index ++;
    }
}
