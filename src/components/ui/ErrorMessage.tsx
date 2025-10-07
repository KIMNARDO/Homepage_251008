import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, X } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorMessage({
  title = '오류 발생',
  message,
  onRetry,
  onDismiss,
  className = '',
}: ErrorMessageProps) {
  return (
    <motion.div
      className={`rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />

        <div className="flex-1">
          <h3 className="font-semibold text-red-900 dark:text-red-100">{title}</h3>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">{message}</p>

          {(onRetry || onDismiss) && (
            <div className="mt-3 flex gap-2">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  다시 시도
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="inline-flex items-center gap-1 rounded border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/40"
                >
                  <X className="h-3.5 w-3.5" />
                  닫기
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface PageErrorProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function PageError({
  title = '페이지를 불러올 수 없습니다',
  message,
  onRetry,
}: PageErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        className="max-w-md text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="mb-4 inline-flex rounded-full bg-red-100 p-4 dark:bg-red-900/30">
          <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>

        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-lg bg-electric-600 px-6 py-3 font-semibold text-white hover:bg-electric-700 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:ring-offset-2"
          >
            <RefreshCw className="h-4 w-4" />
            다시 시도
          </button>
        )}
      </motion.div>
    </div>
  );
}
