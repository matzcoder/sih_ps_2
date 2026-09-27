# Phase 2: DSP & Machine Learning Services

## Objective
Implement signal processing parsers and Celery background tasks for analyzing raw IQ and Audio files.

## Execution Steps
1. **File Parsers:**
   - Create `backend\app\services\file_parser\iq_parser.py`: Implement binary reading logic for raw IQ (`.cfile`, complex64) and SigMF metadata extraction.
   - Create `backend\app\services\file_parser\wav_parser.py`: Implement standard audio ingestion using `scipy.io.wavfile` or `librosa`.

2. **Feature Extraction:**
   - Create `backend\app\services\feature_extraction\spectral_features.py`: Implement functions to compute FFT, Power Spectral Density (PSD), and Spectrogram matrices.
   - Create `backend\app\services\feature_extraction\modulation_features.py`: Write functions for cyclostationary features and higher-order moments.

3. **Inference & ML:**
   - Create `backend\app\services\inference\model_loader.py`: Write a singleton class to load PyTorch Automatic Modulation Classification (AMC) models.
   - Create `backend\app\services\inference\amc_model.py`: Define the inference logic mapping IQ tensors to modulation classes (e.g., QPSK, QAM16).

4. **Background Workers:**
   - Create `backend\app\workers\tasks.py`: Define a Celery task `@celery_app.task(name="process_signal_job")` that ties the parser, extraction, and inference together, and writes the final metrics to the database.
