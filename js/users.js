const users = [];

async function fetchUsers(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

Promise.all(fetchUsers('https://randomuser.me/api/?results=12'))
    .then