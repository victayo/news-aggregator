<?php


use Illuminate\Support\Facades\Schedule;


Schedule::command('news:scrape')->hourly()->name('Scape News');
