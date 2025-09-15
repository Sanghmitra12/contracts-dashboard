import { useContracts as useContractsContext } from '../context/ContractsContext';

export const useContracts = () => {
  return useContractsContext();
};