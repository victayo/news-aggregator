<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('articles/user', [ArticleController::class, 'index'])->name('articles.user');
    Route::get('articles/user/categories', [ArticleController::class, 'getUserCategories'])->name('articles.user.categories');
    Route::post('articles/user/categories', [ArticleController::class, 'setSelectedCategories'])->name('articles.save.categories');
});

Route::prefix('auth')->group(function(){
    Route::post('login', [AuthController::class,'login'])->name('login');
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');
});

Route::get('articles', [ArticleController::class, 'index'])->name('articles.index');
Route::get('articles/categories', [ArticleController::class, 'getCategories'])->name('articles.categories');

