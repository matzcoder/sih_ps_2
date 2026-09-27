import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { ReportData } from '../types/signal';
import { ReportPreview } from '../components/reports/ReportPreview';
import { LoadingState } from '../components/common/LoadingState';
import { Button } from '../components/common/Button';
import { FileText, ArrowLeft, BrainCircuit } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signalId = id || 'signal_042';

  useEffect(() => {
    async function loadReport() {
      setLoading(true);
      try {
        const data = await api.generateReport(signalId);
        setReport(data);
      } catch (err) {
        console.error('Failed to generate report', err);
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, [signalId]);

  if (loading || !report) {
    return <LoadingState title="COMPILING AUTOMATED INTELLIGENCE DOSSIER" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#232F48] gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate(`/workspace/${signalId}`)}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            WORKSPACE
          </Button>
          <div className="h-4 w-px bg-[#232F48] hidden sm:block" />
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#FF6B00] animate-pulse" />
              </div>
              <h1 className="font-mono text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                INTELLIGENCE REPORT // {report.signal.fileName}
              </h1>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Autonomous mission deconvolution dossier, biometric metrics and SHAP attribution.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/classification/${signalId}`)}
            leftIcon={<BrainCircuit className="w-4 h-4" />}
          >
            AI CLASSIFICATION
          </Button>
        </div>
      </div>

      {/* Main Report Preview */}
      <ReportPreview report={report} />
    </div>
  );
};
