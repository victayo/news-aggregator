<?php

return [
    'sources' => [
        App\Services\Sources\NYTimesService::class,
        App\Services\Sources\NewsApiService::class,
    ],

    'news_api' => [
        'api_key' => env('NEWSAPI_API_KEY'),
        'base_url' => env('NEWSAPI_URL', 'https://newsapi.org'),
    ],

    'nytimes' => [
        'api_key' => env('NYTIMES_API_KEY'),
        'base_url' => env('NYTIMES_URL', 'https://api.nytimes.com'),
        'categories' => [
            'home',
            'arts',
            'automobiles',
            'business',
            'fashion',
            'food',
            'health',
            'insider',
            'magazine',
            'movies',
            'nyregion',
            'obituaries',
            'opinion',
            'politics',
            'realestate',
            'science',
            'sports',
            'sundayreview',
            'technology',
            'theater',
            't-magazine',
            'travel',
            'upshot',
            'us',
            'world',
        ],
    ]
];
