const RestrictedOrderReport = ({ restrictedOrders }) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Restricted Order Report</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Restricted Order ID</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Sending Country</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Receiving Country</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Category</th>
                        {/* <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Created Date</th> */}
                    </tr>
                </thead>
                <tbody>
                    {restrictedOrders.map((restrictedOrder, index) => (
                        <tr key={index}>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{restrictedOrder.restrictedOrderId}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{restrictedOrder.sendingCountryId}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{restrictedOrder.receivingCountryId}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{restrictedOrder.categoryId}</td>
                            {/* <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{new Date(restrictedOrder.createdAt).toLocaleDateString()}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RestrictedOrderReport;