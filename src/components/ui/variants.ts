import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
        secondary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
        outline: 'border border-gray-300 hover:bg-gray-50',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gray-100',
        primary: 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20',
        secondary: 'bg-blue-50 px-2 py-1 text-blue-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
