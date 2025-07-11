
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DiagnosticReport, ReportStatus, ParsedData } from '../types';
import { parseCsvWithGemini } from '../services/geminiService';
import { UploadIcon, FileIcon, CloseIcon } from './IconComponents';
import ResultsTable from './ResultsTable';

interface UploadFormProps {
  onUploadSuccess: (report: DiagnosticReport) => void;
}

const Spinner: React.FC = () => (
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
);

const UploadForm: React.FC<UploadFormProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setStatus('idle');
      setError(null);
      setParsedData(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
  });
  
  const handleProcessFile = async () => {
    if (!file) return;

    setStatus('processing');
    setError(null);
    setParsedData(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvContent = event.target?.result as string;
      try {
        const result = await parseCsvWithGemini(csvContent);
        setParsedData(result);
        setStatus('success');
        
        // Simulate notification and backend storage
        const newReport: DiagnosticReport = {
            id: `rep_${Date.now()}`,
            fileName: file.name,
            uploadDate: new Date().toISOString().split('T')[0],
            status: ReportStatus.SUCCESS,
            parsedData: result,
        };
        onUploadSuccess(newReport);

      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'An unknown error occurred during processing.');
      }
    };
    reader.readAsText(file);
  };
  
  const removeFile = () => {
      setFile(null);
      setStatus('idle');
      setError(null);
      setParsedData(null);
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload New Diagnostic Report</h2>
        <p className="text-gray-600 mb-6">Upload a CSV file to automatically extract patient and test result data. The system will process the file and notify the relevant care teams.</p>

        {!file ? (
            <div {...getRootProps()} className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-brand-primary bg-brand-light' : 'border-gray-300 hover:border-brand-secondary'}`}>
                <input {...getInputProps()} />
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                    {isDragActive ? "Drop the file here..." : "Drag 'n' drop a CSV file here, or click to select a file"}
                </p>
                <p className="text-xs text-gray-500 mt-1">CSV files only</p>
            </div>
        ) : (
            <div className="bg-gray-50 p-4 rounded-lg border flex items-center justify-between">
                <div className="flex items-center">
                    <FileIcon className="h-8 w-8 text-brand-primary" />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                </div>
                <button onClick={removeFile} className="p-1 rounded-full hover:bg-gray-200">
                  <CloseIcon className="w-5 h-5 text-gray-500"/>
                </button>
            </div>
        )}

        {file && status !== 'processing' && (
            <div className="mt-6 text-center">
                <button 
                    onClick={handleProcessFile}
                    className="w-full md:w-auto px-6 py-3 bg-brand-primary text-white font-semibold rounded-md hover:bg-brand-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                >
                    Process Report
                </button>
            </div>
        )}

        {status === 'processing' && (
            <div className="mt-6 flex flex-col items-center justify-center text-center">
                <Spinner />
                <p className="mt-3 font-medium text-gray-700">Processing file...</p>
                <p className="text-sm text-gray-500">AI is extracting data. This may take a moment.</p>
            </div>
        )}

        {status === 'error' && (
             <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-md font-bold text-red-800">Processing Failed</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
        )}
        
        {status === 'success' && parsedData && (
             <div className="mt-8">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center mb-6">
                    <h3 className="text-md font-bold text-green-800">Processing Successful!</h3>
                    <p className="mt-1 text-sm text-green-700">Data has been extracted and a notification has been sent to the care team.</p>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Extracted Information</h3>
                <ResultsTable data={parsedData} />
            </div>
        )}

    </div>
  );
};

export default UploadForm;
