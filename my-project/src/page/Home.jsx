import { useState } from 'react';
import { ChartBarIcon, UserGroupIcon, ClipboardDocumentListIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const [navigation] = useState([
    { name: 'Customers', href: '#', current: true },
    { name: 'Tasks', href: '#', current: false },
    { name: 'Analytics', href: '#', current: false },
    { name: 'Settings', href: '#', current: false },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar
  const[n, setn] = useState(0); // State to toggle sidebar
  // Mock data
  const stats = [
    { id: 1, name: 'Total Customers', value: '2,543', icon: UserGroupIcon },
    { id: 2, name: 'New Leads', value: '143', icon: ClipboardDocumentListIcon },
    { id: 3, name: 'Tasks Due', value: '24', icon: ClipboardDocumentListIcon },
    { id: 4, name: 'Revenue', value: '$45,230', icon: CurrencyDollarIcon },
  ];

  const recentActivities = [
    { id: 1, customer: 'John Doe', type: 'Meeting', date: '2023-08-15', status: 'Completed' },
    { id: 2, customer: 'Jane Smith', type: 'Follow-up', date: '2023-08-14', status: 'Pending' },
    { id: 3, customer: 'Acme Corp', type: 'Proposal', date: '2023-08-13', status: 'In Progress' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hamburger Menu */}
      <div className="fixed top-5 left-2 z-10 md:hidden">
      <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md h-25 w-25 text-white bg-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-4 w-5 " /> // Close icon
          ) : (
            <Bars3Icon className="h-4 w-5" /> // Hamburger icon
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-9 left-0 h-full w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform md:translate-x-0`}
      >
        <div className="p-4 mt-6">
          <h2 className="text-2xl font-bold text-gray-800">CRM Dashboard</h2>
        </div>
        <nav className="mt-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 ${
                item.current ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <stat.icon className="h-12 w-12 text-blue-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="border-b last:border-b-0">
                    <td className="py-4">{activity.customer}</td>
                    <td>{activity.type}</td>
                    <td>{activity.date}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          activity.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : activity.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Growth</h2>
          <div className="h-64">
            {/* Chart placeholder */}
            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
              <ChartBarIcon className="h-12 w-12 text-gray-400" />
              <p className="text-gray-500 ml-2">Chart visualization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;