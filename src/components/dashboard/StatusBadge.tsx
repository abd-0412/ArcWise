import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

type StatusLevel = 'normal' | 'warning' | 'danger' | 'info';

interface StatusBadgeProps {
  status: StatusLevel;
  text: string;
  className?: string;
}

export default function StatusBadge({ status, text, className }: StatusBadgeProps) {
  const config = {
    normal: {
      color: 'bg-healthy/10 text-healthy-dark border-healthy/20',
      icon: CheckCircle2,
    },
    warning: {
      color: 'bg-warning/10 text-warning-dark border-warning/20',
      icon: AlertTriangle,
    },
    danger: {
      color: 'bg-danger/10 text-danger-dark border-danger/20',
      icon: XCircle,
    },
    info: {
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Info,
    },
  };

  const { color, icon: Icon } = config[status];

  return (
    <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium', color, className)}>
      <Icon className="w-3.5 h-3.5" />
      {text}
    </div>
  );
}
