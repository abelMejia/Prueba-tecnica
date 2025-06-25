class HttpClient {
    private static async request<T>(endpoint: string): Promise<T> {
        try {
            const response = await fetch(`${process.env.BASE_URL}${endpoint}`);
            if(!response.ok) { throw new Error(`Error ${response.status}: ${response.statusText}`) }

            return response.json();
        } catch (error) {
            throw error;
        }
    }

    static get<T>(endpoint: string) {
        return this.request<T>(endpoint);
    }
}

export default HttpClient;
