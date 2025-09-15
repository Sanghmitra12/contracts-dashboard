import React, { createContext, useContext, useReducer, useCallback } from 'react';

export interface Contract {
  id: string;
  name: string;
  parties: string[];
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Renewal Due';
  riskScore: 'Low' | 'Medium' | 'High';
  value: string;
  type: string;
  clauses: Clause[];
  insights: Insight[];
}

export interface Clause {
  id: string;
  title: string;
  summary: string;
  confidence: number;
  content: string;
}

export interface Insight {
  id: string;
  type: 'Risk' | 'Opportunity';
  severity: 'Low' | 'Medium' | 'High';
  title: string;
  description: string;
  recommendation: string;
}

interface ContractsState {
  contracts: Contract[];
  filteredContracts: Contract[];
  currentContract: Contract | null;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  statusFilter: string;
  riskFilter: string;
  currentPage: number;
  totalPages: number;
}

type ContractsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Contract[] }
  | { type: 'FETCH_FAILURE'; payload: string }
  | { type: 'SET_CURRENT_CONTRACT'; payload: Contract | null }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_STATUS_FILTER'; payload: string }
  | { type: 'SET_RISK_FILTER'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'FILTER_CONTRACTS' };

const ITEMS_PER_PAGE = 10;

const initialState: ContractsState = {
  contracts: [],
  filteredContracts: [],
  currentContract: null,
  isLoading: false,
  error: null,
  searchTerm: '',
  statusFilter: 'All',
  riskFilter: 'All',
  currentPage: 1,
  totalPages: 1,
};

const contractsReducer = (state: ContractsState, action: ContractsAction): ContractsState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      const contracts = action.payload;
      const filteredContracts = filterContracts(contracts, state.searchTerm, state.statusFilter, state.riskFilter);
      return {
        ...state,
        contracts,
        filteredContracts,
        isLoading: false,
        error: null,
        totalPages: Math.ceil(filteredContracts.length / ITEMS_PER_PAGE),
      };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'SET_CURRENT_CONTRACT':
      return { ...state, currentContract: action.payload };
    case 'SET_SEARCH_TERM':
      const newSearchTerm = action.payload;
      const searchFiltered = filterContracts(state.contracts, newSearchTerm, state.statusFilter, state.riskFilter);
      return {
        ...state,
        searchTerm: newSearchTerm,
        filteredContracts: searchFiltered,
        currentPage: 1,
        totalPages: Math.ceil(searchFiltered.length / ITEMS_PER_PAGE),
      };
    case 'SET_STATUS_FILTER':
      const newStatusFilter = action.payload;
      const statusFiltered = filterContracts(state.contracts, state.searchTerm, newStatusFilter, state.riskFilter);
      return {
        ...state,
        statusFilter: newStatusFilter,
        filteredContracts: statusFiltered,
        currentPage: 1,
        totalPages: Math.ceil(statusFiltered.length / ITEMS_PER_PAGE),
      };
    case 'SET_RISK_FILTER':
      const newRiskFilter = action.payload;
      const riskFiltered = filterContracts(state.contracts, state.searchTerm, state.statusFilter, newRiskFilter);
      return {
        ...state,
        riskFilter: newRiskFilter,
        filteredContracts: riskFiltered,
        currentPage: 1,
        totalPages: Math.ceil(riskFiltered.length / ITEMS_PER_PAGE),
      };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const filterContracts = (contracts: Contract[], searchTerm: string, statusFilter: string, riskFilter: string): Contract[] => {
  return contracts.filter(contract => {
    const matchesSearch = searchTerm === '' || 
      contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.parties.some(party => party.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || contract.status === statusFilter;
    const matchesRisk = riskFilter === 'All' || contract.riskScore === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });
};

interface ContractsContextType extends ContractsState {
  fetchContracts: () => Promise<void>;
  fetchContract: (id: string) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setRiskFilter: (risk: string) => void;
  setPage: (page: number) => void;
  getPaginatedContracts: () => Contract[];
}

const ContractsContext = createContext<ContractsContextType | undefined>(undefined);

export const ContractsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(contractsReducer, initialState);

  const fetchContracts = useCallback(async (): Promise<void> => {
    dispatch({ type: 'FETCH_START' });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = await fetch('/contracts.json');
      if (!response.ok) {
        throw new Error('Failed to fetch contracts');
      }
      
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data.contracts });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: 'Failed to load contracts' });
    }
  }, []);

  const fetchContract = useCallback(async (id: string): Promise<void> => {
    const contract = state.contracts.find(c => c.id === id);
    if (contract) {
      dispatch({ type: 'SET_CURRENT_CONTRACT', payload: contract });
    } else {
      // If not in memory, fetch from API
      try {
        const response = await fetch('/contracts.json');
        const data = await response.json();
        const foundContract = data.contracts.find((c: Contract) => c.id === id);
        dispatch({ type: 'SET_CURRENT_CONTRACT', payload: foundContract || null });
      } catch (error) {
        dispatch({ type: 'SET_CURRENT_CONTRACT', payload: null });
      }
    }
  }, [state.contracts]);

  const setSearchTerm = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const setStatusFilter = (status: string) => {
    dispatch({ type: 'SET_STATUS_FILTER', payload: status });
  };

  const setRiskFilter = (risk: string) => {
    dispatch({ type: 'SET_RISK_FILTER', payload: risk });
  };

  const setPage = (page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const getPaginatedContracts = (): Contract[] => {
    const startIndex = (state.currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return state.filteredContracts.slice(startIndex, endIndex);
  };

  return (
    <ContractsContext.Provider
      value={{
        ...state,
        fetchContracts,
        fetchContract,
        setSearchTerm,
        setStatusFilter,
        setRiskFilter,
        setPage,
        getPaginatedContracts,
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};

export const useContracts = (): ContractsContextType => {
  const context = useContext(ContractsContext);
  if (context === undefined) {
    throw new Error('useContracts must be used within a ContractsProvider');
  }
  return context;
};