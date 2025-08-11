<?php

namespace App\Services\Sources;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Article;

/**
 * Service class for building dynamic queries to search articles.
 *
 * This class provides chainable methods for filtering articles
 * by category, source name, author, publication date, date range,
 * and keyword search. The final search results can be retrieved
 * using the `search()` method.
 */
class ArticleSearchService {

    /**
     * @var Builder
     */
    private $query;

    /**
     * Initialize the query builder for Article model.
     */
    public function __construct(){
        $this->query = Article::query();
    }

    /**
     * Filter articles by category or multiple categories.
     *
     * @param string|array $category Single category name or array of category names.
     * @return Builder
     */
    public function category($category): Builder{
        if(is_array($category)){
            return $this->query->whereIn("category", $category);
        }else{
            return $this->query->where('category', $category);
        }
    }

    /**
     * Filter articles by the source name.
     *
     * @param string $source The name of the article's source.
     * @return Builder
     */
    public function sourceName($source): Builder{
        return $this->query->where('source_name', $source);
    }

    /**
     * Filter articles by author.
     *
     * @param string $author The name of the author.
     * @return Builder
     */
    public function author($author): Builder{
        return $this->query->where('author', $author);
    }

    /**
     * Filter articles by an exact publication date.
     *
     * @param string $publishedDate.
     * @return Builder
     */
    public function publishedDate($publishedDate): Builder{
        return $this->query->where('published_at', $publishedDate);
    }

    /**
     * Filter articles within a publication date range.
     *
     * @param string|null $startDate
     * @param string|null $endDate
     * @return Builder
     */
    public function publishedDateRange($startDate, $endDate): Builder{
        return $this->query
        ->when($startDate, fn($q) => $q->whereDate('published_at', '>=', $startDate))
        ->when($endDate, fn($q) => $q->whereDate('published_at', '<=', $endDate));
    }

     /**
     * Perform a global search across title, description, content, and author fields.
     *
     * @param string $search The search keyword.
     * @return Builder
     */
    public function allSearch($search): Builder{
        return $this->query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%");
            });
    }

    /**
     * Execute the search and return paginated results.
     *
     * @param int $perPage Number of items per page.
     * @return LengthAwarePaginator
     */
    public function search($perPage): LengthAwarePaginator{
        return $this->query->orderByDesc('published_at')
            ->paginate($perPage);
    }
}
