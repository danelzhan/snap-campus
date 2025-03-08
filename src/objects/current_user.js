import User from './user.js';

class CurrentUser extends User {
    constructor(uid, username, first_name, last_name, location, friends) {
        super(uid, username, first_name, last_name, location);
        this.friends = friends;
    }
}

export default CurrentUser;