const OrderDetailsReport = ({ orders }) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Order Details Report</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Order ID</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Package Count</th>
                        {/* <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Package Type</th> */}
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Bulk ID</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{order.orderId}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{order.packageCount}</td>
                            {/* <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{order.packageType}</td> */}
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{order.bulkId}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetailsReport;
