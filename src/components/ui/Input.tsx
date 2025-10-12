import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex-1 rounded-full border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
