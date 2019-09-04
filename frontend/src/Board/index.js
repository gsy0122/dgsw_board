import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom';

import BoardList from './BoardList';
import './Board.scss';
import PostView from "./PostView";
import PostAdd from "./PostAdd";

@inject('stores')
@observer
class Board extends Component {
    state = {
        limit: 5,
    };

    componentDidMount() {
        if (this.props.match && this.props.match.params.command === 'list') {
            this.props.stores.PostStore.viewByCategory(this.props.match.params.id);
        } else {
            this.props.stores.PostStore.viewAll();
        }
    }
    componentDidUpdate(nextProps, nextState){
        if (this.props.match !== nextProps.match) {
            if (this.props.match.params.command === 'list') {
                this.props.stores.PostStore.viewByCategory(this.props.match.params.id);
            } else {
                this.props.stores.PostStore.viewAll();
            }
        }
    }

    render() {
        if (this.props.match && this.props.match.params.command === 'view')
            return <PostView id={this.props.match.params.id}/>;
        if (this.props.match && this.props.match.params.command === 'add')
            return <PostAdd />;
        if (this.props.match && this.props.match.params.command === 'edit')
            return <PostAdd id={this.props.match.params.id} />;

        const {user} = this.props.stores.UserStore;
        const {items} = this.props.stores.PostStore;

        return (
            <div className='board'>
                <header>
                    <div className="title">
                        DGSW 게시판
                        {user === null ?
                            <Link to='/profile/login'><button>로그인</button></Link> :
                            <Link to='/profile/view'><button>프로필</button></Link>}
                    </div>
                </header>
                <div className='bar'>
                    <div><Link to=''>전체</Link></div>
                    <div><Link to='/board/list/1'>가입인사</Link></div>
                    <div><Link to='/board/list/2'>방명록</Link></div>
                    <div><Link to='/board/list/3'>자유게시판</Link></div>
                    <select onChange={(e) => this.orderBy(e.target.value)}>
                        <option value='time'>최신순</option>
                        <option value='view'>조회순</option>
                        <option value='like'>추천순</option>
                    </select><br/>
                    <select onChange={(e) => this.setState({ limit: e.target.value })}>
                        <option value='5'>5개</option>
                        <option value='10'>10개</option>
                        <option value='15'>15개</option>
                        <option value='20'>20개</option>
                    </select>
                </div>
                {items && <BoardList items={items} limit={this.state.limit} />}
                {user && <Link to='/board/add'><button className='board-add-button'>작성</button></Link>}
            </div>
        );
    }

    orderBy = async (value) => {
        if (value === 'time') {
            await this.props.stores.PostStore.viewAll();
        } else if (value === 'view') {
            await this.props.stores.PostStore.viewAllByViews();
        } else if (value === 'like') {
            await this.props.stores.PostStore.viewAllByLikes();
        }
    }
}

export default Board;