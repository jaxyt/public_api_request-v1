const searchContainer = $('div .search-container');
const gallery = $('#gallery');
const birthdayRegex = /(\d\d\d\d)-(\d\d)-(\d\d)/g;
const usersInfo = [];

async function getUsers(url) {
    const usersResponse = await fetch(url);
    const usersJSON = await usersResponse.json();
    const users = usersJSON.results.map(async (user) =>{
        const profile = {}
        const dateOfBirth = /(\d\d\d\d)-(\d\d)-(\d\d)/g.exec(user.dob.date);
        profile.id = `${user.name.first}-${user.name.last}`;
        profile.name = `${user.name.first} ${user.name.last}`;
        profile.picture = user.picture.large;
        profile.email = user.email;
        profile.city = user.location.city;
        profile.state = user.location.state;
        profile.address = `${user.location.street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;
        profile.phoneNumber = user.cell;
        profile.birthday = `${dateOfBirth[2]}/${dateOfBirth[3]}/${dateOfBirth[1]}`;
        return profile;
    });
    console.log(users);
    return Promise.all(users);
}

function createModal(user) {
    
}

async function addToWebpage() {
    const profiles = await getUsers('https://randomuser.me/api/?results=12');
    generateProfile(profiles);
}


function generateProfile(data) {
    data.map(profile => {
        htmlPreview = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${profile.picture}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="${profile.id}" class="card-name cap">${profile.name}</h3>
                <p class="card-text">${profile.email}</p>
                <p class="card-text cap">${profile.city}, ${profile.state}</p>
            </div>
        </div>
        `;
        gallery.append(htmlPreview);
    })
    const users = document.getElementsByClassName('card');
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        user.addEventListener('click', (e)=>{
            const name = user.children[1].firstElementChild.id;
            console.log(name);
        })
    }
}


addToWebpage();
