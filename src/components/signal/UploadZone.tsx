import React, { useState, useRef } from 'react';
import { UploadCloud, FileCheck, AlertCircle, X, ArrowRight, Radio, FileAudio, FileCode } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  onStartAnalysis: () => void;
  selectedFile: File | null;
  onClearFile: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileSelected,
  onStartAnalysis,
  selectedFile,
  onClearFile,
  isLoading = false,
  error = null,
}) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'iq' && ext !== 'wav') {
      onFileSelected(file); // trigger error handling in parent
      return;
    }
    onFileSelected(file);
  };

  const getFileExtension = (name: string) => {
    return name.split('.').pop()?.toUpperCase() || 'UNKNOWN';
  };

  return (
    <div className="w-full space-y-6">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".iq,.wav,audio/wav,application/octet-stream"
        className="hidden"
      />

      {/* Drag and Drop Zone */}
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 sm:p-14 text-center transition-all bg-gradient-to-b from-[#131B2D]/80 to-[#0F1523]/80 tactical-brackets ${
            isDragOver
              ? 'border-[#FF6B00] bg-[#161F33] shadow-[0_0_40px_rgba(255,107,0,0.35)] scale-[1.01]'
              : 'border-[rgba(255,107,0,0.25)] hover:border-[#FF6B00] hover:bg-[#161F33]/80 hover:shadow-[0_0_25px_rgba(255,107,0,0.15)]'
          }`}
        >
          {/* Pulsing radar scan effect */}
          <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border border-[#FF6B00]/40 animate-ping" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#161F33] border border-[#FF6B00] text-[#FF6B00] shadow-[0_0_25px_rgba(255,107,0,0.45)]">
              <UploadCloud className="w-8 h-8 animate-bounce" />
            </div>
          </div>

          <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-slate-100 mb-2">
            DROP .IQ OR .WAV RECORDING FILE HERE
          </h3>
          <p className="font-mono text-xs text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
            Upload raw In-Phase/Quadrature binary data streams or calibrated acoustic RF demodulated audio recordings.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge variant="iq" size="sm">
              <FileCode className="w-3.5 h-3.5" /> .IQ RAW STREAM
            </Badge>
            <Badge variant="wav" size="sm">
              <FileAudio className="w-3.5 h-3.5" /> .WAV AUDIO / BASEBAND
            </Badge>
          </div>

          <div className="mt-8 inline-block">
            <Button variant="outline" size="sm" type="button">
              BROWSE LOCAL FILE SYSTEM
            </Button>
          </div>
        </div>
      ) : (
        /* Selected File Card */
        <div className="bg-gradient-to-b from-[#131B2D] to-[#0F1523] border border-[#FF6B00]/60 rounded-xl p-6 sm:p-8 tactical-brackets shadow-[0_0_30px_rgba(255,107,0,0.2)]">
          <div className="flex items-start justify-between pb-6 border-b border-[rgba(255,107,0,0.2)]">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-xl bg-[#161F33] border border-[#FF6B00] text-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.3)]">
                {getFileExtension(selectedFile.name) === 'IQ' ? (
                  <FileCode className="w-8 h-8" />
                ) : (
                  <FileAudio className="w-8 h-8" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h4 className="font-mono text-lg font-bold text-white tracking-wide">
                    {selectedFile.name}
                  </h4>
                  <Badge variant={getFileExtension(selectedFile.name) === 'IQ' ? 'iq' : 'wav'}>
                    .{getFileExtension(selectedFile.name)}
                  </Badge>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                  <span>SIZE: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <span className="text-slate-600">•</span>
                  <span>FORMAT: RAW SAMPLED CONTAINER</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[#FF8A00] flex items-center gap-1 font-bold">
                    <FileCheck className="w-3.5 h-3.5" /> READY FOR INGEST
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClearFile}
              className="p-2 text-slate-400 hover:text-white hover:bg-[#FF6B00]/15 rounded-lg transition-colors cursor-pointer"
              title="Remove File"
              aria-label="Remove File"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Row */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-300 flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#FF6B00] animate-pulse" />
              <span>PIPELINE: 8-STAGE AUTOMATED SIGNAL CLASSIFIER</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="ghost"
                size="md"
                onClick={onClearFile}
                disabled={isLoading}
              >
                CANCEL
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={onStartAnalysis}
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4 text-[#080B12]" />}
                className="w-full sm:w-auto shadow-[0_0_20px_rgba(255,107,0,0.5)]"
              >
                START ANALYSIS
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Validation Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-[#180B0E] border border-[#FF4D4D] rounded-xl text-[#FF4D4D] text-xs font-mono shadow-[0_0_20px_rgba(255,77,77,0.25)] danger-brackets">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div>
            <span className="font-bold uppercase tracking-wider">INGEST ERROR: </span>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};
