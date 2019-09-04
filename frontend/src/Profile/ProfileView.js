import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class ProfileView extends Component {
    state = {
        goToLogin: false,
        goToEdit: false,
    };
    render() {
        const user = this.props.stores.UserStore.user;
        if (this.state.goToLogin || user === null) return <Redirect to='/profile' />;
        if (this.state.goToEdit) return <Redirect to='/profile/edit' />;
        return (
            <div className='profile-view'>
                <div>아이디 {user.account}</div>
                <div>성별 {user.gender}</div>
                <div>이름 {user.name}</div>
                <div><img src={`http://localhost:8080/api/attachment/${user.id}`} alt='프로필 사진'/></div>
                <button onClick={this.editProfile}>수정</button>
                <p onClick={this.logout}>로그아웃 하시겠습니까?</p>
            </div>
        );
    }
    editProfile = () => {
        this.setState({
            goToEdit: true,
        });
    }
    logout = () => {
        this.props.stores.UserStore.logout();
        this.setState({
            goToLogin: true,
        });
    }
}

export default ProfileView;