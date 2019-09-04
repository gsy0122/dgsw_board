import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class ProfileEdit extends Component {
    state = {
        id: '',
        account: '',
        password: '',
        newPassword: '',
        name: '',
        gender: '',
        grade: 0,
        storedPath: '',
        originalName: '',
        file: null,
        goToView: false,
        goToLogin: false,
    };
    constructor(props) {
        super(props);
        const {user} = props.stores.UserStore;
        if (! user) {
            this.state = {
                ...this.state,
                goToLogin: true,
            }
        } else {
            this.state = {
                ...this.state,
                id: user.id,
                account: user.account,
                name: user.name,
                gender: user.gender,
                grade: user.grade,
                storedPath: user.storedPath,
                originalName: user.originalName,
            }
        }
    }
    render() {
        if (this.state.goToLogin) return <Redirect to='/profile' />;
        if (this.state.goToView) return <Redirect to='/profile/view' />;
        return (
            <div className='profile-edit'>
                <div>이름 {this.state.name}</div>
                <div>아이디 {this.state.account}</div>
                <div>현재 비밀번호
                    <input type='password' name='password' onChange={this.updateValue}/>
                </div>
                <div>새로운 비밀번호
                    <input type='password' name='newPassword' onChange={this.updateValue}/>
                </div>
                <div>성별 {this.state.gender}</div>
                <div>{this.state.grade}학년</div>
                <div>프로필 사진
                    <input type='file' onChange={(e) => this.setState({file: e.target.files[0]})}/>
                </div>
                <button onClick={this.edit}>수정</button>
                <p onClick={this.remove}>탈퇴하시겠습니까?</p>
            </div>
        );
    }
    updateValue = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    edit = async () => {
        if (this.state.password === '' || await this.props.stores.UserStore.login(this.state)) {
            alert('프로필 수정을 위해서는 현재 패스워드 입력이 필요합니다.');
            return;
        }
        if (this.state.newPassword !== '') {
            this.setState({
                password: this.state.newPassword,
            });
        }
        if (await this.props.stores.UserStore.edit(this.state)) {
            if (await this.props.stores.UserStore.fetchItem(this.state.id)) {
                alert('수정이 완료되었습니다.');
                this.setState({
                    ...this.state,
                    goToView: true
                });
            }
        }
    }

    remove = async () => {
        if (! window.confirm('탈퇴하시겠습니까?')) return;
        if (await this.props.stores.UserStore.remove(this.state.id)) {
            alert('탈퇴가 완료되었습니다.');
            this.setState({
                ...this.state,
                goToLogin: true
            });
        }
    }
}

export default ProfileEdit;