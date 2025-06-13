import { ReactNode } from 'react';

export interface SwipeableBottomSheetProps {
    /** Content to be displayed in the bottom sheet */
    children: ReactNode;
    /** Optional className for custom styling */
    className?: string;
    /** Function to close the bottom sheet */
    closeModal: () => void;
    /** Optional footer buttons */
    footerButtons?: ReactNode;
    /** Optional header element */
    header?: ReactNode;
    /** Unique identifier for the bottom sheet */
    id: string;
    /** Controls the visibility of the bottom sheet */
    isOpen: boolean;
    /** Whether the footer should stick to the bottom */
    stickyFooter?: boolean;
    /** Minimum distance in pixels required to trigger sheet dismissal */
    swipeDownThreshold?: number;
    /** Width of the bottom sheet in pixels */
    width?: number;
}
