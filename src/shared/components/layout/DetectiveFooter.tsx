import React, { forwardRef } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

/**
 * Props for the DetectiveFooter component
 */
export interface DetectiveFooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Footer variant
   * - default: Full footer with logo, description, links, and social media
   * - minimal: Single line with copyright only
   * @default 'default'
   */
  variant?: 'default' | 'minimal';

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Footer link type
 */
interface FooterLink {
  label: string;
  href: string;
}

/**
 * Footer section type
 */
interface FooterSection {
  title: string;
  links: FooterLink[];
}

/**
 * Social media link type
 */
interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Footer data configuration
 */
const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Producto',
    links: [
      { label: 'Características', href: '/features' },
      { label: 'Precios', href: '/pricing' },
      { label: 'Casos de Uso', href: '/use-cases' },
      { label: 'Demo', href: '/demo' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Documentación', href: '/docs' },
      { label: 'Guías', href: '/guides' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nosotros', href: '/about' },
      { label: 'Contacto', href: '/contact' },
      { label: 'Privacidad', href: '/privacy' },
      { label: 'Términos', href: '/terms' },
    ],
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/glit',
    icon: Facebook,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/glit',
    icon: Twitter,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/glit',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/glit',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:info@glit.com',
    icon: Mail,
  },
];

/**
 * DetectiveFooter - Themed footer component for the GLIT Platform
 *
 * @description
 * A flexible footer component with two variants:
 * - default: Comprehensive footer with branding, navigation links, and social media
 * - minimal: Simple single-line footer with copyright information
 *
 * @example
 * ```tsx
 * // Default footer with all features
 * <DetectiveFooter />
 *
 * // Minimal footer
 * <DetectiveFooter variant="minimal" />
 * ```
 */
export const DetectiveFooter = forwardRef<HTMLElement, DetectiveFooterProps>(
  ({ variant = 'default', className, ...props }, ref) => {
    const currentYear = new Date().getFullYear();

    // Base footer classes
    const footerClasses = cn(
      'w-full bg-gray-50 border-t border-gray-200',
      {
        'py-8 px-4': variant === 'default',
        'py-4 px-4': variant === 'minimal',
      },
      className
    );

    /**
     * Render minimal footer variant
     */
    if (variant === 'minimal') {
      return (
        <footer ref={ref} className={footerClasses} {...props}>
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-sm text-gray-600">
              © {currentYear} GLIT Platform. Detectives de la Lectura. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      );
    }

    /**
     * Render default footer variant
     */
    return (
      <footer ref={ref} className={footerClasses} {...props}>
        <div className="max-w-7xl mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Logo and description section */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-orange-600 mb-2">
                  GLIT Platform
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Transformando la educación mediante la lectura investigativa.
                  Herramientas innovadoras para desarrollar habilidades de
                  comprensión y pensamiento crítico en estudiantes.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Detectives de la Lectura</span>
                <span className="text-orange-500">•</span>
                <span>Educación del futuro</span>
              </div>
            </div>

            {/* Links sections - 3 columns */}
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6" />

          {/* Bottom section: Social media and copyright */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Social media icons */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-medium">
                Síguenos:
              </span>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-600 text-center md:text-right">
              <p>
                © {currentYear} GLIT Platform. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
);

DetectiveFooter.displayName = 'DetectiveFooter';

export default DetectiveFooter;
