<?php

namespace App\Services\Sources;

use App\Exceptions\NewsAggregatorException;
use App\Models\Article;
use App\Services\Sources\Contracts\NewsSource;
use Illuminate\Support\Facades\Http;

class NewsApiService implements NewsSource
{
    const TOP_HEADLINES_ENDPOINT = 'top-headlines';
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('news.news_api.api_key');
        $this->baseUrl = config('news.news_api.base_url');
    }

    public function loadNews(){
        $this->fetchTopHeadlines();
    }

    /**
     * Get available categories from the News API.
     *
     * @return array
     */
    public function getCategories(){
        $path = self::TOP_HEADLINES_ENDPOINT . '/sources';
        $data = $this->makeRequest($path);
        $dataSources = $data->sources ?? [];
        $categories = [];
        foreach ($dataSources as $source) {
            if (in_array($source->id, $categories)) {
                continue;
            }
            $categories[] = $source->category;
        }
        return $categories;
    }

    public function fetchTopHeadlines($params = [])
    {
        $categories = $this->getCategories();
        if(empty($categories)){
            return [];
        }
        $articles = [];
        foreach ($categories as $category) {
            $response = $this->makeRequest(self::TOP_HEADLINES_ENDPOINT, [
                'category' => $category,
                'language' => 'en', // Only english articles
                ...$params
            ]);

            $articles[] = $this->parseResponse($response->articles, $category);
        }

        return $articles;
    }

    protected function makeRequest($path, $params = [])
    {
        $url = "{$this->baseUrl}/v2/{$path}";
        $params['apiKey'] = $this->apiKey;
        $response = Http::get($url, $params);
        if($response->successful()){
            return $response->object();
        }

        throw new NewsAggregatorException("Failed to fetch data for {$path}: " . $response->body());
    }

    private function parseResponse($response, $category)
    {
        $articles = [];
        foreach($response as $item) {
            if (empty($item->title) || empty($item->url)) {
                continue; // Skip articles without title or URL
            }
            $article = [
                'source_name' => $item?->source?->name ?? null,
                'author' => $item->author ?? null,
                'title' => $item->title ?? null,
                'description' => $item->description ?? null,
                'content' => $item->content ?? null,
                'url_to_image' => $item->urlToImage ?? null,
                'published_at' => isset($item->publishedAt) ? now()->parse($item->publishedAt) : null,
                'category' => $category,
                'url' => $item->url,
                'raw' => $item,
            ];

            Article::firstOrCreate(
                ['url' => $item->url, 'category' => $category],
                $article
            );
            $articles[] = $article;
        }

        return $articles;
    }
}
