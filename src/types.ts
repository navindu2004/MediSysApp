
export enum ReportStatus {
    SUCCESS = 'Success',
    PROCESSING = 'Processing',
    FAILED = 'Failed',
  }
  
  export interface TestResult {
    testName: string;
    value: string;
    units: string;
    referenceRange: string;
  }
  
  export interface ParsedData {
    patientName: string;
    patientId: string;
    testDate: string;
    clinicName: string;
    results: TestResult[];
  }
  
  export interface DiagnosticReport {
    id: string;
    fileName: string;
    uploadDate: string;
    status: ReportStatus;
    parsedData?: ParsedData;
  }
  