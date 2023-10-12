import { BookResponse } from '@/types/types';
import { create } from 'zustand';

interface BookStoreState {
    books: BookResponse[];
    setBooks: (books: BookResponse[]) => void;
}

export const useBookStore = create<BookStoreState>((set) => ({
    books: [],
    setBooks: (newBooks) => set({ books: newBooks }),
}));
