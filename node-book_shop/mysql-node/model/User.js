class User {
    constructor(username, password, tel = '', email = '', gender = '', signtime = '') {
        this.username = username;
        this.password = password;
        this.tel = tel;
        this.email = email;
        this.gender = gender;
        this.signtime = signtime;
    }
}

module.exports = User;