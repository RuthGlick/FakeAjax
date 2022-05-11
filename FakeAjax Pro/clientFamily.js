class Family {
    constructor(familyName, email, phone, adress, password, children) {
        this.familyName = familyName;
        this.email = email;
        this.phone = phone;
        this.adress = adress;
        this.password = password;
        this.children = children;
    }
}

class Child {
    constructor(name, age, courses) {
        this.name = name;
        this.age = age;
        this.courses = courses;
    }
}

class Course {
    constructor(course, price) {
        this.course = course;
        this.price = price;
    }
}

let arrCourse = ["Backing", "Excrising", "Singing","Sewing", "Swiming", "Drawing"];

//-----------------------------------------------------
//GET

//print my children and courses
function getChildren() {
    let fxhr = new FXMLHttpRequest();
    fxhr.open("GET", "coursesUser/getChildAndCorse", {});
    let response = fxhr.send();
    console.log(`status:${response.status}  statuseText:${response.statusText}`);
    if (response.status == 200) {
        const ans = answer();

        const table = document.createElement("table");
        for (let i = 0; i < response.body.length; i++) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.classList.add("table-td");
            td.innerHTML = response.body[i].name;
            tr.appendChild(td);

            for (let j = 0; j < response.body[i].courses.length; j++) {
                const td = document.createElement("td");
                td.classList.add("table-td");
                td.innerHTML = response.body[i].courses[j];
                tr.appendChild(td);

            }
            table.appendChild(tr);
        }
        ans.appendChild(table);
    }
    window.scrollTo(0, document.body.scrollHeight);
}

//get the fee i paid for month
function getMyFee() {
    let myFee;
    let fxhr = new FXMLHttpRequest;
    fxhr.open("GET", "coursesUser/getFamilyFee", {});
    myFee = fxhr.send();
    console.log(`status:${myFee.status}  statuseText:${myFee.statusText}`);
    if (myFee.status == 200) {
        const ans = answer();
        const div = document.createElement("div");
        console.log(myFee.body)
        div.innerHTML = myFee.body.fee;
        ans.appendChild(div);
    }
    window.scrollTo(0, document.body.scrollHeight);

}

//get the button of  childern
function getCourseOfKid() {
    let fxhr = new FXMLHttpRequest();
    fxhr.open("GET", "coursesUser/getChildAndCorse", {});
    let response = fxhr.send();
    console.log(`status:${response.status}  statuseText:${response.statusText}`);
    if (response.status == 200) {
        const ans = answer();
        for (let i = 0; i < response.body.length; i++) {
            const button = document.createElement('button');
            button.className += "childButton";
            button.innerHTML = response.body[i].name;
            button.addEventListener('click', () => { coursesChild(response.body[i].courses) });
            ans.appendChild(button);
        }
        const div = document.createElement('div');
        div.id = "childCourse";
        ans.appendChild(div);
    }
    window.scrollTo(0, document.body.scrollHeight);
    
}

//get the course of a child(calling in getCourseOfKid function)
function coursesChild(courses) {
    document.getElementById('childCourse').innerHTML = "";
    for (let i = 0; i < courses.length; i++) {
        const p = document.createElement('p');
        p.classList.add("p");
        p.innerHTML = `${i + 1}. ${courses[i]}`;
        document.getElementById('childCourse').appendChild(p);
    }
    window.scrollTo(0, document.body.scrollHeight);

}

//------------------------------------------------------------------------------------
//PUT

//add new child
function creatChild() {

    const ans = answer();
    const yourChild = document.createElement("input");
    yourChild.setAttribute('placeholder', "enter your new child");
    const age = document.createElement("input");
    age.setAttribute('placeholder', "enter your age of child");

    ans.appendChild(yourChild);
    ans.appendChild(age);
    let val = "choice";
    let placeholder1 = "enter your new course";
    let input = inputOption(arrCourse, placeholder1, val);

    let sub = submit();

    sub.addEventListener("click", () => {
        if (input.value !== "" && yourChild.value !== "" && age.value !== "") {
            let childCourses = [new Course(input.value, getPrice(input.value))];
            let child = new Child(yourChild.value, age.value, childCourses)

            let fxhr = new FXMLHttpRequest();
            fxhr.open("PUT", "putCourse/putChild", { child });
            let response = fxhr.send();
            console.log(`status:${response.status}  statuseText:${response.statusText}`);
            answer();
        }

    })
    ans.appendChild(sub);
    window.scrollTo(0, document.body.scrollHeight);

}

//add new course
function newCourse() {
    const ans = answer();

    let name1 = selectChild();
    val = "myChoices";
    placeholder1 = "enter your course";
    let courseName = inputOption(arrCourse, placeholder1, val);

    let sub = submit()
    sub.addEventListener("click", () => {
        if (name1.value !== "" && courseName.value !== "") {
            // let newCourse = new Course(courseName.value, getPrice(courseName.value));
            console.log( getPrice(courseName.value));
            let child = { name: name1.value, courses: new Course(courseName.value, getPrice(courseName.value)) };
            let fxhr = new FXMLHttpRequest();
            fxhr.open("PUT", "putCourse/putCourse", { child });
            let response = fxhr.send();
            console.log(`status:${response.status}  statuseText:${response.statusText}`);
            answer();
        }
    })
    window.scrollTo(0, document.body.scrollHeight);

}
//-------------------------------------------------------------


//DELETE
function deleteCourse() {
    answer();
    let myName = selectChild();
    let val = "myChoices";
    let placeholder1 = "enter your course";
    let courseName = inputOption(arrCourse, placeholder1, val);
    let sub = submit();
    sub.addEventListener("click", () => {
        if (myName.value !== "" && courseName.value !== "") {
            let obj = {
                child: myName.value,
                course: courseName.value
            };

            let fxhr = new FXMLHttpRequest();
            fxhr.open("DELETE", "delete/deleteChild", { obj });
            let response = fxhr.send();
            console.log(`status:${response.status}  statuseText:${response.statusText}`);
            answer();
        }
    });
    window.scrollTo(0, document.body.scrollHeight);

}

//-----------------------------------------------------------------------
//help functions

//select child
function selectChild() {
    let fxhr = new FXMLHttpRequest();
    fxhr.open("GET", "coursesUser/getChildAndCorse", {});
    let response = fxhr.send();
    console.log(`status:${response.status}  statuseText:${response.statusText}`);

    let val = "choices";
    let placeholder1 = "enter your child";
    let arr = [];
    for (let i = 0; i < response.body.length; i++) {
        arr.push(response.body[i].name);
    }
    return inputOption(arr, placeholder1, val);
}

//creat datalist
function inputOption(arr, placeholder1, val) {

    const input = document.createElement("input");
    input.setAttribute('placeholder', placeholder1);
    input.setAttribute('list', val);
    const datalist = document.createElement('datalist');
    datalist.id = val;
    for (let i = 0; i < arr.length; i++) {
        const option = document.createElement('option');
        option.value = arr[i];
        datalist.appendChild(option);
    }
    ans.appendChild(input);
    ans.appendChild(datalist);
    return input;
}

//creat sumbit
function submit() {
    const submit = document.createElement("button");
    submit.setAttribute('type', "submit");
    submit.innerHTML= "send";
    ans.appendChild(submit);
    return submit;
}

//return the price of a course
function getPrice(input) {
    switch (input) {
        case "Backing":
            return 300;
            break;

        case "Excrising":
            return 200;
            break;

        case "Singing":
            return 250;
            break;

        case "Sewing":
            return 250;
            break;

        case "Swiming":
            return 400;
            break;

        case "Drawing":
            return 320;
            break;
        default:
            break;
    }
    window.scrollTo(0, document.body.scrollHeight);
}

//clear the div of response
function answer() {
    const ans = document.getElementById("ans");
    if (ans.children.length > 0) {
        ans.innerHTML = "";
    }
    return ans;
}
