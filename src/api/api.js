export async function API_SIGN_UP(login, password, name) {
    const body = {login: login, password: password, name: name}
    let result = [null, null]
    try {
        result[0] = await fetch("http://localhost:8085/user/create", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json'
            }
        });
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Communication Error"}
        return result
    }
    if (!result[0].ok) {
        result[1] = {status: result[0].status, message: result[0].statusText}
        return result
    }
    try {
        result[0] = await result[0].text();
        localStorage.setItem("jwt", result[0]);
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Parsing Error"}
        return result

    }
    return result
}

export async function API_SIGN_IN(login, password) {
    let result = [null, null]
    const body = {login: login, password: password}
    try {
        result[0] = await fetch("http://localhost:8085/user/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json'
            }
        });
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Communication Error"}
        return result
    }
    if (!result[0].ok) {
        result[1] = {status: result[0].status, message: result[0].statusText}
        return result
    }
    try {
        result[0] = await result[0].text();
        localStorage.setItem("jwt", result[0]);
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Parsing Error"}
        return result

    }
    return result
}

export function API_LOG_OUT() {
    let result = [null, null]
    try {
        localStorage.removeItem("jwt");
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Error Logging out"}
        return result
    }
    return result
}

export async function API_GET_ALL_ACTIVITIES(start, end) {
    let result = [null, null]
    try {
        result[0] = await fetch(`http://localhost:8085/activity?start=${start}&end=${end}`, {
            headers: {
                'Content-type': 'application/json'
            }
        });
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Communication Error"}
        return result
    }
    if (!result[0].ok) {
        result[1] = {status: result[0].status, message: result[0].statusText}
        return result
    }
    try {
        result[0] = await result[0].json();
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Parsing Error"}
        return result

    }
    return result
}

export async function API_GET_YOUR_ACTIVITIES() {
    const token = localStorage.getItem("jwt")
    let result = [null, null]
    try {
        result[0] = await fetch(`http://localhost:8085/activity`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Communication Error"}
        return result
    }
    if (!result[0].ok) {
        result[1] = {status: result[0].status, message: result[0].statusText}
        return result
    }
    try {
        result[0] = await result[0].json();
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Parsing Error"}
        return result

    }
    return result
}

export async function API_CREATE_ACTIVITIES(title, description, start, end) {
    const body = {
        title: title,
        description: description,
        start: start,
        end: end
    }
    const token = localStorage.getItem("jwt")
    let result = [null, null]
    try {
        result[0] = await fetch("http://localhost:8085/activity", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        });
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Communication Error"}
        return result
    }
    if (!result[0].ok) {
        result[1] = {status: result[0].status, message: result[0].statusText}
        return result
    }
    try {
        result[0] = await result[0].text();
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Parsing Error"}
        return result

    }
    return result
}

export async function API_DELETE_ACTIVITIES(id) {
    let result = [null, null]
    const token = localStorage.getItem("jwt")
    try {
        result[0] = await fetch(`http://localhost:8085/activity/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Communication Error"}
        return result
    }
    console.log(result[0])
    if (!result[0].ok) {
        result[1] = {status: result[0].status, message: result[0].statusText}
        return result
    }
    try {
        result[0] = await result[0].text();
    } catch (e) {
        console.error(e)
        result[1] = {status: null, message: "Parsing Error"}
        return result

    }
    return result
}
