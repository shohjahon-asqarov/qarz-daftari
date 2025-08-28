import React from 'react';
import { Users } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, description, actionText, onAction }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}