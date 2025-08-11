import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function NewsContentSkeleton() {
    
    return (
        <div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="card">
                        <Skeleton height={200} />
                        <div className="card-body">
                            <h5 className="card-title"><Skeleton /></h5>
                            <p className="card-text"><Skeleton count={3} /></p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <Skeleton height={200} />
                        <div className="card-body">
                            <h5 className="card-title"><Skeleton /></h5>
                            <p className="card-text"><Skeleton count={3} /></p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <Skeleton height={200} />
                        <div className="card-body">
                            <h5 className="card-title"><Skeleton /></h5>
                            <p className="card-text"><Skeleton count={3} /></p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <Skeleton height={200} />
                        <div className="card-body">
                            <h5 className="card-title"><Skeleton /></h5>
                            <p className="card-text"><Skeleton count={3} /></p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <Skeleton height={200} />
                        <div className="card-body">
                            <h5 className="card-title"><Skeleton /></h5>
                            <p className="card-text"><Skeleton count={3} /></p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <Skeleton height={200} />
                        <div className="card-body">
                            <h5 className="card-title"><Skeleton /></h5>
                            <p className="card-text"><Skeleton count={3} /></p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <Skeleton height={200} />
                        <div className="card-body">
                            <h5 className="card-title"><Skeleton /></h5>
                            <p className="card-text"><Skeleton count={3} /></p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <Skeleton height={200} />
                        <div className="card-body">
                            <h5 className="card-title"><Skeleton /></h5>
                            <p className="card-text"><Skeleton count={3} /></p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <Skeleton height={200} />
                        <div className="card-body">
                            <h5 className="card-title"><Skeleton /></h5>
                            <p className="card-text"><Skeleton count={3} /></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
