import {observable, action} from "mobx";
import axios from 'axios';

class UserStore {
    static __instance = null;
    static getInstance() {
        if (UserStore.__instance === null) {
            UserStore.__instance = new UserStore();
        }
        return UserStore.__instance;
    }
    constructor() {
        UserStore.__instance = this;
    }

    @observable item = null;
    @action fetchItem = async (id) => {
        try {
            this.item = null;
            let response = await axios({
                url: 'http://localhost:8080/api/user/id?id=' + id,
                method: 'get',
                headers : {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000
            });
            console.log(response);
            if (response.status === 200) {
                this.item = response.data;
            }
        } catch (e) {
            alert(e.toLocaleString());
        }
    }

    @action register = async (user) => {
        console.log(user);
        if (user.file !== null) {
            const file = user.file;
            try {
                const formData = new FormData();
                formData.append('srcFile', file);
                let response = await axios({
                    url: `http://localhost:8080/api/attachment`,
                    method: 'post',
                    headers: {
                        'Content-type': 'multipart/form-data'
                    },
                    timeout: 3000,
                    data: formData,
                });
                console.log(response);
                if (response.status === 200 && response.data !== '') {
                    user.storedPath = response.data.storedPath;
                    user.originalName = response.data.originalName;
                }
                user.file = null;
            } catch (e) {
                alert(e.toLocaleString());
                return false;
            }
        }
        try {
            this.user = null;
            let response = await axios({
                url: `http://localhost:8080/api/user`,
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(user)
            });
            return (response.status === 200);
        } catch(e) {
            alert(e.toLocaleString());
            return false;
        }
    };

    @observable user = null;
    @action login = async (user) => {
        console.log(user);
        try {
            this.user = null;
            let response = await axios({
                url: 'http://localhost:8080/api/user/login',
                method: 'post',
                headers : {
                    'Content-type': 'application/json; charset=utf-8'
                },
                data: JSON.stringify(user),
                timeout: 3000
            });
            console.log(response);
            if (response.status === 200 && response.data !== '') {
                this.user = response.data;
            }
        } catch (e) {
            alert(e.toLocaleString());
        }
    }

    @action logout = () => {
        this.user = null;
    }

    @action checkAccount = async (account) => {
        try {
            this.user = null;
            let response = await axios({
                url: 'http://localhost:8080/api/user/account?account=' + account,
                method: 'get',
                headers : {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000
            });
            console.log(response);
            if (response.status === 200 && response.data !== "") {
                this.user = response.data;
            }
        }
        catch (e) {
            alert(e.toLocaleString());
        }
        return false;
    }

    @action edit = async (user) => {
        console.log(user);
        if (user.file !== null) {
            const file = user.file;
            try {
                const formData = new FormData();
                formData.append('srcFile', file);
                let response = await axios({
                    url: `http://localhost:8080/api/attachment`,
                    method: 'post',
                    headers: {
                        'Content-type': 'multipart/form-data'
                    },
                    timeout: 3000,
                    data: formData,
                });
                console.log(response);
                if (response.status === 200 && response.data !== '') {
                    user.storedPath = response.data.storedPath;
                    user.originalName = response.data.originalName;
                }
                user.file = null;
            } catch (e) {
                alert(e.toLocaleString());
                return false;
            }
        }
        try {
            let response = await axios({
                url: `http://localhost:8080/api/user`,
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000,
                data: JSON.stringify(user)
            });
            return (response.status === 200);
        } catch(e) {
            alert(e.toLocaleString());
            return false;
        }
    };

    @action remove = async (id) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/api/user?id=' + id,
                method: 'delete',
                timeout: 3000
            });
            return (response.status === 200);
        } catch (e) {
            alert(e.toLocaleString());
            return false;
        }
    }
};

export default UserStore.getInstance();