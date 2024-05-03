const BulksReport = ({ bulks }) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Bulks Report</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Bulk ID</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Master Airway Bill ID</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Flight ID</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Destination Country</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {bulks.map((bulk, index) => (
                        <tr key={index}>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{bulk.bulkId}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{bulk.masterAirwayBillId}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{bulk.flightId}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{bulk.destinationCountry}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{new Date(bulk.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BulksReport;
