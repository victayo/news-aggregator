'use client';

import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

import NewsContent from '@/components/NewsContent';
import NewsService from '@/services/NewsService';
import CategoriesSkeleton from '@/components/skeletons/CategoriesSkeleton';
import Filter from '@/components/Filter';
import AuthService from '@/services/AuthService';

export default function Main() {
    const [categories, setCategories] = React.useState<string[]>([]);
    const [selectedCategory, setCategory] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(true);


    React.useEffect(() => {
        let fetchedCategories;
        if(AuthService.isLoggedIn()){
            fetchedCategories = NewsService.getUserCategories();
        }else{
            fetchedCategories = NewsService.getCategories();
        }
        fetchedCategories.then((categories: string[]) => {
            setCategories(['all', ...categories]);
            setCategory('all');
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="container py-5">
            <div className="w-75 mx-auto">
                <CategoriesSkeleton />
            </div>
        </div>;
    }

    const categorySelected = (category: string) => {
        setCategory(category);
    }

    return (
        <div className="container-fluid populer-news pt-1 pb-5">
            <div className="container py-2">
                <div className="tab-className mb-4">
                    <div className="row g-4">
                        <div className="col-12">
                            {categories.length > 0 ? (
                                <div>
                                    <Filter />
                                    {/* <div className="d-flex flex-column flex-md-row justify-content-md-between border-bottom mb-4"> */}
                                    {/* </div> */}
                                    <div className="d-flex flex-wrap gap-2 border-bottom mb-4 p-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                className={`btn btn-sm rounded-pill ${selectedCategory === category ? "btn-primary" : "btn-outline-primary"}`}
                                                onClick={() => categorySelected(category)}
                                                style={{ minWidth: '100px' }}
                                            >
                                                <span className="text-capitalize">{category}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mb-4">
                                        <NewsContent key={selectedCategory} category={selectedCategory} />
                                    </div>
                                </div>
                            ) : ('<p>No item to display</p>')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
