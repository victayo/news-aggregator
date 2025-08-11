import { News } from '@/models/news';
import React from 'react'
import Image from 'next/image'


type NewsCardProps = {
    news: News
};

export default function NewsCard({ news }: NewsCardProps) {
    const imgStyle = {
        height: '275px',
        objectFit: 'cover',
        objectPosition: 'center',
        width: '100%',
        borderRadius: '0.25rem'
    };
    return (
        <div className="card">
            <div>
                {/* <img src={news.imgSrc} className="card-img-top img-zoomin img-fluid rounded w-100" style={imgStyle}  alt="..." /> */}
                <Image src={news.imgSrc} className="card-img-top img-zoomin img-fluid rounded w-100" width={500} height={500} unoptimized alt={news.title} style={imgStyle} />
                <div className="position-absolute text-white px-4 py-2 bg-primary rounded small text-capitalize" style={{top: '20px', right: '20px'}}>
                    {news.category}
                </div>
            </div>
            <div className="card-body">
                <div className="card-text fw-bold">
                    <a target='_blank' href={news.url}>{news.source}</a>
                </div>
                <h5 className="card-title">{news.title}</h5>
                <div className="card-text"><small className="text-muted small">{news.publishedDate}</small></div>

            </div>
        </div>
    )
}
