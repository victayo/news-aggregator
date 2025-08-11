<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Log;

class NewsScrapeService
{
    public function __construct()
    {
    }

    /**
     * Scrapes news from preconfigured sources defined in config/news.php.
     *
     * This method:
     * - Loads the list of news source classes from configuration.
     * - Instantiates each source via Laravel's service container (`app()` helper).
     * - Calls the `loadNews()` method on each source, as defined by the NewsSource contract.
     *
     * @return void
     */
    public function scrapeNews()
    {

        // Get the list of news sources from the config file.
        // Example: ['App\Services\Sources\NewsApiService', 'App\Services\Sources\NYTimesService']
        $newsSources = config('news.sources', []);
        foreach ($newsSources as $newsSource) {
            Log::info("NewsScrapeService: Starting scrape for {$newsSource}");
            $source = app($newsSource);
            if (!$source instanceof \App\Services\Sources\Contracts\NewsSource) {
                continue; // or throw an exception
            }
            try {
                $source->loadNews();
                Log::info("NewsScrapeService: Successfully scraped {$newsSource}");
            } catch (Exception $e) {
                // Fail silently so that one bad source does not break the whole scraping process.
                // Still report the exception to the error tracking system
                report($e);
            }
        }
    }
}
