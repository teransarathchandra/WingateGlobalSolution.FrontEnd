const OrdersReport = ({ orders, users }) => {
    // Function to find user name by user ID
    const getUserNameById = (userId) => {
      const user = users.find(user => user._id === userId);
      return user ? `${user.name.firstName} ${user.name.lastName}` : 'Unknown User';  // Adjust according to your user object structure
    };
  
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', background: '#f9f9f9', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', margin: '20px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ flex: 1, textAlign: 'center', color: '#333', margin: 0 }}>Orders Report</h1>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ background: '#e1bd05', color: 'white', borderTopLeftRadius: '10px', borderBottom: '2px solid #ddd', padding: '12px', textAlign: 'left' }}>User Name</th>
              <th style={{ background: '#e1bd05', color: 'white', borderBottom: '2px solid #ddd', padding: '12px', textAlign: 'left' }}>Order ID</th>
              <th style={{ background: '#e1bd05', color: 'white', borderBottom: '2px solid #ddd', padding: '12px', textAlign: 'left' }}>Date</th>
              <th style={{ background: '#e1bd05', color: 'white', borderTopRightRadius: '10px', borderBottom: '2px solid #ddd', padding: '12px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd', background: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                <td style={{ padding: '10px', textAlign: 'left' }}>{getUserNameById(order.userId)}</td>
                <td style={{ padding: '10px', textAlign: 'left' }}>{order.orderId}</td>
                <td style={{ padding: '10px', textAlign: 'left' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '10px', textAlign: 'left' }}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default OrdersReport;
  