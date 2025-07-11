import { DiagnosticReport, ReportStatus } from './types';

export const MOCK_REPORTS: DiagnosticReport[] = [
  {
    id: 'rep_001',
    fileName: 'patient_alpha_lab_results.csv',
    uploadDate: '2024-07-20',
    status: ReportStatus.SUCCESS,
    parsedData: {
      patientName: 'John Doe',
      patientId: 'JD12345',
      testDate: '2024-07-19',
      clinicName: 'Downtown Health Clinic',
      results: [
        { testName: 'Hemoglobin A1c', value: '5.7', units: '%', referenceRange: '4.8 - 5.6' },
        { testName: 'Total Cholesterol', value: '190', units: 'mg/dL', referenceRange: '<200' },
        { testName: 'TSH', value: '2.5', units: 'mIU/L', referenceRange: '0.4 - 4.5' },
      ],
    },
  },
  {
    id: 'rep_002',
    fileName: 'patient_beta_bloodwork.csv',
    uploadDate: '2024-07-18',
    status: ReportStatus.SUCCESS,
    parsedData: {
      patientName: 'Jane Smith',
      patientId: 'JS67890',
      testDate: '2024-07-17',
      clinicName: 'Uptown Medical Group',
      results: [
        { testName: 'Glucose, Fasting', value: '95', units: 'mg/dL', referenceRange: '70 - 99' },
        { testName: 'Sodium', value: '140', units: 'mmol/L', referenceRange: '135 - 145' },
      ],
    },
  },
  {
    id: 'rep_003',
    fileName: 'patient_gamma_lipid_panel.csv',
    uploadDate: '2024-07-15',
    status: ReportStatus.FAILED,
  },
];
