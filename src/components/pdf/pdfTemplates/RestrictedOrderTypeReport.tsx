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


const RestrictedOrderDetailsReport = ({ orderDetails, itemDetails, senderDetails, receiverDetails, category, documentDetails }) => {

    
    return (
        <>
            <div style={{ textAlign: 'left' }}> 
                <h2 style={{ marginBottom: '20px', fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>Order Details</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', marginTop: '20px', marginLeft: 'auto' }}>
                    <tbody>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Order ID</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{orderDetails?.orderId}</td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Order Status</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{orderDetails?.status}</td>
                        </tr>
                    </tbody>
                </table>
    
                <h2 style={{ marginBottom: '20px', fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>Item Details</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', marginLeft: 'auto' }}>
                    <tbody>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Item ID</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{itemDetails?.itemId}</td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Item Name</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{itemDetails?.itemName}</td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Weight</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{itemDetails?.weight}</td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Category</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{category}</td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Description</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{itemDetails?.description}</td>
                        </tr>
                    </tbody>
                </table>
    
                <h2 style={{ marginBottom: '20px', fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>Sender Details</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', marginLeft: 'auto' }}>
                    <tbody>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Sender Name</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{senderDetails?.name.firstName} {senderDetails?.name.lastName}</td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Contact Number</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{senderDetails?.contactNumber}</td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>email</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{senderDetails?.email}</td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Address</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{senderDetails?.address.street + " , " + senderDetails?.address.city + " , " + senderDetails?.address.state} </td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Country</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{senderDetails?.address.countryId}</td>
                        </tr>
                    </tbody>
                </table>
    
                <h2 style={{ marginBottom: '20px', fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>Receiver Details</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', marginLeft: 'auto' }}>
                    <tbody>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Receiver Name</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{receiverDetails?.name.firstName} {receiverDetails?.name.lastName}</td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Contact Number</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{receiverDetails?.contactNumber}</td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>email</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{receiverDetails?.email}</td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Address</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{receiverDetails?.address.street + " , " + receiverDetails?.address.city + " , " + receiverDetails?.address.state} </td>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '12px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Country</th>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '12px' }}>{receiverDetails?.address.countryId}</td>
                        </tr>
                    </tbody>
                </table>
    
                <h2 style={{ marginBottom: '20px', fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>Submitted Documents</h2>
                {documentDetails?.map((doc, index) => (
                    <p key={index} style={{ fontFamily: 'Arial, sans-serif', padding: '12px', borderBottom: '1px solid #ddd' }}>
                        {doc.documentType}
                    </p>
                ))}
            </div>
        </>
    );
    
    
};

export { RestrictedOrderReport, RestrictedOrderDetailsReport };