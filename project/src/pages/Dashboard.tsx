import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, AlertTriangle } from 'lucide-react';
import { useContracts } from '../hooks/useContracts';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../components/Pagination';
import StatusBadge from '../components/StatusBadge';
import RiskBadge from '../components/RiskBadge';
import Button from '../components/Button';
import UploadModal from '../components/UploadModal';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  
  const {
    isLoading,
    error,
    searchTerm,
    statusFilter,
    riskFilter,
    currentPage,
    totalPages,
    fetchContracts,
    setSearchTerm,
    setStatusFilter,
    setRiskFilter,
    setPage,
    getPaginatedContracts,
  } = useContracts();

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  const contracts = getPaginatedContracts();

  const handleContractClick = (contractId: string) => {
    navigate(`/contracts/${contractId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading contracts..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Contracts</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchContracts} variant="primary">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contracts Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage and track your SaaS contracts
          </p>
        </div>
        <Button
          onClick={() => setUploadModalOpen(true)}
          variant="primary"
          className="mt-4 sm:mt-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Upload Contract
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by contract name or parties..."
            />
          </div>
          <FilterDropdown
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={['All', 'Active', 'Expired', 'Renewal Due']}
          />
          <FilterDropdown
            label="Risk Score"
            value={riskFilter}
            onChange={setRiskFilter}
            options={['All', 'Low', 'Medium', 'High']}
          />
        </div>
      </div>

      {/* Contracts Table */}
      {contracts.length === 0 ? (
        <EmptyState
          title="No contracts found"
          description="Try adjusting your search or filters, or upload a new contract."
          action={
            <Button onClick={() => setUploadModalOpen(true)} variant="primary">
              <Plus className="h-4 w-4 mr-2" />
              Upload Contract
            </Button>
          }
        />
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contracts.map((contract) => {
                  const daysUntilExpiry = getDaysUntilExpiry(contract.expiryDate);
                  
                  return (
                    <tr
                      key={contract.id}
                      onClick={() => handleContractClick(contract.id)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {contract.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {contract.type}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {contract.parties.join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(contract.expiryDate)}
                        </div>
                        {daysUntilExpiry <= 90 && daysUntilExpiry > 0 && (
                          <div className="text-xs text-orange-600">
                            {daysUntilExpiry} days remaining
                          </div>
                        )}
                        {daysUntilExpiry < 0 && (
                          <div className="text-xs text-red-600">
                            Expired {Math.abs(daysUntilExpiry)} days ago
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={contract.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <RiskBadge risk={contract.riskScore} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {contract.value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      )}

      {/* Upload Modal */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;