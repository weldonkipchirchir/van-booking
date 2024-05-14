import { getToken } from "./utils";
export async function getVans() {
    const res = await fetch("/api/vans");
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data.vans;
}

export async function getVans1() {
    const token = getToken();
    const res = await fetch("http://localhost:8080/api/v1/vans/vans", {
        headers: {
          Authorization: `Bearer ${token}` // Add Authorization header with the token
        }
      });
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data
}



export async function getHostVans() {
    const res = await fetch("/api/host/vans");
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data.vans;
}

export async function getHostVans2() {
    const token = getToken();
    const res = await fetch(`http://localhost:8080/api/v1/vans/host/vans`, {
        headers: {
          Authorization: `Bearer ${token}` // Add Authorization header with the token
        }
      });    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data;
}
export async function getUsersBookings() {
    const token = getToken();
    const res = await fetch(`http://localhost:8080/api/v1/booking/booking`, {
        headers: {
          Authorization: `Bearer ${token}` // Add Authorization header with the token
        }
      });    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data;
}
export async function getHostBookings() {
    const token = getToken();
    const res = await fetch(`http://localhost:8080/api/v1/booking/booking/host`, {
        headers: {
          Authorization: `Bearer ${token}` // Add Authorization header with the token
        }
      });    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data;
}

export async function getHostVanId(vanId) {
    const res = await fetch(`/api/host/vans/${vanId}`);
    if (!res.ok) {
        throw { 
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data.vans;
}

export async function getVanListVanId(id) {
    const res = await fetch(`/api/vans/vans-list/${id}`);
    if (!res.ok) {
        throw { 
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data.vans;
}

export async function getVanListVanId1(id) {
    const token = getToken();
    const res = await fetch(`http://localhost:8080/api/v1/vans/vans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Add Authorization header with the token
        }
      });
    if (!res.ok) {
        throw { 
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data;
}

export async function loginUser(creds) {
    const res = await fetch("/api/sign-in",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

export async function loginUser2(creds) {    
const res = await fetch("http://localhost:8080/api/v1/users/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

export async function createUser(creds) {
    const res = await fetch("http://localhost:8080/api/v1/users/register",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
export async function logOutUser() {
    const res = await fetch("http://localhost:8080/api/v1/users/logout",
        { method: "post", body: JSON.stringify() }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

  
export async function income() {
    const token = getToken();
    const res = await fetch(`http://localhost:8080/api/v1/booking/income`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header with the token
        },
      });
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

export async function reviews() {
    const token = getToken();
    const res = await fetch(`http://localhost:8080/api/v1/booking/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header with the token
        },
      });
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

// api.js
export async function averageIncome() {
    const token = getToken();
    const res = await fetch(`http://localhost:8080/api/v1/booking/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header with the token
        },
    });
    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        };
    }

    // Format the data to match the structure of complaintsData
    const formattedData = data.map(item => ({
        complaint: item.Month,
        count: item.TotalIncome
    }));

    return formattedData;
}

