
import React from 'react';
import { ParsedData, TestResult } from '../types';


interface ResultsTableProps {
  data: ParsedData;
}

const InfoCard: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
    </div>
);


const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Patient & Report Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Details extracted from the uploaded file.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <InfoCard label="Patient Name" value={data.patientName} />
          <InfoCard label="Patient ID" value={data.patientId} />
          <InfoCard label="Test Date" value={data.testDate} />
          <InfoCard label="Submitting Clinic" value={data.clinicName} />
        </dl>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Test Results
        </h3>
      </div>
      <div className="border-t border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Range</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.results.map((result: TestResult, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.testName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{result.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.units}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.referenceRange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
