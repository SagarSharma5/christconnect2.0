import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://christconnect-backend.onrender.com';

class TokenManager {
    static async getAccessToken() {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const expiryDate = await AsyncStorage.getItem('tokenExpiryDate');
            
            // Check if token is expired or will expire in the next 5 minutes
            if (!accessToken || !expiryDate || new Date(expiryDate) <= new Date(Date.now() + 5 * 60 * 1000)) {
                return await this.refreshToken();
            }
            
            return accessToken;
        } catch (error) {
            console.error('Error getting access token:', error);
            throw error;
        }
    }

    static async refreshToken() {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await axios.post(`${API_URL}/auth/refresh-token`, {
                refreshToken
            });

            const { access_token, expiry_date } = response.data;

            // Save new access token and expiry
            await AsyncStorage.setItem('accessToken', access_token);
            await AsyncStorage.setItem('tokenExpiryDate', expiry_date.toString());

            return access_token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            // Handle authentication errors (e.g., invalid refresh token)
            await this.clearTokens();
            throw error;
        }
    }

    static async clearTokens() {
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'tokenExpiryDate']);
    }
}

export default TokenManager;