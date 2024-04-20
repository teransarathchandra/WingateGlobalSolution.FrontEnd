
const OrdersReport = ({ orders }) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '10px 20px' }}>
            <h1 style={{ textAlign: 'center' }}>Orders Report</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>User Name</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Order ID</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.userName}</td>
                            <td>{order.orderId}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersReport;
