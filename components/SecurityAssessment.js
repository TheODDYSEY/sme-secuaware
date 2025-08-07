import { useState } from 'react';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function SecurityAssessment() {
  const [responses, setResponses] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: 'passwordPolicy',
      title: 'Password Policies',
      question: 'How would you rate your current password security policies?',
      options: [
        { value: 1, label: 'No password policies in place' },
        { value: 2, label: 'Basic password requirements only' },
        { value: 3, label: 'Moderate password policies with some enforcement' },
        { value: 4, label: 'Strong password policies with regular updates' },
        { value: 5, label: 'Comprehensive password management with MFA' }
      ]
    },
    {
      id: 'dataBackup',
      title: 'Data Backup',
      question: 'How frequently do you backup your business data?',
      options: [
        { value: 1, label: 'Never or very rarely' },
        { value: 2, label: 'Monthly or less frequent' },
        { value: 3, label: 'Weekly backups' },
        { value: 4, label: 'Daily backups' },
        { value: 5, label: 'Real-time or multiple daily backups with testing' }
      ]
    },
    {
      id: 'employeeTraining',
      title: 'Employee Training',
      question: 'How often do you conduct cybersecurity training for employees?',
      options: [
        { value: 1, label: 'No formal training provided' },
        { value: 2, label: 'Occasional informal discussions' },
        { value: 3, label: 'Annual training sessions' },
        { value: 4, label: 'Quarterly training with updates' },
        { value: 5, label: 'Monthly training with simulations and testing' }
      ]
    },
    {
      id: 'softwareUpdates',
      title: 'Software Updates',
      question: 'How do you manage software and system updates?',
      options: [
        { value: 1, label: 'Updates are rarely applied' },
        { value: 2, label: 'Updates applied when convenient' },
        { value: 3, label: 'Important updates applied within a month' },
        { value: 4, label: 'Regular update schedule followed' },
        { value: 5, label: 'Automated updates with immediate security patches' }
      ]
    },
    {
      id: 'networkSecurity',
      title: 'Network Security',
      question: 'What security measures do you have for your network?',
      options: [
        { value: 1, label: 'Basic router with default settings' },
        { value: 2, label: 'Password-protected WiFi only' },
        { value: 3, label: 'Firewall with basic configuration' },
        { value: 4, label: 'Firewall with monitoring and guest network' },
        { value: 5, label: 'Enterprise-grade security with VPN and monitoring' }
      ]
    },
    {
      id: 'incidentResponse',
      title: 'Incident Response',
      question: 'Do you have a plan for responding to security incidents?',
      options: [
        { value: 1, label: 'No plan exists' },
        { value: 2, label: 'Informal understanding of what to do' },
        { value: 3, label: 'Basic written procedures' },
        { value: 4, label: 'Documented plan with assigned roles' },
        { value: 5, label: 'Comprehensive tested plan with regular drills' }
      ]
    },
    {
      id: 'accessControl',
      title: 'Access Control',
      question: 'How do you manage user access to business systems?',
      options: [
        { value: 1, label: 'Everyone has access to everything' },
        { value: 2, label: 'Basic user accounts with shared passwords' },
        { value: 3, label: 'Individual accounts with some restrictions' },
        { value: 4, label: 'Role-based access with regular reviews' },
        { value: 5, label: 'Strict access control with approval workflows' }
      ]
    }
  ];

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (Object.keys(responses).length !== questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ responses })
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data.assessment);
      } else {
        alert(data.error || 'Assessment submission failed');
      }
    } catch (error) {
      console.error('Assessment error:', error);
      alert('Error submitting assessment');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'text-success-600 bg-success-50 border-success-200';
      case 'medium': return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-danger-600 bg-danger-50 border-danger-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (results) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-success-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Assessment Complete!</h1>
          <p className="text-gray-600">Here are your results and recommendations</p>
        </div>

        {/* Score Card */}
        <div className={`card border-2 ${getRiskColor(results.riskLevel)}`}>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {results.score}/100
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg font-medium text-gray-700">Risk Level:</span>
              <span className={`px-3 py-1 rounded-full font-medium capitalize ${getRiskColor(results.riskLevel)}`}>
                {results.riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          {results.recommendations && results.recommendations.length > 0 ? (
            <div className="space-y-4">
              {results.recommendations.map((rec, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className={`h-5 w-5 ${
                      rec.priority === 'high' ? 'text-danger-500' :
                      rec.priority === 'medium' ? 'text-warning-500' :
                      'text-blue-500'
                    }`} />
                    <h4 className="font-medium text-gray-900">{rec.category}</h4>
                    <span className={`px-2 py-1 text-xs rounded ${
                      rec.priority === 'high' ? 'bg-danger-100 text-danger-700' :
                      rec.priority === 'medium' ? 'bg-warning-100 text-warning-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{rec.description}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {rec.actionItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No specific recommendations at this time. Great job!</p>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              setResults(null);
              setResponses({});
            }}
            className="btn-primary"
          >
            Take Assessment Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="h-16 w-16 text-primary-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Security Assessment</h1>
        <p className="text-gray-600">Evaluate your current cybersecurity posture</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="card">
            <div className="mb-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-gray-900">{question.title}</h3>
              </div>
              <p className="text-gray-700">{question.question}</p>
            </div>

            <div className="space-y-2">
              {question.options.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    responses[question.id] === option.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={responses[question.id] === option.value}
                    onChange={() => handleResponseChange(question.id, option.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 rounded-full mr-3 ${
                    responses[question.id] === option.value
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {responses[question.id] === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center">
          <button
            type="submit"
            disabled={loading || Object.keys(responses).length !== questions.length}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Assessment'}
          </button>
        </div>
      </form>
    </div>
  );
}