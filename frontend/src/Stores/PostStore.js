import {observable, action} from "mobx";
import axios from 'axios';

class PostStore {
    static __instance = null;
    static getInstance() {
        if (PostStore.__instance === null) {
            PostStore.__instance = new PostStore();
        }
        return PostStore.__instance;
    }
    constructor() {
        PostStore.__instance = this;
    }

    @observable items = null;
    @action viewAll = async () => {
        try {
            this.items = null;
            let response = await axios({
                url: 'http://localhost:8080/api/post',
                method: 'get',
                headers : {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000,
            });
            console.log(response);
            if (response.status === 200) {
                this.items = response.data;
            }
        } catch (e) {
            alert(e.toLocaleString());
        }
    }
    @action viewAllByViews = async () => {
        try {
            this.items = null;
            let response = await axios({
                url: 'http://localhost:8080/api/post/views',
                method: 'get',
                headers : {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000,
            });
            console.log(response);
            if (response.status === 200) {
                this.items = response.data;
            }
        } catch (e) {
            alert(e.toLocaleString());
        }
    }
    @action viewAllByLikes = async () => {
        try {
            this.items = null;
            let response = await axios({
                url: 'http://localhost:8080/api/post/likes',
                method: 'get',
                headers : {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000,
            });
            console.log(response);
            if (response.status === 200) {
                this.items = response.data;
            }
        } catch (e) {
            alert(e.toLocaleString());
        }
    }

    @action viewByCategory = async (category) => {
        try {
            this.items = null;
            let response = await axios({
                url: 'http://localhost:8080/api/post/category?category=' + category,
                method: 'get',
                headers : {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000,
            });
            console.log(response);
            if (response.status === 200) {
                this.items = response.data;
            }
        } catch (e) {
            alert(e.toLocaleString());
        }
    }

    @observable item = null;
    @action view = async (id) => {
        try {
            this.item = null;
            let response = await axios({
                url: 'http://localhost:8080/api/post/id?id=' + id,
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

    @action add = async (post) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/api/post`,
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(post)
            });
            this.item = response.data;
            return (response.status === 200);
        } catch(e) {
            alert(e.toLocaleString());
            return false;
        }
    };

    @action delete = async (postId) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/api/post?id=' + postId,
                method: 'delete',
                timeout: 3000
            });
            return (response.status === 200);
        } catch (e) {
            alert(e.toLocaleString());
            return false;
        }
    }

    @action modify = async (post) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/api/post`,
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000,
                data: JSON.stringify(post)
            });
            return (response.status === 200);
        } catch(e) {
            alert(e.toLocaleString());
            return false;
        }
    };

    @action modifyByViews = async (id) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/api/post/views`,
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000,
                data: {
                    id,
                }
            });
            return (response.status === 200);
        } catch(e) {
            alert(e.toLocaleString());
            return false;
        }
    };

    @action modifyByLikes = async (id) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/api/post/likes`,
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                timeout: 3000,
                data: {
                    id,
                }
            });
            return (response.status === 200);
        } catch(e) {
            alert(e.toLocaleString());
            return false;
        }
    };
}

export default PostStore.getInstance();