import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Info,
  FileText,
  Eye
} from 'lucide-react';
import { useContracts } from '../hooks/useContracts';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusBadge from '../components/StatusBadge';
import RiskBadge from '../components/RiskBadge';
import Button from '../components/Button';

const ContractDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentContract, fetchContract, isLoading } = useContracts();
  const [selectedClause, setSelectedClause] = useState<string | null>(null);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchContract(id);
    }
  }, [id, fetchContract]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'Medium':
        return <Info className="h-5 w-5 text-yellow-500" />;
      case 'Low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading contract details..." />;
  }

  if (!currentContract) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-24 w-24 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Contract not found</h3>
        <p className="text-gray-600 mb-6">The contract you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/dashboard')} variant="primary">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentContract.name}
            </h1>
            <p className="text-sm text-gray-600">{currentContract.type}</p>
          </div>
        </div>
        <Button
          onClick={() => setEvidenceOpen(true)}
          variant="secondary"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Evidence
        </Button>
      </div>

      {/* Contract Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Parties</p>
                  <p className="text-sm text-gray-600">
                    {currentContract.parties.join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Contract Period</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(currentContract.startDate)} - {formatDate(currentContract.expiryDate)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Status</p>
                <StatusBadge status={currentContract.status} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Risk Score</p>
                <RiskBadge risk={currentContract.riskScore} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Contract Value</p>
                <p className="text-sm text-gray-600">{currentContract.value}</p>
              </div>
            </div>
          </div>

          {/* Clauses */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Clauses</h2>
            <div className="space-y-4">
              {currentContract.clauses.map((clause) => (
                <div
                  key={clause.id}
                  className={`
                    border rounded-lg p-4 cursor-pointer transition-colors
                    ${selectedClause === clause.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  onClick={() => setSelectedClause(
                    selectedClause === clause.id ? null : clause.id
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{clause.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {Math.round(clause.confidence * 100)}% confidence
                      </span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{clause.summary}</p>
                  
                  {selectedClause === clause.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-800 font-medium mb-2">Full Text:</p>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {clause.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h2>
            <div className="space-y-4">
              {currentContract.insights.map((insight) => (
                <div key={insight.id} className="border-l-4 border-l-blue-500 pl-4">
                  <div className="flex items-start space-x-2 mb-2">
                    {getSeverityIcon(insight.severity)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          {insight.title}
                        </h4>
                        <span className={`
                          px-2 py-1 text-xs font-medium rounded-full
                          ${insight.type === 'Risk' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                          }
                        `}>
                          {insight.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                    <p className="text-xs font-medium text-blue-800 mb-1">
                      Recommendation:
                    </p>
                    <p className="text-sm text-blue-700">
                      {insight.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Panel */}
      {evidenceOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={() => setEvidenceOpen(false)} />
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 py-6 bg-gray-50 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">
                        Evidence & Sources
                      </h2>
                      <button
                        onClick={() => setEvidenceOpen(false)}
                        className="rounded-md text-gray-400 hover:text-gray-500"
                      >
                        <ArrowLeft className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 px-4 py-6 sm:px-6">
                    <div className="space-y-4">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-yellow-800 mb-2">
                          Contract Snippet #1
                        </h3>
                        <p className="text-sm text-yellow-700 mb-2">
                          "Payment shall be made annually in advance, due within thirty (30) days..."
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-yellow-600">Page 2, Section 3.1</span>
                          <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                            95% relevance
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-green-800 mb-2">
                          Contract Snippet #2
                        </h3>
                        <p className="text-sm text-green-700 mb-2">
                          "Either party may terminate this agreement with ninety (90) days..."
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-600">Page 5, Section 8.2</span>
                          <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                            88% relevance
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractDetail;