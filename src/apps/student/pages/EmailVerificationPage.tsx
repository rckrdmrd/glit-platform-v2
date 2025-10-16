import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { mockEmailVerification, mockResendVerificationCode } from '@features/auth/mocks/authMocks';
import { Target, Mail, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string>('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const token = searchParams.get('token');

  // Verificar email automáticamente si hay token
  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    setVerifying(true);
    setError('');

    try {
      const response = await mockEmailVerification(verificationToken);

      if (response.success) {
        setVerified(true);
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(response.error || 'Error al verificar el email');
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    setResendSuccess(false);

    try {
      const response = await mockResendVerificationCode();
      if (response.success) {
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Error al reenviar código');
    } finally {
      setResendLoading(false);
    }
  };

  // Verificando...
  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-detective-bg to-detective-bg-secondary flex items-center justify-center p-4">
        <DetectiveCard className="max-w-md w-full">
          <div className="text-center py-8">
            <Loader2 className="w-16 h-16 text-detective-orange mx-auto mb-4 animate-spin" />
            <h2 className="text-detective-subtitle text-detective-text mb-3">
              Verificando Email
            </h2>
            <p className="text-detective-body text-detective-text-secondary">
              Por favor espera...
            </p>
          </div>
        </DetectiveCard>
      </div>
    );
  }

  // Verificación exitosa
  if (verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-detective-bg to-detective-bg-secondary flex items-center justify-center p-4">
        <DetectiveCard className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <CheckCircle2 className="w-16 h-16 text-detective-success mx-auto mb-4" />
            <h2 className="text-detective-title text-detective-success mb-3">
              Email Verificado
            </h2>
            <p className="text-detective-body text-detective-text-secondary mb-4">
              Tu cuenta ha sido activada exitosamente.
            </p>
            <p className="text-detective-sm text-detective-text-secondary mb-6">
              Ahora puedes iniciar sesión y comenzar tu aventura detectivesca.
            </p>
            <DetectiveButton
              variant="primary"
              onClick={() => navigate('/login')}
            >
              Ir al Login
            </DetectiveButton>
          </motion.div>
        </DetectiveCard>
      </div>
    );
  }

  // Error en verificación
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-detective-bg to-detective-bg-secondary flex items-center justify-center p-4">
        <DetectiveCard className="max-w-md w-full">
          <div className="text-center py-8">
            <AlertTriangle className="w-16 h-16 text-detective-danger mx-auto mb-4" />
            <h2 className="text-detective-title text-detective-danger mb-3">
              Error de Verificación
            </h2>
            <p className="text-detective-body text-detective-text-secondary mb-6">
              {error}
            </p>
            <div className="space-y-3">
              <DetectiveButton
                variant="primary"
                onClick={handleResendCode}
                loading={resendLoading}
                disabled={resendLoading}
                className="w-full"
              >
                Reenviar Email de Verificación
              </DetectiveButton>
              <button
                onClick={() => navigate('/login')}
                className="w-full text-detective-text-secondary hover:text-detective-text transition-colors"
              >
                Volver al login
              </button>
            </div>
            {resendSuccess && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-detective-sm text-detective-success mt-4"
              >
                Email de verificación reenviado
              </motion.p>
            )}
          </div>
        </DetectiveCard>
      </div>
    );
  }

  // Sin token - mostrar instrucciones
  return (
    <div className="min-h-screen bg-gradient-to-br from-detective-bg to-detective-bg-secondary flex items-center justify-center p-4">
      <DetectiveCard className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="w-12 h-12 text-detective-orange" />
            <h1 className="text-4xl font-bold text-detective-orange">GAMILIT</h1>
          </div>
          <h2 className="text-detective-subtitle text-detective-text mb-2">
            Verificación de Email
          </h2>
        </div>

        <div className="text-center py-4">
          <Mail className="w-16 h-16 text-detective-orange mx-auto mb-4" />
          <p className="text-detective-body text-detective-text-secondary mb-6">
            Hemos enviado un email de verificación a tu correo.
          </p>
          <p className="text-detective-sm text-detective-text-secondary mb-8">
            Haz clic en el enlace del email para verificar tu cuenta.
          </p>

          <div className="space-y-3">
            <DetectiveButton
              variant="primary"
              onClick={handleResendCode}
              loading={resendLoading}
              disabled={resendLoading}
              className="w-full"
              icon={<Mail className="w-5 h-5" />}
            >
              {resendLoading ? 'Enviando...' : 'Reenviar Email'}
            </DetectiveButton>

            <button
              onClick={() => navigate('/login')}
              className="w-full text-detective-text-secondary hover:text-detective-text transition-colors"
            >
              Volver al login
            </button>
          </div>

          {resendSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
            >
              <p className="text-detective-sm text-detective-success">
                Email de verificación reenviado exitosamente
              </p>
            </motion.div>
          )}
        </div>
      </DetectiveCard>
    </div>
  );
}
