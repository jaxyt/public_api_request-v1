let exampleUser = {
    cell: "(439)-778-4969",
    dob: {
        age: 60,
        date: "1959-06-18T02:27:43Z"
    },
    email: "emma.peters@example.com",
    gender: "female",
    id: {
        name: "SSN",
        value: "461-03-7637"
    },
    location: {
        city: "san antonio",
        coordinates: {latitude: "85.5100", longitude: "175.5133"},
        postcode: 27974,
        state: "pennsylvania",
        street: "7607 lovers ln",
        timezone: {offset: "+3:00", description: "Baghdad, Riyadh, Moscow, St. Petersburg"}
    },
    login: {
        md5: "fd5cd92ec61f8c41db926065557c44f5",
        password: "dundee",
        salt: "xUjhCKKF",
        sha1: "2ca36c36b2eb40d3df23ee6672d499c8dd2b5d93",
        sha256: "d20533ae518746302aeca7a7b9bbcc58944bf439e876c025380bc065e2b1dfd8",
        username: "orangelion307",
        uuid: "4ba8c7cb-36c2-4179-9858-934a95655f4b"
    },
    name: {
        first: "emma",
        last: "peters",
        title: "mrs"
    },
    nat: "US",
    phone: "(333)-392-7575",
    picture: {
        large: "https://randomuser.me/api/portraits/women/57.jpg",
        medium: "https://randomuser.me/api/portraits/med/women/57.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/women/57.jpg"
    },
    registered: {
        age: 6,
        date: "2013-05-09T23:45:19Z"
    }
};

fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));