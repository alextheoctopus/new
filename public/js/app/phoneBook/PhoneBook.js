class PhoneBook {
    constructor(userInfo) {

        document.body.innerHTML = phoneBookTemplate();

        this.userID = userInfo['userID'];
        this.userName = userInfo['user']['name'];

        this.greetings = document.getElementById('greetings');
        this.nameInput = document.getElementById('nameInput');
        this.numberInput = document.getElementById('numberInput');
        this.updateBtn = document.getElementById('updateBtn');
        this.addContactBtn = document.getElementById('addContactBtn');
        this.output = document.getElementById('output');
        this.searchContactBtn = document.getElementById('searchContactBtn');
        this.sortCheckBox = document.getElementById('sort');

        this.greetings.innerHTML = `Добро пожаловать, ${this.userName}! <br><br>`

        this.addEventListeners();
        this.chooseContactsByUserID();
        this.update();
    }
    
    async chooseContactsByUserID(){
        const answer = await fetch(
            `/phoneBook/${this.userID}`
        );
        return answer.json();
    }

    async getAllNumbers() {
        const answer = await fetch(
            `/phoneBook`
        );
        return answer.json();
    }

    async addNumber(name, number) {
        const answer = await fetch(
            `/phoneBook/addNumber/${name}/${number}/${this.userID}`
        );
        return answer.json();
    }

    async deleteNumber(prop) {
        const answer = await fetch(
            `/phoneBook/deleteNumber/${prop}`
        );
        return answer.json();
    }

    async searchContact(prop) {
        const answer = await fetch(
            `/phoneBook/searchContact/${prop}`
        );
        return answer.json();
    }

    async sortContacts() {
        const answer = await fetch(
            `/phoneBook/sortContactsByName`
        );
        return answer.json();
    }


    async deleteContact(elem) {
        const answer = await this.deleteNumber(elem.dataset.name);
        const data = answer['data'];
        answer ? this.update() : this.output.innerHTML = data.error;
    }

    async update() {

        this.output.innerHTML = '';

        let answer = this.sortCheckBox.checked ? await this.sortContacts() : await this.getAllNumbers();
        let contacts = answer['data'];

        contacts.forEach(async (contact) => {
            const div = document.createElement('div');
            const deleteContactBtn = document.createElement('button');

            deleteContactBtn.dataset.name = contact.name;
            deleteContactBtn.addEventListener('click', () => this.deleteContact(deleteContactBtn));
            deleteContactBtn.setAttribute('class', 'deleteBtns');

            div.setAttribute('class', 'contacts');
            div.innerHTML += `${contact.name}: ${contact.number}`;
            div.appendChild(deleteContactBtn);

            this.output.appendChild(div);
        });

    }

    addEventListeners() {
        this.addContactBtn.addEventListener('click', async () => {
            const name = this.nameInput.value;
            const number = this.numberInput.value;
            const answer = await this.addNumber(name, number);
            const data = answer['data'];
            //TODO
            data ? this.update() : this.output.innerHTML = data.error;
        });

        this.searchContactBtn.addEventListener('click', async () => {
            const name = this.nameInput.value;
            const number = this.numberInput.value;
            const answer = name ? await this.searchContact(name) : await this.searchContact(number);
            const data = answer['data'];
            //TODO
            data ? this.output.innerHTML = `${data['name']} ${data['number']}` : this.output.innerHTML = data.error;
        });

        this.sortCheckBox.addEventListener('change', () => this.update());
        this.updateBtn.addEventListener('click', () => this.update());
    }

}