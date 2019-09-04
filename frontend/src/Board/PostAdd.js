import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@inject('stores')
@observer
class PostAdd extends Component {
    state = {
        userId: this.props.stores.UserStore.user.id,
        title: '',
        content: '',
        category: 0,
        views: 0,
        likes: 0,
        goToList: false,
        goToPost: false,
    };
    constructor(props) {
        super(props);
        if (this.props.id && this.props.stores.PostStore.item) {
            this.state = {
                ...this.state,
                id: this.props.stores.PostStore.item.id,
                title: this.props.stores.PostStore.item.title,
                content: this.props.stores.PostStore.item.content,
                category: this.props.stores.PostStore.item.category,
                views: this.props.stores.PostStore.item.views,
                likes: this.props.stores.PostStore.item.likes,
            }
        }
    }
    render() {
        if (this.state.goToList) return <Redirect to='/board'/>;
        if (this.state.goToPost) return <Redirect to={`/board/view/${this.props.id}`}/>;
        return (
            <div className='board board-add'>
                <div className='board-add-header'>
                    <div>제목</div>
                    <input value={this.state.title} onChange={this.updateTitle}/>
                </div>
                <div>
                    분류 <select onChange={(e) => this.setState({ category: e.target.value })}>
                        <option value='1'>가입인사</option>
                        <option value='2'>방명록</option>
                        <option value='3'>자유게시판</option>
                    </select>
                </div>
                <div>내용
                    <div><CKEditor editor={ClassicEditor} data={this.state.content} onChange={this.updateContent}/></div>
                </div>
                <button onClick={this.addNewPost}>작성</button>
            </div>
        );
    }
    addNewPost = async () => {
        if (this.props.id && await this.props.stores.PostStore.modify(this.state)) {
            if (! window.confirm('수정하시겠습니까?')) return;
            if (this.props.stores.PostStore.item.userId === this.props.stores.UserStore.user.id) {
                await this.props.stores.PostStore.viewAll();
                this.setState({
                    ...this.state,
                    goToPost: true
                });
            } else alert('권한이 없습니다.');
        } else if (await this.props.stores.PostStore.add(this.state)) {
            if (! window.confirm('추가하시겠습니까?')) return;
            await this.props.stores.PostStore.viewAll();
            this.setState({
                ...this.state,
                goToList: true
            });
        }
    };
    updateTitle = event => {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    };
    updateContent = (event, editor) => {
        this.setState({
            ...this.state,
            content: editor.getData()
        });
    };
}

export default PostAdd;