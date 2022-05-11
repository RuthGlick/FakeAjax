function server(fajax) {
    switch (fajax.method) {
        case 'GET':
            try {
                obj = gets(fajax.url.split("/")[1], fajax.dataBody);
                return { status: "200", statusText: "ok", body: obj };
            } catch (error) {
                return { status: "500", statusText: error };
            }
        case 'PUT':
            try {
                obj = puts(fajax.url.split("/")[1], fajax.dataBody);
                return { status: "200", statusText: "ok" };
            } catch (error) {
                return { status: "500", statusText: error };
            }
        case 'POST':
            try {
                obj = posts(fajax.url.split("/")[1], fajax.dataBody);
                return { status: "200", statusText: "ok" };
            } catch (error) {
                return { status: "500", statusText: error };
            }
        case 'DELETE':
            try {
                obj = delets(fajax.url.split("/")[1], fajax.dataBody);
                return { status: "200", statusText: "ok" };
            } catch (error) {
                return { status: "500", statusText: error };
            }
    }
}

function gets(url, body) {
    let obge;
    switch (url) {
        case "getFamilyPriciple":
            obje = getFamilyPriciple();
            if (obje == undefined)
                throw new Error("not found")
            return obje;
        case "getPricePrinciple":
            obje = getPricePrinciple();
            if (obje == undefined)
                throw new Error("not found")
            return obje;
        case "getAllPrice":
            obje = getAllPrice();
            if (obje == undefined)
                throw new Error("not found")
            return obje;
        case "getChildAndCorse":
            obje = getChildAndCorse();
            if (obje == undefined)
                throw new Error("not found")
            return obje;
        case "getFamilyFee":
            obje = getFamilyFee();
            if (obje == undefined)
                throw new Error("not found")
            return obje;
        case "getCoursesChild":
            obje = getCoursesChild(body);
            if (obje == undefined)
                throw new Error("not found")
            return obje;
        case "getCurrentUser":
            obje = getCurrentUser(body);
            if (obje == undefined)
                throw new Error("not found")
            return obje;
    }
}

function puts(url, body) {
    switch (url) {
        case "putChild":
            obje = putChild(body);
            if (obje == undefined)
                throw new Error("not found")
            return obje;
        case "putCourse":
            obje = putCourse(body);
            if (obje == undefined)
                throw new Error("not found")
            return obje;
        case "putCurrentUser":
            obje = putCurrentUser(body);
            if (obje == undefined)
                throw new Error("not found")
            return obje;
        case "putCurrentUserNull":
            obje = putCurrentUserNull();
            if (obje == undefined)
                throw new Error("not found")
            return obje;
        case "putManager":
            obje = putManager(body);
            if (obje == undefined)
                throw new Error("not found")
            return obje;
    }

}

function posts(url, body) {
    obje = postFamily(body);
    if (obje == undefined)
        throw new Error("not found")
    return obje;
}

function delets(url, body) {
    obje = deleteChild(body);
    if (obje == undefined)
        throw new Error("not found")
    return obje;

}