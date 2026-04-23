import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number;
  showLabels?: boolean;
}

export default function ProgressBar({ progress, showLabels = true }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-success"
        />
      </div>
      {showLabels && (
        <div className="flex justify-between text-[10px] font-medium text-gray-400 uppercase tracking-wider">
          <span>Start</span>
          <span>Halfway</span>
          <span>Finish</span>
        </div>
      )}
    </div>
  );
}
