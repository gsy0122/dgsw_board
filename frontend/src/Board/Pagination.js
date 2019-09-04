import React from 'react';

const Pagination = ({ itemList, limit }) => {
    const [page, setPage] = React.useState(1);

    const handleChange = e => {
        setPage(e.target.innerHTML);
    };

    return (
        <div className="pagination">
            <div className="pagination-content">{itemList.slice((page - 1) * limit, page * limit)}</div>
            <div className="pagination-footer">
                {itemList.map((e, i) => {
                    if (i >= itemList.length / limit) return;
                    return (
                        <div className={i + 1 === parseInt(page) && 'page'} onClick={handleChange}>
                            {i + 1}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Pagination;