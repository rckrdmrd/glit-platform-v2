/**
 * Auth API Integration
 *
 * API client for authentication endpoints including login, register,
 * logout, token refresh, password recovery, and email verification.
 */

import { apiClient } from '@/services/api/apiClient';
import { API_ENDPOINTS, FEATURE_FLAGS } from '@/services/api/apiConfig';
import { handleAPIError } from '@/services/api/apiErrorHandler';
import type {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  PasswordResetRequest,
  PasswordResetConfirm,
  SessionInfo,
} from '../types/auth.types';
import type { ApiResponse } from '@/services/api/apiTypes';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Map backend user response to frontend User type
 * Backend uses firstName/lastName, frontend uses fullName
 */
const mapBackendUserToFrontend = (backendUser: any): User => {
  const fullName = backendUser.displayName ||
                   `${backendUser.firstName || ''} ${backendUser.lastName || ''}`.trim() ||
                   backendUser.email.split('@')[0];

  return {
    id: backendUser.id,
    email: backendUser.email,
    fullName: fullName,
    role: backendUser.role || 'student',
    emailVerified: backendUser.emailVerified || false,
    avatar: backendUser.avatar,
    createdAt: backendUser.createdAt,
    updatedAt: backendUser.updatedAt,
    tenantId: backendUser.tenantId,
  };
};

/**
 * Map backend auth response to frontend AuthResponse
 */
const mapBackendAuthResponse = (backendResponse: any): AuthResponse => {
  return {
    user: mapBackendUserToFrontend(backendResponse.user),
    token: backendResponse.token,
    refreshToken: backendResponse.refreshToken || '',
  };
};

// ============================================================================
// MOCK DATA (for development)
// ============================================================================

/**
 * Mock login function for development
 */
const mockLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Test credentials
  if (
    (credentials.email === 'admin@glit.com' || credentials.email === 'detective@glit.com') &&
    credentials.password === 'Password123!'
  ) {
    return {
      user: {
        id: '1',
        email: credentials.email,
        fullName: 'Admin User',
        role: 'student',
        emailVerified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        createdAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    };
  }

  throw new Error('Credenciales inválidas');
};

/**
 * Mock register function for development
 */
const mockRegister = async (data: RegisterData): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (data.password !== data.confirmPassword) {
    throw new Error('Las contraseñas no coinciden');
  }

  if (!data.acceptTerms) {
    throw new Error('Debes aceptar los términos y condiciones');
  }

  return {
    user: {
      id: '2',
      email: data.email,
      fullName: data.fullName,
      role: 'student',
      emailVerified: true, // Always verified - email verification is disabled
      createdAt: new Date().toISOString(),
    },
    token: 'mock-jwt-token-' + Date.now(),
    refreshToken: 'mock-refresh-token-' + Date.now(),
  };
};

// ============================================================================
// AUTH API FUNCTIONS
// ============================================================================

/**
 * Login user
 *
 * @param credentials - User login credentials
 * @returns AuthResponse with user data and tokens
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    // Use mock data if feature flag is enabled
    if (FEATURE_FLAGS.USE_MOCK_DATA) {
      return await mockLogin(credentials);
    }

    // Real API call
    const response = await apiClient.post<ApiResponse<any>>(
      API_ENDPOINTS.auth.login,
      credentials
    );

    // Extract and map backend response to frontend format
    return mapBackendAuthResponse(response.data.data);
  } catch (error) {
    throw handleAPIError(error);
  }
};

/**
 * Register new user
 *
 * @param registerData - User registration data
 * @returns AuthResponse with user data and tokens
 */
export const register = async (registerData: RegisterData): Promise<AuthResponse> => {
  try {
    // Use mock data if feature flag is enabled
    if (FEATURE_FLAGS.USE_MOCK_DATA) {
      return await mockRegister(registerData);
    }

    // Map frontend register data to backend format
    // Backend expects firstName and lastName separately
    const nameParts = registerData.fullName.trim().split(' ');
    const firstName = nameParts[0] || registerData.fullName;
    const lastName = nameParts.slice(1).join(' ') || registerData.fullName;

    const backendRegisterData = {
      email: registerData.email,
      password: registerData.password,
      firstName: firstName,
      lastName: lastName,
      role: 'student' as const,
    };

    // Real API call
    const response = await apiClient.post<ApiResponse<any>>(
      API_ENDPOINTS.auth.register,
      backendRegisterData
    );

    // Extract and map backend response to frontend format
    return mapBackendAuthResponse(response.data.data);
  } catch (error) {
    throw handleAPIError(error);
  }
};

/**
 * Logout user
 *
 * @returns Success status
 */
export const logout = async (): Promise<void> => {
  try {
    // Use mock data if feature flag is enabled
    if (FEATURE_FLAGS.USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return;
    }

    // Real API call
    await apiClient.post(API_ENDPOINTS.auth.logout);
  } catch (error) {
    throw handleAPIError(error);
  }
};

/**
 * Refresh authentication token
 *
 * @param refreshToken - Refresh token
 * @returns New access token
 */
export const refreshToken = async (refreshToken: string): Promise<{ token: string }> => {
  try {
    // Use mock data if feature flag is enabled
    if (FEATURE_FLAGS.USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { token: 'new-mock-jwt-token-' + Date.now() };
    }

    // Real API call
    const response = await apiClient.post<ApiResponse<{ token: string }>>(
      API_ENDPOINTS.auth.refresh,
      { refreshToken }
    );

    // Extract data from wrapped response
    return response.data.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

/**
 * Verify email address
 *
 * @deprecated Since 2025-10 - Email verification is now disabled.
 * All users are automatically verified upon registration.
 * This function is kept for backward compatibility only.
 *
 * @param token - Email verification token
 * @returns Success status
 */
export const verifyEmail = async (token: string): Promise<void> => {
  try {
    // Use mock data if feature flag is enabled
    if (FEATURE_FLAGS.USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return;
    }

    // Real API call (backend endpoint is also deprecated)
    await apiClient.post(API_ENDPOINTS.auth.verifyEmail, { token });
  } catch (error) {
    throw handleAPIError(error);
  }
};

/**
 * Request password reset email
 *
 * @param request - Email to send reset link to
 * @returns Success status
 */
export const requestPasswordReset = async (
  request: PasswordResetRequest
): Promise<void> => {
  try {
    // Use mock data if feature flag is enabled
    if (FEATURE_FLAGS.USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return;
    }

    // Real API call
    await apiClient.post(API_ENDPOINTS.auth.requestPasswordReset, request);
  } catch (error) {
    throw handleAPIError(error);
  }
};

/**
 * Reset password with token
 *
 * @param request - Password reset token and new password
 * @returns Success status
 */
export const resetPassword = async (request: PasswordResetConfirm): Promise<void> => {
  try {
    // Use mock data if feature flag is enabled
    if (FEATURE_FLAGS.USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return;
    }

    // Real API call
    await apiClient.post(API_ENDPOINTS.auth.resetPassword, request);
  } catch (error) {
    throw handleAPIError(error);
  }
};

/**
 * Change password for authenticated user
 *
 * @param currentPassword - Current password
 * @param newPassword - New password
 * @returns Success status
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    // Use mock data if feature flag is enabled
    if (FEATURE_FLAGS.USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return;
    }

    // Real API call - Backend uses PUT method
    await apiClient.put(API_ENDPOINTS.auth.changePassword, {
      currentPassword,
      newPassword,
    });
  } catch (error) {
    throw handleAPIError(error);
  }
};

/**
 * Get current authenticated user
 *
 * @returns Current user data
 */
export const getCurrentUser = async (): Promise<User> => {
  try {
    // Use mock data if feature flag is enabled
    if (FEATURE_FLAGS.USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        id: '1',
        email: 'detective@glit.com',
        fullName: 'Detective GLIT',
        role: 'student',
        emailVerified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=detective',
        createdAt: new Date().toISOString(),
      };
    }

    // Real API call - backend returns { success: true, data: { user: {...} } }
    const response = await apiClient.get<ApiResponse<{ user: any }>>(
      API_ENDPOINTS.auth.getCurrentUser
    );

    // Extract and map user from backend format to frontend format
    return mapBackendUserToFrontend(response.data.data.user);
  } catch (error) {
    throw handleAPIError(error);
  }
};

/**
 * Update user profile
 *
 * @param updates - Partial user updates
 * @returns Updated user data
 */
export const updateProfile = async (updates: Partial<User>): Promise<User> => {
  try {
    // Use mock data if feature flag is enabled
    if (FEATURE_FLAGS.USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        id: '1',
        email: 'detective@glit.com',
        fullName: updates.fullName || 'Detective GLIT',
        role: 'student',
        emailVerified: true,
        avatar: updates.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=detective',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    // Map frontend updates to backend format
    const backendUpdates: any = {};
    if (updates.fullName) {
      backendUpdates.displayName = updates.fullName;
    }
    if (updates.avatar) {
      backendUpdates.avatar = updates.avatar;
    }

    // Real API call
    const response = await apiClient.patch<ApiResponse<any>>(
      API_ENDPOINTS.auth.updateProfile,
      backendUpdates
    );

    // Extract and map backend response to frontend format
    return mapBackendUserToFrontend(response.data.data);
  } catch (error) {
    throw handleAPIError(error);
  }
};

/**
 * Check session validity
 *
 * @returns Session information
 */
export const checkSession = async (): Promise<SessionInfo> => {
  try {
    // Use mock data if feature flag is enabled
    if (FEATURE_FLAGS.USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
      return {
        expiresAt,
        isValid: true,
        needsRefresh: false,
      };
    }

    // Real API call
    const response = await apiClient.get<ApiResponse<SessionInfo>>(
      '/auth/session'
    );

    // Extract data from wrapped response
    return response.data.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

export const authAPI = {
  login,
  register,
  logout,
  refreshToken,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  changePassword,
  getCurrentUser,
  updateProfile,
  checkSession,
};

export default authAPI;
