<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Preference;
use App\Models\User;

class ArticleService
{
    public function getCategories(): array
    {
        $categories = [];
        $sources = Article::select('category')->distinct()->orderBy('category')->get();
        foreach ($sources as $source) {
            if (empty($source->category)) {
                continue;
            }
            $categories[] = $source->category;
        }
        return $categories;
    }

    public function setUserCategory(User $user, $categories){
        return Preference::updateOrCreate(['user'=> $user->id, 'meta' => 'categories'], ['value'=> $categories]);
    }

    public function getUserCategories(User $user) {
        $categories = Preference::select('value')
        ->where('user', $user->id)
        ->where('meta', 'categories')
        ->first();

        if($categories && $categories->value){
            $categories = explode(',', $categories->value);
            return $categories;
        }
        return [];
    }
}
