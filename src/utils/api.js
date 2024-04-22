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