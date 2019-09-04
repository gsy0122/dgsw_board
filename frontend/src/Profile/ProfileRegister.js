import React, { Component } from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class Register extends Component {
    state = {
        account: '',
        password: '',
        passwordCheck: '',
        name: '',
        gender: '',
        grade: 0,
        storedPath: '',
        originalName: '',
        file: null,
        isChecked: false,
        goToLogin: false,
    };
    render() {
        if (this.state.goToLogin) return <Redirect to='/profile/login' />
        return(
            <div className='register'>
                아이디 <div><input name='account' onChange={this.updateValue} />
                <button onClick={this.checkAccount}>중복 확인</button></div>
                비밀번호 <div><input name='password' type='password' onChange={this.updateValue} /></div>
                비밀번호 확인 <div><input name='passwordCheck' type='password' onChange={this.updateValue} /></div>
                이름 <div><input name='name' onChange={this.updateValue} /></div>
                성별 <div>
                    <select onChange={(e) => this.setState({ gender: e.target.value })}>
                        <option value='남자'>남자</option>
                        <option value='여자'>여자</option>
                    </select>
                </div>
                학년 <div>
                    <select onChange={(e) => this.setState({ grade: e.target.value })}>
                        <option value='1'>1학년</option>
                        <option value='2'>2학년</option>
                        <option value='3'>3학년</option>
                    </select>
                </div>
                프로필 사진<div><input type='file' onChange={(e) => this.setState({ ...this.state, file: e.target.files[0]})}/></div>
                <button onClick={this.register}>가입하기</button>
            </div>
        );
    }

    updateValue = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };

    checkAccount = async () => {
        if (this.state.account === '') {
            alert('아이디를 입력해 주세요.');
            return;
        }
        await this.props.stores.UserStore.checkAccount(this.state.account);
        if (this.props.stores.UserStore.user !== null) alert('이미 존재하는 아이디입니다.');
        else {
            alert('사용 가능한 아이디입니다.');
            this.setState({
                isChecked: true,
            });
        }
    }

    register = async () => {
        if (! this.state.isChecked) {
            alert('아이디 중복 확인이 필요합니다.');
            return;
        }
        if (this.state.password !== this.state.passwordCheck) {
            alert('패스워드가 일치하지 않습니다.');
            return;
        }
        console.log(this.state);
        if (await this.props.stores.UserStore.register(this.state)) {
            alert('가입이 완료되었습니다. 로그인 화면으로 이동합니다.');
            this.setState({
                goToLogin: true,
            });
        }
    }
};

export default Register;