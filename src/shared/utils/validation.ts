/**
 * Utilidades de validación para formularios
 * Incluye validación de contraseñas, emails y otras funciones auxiliares
 */

export interface PasswordStrength {
  score: number;
  level: 'weak' | 'medium' | 'strong' | 'very-strong';
  label: string;
  color: string;
  percentage: number;
}

/**
 * Evalúa la fortaleza de una contraseña
 * Retorna un objeto con score, nivel, etiqueta, color y porcentaje
 */
export const validatePasswordStrength = (password: string): PasswordStrength => {
  let strength = 0;

  // Criterios de fortaleza
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  // Calcular nivel y atributos
  let level: PasswordStrength['level'];
  let label: string;
  let color: string;
  let percentage: number;

  if (strength <= 2) {
    level = 'weak';
    label = 'Débil';
    color = '#ef4444'; // red-500
    percentage = 25;
  } else if (strength <= 4) {
    level = 'medium';
    label = 'Media';
    color = '#f97316'; // orange-500
    percentage = 50;
  } else if (strength <= 5) {
    level = 'strong';
    label = 'Fuerte';
    color = '#10b981'; // green-500
    percentage = 75;
  } else {
    level = 'very-strong';
    label = 'Muy Fuerte';
    color = '#059669'; // green-600
    percentage = 100;
  }

  return {
    score: strength,
    level,
    label,
    color,
    percentage
  };
};

/**
 * Valida si un email tiene formato correcto
 * Usa una regex simple pero efectiva
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Obtiene los criterios de contraseña que faltan cumplir
 * Útil para mostrar feedback visual al usuario
 */
export const getPasswordCriteria = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password)
  };
};

/**
 * Verifica si una contraseña es suficientemente fuerte
 * Retorna true si cumple todos los criterios mínimos
 */
export const isPasswordStrong = (password: string): boolean => {
  const criteria = getPasswordCriteria(password);
  return Object.values(criteria).every(criterion => criterion);
};

/**
 * Sanitiza un string de entrada removiendo caracteres peligrosos
 * Previene inyección de scripts básica
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Valida un nombre completo
 * Verifica que contenga al menos nombre y apellido
 */
export const validateFullName = (name: string): boolean => {
  const trimmedName = name.trim();
  const parts = trimmedName.split(/\s+/);
  return parts.length >= 2 && parts.every(part => part.length > 0);
};
