/**
 * User type definition
 * Based on EPIC-002 authentication specifications
 */
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'student' | 'admin_teacher' | 'super_admin';
  tenantId?: string;
  emailVerified: boolean;
  isActive?: boolean;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Registration data
 */
export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  tenantId?: string;
}

/**
 * Authentication response from API
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password reset confirmation
 */
export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

/**
 * Session information
 */
export interface SessionInfo {
  expiresAt: number;
  isValid: boolean;
  needsRefresh: boolean;
}

/**
 * Account suspension details
 */
export interface SuspensionDetails {
  isSuspended: boolean;
  isPermanent: boolean;
  suspendedUntil?: string; // ISO date string
  reason?: string;
}

/**
 * Account status error codes
 */
export type AccountErrorCode =
  | 'ACCOUNT_INACTIVE'
  | 'ACCOUNT_SUSPENDED'
  | 'INVALID_CREDENTIALS'
  | 'AUTHENTICATION_ERROR';
