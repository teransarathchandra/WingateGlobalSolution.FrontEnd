const QuotationReport = ({ quotation }) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Quotations Report</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Quotation ID</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Packaging Cost</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Route Cost</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Unit Weight Cost</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Pickup Cost </th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Surcharge </th>
                        

                    </tr>
                </thead>
                <tbody>
                    {quotation.map((quotation, index) => (
                        <tr key={index}>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{quotation.quotationId}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{quotation.packagingCost}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{quotation.routeCost}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{quotation.unitWeightCost}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{quotation.pickupCost}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{quotation.surcharge}</td>


                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{new Date(quotation.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuotationReport;