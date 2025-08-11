<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'source_name', 'author', 'category', 'title', 'description', 'content', 'url', 'url_to_image', 'published_at', 'raw'
    ];

    protected $casts = [
        'raw' => 'array',
        'published_at' => 'datetime',
    ];
}
