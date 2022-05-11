//GET ADMINISTOR

//get list of all the users
function listFamily() {
    let fxhr = new FXMLHttpRequest;
    fxhr.open('GET', "admanistar/getFamilyPriciple", {});
    let response = fxhr.send();
    console.log(`status:${response.status}  statuseText:${response.statusText}`);
    if (response.status == 200) {
        let ans = answerManager();
        let ul=document.createElement('ul');
        for (let i = 0; i < response.body.length; i++) {
            let li=document.createElement('li');
            li.innerHTML=response.body[i];
            ul.appendChild(li);
        }
        ans.appendChild(ul);

    }
}

//get a table with the names of families and the fee they paid for month
function listfeeFamilies() {
    let feeFamily;
    let fxhr = new FXMLHttpRequest();
    fxhr.open("GET", "listFeeAndFamily/getPricePrinciple", {})
    feeFamily = fxhr.send();
    console.log(`status:${feeFamily.status}  statuseText:${feeFamily.statusText}`);
    if (feeFamily.status == 200) {
        const ans = answerManager();
        const table = document.createElement("table");
        for (let i = 0; i < feeFamily.body.length; i++){
            let tr=document.createElement('tr');
            let td1=document.createElement('td');
            let td2=document.createElement('td');
            td1.innerHTML=feeFamily.body[i].familyName;
            td2.innerHTML=feeFamily.body[i].price;
            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
        }
        ans.appendChild(table);
    }

}


//get the fee the admenistor gain for month
function monthSum() {
    let Fee;
    let fxhr = new FXMLHttpRequest();
    fxhr.open("GET", "coursesUser/getAllPrice", {});
    Fee = fxhr.send();
    console.log(`status:${Fee.status}  statuseText:${Fee.statusText}`);
    if (Fee.status == 200) {
        console.log(Fee.body.fee);
        const ans = answerManager();
        const div = document.createElement("div");
        div.innerHTML = Fee.body.fee;
        ans.appendChild(div);
    }
}

//clear the div of response
function answerManager() {
    const ans = document.getElementById("ansManager");
    if (ans.children.length > 0) {
        ans.innerHTML = "";
    }
    return ans;
}
