const EmployeesReport = ({ employees }) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Employee Report</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Employee ID</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Full Name</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Email</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Access Description</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{employee.employeeId}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{employee.fullName}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{employee.email}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{employee.accessDescription}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{new Date(employee.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeesReport;
