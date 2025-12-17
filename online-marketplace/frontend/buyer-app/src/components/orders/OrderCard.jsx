import React from 'react';

function OrderCard({ order }) {
  return (
    <div className="order-card">
      <div className="order-header">
        <div className="order-info-group">
          <div className="order-info-item">
            <span className="info-label">ORDER PLACED</span>
            <span className="info-value">{order.orderDate}</span>
          </div>
          <div className="order-info-item">
            <span className="info-label">TOTAL</span>
            <span className="info-value">${order.total}</span>
          </div>
          <div className="order-info-item">
            <span className="info-label">SHIP TO</span>
            <span className="info-value">{order.shipTo}</span>
          </div>
        </div>
        <div className="order-number">
          <span className="info-label">ORDER # {order.orderNumber}</span>
        </div>
      </div>

      <div className="order-body">
        <div className="order-status">
          <h3 className="status-title">{order.status}</h3>
          <p className="status-description">{order.statusDescription}</p>
        </div>

        <div className="order-items">
          {order.items.map(item => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.title} className="item-image" />
              <div className="item-details">
                <h4 className="item-title">{item.title}</h4>
                <p className="item-quantity">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-actions">
          <button className="action-button">Track Package</button>
          <button className="action-button secondary">View Order Details</button>
          <button className="action-button secondary">Add Comment</button>
          <button className="action-button secondary">Rate Item</button>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;