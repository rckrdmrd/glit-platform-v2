# Auth Feature - Sistema de Autenticación

Sistema completo de autenticación con validación avanzada usando React Hook Form y Zod.

## Estructura

```
features/auth/
├── components/           # Componentes especializados
│   ├── EmailInput.tsx
│   ├── PasswordInput.tsx
│   ├── PasswordStrengthMeter.tsx
│   ├── FormErrorDisplay.tsx
│   └── index.ts
├── schemas/             # Schemas de validación Zod
│   └── authSchemas.ts
├── mocks/               # Mocks para desarrollo
│   └── authMocks.ts
├── index.ts
└── README.md
```

## Componentes

### EmailInput
Input especializado para emails con validación visual y checkmark de confirmación.

```tsx
import { EmailInput } from '@features/auth/components/EmailInput';

<EmailInput
  label="Email"
  placeholder="detective@glit.com"
  value={email}
  onChange={handleChange}
  error={errors.email?.message}
  showValidation={true}
/>
```

### PasswordInput
Input de contraseña con toggle de visibilidad y medidor de fortaleza opcional.

```tsx
import { PasswordInput } from '@features/auth/components/PasswordInput';

<PasswordInput
  label="Contraseña"
  placeholder="••••••••"
  value={password}
  onChange={handleChange}
  error={errors.password?.message}
  showStrengthMeter={true}
  showCriteria={true}
/>
```

## Credenciales de Prueba

Email: admin@glit.com o detective@glit.com
Password: Password123!
Código 2FA: 123456
