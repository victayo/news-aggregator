import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CategoriesSkeleton({count = 10}: {count?: number}) {
    const skeletonItems = Array.from({ length: count }, (_, index) => (
        <li key={index} className="nav-item mb-3">
            <span className="d-flex p-2 bg-light rounded-pill me-2">
                <Skeleton width={50} />
            </span>
        </li>
    ));
    return (
        <div>
            <div className="d-flex flex-column flex-md-row justify-content-md-between border-bottom mb-4">
                <ul className="nav nav-pills d-inline-flex text-center">
                    {skeletonItems}
                </ul>
            </div>
        </div>
    )
}
