import { useState, useEffect } from 'react';
import { 
  FiHome, FiPackage, FiShoppingCart, FiUsers, 
  FiDollarSign, FiPieChart, FiSettings, FiCalendar,
  FiLogOut, FiPlus, FiSearch, FiEdit2, FiTrash2,
  FiChevronDown, FiX, FiMenu, FiCheck, FiClock, FiAlertCircle
} from 'react-icons/fi';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css';

import { getProducts } from "./api/api.js";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

//export default ProductList;
  
Chart.register(...registerables);

// Mock Data
const initialIngredients = [
  { id: 1, name: 'Betel Leaf', stock: 100, unit: 'pieces', threshold: 20 },
  { id: 2, name: 'Areca Nut', stock: 5, unit: 'kg', threshold: 1 },
  { id: 3, name: 'Tobacco', stock: 2, unit: 'kg', threshold: 0.5 },
  { id: 4, name: 'Sweet Filling', stock: 3, unit: 'kg', threshold: 0.5 }
];

const initialOrders = [
  { id: 1, customer: 'Rahul Sharma', date: '2023-11-15', amount: 120, status: 'Delivered', items: [1, 2] },
  { id: 2, customer: 'Priya Mehta', date: '2023-11-14', amount: 200, status: 'Pending', items: [3] }
];

const todaysOrders = [
  { id: 101, customer: 'Rahul Sharma', items: 'Meetha Paan (2), Chocolate Paan (1)', status: 'Preparing', time: '10:30 AM' },
  { id: 102, customer: 'Neha Gupta', items: 'Sada Paan (3)', status: 'Ready', time: '11:45 AM' }
];

const initialTransactions = [
  { id: 1, orderId: 1, amount: 120, method: 'UPI', status: 'Success', date: '2023-11-15' },
  { id: 2, orderId: 2, amount: 200, method: 'Cash', status: 'Pending', date: '2023-11-14' },
  { id: 3, orderId: 3, amount: 150, method: 'Card', status: 'Success', date: '2023-11-13' }
];

const initialCustomers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', orders: 5 },
  { id: 2, name: 'Priya Mehta', email: 'priya@example.com', phone: '8765432109', orders: 2 }
];

const initialEvents = {
  '2023-11-15': [
    { title: 'Order #1 Delivered', type: 'delivery' },
    { title: 'New stock arrived', type: 'inventory' }
  ],
  '2023-11-16': [
    { title: 'Monthly meeting', type: 'meeting' }
  ]
};

Chart.register(...registerables);

const LoginScreen = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoggedIn(true);

    if (rememberMe) {
      localStorage.setItem('paanAdminAuth', 'true');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">P</div>
          <h2>Paan Admin Dashboard</h2>
          <p>Sign in to manage your paan business</p>
        </div>

        <form onSubmit={handleLogin}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="remember-forgot">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary login-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          Don't have an account? <a href="#">Contact support</a>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  
  // Data states
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [orders, setOrders] = useState(initialOrders);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [customers, setCustomers] = useState(initialCustomers);
  const [events, setEvents] = useState(initialEvents);
  
  // Form states
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    stock: '',
    unit: 'pieces',
    threshold: ''
  });
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'delivery'
  });

  // Check auth on mount
  useEffect(() => {
    const auth = localStorage.getItem('paanAdminAuth');
    if (auth) {
      setIsLoggedIn(true);
    }
  }, []);

  // Sales data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Sales (₹)',
      data: [12000, 19000, 3000, 5000, 2000, 3000],
      backgroundColor: 'rgba(79, 70, 229, 0.8)',
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 2,
      borderRadius: 12,
      barPercentage: 0.7
    }]
  };

  const customerGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'New Customers',
      data: [15, 22, 18, 25, 20, 30],
      fill: true,
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 2,
      tension: 0.4
    }]
  };

  // Event handlers
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const updatedEvents = {
      ...events,
      [dateStr]: [...(events[dateStr] || []), newEvent]
    };
    setEvents(updatedEvents);
    setNewEvent({ title: '', type: 'delivery' });
    setShowEventModal(false);
  };

  const handleAddIngredient = () => {
    const newId = Math.max(...ingredients.map(i => i.id)) + 1;
    setIngredients([
      ...ingredients,
      {
        id: newId,
        ...newIngredient,
        stock: Number(newIngredient.stock),
        threshold: Number(newIngredient.threshold)
      }
    ]);
    setNewIngredient({
      name: '',
      stock: '',
      unit: 'pieces',
      threshold: ''
    });
    setShowIngredientModal(false);
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      if (events[dateStr]) {
        return <div className="event-dot"></div>;
      }
    }
  };

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'ready': return <FiCheck className="text-green-500" />;
      case 'processing': 
      case 'preparing': return <FiClock className="text-yellow-500" />;
      case 'pending': return <FiAlertCircle className="text-red-500" />;
      default: return <FiClock className="text-blue-500" />;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('paanAdminAuth');
  };

  if (!isLoggedIn) {
    return <LoginScreen setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="app-container">
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setShowSidebarMobile(!showSidebarMobile)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebarMobile ? 'mobile-visible' : ''}`}>
        <div className="sidebar-header">
          <span className="logo">P</span>
          <h2>Paan Admin</h2>
        </div>
        <nav className="sidebar-nav">
          {[
            { icon: <FiHome />, name: 'Dashboard', id: 'dashboard' },
            { icon: <FiPackage />, name: 'Ingredients', id: 'ingredients' },
            { icon: <FiShoppingCart />, name: 'Orders', id: 'orders' },
            { icon: <FiUsers />, name: 'Customers', id: 'customers' },
            { icon: <FiDollarSign />, name: 'Transactions', id: 'transactions' },
            { icon: <FiCalendar />, name: 'Calendar', id: 'calendar' },
            { icon: <FiSettings />, name: 'Settings', id: 'settings' },
          ].map((item) => (
            <div 
              key={item.id}
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setShowSidebarMobile(false);
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <h1 className="page-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="top-bar-actions">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>
            <div 
              className="user-profile"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div className="avatar">AD</div>
              <span>Admin</span>
              <FiChevronDown className={`dropdown-icon ${showProfileDropdown ? 'open' : ''}`} />
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <div className="avatar-lg">AD</div>
                    <div>
                      <h4>Admin User</h4>
                      <p>admin@paanshop.com</p>
                    </div>
                  </div>
                  <div className="dropdown-menu">
                    <a href="#" className="dropdown-item">
                      <FiEdit2 /> Edit Profile
                    </a>
                    <a href="#" className="dropdown-item">
                      <FiSettings /> Settings
                    </a>
                    <a href="#" className="dropdown-item" onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-info">
                  <h3>Today's Orders</h3>
                  <p>12</p>
                  <span className="stat-change positive">+2%</span>
                </div>
                <div className="stat-icon">
                  <FiShoppingCart />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <h3>Total Revenue</h3>
                  <p>₹24,500</p>
                  <span className="stat-change positive">+12%</span>
                </div>
                <div className="stat-icon">
                  <FiDollarSign />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <h3>Active Customers</h3>
                  <p>89</p>
                  <span className="stat-change positive">+5%</span>
                </div>
                <div className="stat-icon">
                  <FiUsers />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <h3>Low Stock Items</h3>
                  <p>{ingredients.filter(i => i.stock < i.threshold).length}</p>
                  <span className="stat-change negative">-2%</span>
                </div>
                <div className="stat-icon">
                  <FiPackage />
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="todays-orders">
                <div className="section-header">
                  <h3>Today's Orders</h3>
                  <button className="view-all">View All</button>
                </div>
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todaysOrders.map(order => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.items}</td>
                        <td>
                          <span className={`status-badge status-${order.status.toLowerCase()}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>
                        <td>{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="low-stock-items">
                <div className="section-header">
                  <h3>Low Stock Ingredients</h3>
                  <button className="view-all">View All</button>
                </div>
                <table className="stock-table">
                  <thead>
                    <tr>
                      <th>Ingredient</th>
                      <th>Current Stock</th>
                      <th>Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.filter(i => i.stock < i.threshold).map(ingredient => (
                      <tr key={ingredient.id}>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.stock} {ingredient.unit}</td>
                        <td>{ingredient.threshold} {ingredient.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="charts-container">
              <div className="chart-card">
                <h3>Monthly Sales</h3>
                <div className="chart-container">
                  <Bar 
                    data={salesData} 
                    options={{ 
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function(value) {
                              return '₹' + value;
                            }
                          }
                        }
                      }
                    }} 
                  />
                </div>
              </div>
              <div className="chart-card">
                <h3>Customer Growth</h3>
                <div className="chart-container">
                  <Line 
                    data={customerGrowthData} 
                    options={{ 
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients Tab */}
        {activeTab === 'ingredients' && (
          <div className="ingredients-content">
            <div className="section-header">
              <h2>Ingredients Management</h2>
              <button 
                className="btn btn-primary"
                onClick={() => setShowIngredientModal(true)}
              >
                <FiPlus />
                <span>Add New Ingredient</span>
              </button>
            </div>
            
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ingredient</th>
                  <th>Current Stock</th>
                  <th>Threshold</th>
                  <th>Unit</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map(ingredient => (
                  <tr key={ingredient.id}>
                    <td>#{ingredient.id}</td>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.stock}</td>
                    <td>{ingredient.threshold}</td>
                    <td>{ingredient.unit}</td>
                    <td>
                      <span className={`status-badge ${ingredient.stock < ingredient.threshold ? 'status-pending' : 'status-delivered'}`}>
                        {ingredient.stock < ingredient.threshold ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon edit">
                        <FiEdit2 />
                      </button>
                      <button 
                        className="btn-icon delete"
                        onClick={() => handleDeleteIngredient(ingredient.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="orders-content">
            <div className="section-header">
              <h2>Order Management</h2>
              <div className="filters">
                <select className="form-control">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Delivered</option>
                </select>
                <input type="date" className="form-control" />
              </div>
            </div>
            
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>₹{order.amount}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon view">
                        <FiEdit2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="customers-content">
            <div className="section-header">
              <h2>Customer Management</h2>
            </div>
            
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Orders</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id}>
                    <td>#{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.orders}</td>
                    <td>
                      <button className="btn-icon edit">
                        <FiEdit2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="transactions-content">
            <div className="section-header">
              <h2>Transaction History</h2>
            </div>
            
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>#{transaction.id}</td>
                    <td>#{transaction.orderId}</td>
                    <td>₹{transaction.amount}</td>
                    <td>{transaction.method}</td>
                    <td>
                      <span className={`status-badge status-${transaction.status.toLowerCase()}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td>{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="calendar-content">
            <div className="section-header">
              <h2>Event Calendar</h2>
              <button 
                className="btn btn-primary"
                onClick={() => setShowEventModal(true)}
              >
                <FiPlus />
                <span>Add Event</span>
              </button>
            </div>
            
            <div className="calendar-container">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                onClickDay={handleDateClick}
                tileContent={tileContent}
                className="full-calendar"
              />
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="settings-content">
            <div className="section-header">
              <h2>System Settings</h2>
            </div>
            
            <div className="settings-card">
              <h3>Shop Information</h3>
              <div className="form-group">
                <label>Shop Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  defaultValue="Paan Corner" 
                />
              </div>
              
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  className="form-control" 
                  defaultValue="123 Main Street, Mumbai" 
                />
              </div>
              
              <div className="form-group">
                <label>Business Hours</label>
                <input 
                  type="text" 
                  className="form-control" 
                  defaultValue="10:00 AM - 10:00 PM" 
                />
              </div>
              
              <button className="btn btn-primary">Save Settings</button>
            </div>
            
            <div className="settings-card">
              <h3>Notification Preferences</h3>
              <div className="form-group">
                <label>
                  <input type="checkbox" defaultChecked /> Order Notifications
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" defaultChecked /> Low Stock Alerts
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" /> Marketing Promotions
                </label>
              </div>
              <button className="btn btn-primary">Update Preferences</button>
            </div>
          </div>
        )}

        {/* Add Ingredient Modal */}
        {showIngredientModal && (
          <div className="modal-overlay" onClick={() => setShowIngredientModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Add New Ingredient</h3>
                <button 
                  className="modal-close"
                  onClick={() => setShowIngredientModal(false)}
                >
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Ingredient Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newIngredient.name}
                    onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                    placeholder="Enter ingredient name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Current Stock</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={newIngredient.stock}
                    onChange={(e) => setNewIngredient({...newIngredient, stock: e.target.value})}
                    placeholder="Enter current stock"
                  />
                </div>
                
                <div className="form-group">
                  <label>Threshold (Low Stock Alert)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={newIngredient.threshold}
                    onChange={(e) => setNewIngredient({...newIngredient, threshold: e.target.value})}
                    placeholder="Enter threshold quantity"
                  />
                </div>
                
                <div className="form-group">
                  <label>Unit</label>
                  <select 
                    className="form-control"
                    value={newIngredient.unit}
                    onChange={(e) => setNewIngredient({...newIngredient, unit: e.target.value})}
                  >
                    <option value="pieces">Pieces</option>
                    <option value="kg">Kilograms</option>
                    <option value="g">Grams</option>
                    <option value="ml">Milliliters</option>
                    <option value="l">Liters</option>
                  </select>
                </div>
                
                <button 
                  className="btn btn-primary"
                  onClick={handleAddIngredient}
                  disabled={!newIngredient.name || !newIngredient.stock || !newIngredient.threshold}
                >
                  Add Ingredient
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Event Modal */}
        {showEventModal && (
          <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Events for {selectedDate.toDateString()}</h3>
                <button 
                  className="modal-close"
                  onClick={() => setShowEventModal(false)}
                >
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                {events[selectedDate.toISOString().split('T')[0]] ? (
                  <ul className="event-list">
                    {events[selectedDate.toISOString().split('T')[0]].map((event, index) => (
                      <li key={index} className={`event-item ${event.type}`}>
                        <div className="event-dot"></div>
                        <div className="event-content">
                          <h4>{event.title}</h4>
                          <p>{event.type}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-events">No events scheduled for this date</p>
                )}
                
                <div className="add-event-form">
                  <h4>Add New Event</h4>
                  <div className="form-group">
                    <label>Event Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      placeholder="Enter event title"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Event Type</label>
                    <select 
                      className="form-control"
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                    >
                      <option value="delivery">Delivery</option>
                      <option value="inventory">Inventory</option>
                      <option value="meeting">Meeting</option>
                      <option value="reminder">Reminder</option>
                    </select>
                  </div>
                  
                  <button 
                    className="btn btn-primary"
                    onClick={handleAddEvent}
                    disabled={!newEvent.title}
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;