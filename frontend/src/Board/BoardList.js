import React from 'react';
import BoardListItem from "./BoardListItem";
import Pagnation from './Pagination';

const BoardList = (props) => {
    const {items} = props;
    const itemList = items && items.map(item => <BoardListItem key={item.id} post={item}/>);
    return(
        <div>
            <div className='board-list-top'>
                <div>제목</div>
                <div>작성자</div>
                <div>작성일</div>
                <div>조회수</div>
                <div>추천수</div>
            </div>
            <Pagnation itemList={itemList} limit={props.limit}/>
        </div>
    );
}

export default BoardList;