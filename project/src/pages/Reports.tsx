import React from 'react';
import { FileSpreadsheet, Download, Calendar } from 'lucide-react';
import Button from '../components/Button';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="mt-1 text-sm text-gray-600">
          Generate and download contract reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <FileSpreadsheet className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Contract Summary</h3>
              <p className="text-sm text-gray-600">Overview of all contracts</p>
            </div>
          </div>
          <Button variant="secondary" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <Calendar className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Renewal Schedule</h3>
              <p className="text-sm text-gray-600">Upcoming contract renewals</p>
            </div>
          </div>
          <Button variant="secondary" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <FileSpreadsheet className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
              <p className="text-sm text-gray-600">Contracts by risk level</p>
            </div>
          </div>
          <Button variant="secondary" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Custom Reports</h2>
        <p className="text-gray-600 mb-4">
          Create custom reports with specific date ranges and filters.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Filter
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="renewal">Renewal Due</option>
            </select>
          </div>
        </div>
        <Button variant="primary">
          <Download className="h-4 w-4 mr-2" />
          Generate Custom Report
        </Button>
      </div>
    </div>
  );
};

export default Reports;