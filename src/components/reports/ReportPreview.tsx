import React, { useState } from 'react';
import { ReportData } from '../../types/signal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Toast } from '../common/Toast';
import {
  FileText,
  Download,
  Share2,
  Printer,
  Shield,
  AlertTriangle,
} from 'lucide-react';

interface ReportPreviewProps {
  report: ReportData;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ report }) => {
  const [toast, setToast] = useState<{
    type: 'success' | 'warning' | 'info';
    title: string;
    message: string;
  } | null>(null);

  const handleExportPDF = () => {
    window.print();
    setToast({
      type: 'success',
      title: 'PRINT / PDF PREPARATION',
      message: 'System print dialog triggered. Saving as PDF formatted intelligence dossier.',
    });
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SIGNAL-X_REPORT_${report.signal.fileName}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast({
      type: 'success',
      title: 'JSON EXPORT COMPLETE',
      message: `Downloaded structured dossier payload for ${report.signal.fileName}.`,
    });
  };

  const handleExportCSV = () => {
    const csvContent = [
      'Field,Value',
      `Report ID,${report.id}`,
      `File Name,${report.signal.fileName}`,
      `File Type,${report.signal.fileType}`,
      `Sampling Rate,${report.signal.samplingRate}`,
      `Duration (s),${report.signal.duration}`,
      `SNR (dB),${report.signal.snr}`,
      `Center Frequency,${report.signal.centerFrequency}`,
      `Bandwidth,${report.signal.bandwidth}`,
      `Classification,${report.classification.primaryClass}`,
      `Confidence (%),${report.classification.confidence}`,
      `Anomalies Detected,${report.anomalies.length}`,
      `DNA Score,${report.parameters.dnaScore}`,
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SIGNAL-X_METRICS_${report.signal.fileName}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setToast({
      type: 'success',
      title: 'CSV METRICS EXPORTED',
      message: `Exported telemetry parameters spreadsheet for ${report.signal.fileName}.`,
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setToast({
      type: 'info',
      title: 'REPORT URL COPIED',
      message: 'Shareable cryptographic dossier link copied to clipboard.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-b from-[#131B2D] to-[#0F1523] p-4 rounded-xl border border-[rgba(255,107,0,0.2)] tactical-brackets shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-[#FF6B00]" />
          <div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              DOSSIER ID: {report.id}
            </h3>
            <span className="text-[10px] font-mono text-slate-300">
              COMPILED AT: {report.generatedAt} UTC
            </span>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={handleExportPDF}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
          >
            EXPORT PDF
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={handleExportJSON}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            EXPORT JSON
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            EXPORT CSV
          </Button>
          <Button
            variant="primary"
            size="xs"
            onClick={handleShare}
            leftIcon={<Share2 className="w-3.5 h-3.5" />}
            className="shadow-[0_0_15px_rgba(255,107,0,0.4)]"
          >
            SHARE REPORT
          </Button>
        </div>
      </div>

      {/* Printable Report Document Body */}
      <div className="bg-[#06080F] border-2 border-[rgba(255,107,0,0.35)] rounded-2xl p-6 sm:p-10 font-mono text-xs text-slate-200 space-y-8 shadow-[0_0_40px_rgba(0,0,0,0.9)] tactical-brackets">
        {/* Document Header */}
        <div className="border-b-2 border-[#FF6B00] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#FF6B00] font-black text-xl tracking-widest uppercase">
              <Shield className="w-6 h-6" />
              <span>SIGNAL-X // INTELLIGENCE DOSSIER</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              AUTOMATED RF SIGNAL DECONVOLUTION &amp; AI CLASSIFICATION REPORT
            </div>
          </div>
          <div className="text-right sm:text-right text-[11px]">
            <div className="text-[#FF6B00] font-bold">CLASSIFICATION: DEPLOYED SENSOR</div>
            <div className="text-slate-400">STATUS: VERIFIED BY ENSEMBLE AI</div>
          </div>
        </div>

        {/* Section 1: File Information */}
        <div>
          <h4 className="text-sm font-bold text-[#FF6B00] uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-[rgba(255,107,0,0.18)] pb-1.5">
            <span>01.</span> FILE INFORMATION &amp; CONTAINER METRICS
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0B0F19] p-4 rounded-xl border border-[rgba(255,107,0,0.18)]">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">FILE NAME</span>
              <span className="font-bold text-white text-xs">{report.signal.fileName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">FORMAT</span>
              <Badge variant={report.signal.fileType === 'IQ' ? 'iq' : 'wav'} size="xs">
                .{report.signal.fileType} RAW
              </Badge>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">FILE SIZE</span>
              <span className="font-bold text-white text-xs">{report.signal.fileSize}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">TIMESTAMP</span>
              <span className="font-bold text-white text-xs">{report.signal.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Signal Characteristics */}
        <div>
          <h4 className="text-sm font-bold text-[#FF6B00] uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-[rgba(255,107,0,0.18)] pb-1.5">
            <span>02.</span> SIGNAL CHARACTERISTICS &amp; DSP PARAMETERS
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)]">
              <span className="text-[9px] text-slate-400 uppercase block">SAMPLING RATE</span>
              <span className="font-bold text-white text-xs">{report.signal.samplingRate}</span>
            </div>
            <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)]">
              <span className="text-[9px] text-slate-400 uppercase block">DURATION</span>
              <span className="font-bold text-white text-xs">{report.signal.duration} s</span>
            </div>
            <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)]">
              <span className="text-[9px] text-slate-400 uppercase block">SNR</span>
              <span className="font-bold text-[#FF8A00] text-xs">{report.signal.snr} dB</span>
            </div>
            <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)]">
              <span className="text-[9px] text-slate-400 uppercase block">BANDWIDTH</span>
              <span className="font-bold text-white text-xs">{report.signal.bandwidth}</span>
            </div>
            <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)]">
              <span className="text-[9px] text-slate-400 uppercase block">CENTER FREQ</span>
              <span className="font-bold text-[#FF8A00] text-xs">{report.signal.centerFrequency}</span>
            </div>
            <div className="bg-[#0B0F19] p-3 rounded-lg border border-[rgba(255,107,0,0.18)]">
              <span className="text-[9px] text-slate-400 uppercase block">MODULATION</span>
              <span className="font-bold text-slate-200 text-xs truncate block">{report.signal.modulationType}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Signal DNA */}
        <div>
          <h4 className="text-sm font-bold text-[#FF6B00] uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-[rgba(255,107,0,0.18)] pb-1.5">
            <span>03.</span> 7-DIMENSIONAL SIGNAL DNA BIOMETRICS
          </h4>
          <div className="bg-[#0B0F19] p-4 rounded-xl border border-[rgba(255,107,0,0.18)] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,107,0,0.12)]">
              <span className="font-bold text-white">OVERALL DNA FIDELITY SCORE</span>
              <span className="text-base font-black text-[#FF6B00]">{report.parameters.dnaScore}%</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {report.dnaMetrics.map((dna) => (
                <div key={dna.dimension} className="bg-[#06080F] p-2 rounded-lg text-center border border-[rgba(255,107,0,0.15)]">
                  <span className="text-[9px] text-slate-400 uppercase block">{dna.dimension}</span>
                  <span className="font-bold text-[#FF8A00] text-xs">{dna.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: AI Classification & Consensus */}
        <div>
          <h4 className="text-sm font-bold text-[#FF6B00] uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-[rgba(255,107,0,0.18)] pb-1.5">
            <span>04.</span> AI CLASSIFICATION &amp; MULTI-MODEL CONSENSUS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0B0F19] p-4 rounded-xl border border-[rgba(255,107,0,0.18)]">
              <span className="text-[10px] text-slate-400 uppercase block">PRIMARY PREDICTION</span>
              <div className="text-2xl font-black text-[#FF6B00] mt-1">{report.classification.primaryClass}</div>
              <p className="text-slate-300 text-xs mt-1">Confidence: <strong className="text-white">{report.classification.confidence}%</strong></p>
            </div>
            <div className="bg-[#0B0F19] p-4 rounded-xl border border-[rgba(255,107,0,0.18)] space-y-1.5">
              <span className="text-[10px] text-slate-400 uppercase block">MODEL CONCURRENCE</span>
              {report.classification.consensus.map((c) => (
                <div key={c.modelName} className="flex justify-between text-xs">
                  <span className="text-slate-300">{c.modelName}</span>
                  <span className="font-bold text-[#FF8A00]">{c.confidence}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 5: Detected Anomalies */}
        <div>
          <h4 className="text-sm font-bold text-[#F59E0B] uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-[rgba(245,158,11,0.25)] pb-1.5">
            <span>05.</span> DETECTED ANOMALIES &amp; DEVIATIONS ({report.anomalies.length} EVENTS)
          </h4>
          <div className="space-y-2.5">
            {report.anomalies.map((anom) => (
              <div key={anom.id} className="bg-[#0B0F19] p-3.5 rounded-xl border border-[#F59E0B]/40 warning-brackets flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                    <span className="font-bold text-white text-xs uppercase">{anom.title}</span>
                    <Badge severity={anom.severity} size="xs">{anom.severity}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">{anom.description}</p>
                </div>
                <div className="text-right sm:text-right shrink-0">
                  <div className="text-[#F59E0B] font-bold">@ {anom.timestampFormatted}</div>
                  <div className="text-[10px] text-slate-400">{anom.durationMs} ms duration</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Explainable Evidence & Final Analysis */}
        <div>
          <h4 className="text-sm font-bold text-[#FF6B00] uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-[rgba(255,107,0,0.18)] pb-1.5">
            <span>06.</span> EXPLAINABLE EVIDENCE &amp; SYNTHESIS
          </h4>
          <div className="bg-[#0B0F19] p-4 rounded-xl border border-[rgba(255,107,0,0.18)] space-y-3 leading-relaxed text-xs">
            <p className="text-slate-200">{report.summaryText}</p>
            <div className="p-3 bg-[#06080F] rounded-lg border border-[rgba(255,107,0,0.2)] text-[11px] text-slate-400">
              <strong className="text-[#FF6B00]">OPERATOR NOTES:</strong> {report.analystNotes}
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="pt-6 border-t border-[rgba(255,107,0,0.18)] flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-2">
          <div>GENERATED BY SIGNAL-X AUTONOMOUS SIGINT PLATFORM // SIH PROTOTYPE</div>
          <div className="text-[#FF6B00] font-semibold">DIGITALLY SIGNED &amp; VERIFIED</div>
        </div>
      </div>
    </div>
  );
};
