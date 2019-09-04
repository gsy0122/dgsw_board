import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from "react-router-dom";

@inject('stores')
@observer
class PostView extends Component {
    state = {
        goToList: false,
        goToEdit: false,
    };
    async componentDidMount() {
        await this.props.stores.PostStore.modifyByViews(this.props.id);
        this.props.stores.PostStore.view(this.props.id);
    }
    render() {
        let post = this.props.stores.PostStore;
        let user = this.props.stores.UserStore.user;

        if (this.state.goToList) return <Redirect to='/board' />;
        if (this.state.goToEdit) return <Redirect to={`/board/edit/${this.props.id}`} />;
        if (! post.item) return <div/>;

        return (
            <div className='board board-view-item'>
                <div>제목 {post.item.title}</div>
                <div>조회수 {post.item.views}</div>
                <div>추천수 {post.item.likes}</div>
                <div>
                    내용
                    <div className='board-view-item-content'
                         dangerouslySetInnerHTML={{__html:post.item.content}} />
                </div>
                <div>작성 시간 {new Date(post.item.created).toLocaleString()}</div>
                <div>
                    <Link to='/board'><button>목록</button></Link>
                    {user && user.id !== post.item.userId && <button onClick={this.likePost}>추천</button>}
                    {user && user.id === post.item.userId && <button onClick={this.deletePost}>삭제</button>}
                    {user && user.id === post.item.userId && <button onClick={this.editPost}>수정</button>}
                </div>
            </div>
        );
    }
    likePost = async () => {
        if (await this.props.stores.PostStore.modifyByLikes(this.props.id)) {
            this.props.stores.PostStore.view(this.props.id);
            alert("게시글을 추천하였습니다.");
        }
    }
    editPost = () => {
        this.setState({goToEdit: true});
    }
    deletePost = async () => {
        if (window.confirm('삭제하시겠습니까?') === false) return;
        if (await this.props.stores.PostStore.delete(this.props.id)) {
            await this.props.stores.PostStore.viewAll();
            this.setState({goToList: true});
        }
    }
};

export default PostView;