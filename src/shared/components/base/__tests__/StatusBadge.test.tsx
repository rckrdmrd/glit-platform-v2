/**
 * StatusBadge Tests
 *
 * Tests for the StatusBadge component:
 * - Renders green for active status
 * - Renders red for inactive status
 * - Renders yellow/amber for suspended status
 * - Shows appropriate icons
 * - Displays correct labels
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../StatusBadge';

describe('StatusBadge', () => {
  describe('Active Status', () => {
    it('should render green badge for active status', () => {
      render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('text-green-800');
    });

    it('should have green background for active status', () => {
      render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      expect(badge).toHaveClass('bg-green-100');
    });

    it('should have green border for active status', () => {
      render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      expect(badge).toHaveClass('border-green-200');
    });

    it('should display "Activo" label for active status', () => {
      render(<StatusBadge status="active" />);

      expect(screen.getByText('Activo')).toBeInTheDocument();
    });

    it('should show CheckCircle2 icon for active status', () => {
      const { container } = render(<StatusBadge status="active" />);

      // Icon should be rendered (as SVG)
      const badge = screen.getByText('Activo');
      const svg = badge.previousSibling;
      expect(svg).toBeTruthy();
    });
  });

  describe('Inactive Status', () => {
    it('should render red badge for inactive status', () => {
      render(<StatusBadge status="inactive" />);

      const badge = screen.getByText('Inactivo');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('text-red-800');
    });

    it('should have red background for inactive status', () => {
      render(<StatusBadge status="inactive" />);

      const badge = screen.getByText('Inactivo');
      expect(badge).toHaveClass('bg-red-100');
    });

    it('should have red border for inactive status', () => {
      render(<StatusBadge status="inactive" />);

      const badge = screen.getByText('Inactivo');
      expect(badge).toHaveClass('border-red-200');
    });

    it('should display "Inactivo" label for inactive status', () => {
      render(<StatusBadge status="inactive" />);

      expect(screen.getByText('Inactivo')).toBeInTheDocument();
    });

    it('should show XCircle icon for inactive status', () => {
      const { container } = render(<StatusBadge status="inactive" />);

      const badge = screen.getByText('Inactivo');
      const svg = badge.previousSibling;
      expect(svg).toBeTruthy();
    });
  });

  describe('Suspended Status', () => {
    it('should render yellow/amber badge for suspended status', () => {
      render(<StatusBadge status="suspended" />);

      const badge = screen.getByText('Suspendido');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('text-amber-800');
    });

    it('should have yellow/amber background for suspended status', () => {
      render(<StatusBadge status="suspended" />);

      const badge = screen.getByText('Suspendido');
      expect(badge).toHaveClass('bg-amber-100');
    });

    it('should have yellow/amber border for suspended status', () => {
      render(<StatusBadge status="suspended" />);

      const badge = screen.getByText('Suspendido');
      expect(badge).toHaveClass('border-amber-200');
    });

    it('should display "Suspendido" label for suspended status', () => {
      render(<StatusBadge status="suspended" />);

      expect(screen.getByText('Suspendido')).toBeInTheDocument();
    });

    it('should show AlertCircle icon for suspended status', () => {
      const { container } = render(<StatusBadge status="suspended" />);

      const badge = screen.getByText('Suspendido');
      const svg = badge.previousSibling;
      expect(svg).toBeTruthy();
    });
  });

  describe('Icon Display', () => {
    it('should show icon by default', () => {
      const { container } = render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo').parentElement;
      expect(badge?.children.length).toBeGreaterThan(1); // Icon + text
    });

    it('should hide icon when showIcon is false', () => {
      render(<StatusBadge status="active" showIcon={false} />);

      const badge = screen.getByText('Activo').parentElement;
      // Only text should be present, no icon
      expect(badge?.querySelector('svg')).not.toBeInTheDocument();
    });

    it('should show icon when showIcon is true', () => {
      const { container } = render(<StatusBadge status="active" showIcon={true} />);

      const badge = screen.getByText('Activo').parentElement;
      expect(badge?.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should accept custom className', () => {
      render(<StatusBadge status="active" className="custom-class" />);

      const badge = screen.getByText('Activo');
      expect(badge).toHaveClass('custom-class');
    });

    it('should preserve base classes with custom className', () => {
      render(<StatusBadge status="active" className="custom-class" />);

      const badge = screen.getByText('Activo');
      expect(badge).toHaveClass('custom-class');
      expect(badge).toHaveClass('text-green-800');
      expect(badge).toHaveClass('bg-green-100');
    });
  });

  describe('Badge Styling', () => {
    it('should have rounded-full class', () => {
      render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      expect(badge).toHaveClass('rounded-full');
    });

    it('should have proper padding', () => {
      render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      expect(badge).toHaveClass('px-2.5', 'py-1');
    });

    it('should have small text size', () => {
      render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      expect(badge).toHaveClass('text-xs');
    });

    it('should have font-medium weight', () => {
      render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      expect(badge).toHaveClass('font-medium');
    });

    it('should have border', () => {
      render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      expect(badge).toHaveClass('border');
    });

    it('should use inline-flex display', () => {
      render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      expect(badge).toHaveClass('inline-flex');
    });

    it('should have items-center alignment', () => {
      render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      expect(badge).toHaveClass('items-center');
    });

    it('should have gap between icon and text', () => {
      render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      expect(badge).toHaveClass('gap-1.5');
    });
  });

  describe('Accessibility', () => {
    it('should render as span element', () => {
      const { container } = render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      expect(badge.tagName).toBe('SPAN');
    });

    it('should have readable text for all statuses', () => {
      const statuses: Array<{ status: 'active' | 'inactive' | 'suspended'; label: string }> = [
        { status: 'active', label: 'Activo' },
        { status: 'inactive', label: 'Inactivo' },
        { status: 'suspended', label: 'Suspendido' },
      ];

      statuses.forEach(({ status, label }) => {
        const { unmount } = render(<StatusBadge status={status} />);
        expect(screen.getByText(label)).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Visual Contrast', () => {
    it('should have sufficient color contrast for active status', () => {
      render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo');
      // Green-100 background with green-800 text provides good contrast
      expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('should have sufficient color contrast for inactive status', () => {
      render(<StatusBadge status="inactive" />);

      const badge = screen.getByText('Inactivo');
      // Red-100 background with red-800 text provides good contrast
      expect(badge).toHaveClass('bg-red-100', 'text-red-800');
    });

    it('should have sufficient color contrast for suspended status', () => {
      render(<StatusBadge status="suspended" />);

      const badge = screen.getByText('Suspendido');
      // Amber-100 background with amber-800 text provides good contrast
      expect(badge).toHaveClass('bg-amber-100', 'text-amber-800');
    });
  });

  describe('Icon Sizing', () => {
    it('should have consistent icon size', () => {
      const { container } = render(<StatusBadge status="active" />);

      const badge = screen.getByText('Activo').parentElement;
      const icon = badge?.querySelector('svg');
      expect(icon).toHaveClass('w-3.5', 'h-3.5');
    });
  });
});
