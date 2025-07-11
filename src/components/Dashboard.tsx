
import React, { useState } from 'react';
import { DiagnosticReport, ReportStatus } from '../types';
import { MOCK_REPORTS } from '../constants';
import { CheckCircleIcon, ClockIcon, ExclamationCircleIcon, FileIcon } from './IconComponents';
import UploadForm from './UploadForm';
import ResultsTable from './ResultsTable';

interface DashboardProps {
    activeView: 'dashboard' | 'upload';
    setActiveView: (view: 'dashboard' | 'upload') => void;
}

const StatusBadge: React.FC<{ status: ReportStatus }> = ({ status }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  let specificClasses = '';
  let icon: React.ReactNode;

  switch (status) {
    case ReportStatus.SUCCESS:
      specificClasses = 'bg-status-success/10 text-status-success';
      icon = <CheckCircleIcon className="w-4 h-4 mr-1" />;
      break;
    case ReportStatus.PROCESSING:
      specificClasses = 'bg-status-processing/10 text-status-processing';
      icon = <ClockIcon className="w-4 h-4 mr-1" />;
      break;
    case ReportStatus.FAILED:
      specificClasses = 'bg-status-failed/10 text-status-failed';
      icon = <ExclamationCircleIcon className="w-4 h-4 mr-1" />;
      break;
  }

  return (
    <span className={`${baseClasses} ${specificClasses}`}>
      {icon}
      {status}
    </span>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ activeView, setActiveView }) => {
  const [reports, setReports] = useState<DiagnosticReport[]>(MOCK_REPORTS);
  const [selectedReport, setSelectedReport] = useState<DiagnosticReport | null>(null);
  
  const handleUploadSuccess = (newReport: DiagnosticReport) => {
    setReports(prev => [newReport, ...prev]);
    setActiveView('dashboard');
  };

  if (selectedReport) {
      return (
          <div className="bg-white p-6 rounded-lg shadow-md">
              <button onClick={() => setSelectedReport(null)} className="mb-4 text-sm font-medium text-brand-primary hover:text-brand-secondary">
                  &larr; Back to Dashboard
              </button>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Diagnostic Report Details</h2>
              <p className="text-sm text-gray-500 mb-4">{selectedReport.fileName}</p>
              {selectedReport.parsedData ? (
                  <ResultsTable data={selectedReport.parsedData} />
              ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <FileIcon className="w-12 h-12 mx-auto text-gray-400"/>
                      <p className="mt-2 text-gray-600">No detailed data available for this report.</p>
                  </div>
              )}
          </div>
      )
  }

  if (activeView === 'upload') {
    return <UploadForm onUploadSuccess={handleUploadSuccess} />;
  }
  
  return (
    <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, Clinic Partner</h1>
            <p className="text-gray-600 mt-1">Here's a summary of your recent diagnostic report submissions.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Submission History</h2>
                <button onClick={() => setActiveView('upload')} className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary transition-colors text-sm font-medium">
                    Upload New Report
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {reports.map((report) => (
                            <tr key={report.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.fileName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.uploadDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <StatusBadge status={report.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                      onClick={() => setSelectedReport(report)} 
                                      className="text-brand-primary hover:text-brand-secondary disabled:text-gray-400 disabled:cursor-not-allowed"
                                      disabled={report.status !== ReportStatus.SUCCESS}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
