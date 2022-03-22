class Authorization {
    constructor() {
        this.login = document.getElementById('login');
        this.password = document.getElementById('password');
        this.signInBtn = document.getElementById('signInBtn');

        this.addEventListeners();
    }

    async signIn(login, password) {
        const answer = await fetch(
            `/signIn/${login}/${password}`
        );
        return answer.json();
    }

    addEventListeners() {
        this.signInBtn.addEventListener('click', async () => {
            const login = this.login.value;
            const password = this.password.value;
            const answer = await this.signIn(login, password);
            const data = answer['data'];
            /* const userID = data['userID'];
            const user = data['user']; */
            if (data) {
                new PhoneBook(data);
            } else this.output.innerHTML = data.error;
        });
    }

}