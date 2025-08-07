import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Shield, 
  BarChart3, 
  BookOpen, 
  AlertTriangle, 
  Menu, 
  X,
  LogOut,
  User
} from 'lucide-react';

export default function Layout({ children, auth }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Security Assessment', href: '/assessment', icon: Shield },
    { name: 'Threat Alerts', href: '/threats', icon: AlertTriangle },
    { name: 'Education Center', href: '/education', icon: BookOpen },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      auth.logout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="absolute inset-0 bg-gray-600 opacity-75" 
            onClick={() => setSidebarOpen(false)} 
          />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">SecuAware</span>
          </div>
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 pb-20 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-primary-600 bg-primary-50 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setSidebarOpen(false)} // Close mobile sidebar on navigation
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center mb-4">
            <div className="bg-primary-100 rounded-full p-2">
              <User className="h-4 w-4 text-primary-600" />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {auth?.user?.companyName || 'Company'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {auth?.user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:shadow-none">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              {auth?.user?.securityScore !== undefined && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Security Score:</span>
                  <div className={`px-2 py-1 rounded text-sm font-medium ${
                    auth.user.securityScore >= 80 ? 'bg-success-100 text-success-800' :
                    auth.user.securityScore >= 60 ? 'bg-warning-100 text-warning-800' :
                    'bg-danger-100 text-danger-800'
                  }`}>
                    {auth.user.securityScore}/100
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content - Fixed height and scroll */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}