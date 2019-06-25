const searchContainer = $('div.search-container');
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
            <button type="button" id="modal-btn-previous" class="modal-btn-toggle">Previous</button>
            <button type="button" id="modal-btn-next" class="modal-btn-toggle">Next</button>
        </div>
    </div>
    `;
    $('body').append(showModal);

    document.getElementById('modal-btn-previous').addEventListener('click', (e)=>{
        for (let i = 0; i < usersInfo.length; i++) {
            const currentUser = usersInfo[i];
            if (currentUser.id === e.target.previousElementSibling.children[1].id) {
                if (i > 0) {
                    const previousUser = usersInfo[i-1];
                    document.getElementById('modal-btn-previous').removeEventListener('click', MouseEvent);
                    document.getElementById('modal-btn-next').removeEventListener('click', MouseEvent);
                    document.querySelector('.modal-container').remove();
                    createModal(previousUser);
                    break;
                }
            }
        }
    });

    document.getElementById('modal-btn-next').addEventListener('click', (e)=>{
        for (let i = 0; i < usersInfo.length; i++) {
            const currentUser = usersInfo[i];
            if (currentUser.id === e.target.previousElementSibling.previousElementSibling.children[1].id) {
                if (i < usersInfo.length - 1) {
                    const nextUser = usersInfo[i+1];
                    document.getElementById('modal-btn-previous').removeEventListener('click', MouseEvent);
                    document.getElementById('modal-btn-next').removeEventListener('click', MouseEvent);
                    document.querySelector('.modal-container').remove();
                    createModal(nextUser);
                    break;
                }
            }
        }
    });

    document.getElementById('modal-close-btn').addEventListener('click', (e)=>{
        document.querySelector('.modal-container').remove();
    });
    
}

async function addToWebpage() {
    const profiles = await getUsers('https://randomuser.me/api/?results=12');
    generateProfile(profiles);
    createSearchBar();
    filterSearchProfiles();
    toggleModals();
    console.log(usersInfo);
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
                    
                } 
            }
        })
    }
}

function createSearchBar() {
    const htmlSearch = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`;
    searchContainer.append(htmlSearch);
}

function filterSearchProfiles() {
    $('#search-input').on('keyup',(e)=>{
        console.log(e.target.value);
        let nameReg = new RegExp(e.target.value, 'gi');
        for (let i = 0; i < document.getElementsByClassName('card').length; i++) {
            const user = document.getElementsByClassName('card')[i];
            if (nameReg.test(user.children[1].children[0].textContent)) {
                user.style.display = '';
            } else {
                user.style.display = 'none';
            }
        }
    });

    $('#search-submit').on('click', (e)=>{
        console.log(e.target.value);
        let nameReg = new RegExp(e.target.value, 'gi');
        for (let i = 0; i < document.getElementsByClassName('card').length; i++) {
            const user = document.getElementsByClassName('card')[i];
            if (nameReg.test(user.children[1].children[0].textContent)) {
                user.style.display = '';
            } else {
                user.style.display = 'none';
            }
        }
    })
}

function toggleModals() {
    
}

addToWebpage();


