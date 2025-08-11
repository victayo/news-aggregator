# Laravel News Aggregator

## Overview
This Laravel-based News Aggregator project fetches news articles from multiple external sources (e.g., NewsAPI, NYTimes) and stores them locally for querying and filtering.  
The system is designed for flexibility, allowing you to easily add new news sources via configuration and service classes.

---

## Features
- Fetch news from multiple preconfigured sources.
- Store fetched news articles in the local database.
- Query articles by category, source name, author, published date, or full-text search.
- Supports pagination and filtering.
- Simple interface for adding new sources.

---

## Project Structure

### **Services**
#### 1. `ArticleService`
- **getCategories()**: Retrieves a list of distinct categories from stored articles.
- **setUserCategory(User $user, $categories)**: Saves user preferences for categories.
- **getUserCategories(User $user)**: Retrieves stored user category preferences.

#### 2. `ArticleSearchService`
- Chainable search filters for articles:
  - `category($category)`
  - `sourceName($source)`
  - `author($author)`
  - `publishedDate($publishedDate)`
  - `publishedDateRange($startDate, $endDate)`
  - `allSearch($search)`
- **search($perPage)**: Paginates results, ordered by publish date.

#### 3. `NewsApiService`
- Fetches articles from **NewsAPI**.
- Implements `NewsSource` interface.
- Methods:
  - **getCategories()**: Fetches categories from NewsAPI.
  - **fetchTopHeadlines()**: Retrieves articles for each category.
  - **parseResponse()**: Maps external API response into local database format.

#### 4. `NYTimesService`
- Fetches articles from **NYTimes API**.
- Implements `NewsSource` interface.
- Methods:
  - **fetchAllTopStories()**: Loops through categories and saves articles.
  - **fetchTopStories()**: Retrieves articles for a specific category.
  - **parseResponse()**: Maps NYTimes API response into local format.

#### 5. `NewsScrapeService`
- Loops through configured sources and calls their `loadNews()` method.
- Each source runs independently and logs results.

---

## Configuration

### **News Sources**
All news sources are registered in `config/news.php`.

Example:
```php
return [
    'sources' => [
        \App\Services\Sources\NewsApiService::class,
        \App\Services\Sources\NYTimesService::class,
    ],
    'news_api' => [
        'api_key' => env('NEWS_API_KEY'),
        'base_url' => 'https://newsapi.org',
    ],
    'nytimes' => [
        'api_key' => env('NYTIMES_API_KEY'),
        'base_url' => 'https://api.nytimes.com',
        'categories' => ['home', 'world', 'science', 'technology'],
    ],
];
```

### **Environment Variables**
Add these to your `.env` file:
```
NEWS_API_KEY=your_newsapi_key
NYTIMES_API_KEY=your_nytimes_key
```

---

## Adding a New News Source

1. **Create a Service Class**
   - Create a new class in `App\Services\Sources`.
   - Implement the `NewsSource` interface:
     ```php
     namespace App\Services\Sources;

     use App\Services\Sources\Contracts\NewsSource;

     class MyCustomNewsService implements NewsSource {
         public function loadNews() {
             // Fetch and store articles here
         }
     }
     ```

2. **Register the Source**
   - Add the class to `config/news.php`:
     ```php
     'sources' => [
         \App\Services\Sources\NewsApiService::class,
         \App\Services\Sources\NYTimesService::class,
         \App\Services\Sources\MyCustomNewsService::class,
     ],
     ```

3. **Configure API Keys and Endpoints**
   - Add necessary keys and URLs to `config/news.php` and `.env`.

4. **Test the Source**
   - Run the scraper command:
     ```bash
     php artisan news:scrape
     ```

---

## Artisan Command
The project includes a console command to trigger news scraping:

```bash
php artisan news:scrape
```
- **Start**: Prints "Starting news scrapper".
- **Execution**: Loops through configured sources, fetching and storing articles.
- **End**: Prints "Ending News scrapper".

---
