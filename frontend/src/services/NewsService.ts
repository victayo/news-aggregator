import { News } from "@/models/news";
import moment from "moment";
import AuthService from "./AuthService";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type NewsParam = {
    search?: string;
    category?: string;
    author?: string;
    per_page?: number;
    page?: number;
    dateFrom?: string;
    dateTo?: string;
};
export default class NewsService {

    private static _filters: any = {
        search: '',
        dateFrom: '',
        dateTo: ''
    };

    static get filters() {
        return NewsService._filters;
    }

    static set filters(filter) {
        NewsService._filters = { ...filter };
    }

    static async getNews({ category, per_page, page }: NewsParam): Promise<News[]> {
        let params = new URLSearchParams();
        if (category && category != 'all') {
            params.append('category', category);
        }
        if (NewsService._filters.search) {
            params.append('search', NewsService._filters.search);
        }
        if (NewsService._filters.dateFrom) {
            params.append('dateFrom', NewsService._filters.dateFrom);
        }
        if (NewsService._filters.dateTo) {
            params.append('dateTo', NewsService._filters.dateTo);
        }

        if (per_page) {
            params.append('per_page', per_page.toString());
        }
        if (page) {
            params.append('page', page.toString());
        }

        let url = `${BASE_URL}/api/articles`;
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } as any;
        if (AuthService.isLoggedIn()) {
            url = url + `/user`;
            const user = AuthService.getUser();
            headers.Authorization = `Bearer ${user.token}`;
        }
        const response = await fetch(`${url}?${params.toString()}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }

        return response.json().then(data => {
            const dataLength = data.total;
            return data.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                category: item.category,
                publishedDate: moment(item.published_at).format('LLL'),
                imgSrc: item.url_to_image ?? '/file.svg',
                content: item.content,
                description: item.description,
                url: item.url,
                source: item.source_name,
                author: item.author || 'Unknown'
            } as News));
        });

    }

    static async getCategories() {
        const response = await fetch(`${BASE_URL}/api/articles/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        return response.json();
    }

    static async getUserCategories() {
        const user = AuthService.getUser();
        const response = await fetch(`${BASE_URL}/api/articles/user/categories`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        return response.json();
    }

    static async setUserCategories(categories: string[]) {
        const user = AuthService.getUser();
        const response = await fetch(`${BASE_URL}/api/articles/user/categories`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ categories: categories })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        return response.json();
    }
}