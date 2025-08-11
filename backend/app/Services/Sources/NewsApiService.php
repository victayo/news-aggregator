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

    /**
     * Initialize NewsApiService with config values.
     */
    public function __construct()
    {
        $this->apiKey = config('news.news_api.api_key');
        $this->baseUrl = config('news.news_api.base_url');
    }

    /**
     * Load news articles from the News API.
     *
     * It fetches top headlines for all categories.
     *
     * @return void
     */
    public function loadNews(){
        $this->fetchTopHeadlines();
    }

    /**
     * Retrieve available news categories from the News API.
     *
     * This calls the `top-headlines/sources` endpoint and extracts
     * the unique categories of available sources.
     *
     * @return array List of category names.
     * @throws NewsAggregatorException if API request fails.
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

    /**
     * Fetch top headlines from the News API for all categories.
     *
     * @param array $params Additional query parameters for the API request.
     * @return array List of parsed articles grouped by category.
     * @throws NewsAggregatorException if API request fails.
     */
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

     /**
     * Parse the API response and store articles in the database.
     *
     * Skips articles without a title or URL.
     *
     * @param array $response Array of article objects from the API.
     * @param string $category The category these articles belong to.
     * @return array Parsed and saved article data.
     */
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
