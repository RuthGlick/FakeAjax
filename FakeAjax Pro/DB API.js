let users = [];
let currentUser;
let index;
let principle= {
    name: 'Zrubavel Zer',
    email: 'Zrubavel123@gmail.com',
    password: 8114,
    phon: '0548488114',
}; 
//The function initializes the memory
function initDB() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', '[]')
        initPrinciple();
    }
    else {
        users = JSON.parse(localStorage.getItem('users'));
        if (users[0].email != principle.email) {
            initPrinciple();
        }
    }
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', 'null')
    } else {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    if (!localStorage.getItem('index')) {
        localStorage.setItem('index', 'null')
    } else {
        index = JSON.parse(localStorage.getItem('index'));
    }

}

//The function initializes the manager
function initPrinciple() { 
        users.unshift(principle);
        localStorage.setItem('users', JSON.stringify(users));
}



//Principle--------------------------------------------------------------------
//GET

//// The principal receives the list of last names
function getFamilyPriciple() {
    let family = [...users];
    family.shift();
    let familyNames = [];
    family.forEach(element => {
        familyNames.push(element.familyName);
    });
    return familyNames;
}

// The principal receives the payment list of each family
function getPricePrinciple() {
    let family = [...users];
    family.shift();
    let familyPrice = [];
    family.forEach(element => {
        let obj = {
            familyName: element.familyName,
            price: getFee(element).fee
        }
        familyPrice.push(obj);
    });
    return familyPrice;
}


//The amount that goes into the manager's account
function getAllPrice() {
    let family = [...users];
    family.shift();
    let fee = 0;
    family.forEach(element => {
        fee += getFee(element).fee;
    });
    return { fee: fee };
}

//PUT
//log in as a principle
function putManager(manager) {
    if (manager.password == principle.password && manager.email === principle.email) {
        currentUser = users[0];
        index = 0;
        localStorage.setItem('currentUser', JSON.stringify(users[0]));
        localStorage.setItem('index', JSON.stringify(0));
        return currentUser;
    }
    return undefined
}
//-----------------------------------------------------------------------------------


//Family------------------------------------------------------------------------

//GET

// Retrieval for each family child-course, child-course
function getChildAndCorse() {
    let children = [];
    if (!currentUser.children.length) return undefined;
    currentUser.children.forEach(element => {
        let arrayCourses = [];
        element.child.courses.forEach(ele => {
            arrayCourses.push(ele.course)
        });
        let child = {
            name: element.child.name,
            courses: arrayCourses
        }
        children.push(child);
    });
    return children;
}

//A function that pulls out the payment to the family
function getFamilyFee() {
    return { fee: getFee(currentUser).fee };

}



// Pulling out an only child with his classes and the prices of his classes
function getCoursesChild(nameChild) {
    if (!currentUser.children)
        return [];
    currentUser.children.forEach(element => {
        if (element.child.name === nameChild) {
            return element;
        }
    });
}

function getCurrentUser() {
    return currentUser;

}

//POST
function postFamily(family) {
    let i = serchFamily(family, false);
    if (isNaN(i)) {
        users.push(family);
        currentUser = family;
        index = users.length - 1;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('index', JSON.stringify(users.length - 1));
        return currentUser;;
    }
    return undefined;
}

//DELETE

//delete a child from a course
function deleteChild(course) {
    currentUser.children.forEach(element => {
        if (element.child.name === course.obj.child) {
            for (let i = 0; i < element.child.courses.length; i++) {
                if (element.child.courses[i].course === course.obj.course) {
                    element.child.courses.splice(i, 1);
                    users.splice(index, 1);
                    users.push(currentUser);
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('index', JSON.stringify(users.length - 1));
                    index = users.length - 1;
                    return currentUser;
                }
            }
        }
    });
    return undefined;
}

//PUT

// Adding a new child to the system (+ class)
function putChild(child) {
    let isExist = false;
    currentUser.children.forEach(element => {
        console.log(element.child.name === child.child.name);
        if (element.child.name === child.child.name) {
            isExist = true;
            return;
        }
    });
    if (isExist) {
        return undefined;
    }
    currentUser.children.push(child);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    users.splice(index, 1);
    users.push(currentUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('index', JSON.stringify(users.length - 1));
    index = users.length - 1;
    return currentUser;
}

//log in
function putCurrentUser(user) {
    let i = serchFamily(user, true);
    if (!isNaN(i)) {
        localStorage.setItem('currentUser', JSON.stringify(users[i]));
        localStorage.setItem('index', JSON.stringify(i));
        index = i;
        currentUser = users[i];
        return currentUser;
    }
    return undefined;
}

//log out
function putCurrentUserNull() {
    localStorage.setItem('currentUser', 'null');
    localStorage.setItem('index', NaN);
    index = NaN;
    currentUser = null;
    return { number: 5 };
}

// Adding a new course to the child
function putCourse(child) {
    let isExist = false;
    currentUser.children.forEach(element => {
        if (element.child.name === child.child.name) {
            element.child.courses.forEach(ele => {
                if (ele.course === child.child.courses.course) {
                    isExist = true;
                    return;
                }
            });
            if (isExist) {
                return undefined;
            }
            element.child.courses.push(child.child.courses);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            users.splice(index, 1);
            users.push(currentUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('index', JSON.stringify(users.length - 1));
            index = users.length - 1;
            return currentUser;
        }
    });
    return undefined;
}

//HELP FUNCTIONS

//search a family in current user
function serchFamily(user, islog) {
    for (let i = 0; i < users.length; i++) {
        if ((!islog && users[i].email === user.email) || (islog && (users[i].password === user.password || principle.password == user.password) && users[i].email === user.email)) {
            return i;
        }
    }
    return NaN;
}

// Payment computer for one user
function getFee(user) {
    let fee = 0;
    user.children.forEach(element => {
        element.child.courses.forEach(ele => {
            console.log(ele);
            fee += ele.price;
        });
    });
    return { fee: fee };
}


document.addEventListener('DOMContentLoaded', initDB);