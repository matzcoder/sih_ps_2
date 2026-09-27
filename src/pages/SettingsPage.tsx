import React, { useState } from 'react';
import { Settings, Save, RotateCcw, Cpu, Activity, Sliders } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Toast } from '../components/common/Toast';

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    autoPreprocessing: true,
    featureExtraction: true,
    aiClassification: true,
    anomalyDetection: true,
    explainableAI: true,
    automaticReport: true,
    confidenceThreshold: 85,
    sensitivityLevel: 'High',
    dspEngine: 'CUDA Accelerated',
    spectralResolution: '2048',
    telemetryStream: true,
  });

  const [toast, setToast] = useState<{ type: 'success' | 'info'; title: string; message: string } | null>(null);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    setToast({
      type: 'success',
      title: 'CONFIGURATION COMMITTED',
      message: 'System pipeline preferences saved to persistent local storage.',
    });
  };

  const handleReset = () => {
    setSettings({
      autoPreprocessing: true,
      featureExtraction: true,
      aiClassification: true,
      anomalyDetection: true,
      explainableAI: true,
      automaticReport: true,
      confidenceThreshold: 85,
      sensitivityLevel: 'High',
      dspEngine: 'CUDA Accelerated',
      spectralResolution: '2048',
      telemetryStream: true,
    });
    setToast({
      type: 'info',
      title: 'SETTINGS RESET',
      message: 'Restored default SIH prototype RF lab configuration.',
    });
  };

  const toggleSwitches = [
    { key: 'autoPreprocessing', label: 'AUTOMATIC PREPROCESSING', desc: 'Auto-calibrate DC offset, IQ quadrature imbalance, and filter noise floor on ingest.' },
    { key: 'featureExtraction', label: 'FEATURE EXTRACTION', desc: 'Compute Welch PSD, higher-order cumulants, Wiener entropy, and spectral centroid.' },
    { key: 'aiClassification', label: 'AI CLASSIFICATION', desc: 'Run multi-model CNN, Random Forest, and Rule Engine inference on extracted features.' },
    { key: 'anomalyDetection', label: 'ANOMALY DETECTION', desc: 'Execute real-time dynamic threshold scanning for LO frequency drift and deep fade dropouts.' },
    { key: 'explainableAI', label: 'EXPLAINABLE AI', desc: 'Synthesize SHAP feature attribution weights and human-readable decision evidence.' },
    { key: 'automaticReport', label: 'AUTOMATIC REPORT', desc: 'Compile mission intelligence dossier immediately upon pipeline completion.' },
  ];

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#232F48] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center">
              <Settings className="w-4 h-4 text-[#FF6B00]" />
            </div>
            <div>
              <h1 className="font-mono text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                SYSTEM CONFIGURATION &amp; DSP PREFERENCES
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Configure automated pipeline stages, sensitivity thresholds, and hardware acceleration engines.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            RESET DEFAULTS
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            SAVE CONFIGURATION
          </Button>
        </div>
      </div>

      {/* Pipeline Automated Stages Switches */}
      <div className="bg-[#0F1523]/80 border border-[#232F48] rounded-xl p-6 tactical-brackets shadow-lg backdrop-blur-md">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-4 pb-2.5 border-b border-[#232F48] flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#FF6B00]" />
          AUTOMATED PIPELINE STAGE CONTROLS
        </h3>

        <div className="space-y-3.5">
          {toggleSwitches.map((item) => {
            const isChecked = (settings as any)[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleSetting(item.key as any)}
                className="p-4 rounded-xl bg-[#161F33]/70 border border-[#232F48] hover:border-[#FF6B00]/50 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-mono text-xs font-bold text-white uppercase flex items-center gap-2">
                    <span>{item.label}</span>
                    {isChecked ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF6B00]/15 text-[#FF8A00] border border-[#FF6B00]/40 font-semibold">
                        ON
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-slate-500 border border-slate-700">
                        OFF
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[11px] text-slate-400 mt-1 max-w-2xl leading-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Custom Toggle Switch */}
                <div
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                    isChecked ? 'bg-[#FF6B00]' : 'bg-[#080B12] border border-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-transform ${
                      isChecked ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Advanced DSP & Hardware Tuning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0F1523]/80 border border-[#232F48] rounded-xl p-6 tactical-brackets shadow-lg backdrop-blur-md space-y-4 font-mono text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2.5 border-b border-[#232F48] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#FF8A00]" />
            AI &amp; ANOMALY THRESHOLDS
          </h3>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-slate-300">MIN CONFIDENCE THRESHOLD:</span>
              <span className="text-[#FF6B00] font-bold text-sm">{settings.confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="99"
              value={settings.confidenceThreshold}
              onChange={(e) => setSettings({ ...settings, confidenceThreshold: Number(e.target.value) })}
              className="w-full accent-[#FF6B00] cursor-pointer"
            />
          </div>

          <div>
            <span className="text-slate-300 block mb-2">ANOMALY SENSITIVITY LEVEL:</span>
            <div className="grid grid-cols-4 gap-2">
              {['Low', 'Medium', 'High', 'Aggressive'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSettings({ ...settings, sensitivityLevel: lvl })}
                  className={`py-2 rounded-lg text-center transition-all ${
                    settings.sensitivityLevel === lvl
                      ? 'bg-[#FF6B00] text-white font-bold shadow-[0_0_10px_rgba(255,107,0,0.35)]'
                      : 'bg-[#161F33] text-slate-400 hover:text-white border border-[#232F48]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#0F1523]/80 border border-[#232F48] rounded-xl p-6 tactical-brackets shadow-lg backdrop-blur-md space-y-4 font-mono text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2.5 border-b border-[#232F48] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#FF8A00]" />
            HARDWARE DSP ACCELERATION
          </h3>

          <div>
            <span className="text-slate-300 block mb-1.5">DSP FFT ACCELERATOR BACKEND:</span>
            <select
              value={settings.dspEngine}
              onChange={(e) => setSettings({ ...settings, dspEngine: e.target.value })}
              className="w-full bg-[#161F33] border border-[#232F48] rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF6B00] transition-colors"
            >
              <option value="CUDA Accelerated">NVIDIA CUDA GPU Acceleration (Recommended)</option>
              <option value="OpenCL">OpenCL Heterogeneous Engine</option>
              <option value="CPU Multi-threaded">AVX-512 CPU Multi-threaded Worker</option>
            </select>
          </div>

          <div>
            <span className="text-slate-300 block mb-1.5">SPECTRAL FFT BIN RESOLUTION:</span>
            <select
              value={settings.spectralResolution}
              onChange={(e) => setSettings({ ...settings, spectralResolution: e.target.value })}
              className="w-full bg-[#161F33] border border-[#232F48] rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF6B00] transition-colors"
            >
              <option value="512">512 Points (Fastest)</option>
              <option value="1024">1024 Points (Balanced)</option>
              <option value="2048">2048 Points (High Precision)</option>
              <option value="4096">4096 Points (Ultra Sharp)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
