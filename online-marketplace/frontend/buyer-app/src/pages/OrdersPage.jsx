import React, { useState, useEffect } from 'react';
import './OrdersPage.css';
import OrdersHeader from '../components/orders/OrdersHeader';
import OrdersFilter from '../components/orders/OrdersFilter';
import OrderCard from '../components/orders/OrderCard';
import EmptyOrders from '../components/orders/EmptyOrders';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('past three months');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from API
    fetchOrders();
  }, [timeFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      // const response = await axios.get(`/api/orders?filter=${timeFilter}`);
      // setOrders(response.data);
      
      // Mock data for demonstration
      setOrders([]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const filteredOrders = orders.filter(order =>
    order.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="orders-container">
      <OrdersHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      
      <OrdersFilter 
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        orderCount={filteredOrders.length}
      />

      <div className="orders-content">
        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <EmptyOrders timeFilter={timeFilter} />
        ) : (
          <div className="orders-list">
            {filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>

      <div className="browsing-history-note">
        After viewing product detail pages, look here to find an easy way to navigate back to pages you are interested in.
      </div>
    </div>
  );
}

export default Orders;