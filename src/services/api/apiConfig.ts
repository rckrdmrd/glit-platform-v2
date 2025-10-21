/**
 * API Configuration
 *
 * Centralized configuration for API endpoints, feature flags,
 * and environment-specific settings.
 */

// ============================================================================
// API ENDPOINTS
// ============================================================================

/**
 * Complete API endpoint definitions
 * Organized by feature module
 */
export const API_ENDPOINTS = {
  /**
   * Authentication endpoints
   */
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    verifyEmail: '/auth/verify-email',
    requestPasswordReset: '/auth/forgot-password',  // Backend uses forgot-password
    resetPassword: '/auth/reset-password',
    changePassword: '/auth/password',  // Backend uses /auth/password PUT
    getCurrentUser: '/auth/me',
    updateProfile: '/auth/profile',
  },

  /**
   * User management endpoints
   */
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    preferences: '/users/preferences',
    updatePreferences: '/users/preferences',
    avatar: '/users/avatar',
    statistics: '/users/statistics',
  },

  /**
   * Ranks & Progression endpoints
   */
  ranks: {
    current: (userId: string) => `/gamification/ranks/user/${userId}`,  // Fixed: was /ranks/current
    checkPromotion: (userId: string) => `/gamification/ranks/check-promotion/${userId}`,
    rankUp: (userId: string) => `/gamification/ranks/promote/${userId}`,  // Fixed: was /ranks/rankup
    history: (userId: string) => `/gamification/ranks/history/${userId}`,  // Fixed: was /ranks/history
    multipliers: (userId: string) => `/gamification/ranks/multiplier/${userId}`,  // Fixed: was /ranks/multipliers
    listAll: '/gamification/ranks',
    getDetails: (rank: string) => `/gamification/ranks/${rank}`,
  },

  /**
   * Economy & Shop endpoints (ML Coins)
   */
  economy: {
    balance: (userId: string) => `/gamification/coins/${userId}`,  // Fixed: backend uses /coins/:userId
    transactions: (userId: string) => `/gamification/coins/transactions/${userId}`,  // Fixed
    earn: '/gamification/coins/earn',  // POST to earn coins
    spend: '/gamification/coins/spend',  // POST to spend coins
    stats: (userId: string) => `/gamification/coins/stats/${userId}`,  // Fixed: was /economy/stats
    leaderboard: '/gamification/coins/leaderboard',
    metrics: '/gamification/coins/metrics',  // Admin only
  },

  /**
   * Achievements endpoints
   */
  achievements: {
    list: '/gamification/achievements',
    get: (id: string) => `/gamification/achievements/${id}`,
    unlock: '/gamification/achievements/unlock',
    unlockSpecific: (id: string) => `/gamification/achievements/${id}/unlock`,
    progress: '/gamification/achievements/progress',
    updateProgress: (id: string) => `/gamification/achievements/${id}/progress`,
    stats: '/gamification/achievements/stats',
    recent: '/gamification/achievements/recent',
  },

  /**
   * Power-ups endpoints
   */
  powerups: {
    list: '/gamification/powerups',
    get: (id: string) => `/gamification/powerups/${id}`,
    purchase: '/gamification/powerups/purchase',
    purchaseSpecific: (id: string) => `/gamification/powerups/${id}/purchase`,
    use: '/gamification/powerups/use',
    useSpecific: (id: string) => `/gamification/powerups/${id}/use`,
    inventory: '/gamification/powerups/inventory',
    active: '/gamification/powerups/active',
  },

  /**
   * Leaderboards endpoints (Sprint 2 - New Materialized Views)
   */
  leaderboards: {
    // Legacy endpoints
    global: '/gamification/leaderboards/global',
    school: '/gamification/leaderboards/school',
    grade: '/gamification/leaderboards/grade',
    friends: '/gamification/leaderboards/friends',
    userRank: '/gamification/leaderboards/rank',
    userPosition: (userId: string) => `/gamification/leaderboards/position/${userId}`,
    byType: (type: string) => `/gamification/leaderboards/${type}`,
    byTypeAndPeriod: (type: string, period: string) => `/gamification/leaderboards/${type}/${period}`,

    // Sprint 2 - New Materialized View Endpoints
    xp: '/gamification/leaderboards/xp',
    coins: '/gamification/leaderboards/coins',
    streaks: '/gamification/leaderboards/streaks',
    globalView: '/gamification/leaderboards/global',  // Fixed: was /global-view
    myRank: (type: 'xp' | 'coins' | 'streaks' | 'global') => `/gamification/leaderboards/my-rank/${type}`,
  },

  /**
   * Guilds endpoints
   */
  guilds: {
    list: '/gamification/guilds',
    create: '/gamification/guilds',
    get: (id: string) => `/gamification/guilds/${id}`,
    update: (id: string) => `/gamification/guilds/${id}`,
    delete: (id: string) => `/gamification/guilds/${id}`,
    join: (id: string) => `/gamification/guilds/${id}/join`,
    leave: (id: string) => `/gamification/guilds/${id}/leave`,
    members: (id: string) => `/gamification/guilds/${id}/members`,
    removeMember: (guildId: string, memberId: string) => `/gamification/guilds/${guildId}/members/${memberId}`,
    updateMemberRole: (guildId: string, memberId: string) => `/gamification/guilds/${guildId}/members/${memberId}/role`,
    challenges: (id: string) => `/gamification/guilds/${id}/challenges`,
    createChallenge: (id: string) => `/gamification/guilds/${id}/challenges`,
    leaderboard: (id: string) => `/gamification/guilds/${id}/leaderboard`,
    search: '/gamification/guilds/search',
  },

  /**
   * Friends endpoints
   */
  friends: {
    list: '/social/friends',
    get: (id: string) => `/social/friends/${id}`,
    request: '/social/friends/request',
    requests: '/social/friends/requests',
    accept: (id: string) => `/social/friends/${id}/accept`,
    decline: (id: string) => `/social/friends/${id}/decline`,
    remove: (id: string) => `/social/friends/${id}`,
    recommendations: '/social/friends/recommendations',
    activities: '/social/friends/activities',
    search: '/social/friends/search',
    online: '/social/friends/online',
  },

  /**
   * Mechanics endpoints (exercises)
   */
  mechanics: {
    list: '/mechanics',
    get: (id: string) => `/mechanics/${id}`,
    byType: (type: string) => `/mechanics/type/${type}`,
    submit: '/mechanics/submit',
    submitSpecific: (id: string) => `/mechanics/${id}/submit`,
    progress: '/mechanics/progress',
    userProgress: (userId: string) => `/mechanics/progress/${userId}`,
    scoring: '/mechanics/scoring',
    hints: (id: string) => `/mechanics/${id}/hints`,
    validate: '/mechanics/validate',
  },

  /**
   * AI Service endpoints
   */
  ai: {
    analyze: '/ai/analyze',
    analyzeText: '/ai/analyze/text',
    generateResponse: '/ai/generate',
    checkFact: '/ai/fact-check',
    validateHypothesis: '/ai/validate-hypothesis',
    getSuggestions: '/ai/suggestions',
    improveReading: '/ai/reading-assistance',
  },

  /**
   * Educational endpoints (modules, exercises, progress)
   */
  educational: {
    modules: '/educational/modules',
    module: (id: string) => `/educational/modules/${id}`,
    moduleExercises: (id: string) => `/educational/modules/${id}/exercises`,
    moduleAccess: (id: string) => `/educational/modules/${id}/access`,
    userModules: (userId: string) => `/educational/modules/user/${userId}`,
    exercises: '/educational/exercises',
    exercise: (id: string) => `/educational/exercises/${id}`,
    submitExercise: '/educational/exercises/submit',
    userProgress: (userId: string) => `/educational/progress/user/${userId}`,
    moduleProgress: (userId: string, moduleId: string) => `/educational/progress/user/${userId}/module/${moduleId}`,
    userDashboard: (userId: string) => `/educational/progress/user/${userId}/dashboard`,
    exerciseAttempts: (userId: string) => `/educational/progress/attempts/${userId}`,
    userActivities: (userId: string) => `/educational/progress/activities/${userId}`,
    activityStats: (userId: string) => `/educational/progress/activities/${userId}/stats`,
    activitiesByType: (userId: string, type: string) => `/educational/progress/activities/${userId}/by-type/${type}`,
    userAnalytics: (userId: string) => `/educational/analytics/${userId}`,
    classroomAnalytics: (classroomId: string) => `/educational/analytics/classroom/${classroomId}`,
  },

  /**
   * Teacher endpoints (classrooms, assignments, analytics, grading, student progress)
   */
  teacher: {
    // Classroom Management
    classrooms: '/teacher/classrooms',
    classroom: (id: string) => `/teacher/classrooms/${id}`,
    createClassroom: '/teacher/classrooms',
    updateClassroom: (id: string) => `/teacher/classrooms/${id}`,
    deleteClassroom: (id: string) => `/teacher/classrooms/${id}`,
    classroomStudents: (id: string) => `/teacher/classrooms/${id}/students`,
    addStudents: (id: string) => `/teacher/classrooms/${id}/students`,
    removeStudent: (classId: string, studentId: string) => `/teacher/classrooms/${classId}/students/${studentId}`,

    // Assignment Management
    assignments: '/teacher/assignments',
    assignment: (id: string) => `/teacher/assignments/${id}`,
    createAssignment: '/teacher/assignments',
    updateAssignment: (id: string) => `/teacher/assignments/${id}`,
    deleteAssignment: (id: string) => `/teacher/assignments/${id}`,
    assignTo: (id: string) => `/teacher/assignments/${id}/assign`,
    assignmentSubmissions: (id: string) => `/teacher/assignments/${id}/submissions`,
    gradeAssignmentSubmission: (assignmentId: string, submissionId: string) =>
      `/teacher/assignments/${assignmentId}/submissions/${submissionId}/grade`,

    // Grading & Submissions
    pendingSubmissions: '/teacher/submissions/pending',
    submission: (id: string) => `/teacher/submissions/${id}`,
    gradeSubmission: (id: string) => `/teacher/submissions/${id}/grade`,
    addFeedback: (id: string) => `/teacher/submissions/${id}/feedback`,

    // Analytics
    classroomAnalytics: (id: string) => `/teacher/analytics/classroom/${id}`,
    studentAnalytics: (id: string) => `/teacher/analytics/student/${id}`,
    assignmentAnalytics: (id: string) => `/teacher/analytics/assignment/${id}`,
    engagementMetrics: '/teacher/analytics/engagement',
    generateReport: '/teacher/analytics/reports',

    // Student Progress
    studentProgress: (id: string) => `/teacher/students/${id}/progress`,
    studentDetailedAnalytics: (id: string) => `/teacher/students/${id}/analytics`,
    teacherNotes: (id: string) => `/teacher/students/${id}/notes`,
    addTeacherNote: (id: string) => `/teacher/students/${id}/note`,
  },

  /**
   * Admin endpoints
   */
  admin: {
    /**
     * Dashboard endpoints
     */
    dashboard: '/admin',
    health: '/admin/system/health',
    metrics: '/admin/metrics',
    actions: '/admin/actions',
    recentActions: '/admin/actions/recent',
    alerts: '/admin/alerts',
    dismissAlert: (id: string) => `/admin/alerts/${id}/dismiss`,
    analytics: '/admin/analytics/user-activity',
    statistics: '/admin/system/statistics',

    /**
     * User management endpoints
     */
    users: {
      list: '/admin/users',
      get: (id: string) => `/admin/users/${id}`,
      update: (id: string) => `/admin/users/${id}`,
      delete: (id: string) => `/admin/users/${id}`,
      activate: (id: string) => `/admin/users/${id}/activate`,
      deactivate: (id: string) => `/admin/users/${id}/deactivate`,
      suspend: (id: string) => `/admin/users/${id}/suspend`,
      unsuspend: (id: string) => `/admin/users/${id}/unsuspend`,
      resetPassword: (id: string) => `/admin/users/${id}/reset-password`,
      activity: (id: string) => `/admin/users/${id}/activity`,
      systemUsers: '/admin/system/users',
      updateRole: (id: string) => `/admin/system/users/${id}/role`,
      updateStatus: (id: string) => `/admin/system/users/${id}/status`,
    },

    /**
     * Organization management endpoints
     */
    organizations: {
      list: '/admin/organizations',
      get: (id: string) => `/admin/organizations/${id}`,
      create: '/admin/organizations',
      update: (id: string) => `/admin/organizations/${id}`,
      delete: (id: string) => `/admin/organizations/${id}`,
      users: (id: string) => `/admin/organizations/${id}/users`,
      updateSubscription: (id: string) => `/admin/organizations/${id}/subscription`,
      updateFeatures: (id: string) => `/admin/organizations/${id}/features`,
    },

    /**
     * Content management endpoints
     */
    content: {
      pendingExercises: '/admin/content/exercises/pending',
      approveExercise: (id: string) => `/admin/content/exercises/${id}/approve`,
      rejectExercise: (id: string) => `/admin/content/exercises/${id}/reject`,
      mediaLibrary: '/admin/content/media',
      deleteMedia: (id: string) => `/admin/content/media/${id}`,
      createVersion: '/admin/content/version',
    },

    /**
     * System management endpoints
     */
    system: {
      health: '/admin/system/health',
      logs: '/admin/system/logs',
      maintenance: '/admin/system/maintenance',
      statistics: '/admin/system/statistics',
    },
  },
} as const;

// ============================================================================
// FEATURE FLAGS
// ============================================================================

/**
 * Feature flags from environment variables
 */
export const FEATURE_FLAGS = {
  /**
   * Use mock data instead of real API calls
   * Set VITE_USE_MOCK_DATA=true to enable
   */
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true',

  /**
   * Enable WebSocket for real-time features
   * Set VITE_ENABLE_WEBSOCKET=true to enable
   */
  ENABLE_WEBSOCKET: import.meta.env.VITE_ENABLE_WEBSOCKET === 'true',

  /**
   * Enable debug logging for API calls
   * Set VITE_DEBUG_API=true to enable
   */
  DEBUG_API: import.meta.env.VITE_DEBUG_API === 'true',

  /**
   * Enable AI features
   * Set VITE_ENABLE_AI=true to enable
   */
  ENABLE_AI: import.meta.env.VITE_ENABLE_AI !== 'false', // Default true

  /**
   * Enable analytics tracking
   * Set VITE_ENABLE_ANALYTICS=true to enable
   */
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
} as const;

// ============================================================================
// API CONFIGURATION
// ============================================================================

/**
 * API configuration constants
 */
export const API_CONFIG = {
  /**
   * Base API URL
   */
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',

  /**
   * WebSocket URL
   */
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:3001',

  /**
   * Request timeout (ms)
   */
  TIMEOUT: 30000,

  /**
   * Retry configuration
   */
  RETRY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
    BACKOFF_MULTIPLIER: 2,
  },

  /**
   * Pagination defaults
   */
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },
} as const;

// ============================================================================
// HTTP STATUS CODES
// ============================================================================

/**
 * Common HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  API_ENDPOINTS,
  FEATURE_FLAGS,
  API_CONFIG,
  HTTP_STATUS,
};
