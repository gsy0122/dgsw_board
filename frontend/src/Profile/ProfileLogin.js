import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from 'react-router-dom';

@inject('stores')
@observer
class ProfileLogin extends Component {
    state = {
        account: '',
        password: '',
        goToView: false,
        goToRegister: false,
    };
    render() {
        if (this.state.goToView) return <Redirect to='/' />
        if (this.state.goToRegister) return <Redirect to='/profile/register'/>
        return (
            <div className='login'>
                <div><input placeholder="아이디" onChange={this.updateAccount}/></div>
                <div><input placeholder="비밀번호" type='password' onChange={this.updatePassword}/></div><br/>
                <div>
                    <button onClick={this.login}>로그인</button>
                    <Link to='/profile/register'><p>회원이 아니신가요?</p></Link>
                </div>
            </div>
        );
    }
    updateAccount = e => {
        this.setState({
            ...this.state,
            account: e.target.value
        });
    };
    updatePassword = e => {
        this.setState({
            ...this.state,
            password: e.target.value
        })
    }
    login = async () => {
        if (this.state.account === '' || this.state.password === '') {
            alert('아이디와 패스워드를 모두 입력해 주세요.');
            return;
        }
        await this.props.stores.UserStore.login(this.state);
        if (this.props.stores.UserStore.user !== null) {
            this.setState({
                ...this.state,
                goToView: true,
            });
        } else {
            alert('아이디와 패스워드가 일치하지 않습니다.');
            return;
        }
    };

    register = () => {
        this.setState({
            goToRegister: true,
        });
    };
}

export default ProfileLogin;