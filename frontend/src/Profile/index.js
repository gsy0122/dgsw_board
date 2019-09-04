import React, {Component} from 'react';

import ProfileView from "./ProfileView";
import ProfileLogin from "./ProfileLogin";
import ProfileEdit from "./ProfileEdit";
import ProfileRegister from "./ProfileRegister";

import './Profile.scss';

class Profile extends Component {
    render() {
        if (this.props.match && this.props.match.params.command === 'view')
            return <ProfileView />;
        if (this.props.match && this.props.match.params.command === 'edit')
            return <ProfileEdit />;
        if (this.props.match && this.props.match.params.command === 'register')
            return <ProfileRegister />;
        return (
            <ProfileLogin />
        );
    }
}

export default Profile;