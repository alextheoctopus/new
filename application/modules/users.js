const { setDefaultResultOrder } = require("dns");

class Users {
    constructor() {
        this.users = [
            {
                name: 'Molly',
                login: 'molly1955',
                password: '000'
            },
            {
                name: 'Василий',
                login: 'vasiliy_surganov',
                password: 'jupiter01'
            },
            {
                name: 'Jack',
                login: 'aaa',
                password: '111'
            },
        ];
    }

    getUser(login, password) {
        for (let i = 0; i < this.users.length; i++) {
            let user = this.users[i];
            if ((login === user['login']) && (password === user['password'])) {
                return {userID: i, user};
            }
        }
    }

    //addUser(name, login, password) { }
}

module.exports = Users;