const searchContainer = $('div .search-container');
const gallery = $('#gallery');
const birthdayRegex = /(\d\d\d\d)-(\d\d)-(\d\d)/g;
const users = [];



console.log(searchContainer);
console.log(gallery);


function fetchUsers(url) {
    for (let i = 0; i < 12; i++) {
        fetch(url)
        .then(checkStatus)
        .then(response =>  response.json())
        .then(data => data.results[0])
        .then(filterUserInfo)
        .then(user => {
            userAddPreview(user);
            userAddModal(user);
        })
        .catch(err => console.log(err)); 
        
    }
}

function filterUserInfo(userInfo) {
    const user = {};
    const dateOfBirth = /(\d\d\d\d)-(\d\d)-(\d\d)/g.exec(userInfo.dob.date);
    console.log(dateOfBirth);
    user.id = `${userInfo.name.first}-${userInfo.name.last}`;
    user.profilePicture = userInfo.picture.large;
    user.first = userInfo.name.first;
    user.last = userInfo.name.last;
    user.email = userInfo.email;
    user.city = userInfo.location.city;
    user.state = userInfo.location.state
    user.phoneNumber = userInfo.cell;
    user.address = `${userInfo.location.street}, ${user.city}, ${user.state} ${userInfo.location.postcode}`;
    user.birthday = `${dateOfBirth[2]}/${dateOfBirth[3]}/${dateOfBirth[1]}`;
    users.push(user);
    return user;
}

function userAddPreview(user) {
    const htmlProfilePreview = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.profilePicture}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="${user.id}" class="card-name cap">${user.first} ${user.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.city}, ${user.state}</p>
        </div>
    </div>`;
    gallery.append(htmlProfilePreview);
}

function userAddModal(user) {
    const htmlProfileModal = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.profilePicture}" alt="profile picture">
                <h3 id="${user.id}" class="modal-name cap">${user.first} ${user.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.city}</p>
                <hr>
                <p class="modal-text">${user.cell}</p>
                <p class="modal-text">${user.address}</p>
                <p class="modal-text">Birthday: ${user.birthday}</p>
            </div>
        </div>
    </div>`;
}



function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(Error('checkStatus error: '));
    }
}



// fetch('https://randomuser.me/api/')
//         .then(checkStatus)
//         .then(response => response.json())
//         .then(data => console.log(data.results[0]))
//         .catch(err => console.log(err));

fetchUsers('https://randomuser.me/api/');

gallery.on('click', (e)=>{
    console.log(e);
    console.log(e.target);
    console.log(typeof e.target);
    console.log(e.target.className);
    console.log(e.target.id);
})

let exampleUser = {
    results:[
        {
            gender:"female",
            name:{
                title:"miss",
                first:"karen",
                last:"welch"
            },
            location:{
                street:"2783 st. john’s road",
                city:"carlisle",
                state:"humberside",
                postcode:"R60 5UH",
                coordinates:{
                    latitude:"6.2808",
                    longitude:"51.6074"
                },
                timezone:{
                    offset:"+6:00",
                    description:"Almaty, Dhaka, Colombo"
                }
            },
            email:"karen.welch@example.com",
            login:{
                uuid:"8f1c4c28-d954-469f-962c-7c27f2fdfbf0",
                username:"smallladybug814",
                password:"brandon1",
                salt:"JvrAL8wy",
                md5:"3205fd533c72c608d29a63f87a19c1db",
                sha1:"42e74f00cde43ea6997731b35666d2d9b8a507e4",
                sha256:"f04b504ee97844637b7d624d1d9cd6ee58cb56ba5bb0bd867b628e38087c0255"
            },
            dob:{
                date:"1954-02-28T03:45:09Z",
                age:65
            },
            registered:{
                date:"2009-11-19T05:53:10Z",
                age:9
            },
            phone:"017684 38465",
            cell:"0740-788-756",
            id:{
                name:"NINO",
                value:"MX 68 34 16 U"
            },
            picture:{
                large:"https://randomuser.me/api/portraits/women/94.jpg",
                medium:"https://randomuser.me/api/portraits/med/women/94.jpg",
                thumbnail:"https://randomuser.me/api/portraits/thumb/women/94.jpg"
            },
            nat:"GB"
        }
    ],
    info:{
        seed:"f3c81485d5c913fc",
        results:1,
        page:1,
        version:"1.2"
    }
}
