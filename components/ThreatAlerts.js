import { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Clock, ChevronDown, ChevronRight } from 'lucide-react';

export default function ThreatAlerts() {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedThreat, setExpandedThreat] = useState(null);

  useEffect(() => {
    fetchThreats();
  }, []);

  const fetchThreats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/threats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (response.ok) {
        setThreats(data.threats || []);
      } else {
        console.error('Failed to fetch threats:', data.error);
      }
    } catch (error) {
      console.error('Error fetching threats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return {
        bg: 'bg-danger-50 border-danger-200',
        text: 'text-danger-700',
        badge: 'bg-danger-100 text-danger-800',
        icon: 'text-danger-500'
      };
      case 'high': return {
        bg: 'bg-orange-50 border-orange-200',
        text: 'text-orange-700',
        badge: 'bg-orange-100 text-orange-800',
        icon: 'text-orange-500'
      };
      case 'medium': return {
        bg: 'bg-warning-50 border-warning-200',
        text: 'text-warning-700',
        badge: 'bg-warning-100 text-warning-800',
        icon: 'text-warning-500'
      };
      case 'low': return {
        bg: 'bg-blue-50 border-blue-200',
        text: 'text-blue-700',
        badge: 'bg-blue-100 text-blue-800',
        icon: 'text-blue-500'
      };
      default: return {
        bg: 'bg-gray-50 border-gray-200',
        text: 'text-gray-700',
        badge: 'bg-gray-100 text-gray-800',
        icon: 'text-gray-500'
      };
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'phishing': return '🎣';
      case 'malware': return '🦠';
      case 'ransomware': return '🔒';
      case 'data-breach': return '💾';
      case 'social-engineering': return '👤';
      default: return '⚠️';
    }
  };

  const toggleThreatExpansion = (threatId) => {
    setExpandedThreat(expandedThreat === threatId ? null : threatId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Threat Alerts</h1>
          <p className="text-gray-600">Stay informed about cybersecurity threats relevant to your business</p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary-600" />
          <span className="text-sm font-medium text-gray-600">
            {threats.filter(t => t.severity === 'critical' || t.severity === 'high').length} High Priority
          </span>
        </div>
      </div>

      {threats.length > 0 ? (
        <div className="space-y-4">
          {threats.map((threat) => {
            const colors = getSeverityColor(threat.severity);
            const isExpanded = expandedThreat === threat._id;

            return (
              <div key={threat._id} className={`border rounded-lg ${colors.bg}`}>
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleThreatExpansion(threat._id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-2xl">{getCategoryIcon(threat.category)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`text-lg font-semibold ${colors.text}`}>
                            {threat.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors.badge}`}>
                            {threat.severity.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full capitalize">
                            {threat.category.replace('-', ' ')}
                          </span>
                        </div>
                        <p className={`${colors.text} text-sm mb-3`}>
                          {threat.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(threat.createdAt).toLocaleDateString()}</span>
                          </div>
                          <span>Source: {threat.source}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`${colors.icon} ml-4`}>
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && threat.recommendations && threat.recommendations.length > 0 && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Recommended Actions:</h4>
                      <ul className="space-y-2">
                        {threat.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Threats</h3>
          <p className="text-gray-600">
            Great! There are currently no security threats relevant to your business.
          </p>
        </div>
      )}

      {/* General Security Tips */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-4">
          <Shield className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">General Security Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Keep all software and systems updated with the latest patches</li>
              <li>• Use strong, unique passwords for all business accounts</li>
              <li>• Regularly backup your important business data</li>
              <li>• Train employees to recognize phishing attempts</li>
              <li>• Monitor your business accounts for suspicious activity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}