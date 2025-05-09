import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

let MAX_RETRIES = 3;

export default class APIUtils {
    // Constructor to initialize axios

    // constructor() {}
    // Utility function to make HTTP requests
    public static async sendRequest (
        base: string,
        method: string,
        endpoint: string,
        data: any = {},
        headers: Record<string, string> = {},  // Add headers as an optional parameter
        queryParams: Record<string, string> = {} // Add query parameters as an optional parameter
    ): Promise<AxiosResponse> {
        const url = `${base}${endpoint}`;
        console.log('Request URL:', url);

       
        // Prepare the axios configuration
        const config: AxiosRequestConfig = {
            method,          // HTTP method (e.g., 'POST', 'GET', etc.)
            url,             // Full URL (base + endpoint)
            data,            // Request body (for POST, PUT, etc.)
            headers,         // Request headers
            params: queryParams // Query parameters (only for GET, DELETE, etc.)
        };
        try {
            try {
                const response = await axios(config);
                return response;
            } catch (error) {
                console.error('Error in request:', error);
                throw error;  // Rethrow the error after logging it
            }
        } catch (error) {
            if(--MAX_RETRIES > 0){
                console.log('Retrying request... Remaining attempts:', MAX_RETRIES);
                return await APIUtils.sendRequest(base, method, endpoint, data, headers, queryParams);
            }
            else{
                console.error('Max retries reached. Request failed:', error);
                throw error;  // Rethrow the error after logging it
            }
        }

    };
}

// Example usage:
// const baseUrl = 'https://api.example.com';
// const response = await APIUtils.sendRequest(baseUrl, "post", "/login", { username: "testuser", password: "testpassword" }, {}, {});
// console.log('Response:', await response.data.username);
// console.log('Status:', response.status);

