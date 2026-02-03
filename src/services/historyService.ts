// Basic interface for a scan record
export interface ScanRecord {
    id: string;
    date: string;
    imageUrl: string;
    result: string;
    confidence: number;
    isPest: boolean;
}

const STORAGE_KEY = 'kisaan_scan_history';

export const saveScan = (record: Omit<ScanRecord, 'id' | 'date'>) => {
    const history = getHistory();
    const newRecord: ScanRecord = {
        ...record,
        id: Date.now().toString(),
        date: new Date().toISOString(),
    };

    // Prepend new record
    const updatedHistory = [newRecord, ...history];

    // Limit to last 50 records to save space
    if (updatedHistory.length > 50) {
        updatedHistory.pop();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
};

export const getHistory = (): ScanRecord[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
};
