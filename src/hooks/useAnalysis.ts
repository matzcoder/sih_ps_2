import { useState, useCallback } from 'react';
import { api, PIPELINE_STAGES } from '../services/api';
import { SignalAnalysis, PipelineStage, ReportData } from '../types/signal';

export function useAnalysis() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stages, setStages] = useState<PipelineStage[]>(PIPELINE_STAGES);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<SignalAnalysis | null>(null);

  const resetPipeline = useCallback(() => {
    setStages(PIPELINE_STAGES.map(s => ({ ...s, status: 'PENDING', progress: 0 })));
    setCurrentStageIndex(0);
    setOverallProgress(0);
    setIsAnalyzing(false);
    setError(null);
  }, []);

  const runAnalysis = useCallback(async (signalId: string): Promise<SignalAnalysis> => {
    setIsAnalyzing(true);
    setError(null);
    setOverallProgress(0);

    // Deep clone initial stages
    const workingStages: PipelineStage[] = PIPELINE_STAGES.map(s => ({
      ...s,
      status: 'PENDING',
      progress: 0,
    }));
    setStages([...workingStages]);

    try {
      const totalStages = workingStages.length;

      for (let i = 0; i < totalStages; i++) {
        setCurrentStageIndex(i);
        workingStages[i].status = 'PROCESSING';
        setStages([...workingStages]);

        // Simulating sub-progress within each stage
        for (let step = 25; step <= 100; step += 25) {
          await new Promise(r => setTimeout(r, 80));
          workingStages[i].progress = step;
          const currentTotalProgress = Math.round(
            ((i * 100) + step) / totalStages
          );
          setOverallProgress(currentTotalProgress);
          setStages([...workingStages]);
        }

        workingStages[i].status = 'COMPLETE';
        setStages([...workingStages]);
      }

      const result = await api.getAnalysis(signalId);
      setAnalysisResult(result);
      setIsAnalyzing(false);
      return result;
    } catch (err: any) {
      setError(err.message || 'Signal analysis pipeline encountered an error.');
      setIsAnalyzing(false);
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    stages,
    currentStageIndex,
    overallProgress,
    isAnalyzing,
    analysisResult,
    runAnalysis,
    resetPipeline,
    setError,
  };
}
