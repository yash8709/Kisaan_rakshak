import { collection, addDoc, getDocs, query, where, orderBy, limit, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface ScanRecord {
    id?: string;
    userId?: string;
    date: string;
    imageUrl: string;
    result: string;
    confidence: number;
    isPest: boolean;
}

export const saveScan = async (userId: string, record: Omit<ScanRecord, 'id' | 'date' | 'userId'>) => {
    if (!userId) return;
    const scansRef = collection(db, 'scans');
    const newRecord = {
        ...record,
        userId,
        date: new Date().toISOString(),
    };
    await addDoc(scansRef, newRecord);
};

export const getHistory = async (userId: string): Promise<ScanRecord[]> => {
    if (!userId) return [];
    try {
        const scansRef = collection(db, 'scans');
        const q = query(
            scansRef,
            where('userId', '==', userId),
            orderBy('date', 'desc'),
            limit(50)
        );
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as ScanRecord[];
    } catch (error) {
        console.error("Error getting history: ", error);
        return [];
    }
};

export const clearHistory = async (userId: string) => {
    if (!userId) return;
    const scansRef = collection(db, 'scans');
    const q = query(scansRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
};
