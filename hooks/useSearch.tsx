"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface SelectedDestination {
  name: string;
  fullName: string;
}

export interface GuestsState {
  adults: number;

  children: number[];

  rooms: number;

  pets: boolean;
}

export interface SearchState {
  destination: SelectedDestination | null;

  checkIn?: Date;

  checkOut?: Date;

  guests: GuestsState;
}

interface SearchContextType {
  search: SearchState;

  setSearch: React.Dispatch<
    React.SetStateAction<SearchState>
  >;
}

const SearchContext =
  createContext<SearchContextType | null>(null);

export function SearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] =
    useState<SearchState>({
      destination: null,

      checkIn: undefined,

      checkOut: undefined,

      guests: {
        adults: 2,

        children: [],

        rooms: 1,

        pets: false,
      },
    });

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context =
    useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearch must be used inside SearchProvider"
    );
  }

  return context;
}