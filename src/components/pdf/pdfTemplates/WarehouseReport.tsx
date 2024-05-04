
const WarehouseReport = ({ warehouse }) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '10px 20px' }}>
            <h1 style={{ textAlign: 'center' }}>Warehouse Report</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Warehouse ID</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>storageCapacity</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouse.map((warehouse, index) => (
                        <tr key={index}>
                            <td>{warehouse.warehouseId}</td>
                            <td>{warehouse.storageCapacity}</td>
                            <td>{warehouse.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WarehouseReport;
