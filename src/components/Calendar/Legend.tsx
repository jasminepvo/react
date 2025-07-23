import { FC } from 'react';
import clsx from 'clsx';
import { BaseProps, LegendItemProps } from './types';

/**
 * TODO: Refactor Legend Component for Maximum Flexibility and Semantic Correctness
 *
 * Current Issues:
 * - Uses 'div' instead of semantic 'ul'/'li' elements
 * - Hardcoded 'type' prop limits flexibility
 * - Name "Legend" is misleading - should be "Key" (explains visual indicators)
 *
 * Planned Changes:
 * 1. Rename to Key/KeyItem for better semantics
 * 2. Use semantic HTML: <ul> for container, <li> for items
 * 3. Remove hardcoded 'type' prop - let consumers define their own indicators
 * 4. Make completely flexible with children composition
 *
 * New Usage Examples:
 * ```tsx
 * // Basic usage with custom indicators
 * <Calendar.Key>
 *   <Calendar.KeyItem>
 *     <div className="w-4 h-4 bg-yellow-400 border-2 border-yellow-600" />
 *     <span>Payment Due</span>
 *   </Calendar.KeyItem>
 *   <Calendar.KeyItem>
 *     <div className="w-4 h-4 bg-blue-500" />
 *     <span>Targeted Date</span>
 *   </Calendar.KeyItem>
 * </Calendar.Key>
 *
 * // With CSS classes
 * <Calendar.Key>
 *   <Calendar.KeyItem className="payment-due">
 *     <div className="indicator" />
 *     <span>Payment Due</span>
 *   </Calendar.KeyItem>
 * </Calendar.Key>
 *
 * // With custom components
 * <Calendar.Key>
 *   <Calendar.KeyItem>
 *     <svg className="w-4 h-4 text-blue-500" fill="currentColor">
 *       <path d="..." />
 *     </svg>
 *     <span>Custom Icon</span>
 *   </Calendar.KeyItem>
 * </Calendar.Key>
 * ```
 *
 * Benefits:
 * - Semantic HTML (<ul>/<li>) for accessibility
 * - Maximum flexibility for consumers
 * - Composition-first approach
 * - Better naming (Key vs Legend)
 * - Backward compatibility maintained
 */

export const Legend: FC<BaseProps> = ({ className, children }) => (
  <div className={clsx('flex gap-4 p-4', className)}>{children}</div>
);

export const LegendItem: FC<LegendItemProps> = ({
  className,
  children,
  type,
}) => (
  <div
    className={clsx('flex items-center gap-2 text-sm text-gray-600', className)}
  >
    <div
      className={clsx('w-4 h-4', {
        'bg-pink-500': type === 'selected',
        'border-2 border-yellow-400': type === 'payment-due',
      })}
    />
    <span>{children}</span>
  </div>
);
