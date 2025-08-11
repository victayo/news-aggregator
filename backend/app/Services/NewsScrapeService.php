<?php

namespace App\Services;

use Exception;

class NewsScrapeService {
    public function __construct() {}

    /**
     * Scraps news from preconfigured sources
     * @return void
     */
    public function scrapeNews(){
        $newsSources = config('news.sources', []);

        // try {
            foreach ($newsSources as $newsSource){
                $source = app($newsSource);
                $source->loadNews();
            }
        // } catch(Exception $e){
        //     // fail silently but report exception
        //     report($e);
        // }
    }
}
