<?php

namespace App\Services\Sources;

use App\Models\Article;

class ArticleSearchService {

    private $query;

    public function __construct(){
        $this->query = Article::query();
    }

    public function category($category){
        if(is_array($category)){
            return $this->query->whereIn("category", $category);
        }else{
            return $this->query->where('category', $category);
        }
    }

    public function sourceName($source){
        return $this->query->where('source_name', $source);
    }

    public function author($author){
        return $this->query->where('author', $author);
    }

    public function publishedDate($publishedDate){
        return $this->query->where('published_at', $publishedDate);
    }

    public function publishedDateRange($startDate, $endDate){
        return $this->query
        ->when($startDate, fn($q) => $q->whereDate('published_at', '>=', $startDate))
        ->when($endDate, fn($q) => $q->whereDate('published_at', '<=', $endDate));
    }

    public function allSearch($search){
        return $this->query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%");
            });
    }

    public function search($perPage){
        return $this->query->orderByDesc('published_at')
            ->paginate($perPage);
    }
}
