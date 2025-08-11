<?php

namespace App\Console\Commands;

use App\Services\NewsScrapeService;
use Illuminate\Console\Command;

class NewsScrape extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:scrape';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scraps news from different sources';

    /**
     * Execute the console command.
     */
    public function handle(NewsScrapeService $newsScraper)
    {
        $this->info('Starting news scrapper');
        $newsScraper->scrapeNews();
        $this->info('Ending News scrapper');
    }
}
