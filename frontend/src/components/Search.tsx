import React from 'react'
import EventBus from "@/utils/EventBus";

export default function Search() {

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.trim();
        if (query) {
            EventBus.emit('search', { message: query });
        }
    }

    return (
        <>
            <div className="input-group w-100 mx-auto d-flex">
                <input type="search" className="form-control p-3" placeholder="Search category, author, and keyword" aria-describedby="search-icon-1" onChange={handleSearch} />
                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
            </div>
        </>
    )
}
