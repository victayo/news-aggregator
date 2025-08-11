import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

import { News } from '@/models/news'
import NewsCard from './NewsCard';
import NewsService from '@/services/NewsService';
import NewsContentSkeleton from './skeletons/NewsContentSkeleton';
import eventBus from "@/utils/EventBus";


type NewsContentProps = {
    category: string
};

export default function NewsContent({ category }: NewsContentProps) {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [newsList, setNewsList] = React.useState<News[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [hasMore, setHasMore] = React.useState<boolean>(true);
    const hasFetched = React.useRef(false);

    const fetchMoreData = async () => {
        setLoading(true);
        await NewsService.getNews({ category: category, page: page + 1}).then((news) => {
            if (news.length > 0) {
                setNewsList(prevNews => [...prevNews, ...news]);
                setPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false); // No more news to load
            }
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching news:', error);
            setLoading(false);
        });
    }

    
    React.useEffect(() => {
        const handleFilterSearch = (data: any) => {
            NewsService.filters = {...data};
            fetchMoreData();
        }
        eventBus.on("filterSearch", handleFilterSearch);
        if (hasFetched.current) {
            return;
        }
        hasFetched.current = true;
        fetchMoreData();

        return () => {
            eventBus.off('filterSearch', handleFilterSearch);
        };
    }, [category]);


    const loader = (
        <div className='mt-3'>
            <NewsContentSkeleton />
        </div>
    );

    // If loading, show skeleton loader
    if (loading) {
        return loader;
    }



    return (
        <div>
            <div className="my-3">
                <h4><span className="text-capitalize">{category}</span> News</h4>
            </div>
            <InfiniteScroll
                dataLength={newsList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={loader}
                endMessage={
                    <p className="text-center mt-5">
                        <b>No more news to load!</b>
                    </p>
                }>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {newsList.map((news, index) => (
                        <div key={index} className="col">
                            <NewsCard news={news} />
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    )
}
