"use client";

import { useEffect, useState } from "react";
import { Progress, ProgressLabel } from "@/components/ui/progress";

const ProgressBar = ({ duration = 3, label }: TProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const step = 100 / (duration * 20);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + step;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <Progress value={progress}>
      <ProgressLabel className="text-xs text-primary-400 font-medium">{label}</ProgressLabel>
    </Progress>
  );
};

export default ProgressBar;

type TProps = {
  duration?: number;
  label?: string;
};
