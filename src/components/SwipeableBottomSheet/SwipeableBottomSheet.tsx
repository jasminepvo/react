import React, { useRef, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { SwipeableBottomSheetProps } from './types';

export const SwipeableBottomSheet: React.FC<SwipeableBottomSheetProps> = ({
  id,
  children,
  header,
  footerButtons,
  className,
  isOpen,
  closeModal,
  stickyFooter = false,
  swipeDownThreshold = 50,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [swipeProgress, setSwipeProgress] = useState(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      setStartY(e.touches[0].clientY);
      setCurrentY(e.touches[0].clientY);
      setSwipeProgress(0);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      setCurrentY(e.touches[0].clientY);

      const deltaY = currentY - startY;
      if (deltaY > 0) {
        const sheet = sheetRef.current;
        if (sheet) {
          // Calculate swipe progress percentage
          const progress = Math.min((deltaY / swipeDownThreshold) * 100, 100);
          setSwipeProgress(progress);

          sheet.style.transform = `translateY(${deltaY}px)`;
          sheet.style.transition = 'none';

          // Update aria-label to indicate swipe progress
          sheet.setAttribute(
            'aria-label',
            `Bottom sheet, ${progress.toFixed(0)}% swiped. ${
              progress >= 100 ? 'Release to close.' : ''
            }`
          );
        }
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      const deltaY = currentY - startY;
      const sheet = sheetRef.current;

      if (sheet) {
        sheet.style.transition = 'transform 0.3s ease-out';
        if (deltaY > swipeDownThreshold) {
          closeModal();
        }
        sheet.style.transform = 'translateY(0)';
        setSwipeProgress(0);
        sheet.setAttribute('aria-label', 'Bottom sheet');
      }
    };

    const sheet = sheetRef.current;
    if (sheet) {
      sheet.addEventListener('touchstart', handleTouchStart);
      sheet.addEventListener('touchmove', handleTouchMove);
      sheet.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (sheet) {
        sheet.removeEventListener('touchstart', handleTouchStart);
        sheet.removeEventListener('touchmove', handleTouchMove);
        sheet.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isDragging, startY, currentY, closeModal, swipeDownThreshold]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={closeModal}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={clsx('fixed inset-0 bg-black/40 z-50 animate-fade-in', {
            'bg-black/[.25]': isDragging,
          })}
        />
        <Dialog.Content
          id={id}
          ref={sheetRef}
          aria-label='Bottom sheet'
          aria-modal='true'
          role='dialog'
          className={clsx(
            'fixed bottom-0 left-0 right-0 z-50',
            'bg-white dark:bg-gray-900 rounded-t-2xl',
            'transform transition-transform duration-300 ease-out',
            'flex flex-col max-h-[90vh] min-h-[200px]',
            'touch-none select-none',
            'animate-slide-up',
            className
          )}
        >
          {/* Drag Handle with visual feedback */}
          <div className='w-full flex flex-col items-center p-2 relative'>
            <div
              className={clsx(
                'w-10 h-1 bg-gray-300 dark:bg-gray-700 rounded-full',
                { 'scale-110 transition-transform': isDragging }
              )}
            />
            {isDragging && swipeProgress > 0 && (
              <div className='absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-800'>
                <div
                  className='h-full bg-blush transition-all duration-150'
                  style={{ width: `${swipeProgress}%` }}
                />
              </div>
            )}
          </div>

          {/* Header */}
          {header && (
            <div
              className='px-4 py-2 border-b border-gray-200 dark:border-gray-800'
              role='heading'
            >
              {header}
            </div>
          )}

          {/* Content */}
          <div className='flex-1 overflow-y-auto px-4 py-4'>{children}</div>

          {/* Footer */}
          {footerButtons && (
            <div
              className={clsx(
                'px-4 py-3 border-t border-gray-200 dark:border-gray-800',
                'bg-white dark:bg-gray-900',
                { 'sticky bottom-0': stickyFooter }
              )}
              role='group'
              aria-label='Bottom sheet actions'
            >
              {footerButtons}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
