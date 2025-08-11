<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Preference;
use App\Models\User;

/**
 * Service class for handling article-related operations
 * such as fetching categories and managing user category preferences.
 */
class ArticleService
{

    /**
     * Retrieve a list of distinct article categories.
     *
     * This method queries the articles table for unique category values,
     * orders them alphabetically, and filters out empty values.
     *
     * @return array List of category names.
     */
    public function getCategories(): array
    {
        return Article::whereNotNull('category')
            ->where('category', '!=', '')
            ->distinct()
            ->orderBy('category')
            ->pluck('category')
            ->toArray();
    }

    /**
     * Save or update the user's preferred categories.
     *
     * This method stores the selected categories for a user in the preferences table.
     * If a preference already exists for the given user and 'categories' meta key,
     * it will be updated, otherwise a new record will be created.
     *
     * @param User $user The user whose preference is being updated.
     * @param string $categories Comma-separated list of category names.
     * @return Preference The updated or newly created preference record.
     */
    public function setUserCategory(User $user, $categories)
    {
        return Preference::updateOrCreate(['user' => $user->id, 'meta' => 'categories'], ['value' => $categories]);
    }

    /**
     * Get a user's preferred categories as an array.
     *
     * This method retrieves the stored category preferences for a given user.
     * If found, the categories are returned as an array of strings;
     * otherwise, an empty array is returned.
     *
     * @param User $user The user whose categories are being retrieved.
     * @return array List of category names, or an empty array if none are set.
     */
    public function getUserCategories(User $user)
    {
        $categories = Preference::select('value')
            ->where('user', $user->id)
            ->where('meta', 'categories')
            ->first();

        if ($categories && $categories->value) {
            $categories = explode(',', $categories->value);
            return $categories;
        }
        return [];
    }
}
