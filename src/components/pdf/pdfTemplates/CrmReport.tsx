const OrdersReport = ({ orders }) => {
    // The URL you want the QR code to link to
    const qrCodeURL = 'https://www.wingate.com/';
    // An API endpoint that generates QR codes (make sure the service allows direct embedding and usage in this manner)
    const qrCodeAPI = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(qrCodeURL)}`;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', background: '#f9f9f9', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', margin: '20px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img src={qrCodeAPI} alt="QR Code" style={{ marginRight: '10px', display: 'inline-block' }} />
                <h1 style={{ flex: 1, textAlign: 'center', color: '#333', margin: 0 }}>Deals Report</h1>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ background: '#4CAF50', color: 'white', borderTopLeftRadius: '10px', borderBottom: '2px solid #ddd', padding: '12px', textAlign: 'left' }}>Order ID</th>
                        <th style={{ background: '#4CAF50', color: 'white', borderBottom: '2px solid #ddd', padding: '12px', textAlign: 'left' }}>Date</th>
                        <th style={{ background: '#4CAF50', color: 'white', borderTopRightRadius: '10px', borderBottom: '2px solid #ddd', padding: '12px', textAlign: 'left' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #ddd', background: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
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
