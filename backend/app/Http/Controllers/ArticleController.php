<?php

namespace App\Http\Controllers;

use App\Services\ArticleService;
use App\Services\Sources\ArticleSearchService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ArticleController extends Controller
{
    public function __construct(private ArticleService $articleService, private ArticleSearchService $articleSearchService){}

    public function index()
    {
        $category = request('category');
        $source   = request('source_name');
        $author   = request('author');
        $search   = request('search');
        $perPage = request('per_page', 50);
        $startDate = request('dateFrom');
        $endDate = request('dateTo');

        if($category){
            $this->articleSearchService->category($category);
        }else{
            if(auth()->check()){ // if user is logged in, select only categories loaded from preference
                $user = auth()->user();
                $categories = $this->articleService->getUserCategories($user);
                if(!empty($categories)){
                    $this->articleSearchService->category($categories);
                }
            }
        }

        if($source){
            $this->articleSearchService->sourceName($source);
        }

        if($author){
            $this->articleSearchService->author($author);
        }

        if($search){
            $this->articleSearchService->allSearch($search);
        }

        if($startDate){
            $startDate = Carbon::parse($startDate)->startOfDay()->toDateTimeLocalString();
        }

        if($endDate){
            $endDate = Carbon::parse($endDate)->endOfDay();
            if($endDate->gt(Carbon::now())){
                $endDate = now()->endOfDay()->toDateTimeLocalString();
            }
        }

        $this->articleSearchService->publishedDateRange($startDate, $endDate);

        $results = $this->articleSearchService->search($perPage);

        return response()->json($results);
    }

    public function getCategories()
    {
        $categories = $this->articleService->getCategories();
        return response()->json($categories);
    }

    public function setSelectedCategories(Request $request){
        $user = auth()->user();
        if(!$user){
            return response()->json(['message'=> 'unauthenticated user'],Response::HTTP_FORBIDDEN);
        }
        $categories = $request->post('categories', []);
        $categories = implode(',', $categories);
        $this->articleService->setUserCategory($user, $categories);
        return response()->json(['status' => 1]);
    }

    public function getUserCategories(){
        $user = auth()->user();
        if(!$user){
            return response()->json(['message'=> 'unauthenticated user'],Response::HTTP_FORBIDDEN);
        }

        $categories = $this->articleService->getUserCategories($user);
        return response()->json($categories);
    }
}
