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
        usersInfo.push(profile);
        return profile;
    });
    console.log(users);
    return Promise.all(users);
}

function createModal(user) {
    const showModal = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture}" alt="profile picture">
                <h3 id="${user.id}" class="modal-name cap">${user.name}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.city}</p>
                <hr>
                <p class="modal-text">${user.phoneNumber}</p>
                <p class="modal-text">${user.address}</p>
                <p class="modal-text">Birthday: ${user.birthday}</p>
            </div>
        </div>
    </div>
    `;
    $('body').append(showModal);
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
            for (let i = 0; i < usersInfo.length; i++) {
                const modal = usersInfo[i];
                if (name === modal.id) {
                    createModal(modal);
                    document.getElementById('modal-close-btn').addEventListener('click', (e)=>{
                        document.querySelector('.modal-container').remove();
                    })
                    
                } 
            }
        })
    }
}


addToWebpage();

