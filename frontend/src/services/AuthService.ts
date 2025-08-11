const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class AuthService {

    static async register(name: string, email: string, password: string) {
        const response = await fetch(`${BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return response.json();
    }

    static async login(email: string, password: string) {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json().then(res =>{ 
            const user = res.user;
            const token = res.token;
            user.token = token;
            AuthService.setUser(user);
            return res;
        });
    }

    static async logout() {
        const user = AuthService.getUser();
        if (!user || !user.token) {
            throw new Error('User is not logged in');
        }
        const response = await fetch(`${BASE_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }
        // Clear user data from local storage or session storage
        localStorage.removeItem('user');
        return response.json();
    }

    static isLoggedIn() {
        // Check if user is logged in by checking local storage or session storage
        const user = localStorage.getItem('user');
        return user !== null;
    }

    static setUser(user: any) {
        // Store user data in local storage or session storage
        localStorage.setItem('user', JSON.stringify(user));
    }

    static getUser() {
        // Retrieve user data from local storage or session storage
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}