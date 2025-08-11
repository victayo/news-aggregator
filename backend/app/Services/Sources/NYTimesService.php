<?php

namespace App\Services\Sources;

use App\Exceptions\NewsAggregatorException;
use App\Models\Article;
use App\Services\Sources\Contracts\NewsSource;
use Illuminate\Support\Facades\Http;

class NYTimesService implements NewsSource{

    protected $apiKey;
    protected $baseUrl;

    /**
     * Initialize the service with API configuration.
     */
    public function __construct() {
        $this->apiKey = config("news.nytimes.api_key");
        $this->baseUrl = config("news.nytimes.base_url");
    }

    public function loadNews(){
        $this->fetchAllTopStories();
    }

    /**
     * Fetch and store top stories for all configured categories.
     *
     * Loops through categories defined in config('news.nytimes.categories')
     * and saves each article into the database.
     *
     * @return void
     */
    public function fetchAllTopStories() {
        $categories = config('news.nytimes.categories', []);
        foreach ($categories as $category) {
            $articles = $this->fetchTopStories($category);
            if ($articles) {
                foreach ($articles as $article) {
                    Article::updateOrCreate(
                        ['url' => $article['url'], 'category' => $category],
                        $article
                    );
                }
            }
        }
    }

    /**
     * Fetch top stories from a specific NYT section.
     *
     * @param string $section The section/category (e.g., 'home', 'world', 'technology').
     * @return array List of parsed articles.
     */
    public function fetchTopStories($section = 'home') {
        $path = "topstories/v2/{$section}.json";
        $response = $this->makeRequest($path);
        if (isset($response->results)) {
            return $this->parseResponse($response->results);
        }
        return [];
    }

    protected function makeRequest($path, $params = [])
    {
        $url = "{$this->baseUrl}/svc/{$path}";
        $params['api-key'] = $this->apiKey;
        $response = Http::get($url, $params);
        if($response->successful()){
            return $response->object();
        }

        throw new NewsAggregatorException("Failed to fetch data for {$path}: " . $response->body());
    }

    /**
     * Parse raw NYT API response into Article format.
     *
     * @param array $response articles from NYT API.
     * @return array          List of parsed article arrays.
     */
    protected function parseResponse($response) {
        $articles = [];
        foreach ($response as $item) {
            if (empty($item->title) || empty($item->url)) {
                continue; // Skip articles without title or URL
            }
            $author = $item->byline ?? null;
            if($author){
                $prefix = 'By ';
                // Remove the prefix 'By ' if it exists
                if (str_starts_with($author, 'By')) {
                    $author =  trim(substr($author, strlen($prefix)));
                }
            }
            $articles[] = [
                'source_name' => 'NYTimes',
                'author' => $author,
                'title' => $item->title,
                'description' => $item->abstract ?? null,
                'content' => $item->abstract ?? null,
                'url' => $item->url,
                'url_to_image' => $item->multimedia[0]->url ?? null,
                'published_at' => isset($item->published_date) ? now()->parse($item->published_date) : null,
                'raw' => $item,
                'category' => $item->section
            ];
        }
        return $articles;
    }
}
