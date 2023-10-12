import { NoteResponse } from '@/types/types';
import { create } from 'zustand';

interface noteStoreState {
    notes: NoteResponse[];
    setNotes: (notes: NoteResponse[]) => void;
}

export const useNoteStore = create<noteStoreState>((set) => ({
    notes: [],
    setNotes: (newNotes) => set({ notes: newNotes }),
}));
