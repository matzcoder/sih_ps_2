import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { SignalAnalysis, ClassificationClass, ModelConsensusItem, ExplainableEvidence } from '../types/signal';
import { ClassificationCard } from '../components/ai/ClassificationCard';
import { ConfidenceChart } from '../components/ai/ConfidenceChart';
import { ModelConsensus } from '../components/ai/ModelConsensus';
import { ExplainableAI } from '../components/ai/ExplainableAI';
import { LoadingState } from '../components/common/LoadingState';
import { Button } from '../components/common/Button';
import { BrainCircuit, ArrowLeft, Network, FileText } from 'lucide-react';

export const ClassificationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [signal, setSignal] = useState<SignalAnalysis | null>(null);
  const [classificationData, setClassificationData] = useState<{
    primaryClass: string;
    confidence: number;
    distribution: ClassificationClass[];
    consensus: ModelConsensusItem[];
    fusionScore: number;
    evidence: ExplainableEvidence[];
    explanationText: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signalId = id || 'signal_042';

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [sig, cls] = await Promise.all([
          api.getAnalysis(signalId),
          api.getClassification(signalId),
        ]);
        setSignal(sig);
        setClassificationData(cls);
      } catch (err) {
        console.error('Failed to load classification data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [signalId]);

  if (loading || !signal || !classificationData) {
    return <LoadingState title="RUNNING NEURAL MODEL INFERENCE &amp; SHAP ATTRIBUTION" />;
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#232F48] gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate(`/workspace/${signal.id}`)}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            WORKSPACE
          </Button>
          <div className="h-4 w-px bg-[#232F48] hidden sm:block" />
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-[#FF6B00] animate-pulse" />
              </div>
              <h1 className="font-mono text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                AI CLASSIFICATION &amp; EXPLAINABILITY // {signal.fileName}
              </h1>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Deep CNN, Tree Ensemble and Heuristic Rule engine multi-model consensus with SHAP attribution.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/similarity')}
            leftIcon={<Network className="w-4 h-4" />}
          >
            SIMILARITY SEARCH
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/reports/${signal.id}`)}
            leftIcon={<FileText className="w-4 h-4" />}
          >
            VIEW DOSSIER
          </Button>
        </div>
      </div>

      {/* Main Classification Verdict Card */}
      <ClassificationCard
        primaryClass={classificationData.primaryClass}
        confidence={classificationData.confidence}
        fusionScore={classificationData.fusionScore}
        modulation={signal.modulationType}
      />

      {/* Probability Distribution and Model Consensus Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConfidenceChart distribution={classificationData.distribution} />
        <ModelConsensus
          consensus={classificationData.consensus}
          fusionScore={classificationData.fusionScore}
        />
      </div>

      {/* Explainable AI Section */}
      <ExplainableAI
        evidence={classificationData.evidence}
        explanation={classificationData.explanationText}
      />
    </div>
  );
};
