class PhoneBook {
    constructor(/* userID */) {
        this.allContacts = [
            {
                name: 'Scarlet',
                number: '89128762312',
                userID: 0,
            },
            {
                name: 'Grandma',
                number: '89227663510',
                userID: 0,
            },
            {
                name: 'Santa',
                number: '89070064147',
                userID: 0,
            },
            {
                name: 'Michael Scarn',
                number: '87179001234',
                userID: 1,
            },
            {
                name: 'guy',
                number: '89198002143',
                userID: 2,
            },
            {
                name: 'Jesus',
                number: '89102533123',
                userID: 2,
            },
            {
                name: 'plumber',
                number: '89122583100',
                userID: 2,
            },
        ];

        this.contacts = [];
    }

    addNumber(name, number, userID) {
        this.contacts.push({
            name,
            number,
            userID
        });
        return true;
    }

    chooseContactsByUserID(userID) {
        this.contacts = [];
        this.allContacts.forEach(contact => {
            if (contact['userID'] == userID) this.contacts.push(contact);
        });
    }

    getContacts() {
        return this.contacts;
    }

    deleteNumber(prop, propName = 'name') {
        for (let i = 0; i < this.contacts.length; i++)
            if (this.contacts[i][propName] == prop) {
                this.contacts.splice(i, 1);
                return true;
            }
        return false;
    }

    searchContact(prop, propName = 'name') {
        for (let i = 0; i < this.contacts.length; i++)
            if (this.contacts[i][propName] == prop) {
                return this.contacts[i];
            }
        return false;
    }

    convertStrToNumber(str) {
        let convertedNumber = '';
        let start = 0;
        if (str.startsWith('+7')) {
            convertedNumber += '8';
            start = 2;
        };
        const allowedSymbols = ['(', ')', '-'];
        for (let i = start; i < str.length; i++) {
            if ((str[i] - 0)
                || str[i] === '0') {
                convertedNumber += str[i];
            } else if (allowedSymbols.indexOf(str[i]) != -1) {
                convertedNumber += '';
            } else return false;
        }

        //этот код допускает ввод номера телефона вообще с любыми символами
        //просто вычленяет цифры из строки
        /*if (str[0] === '+') convertedNumber += '+';
        for (let i = 0; i < str.length; i++) {
            if ((str[i] - 0) || str[i] === '0') convertedNumber += str[i];
        } */

        return convertedNumber;
    }

    validateNumber(number) {
        if ((number.length === 11) && (number.startsWith('89')))
            return true;
    }

    sortContactsByName() {
        let arr = this.contacts;
        let sortedArray = [];
        let arrayOfNames = [];
        for (let i = 0; i < arr.length; i++)
            arrayOfNames.push(arr[i]['name'].toLowerCase());
        arrayOfNames.sort();

        for (let k = 0; k < arrayOfNames.length; k++)
            for (let i = 0; i < arr.length; i++)
                if (arr[i]['name'].toLowerCase() === arrayOfNames[k]) sortedArray.push(arr[i]);
        return sortedArray;
    }
}

module.exports = PhoneBook;