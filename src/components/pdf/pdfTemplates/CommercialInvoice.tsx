import QRCodeGenerator from "@app_components/shared/QRCodeGenerator";
import { CSSProperties, ReactNode } from "react";

const CommercialInvoice = ({ order, item, receiver, sender }) => {

    const formatMoney = (amount) => {
        return `LKR ${amount.toFixed(2)}`;
    };

    // const totalCost = item.reduce((acc, current) => acc + current.packagingCost, 0);

    const gridStyle: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'auto 20px auto',
        gap: '5px 10px',
        alignItems: 'center',
        padding: '10px 0 10px 0',
    };

    const labelStyle: CSSProperties = {
        fontWeight: 600,
        textAlign: 'left',
    };

    const tableStyle: CSSProperties = {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '20px 0',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    };

    const headCellStyle: CSSProperties = {
        borderBottom: '1px solid #E0E0E0',
        textAlign: 'left',
        padding: '8px 16px',
        fontSize: '0.875rem',
        color: 'rgba(0, 0, 0, 1)',
        verticalAlign: 'bottom',
    };

    const cellStyle: CSSProperties = {
        borderBottom: '1px solid #E0E0E0',
        textAlign: 'left',
        padding: '8px 16px',
        fontSize: '0.875rem',
    };

    const rowStyle: CSSProperties = {
        backgroundColor: '#f9f9f9',
        borderBottom: '1px solid #ddd',
    };

    // const footerCellStyle: CSSProperties = {
    //     fontWeight: 'bold',
    //     textAlign: 'right',
    // };

    const Table = ({ children }: { children: ReactNode }) => <table style={tableStyle}>{children}</table>;
    const TableRow = ({ children }: { children: ReactNode }) => <tr style={rowStyle}>{children}</tr>;
    const TableCell = ({ children, align = 'left' }: { children: ReactNode, align?: 'left' | 'right' }) => <td style={{ ...cellStyle, textAlign: align }}>{children}</td>;
    const TableHeadCell = ({ children, align = 'left' }: { children: ReactNode, align?: 'left' | 'right' }) => <th style={{ ...headCellStyle, textAlign: align }}>{children}</th>;
    // const TableFooterCell = ({ children, align = 'right', colSpan = 1 }: { children: ReactNode, align?: 'left' | 'right', colSpan?: number }) => <td style={{ ...footerCellStyle, textAlign: align }} colSpan={colSpan}>{children}</td>;


    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '10px 20px' }}>
            <hr style={{ borderTop: '1px solid #e1bd05', margin: '20px 0' }}></hr>
            <h1 style={{ textAlign: 'center' }}>INVOICE</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <div style={gridStyle}>
                    <div style={labelStyle}>Order No</div>
                    <div style={labelStyle}> : </div>
                    <div>#{order.orderId}</div>
                    <div style={labelStyle}>Status</div>
                    <div style={labelStyle}> : </div>
                    <div>{order.status}</div>
                    <div style={labelStyle}>Priority</div>
                    <div style={labelStyle}> : </div>
                    <div>{order.priority}</div>
                </div>
                <div style={gridStyle}>
                    <div style={labelStyle}>Pickup Order</div>
                    <div style={labelStyle}> : </div>
                    <div>{order.isPickupOrder == true ? 'Yes' : 'No'}</div>
                    <div style={labelStyle}>Pickup Order Date</div>
                    <div style={labelStyle}> : </div>
                    <div>{order.pickupOrderDate ? order.pickupOrderDate : '-'}</div>
                    <div style={labelStyle}>Order Placed Date</div>
                    <div style={labelStyle}> : </div>
                    <div>{new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <div>
                    <h3>SENDER</h3>
                    <div style={gridStyle}>
                        <div style={labelStyle}>Name</div>
                        <div style={labelStyle}> : </div>
                        <div>{sender?.name?.firstName} {sender?.name?.lastName}</div>
                        <div style={labelStyle}>Contact</div>
                        <div style={labelStyle}> : </div>
                        <div>{sender?.contactNumber}</div>
                        <div style={labelStyle}>Email</div>
                        <div style={labelStyle}> : </div>
                        <div>{sender?.email}</div>
                        <div style={labelStyle}>Address</div>
                        <div style={labelStyle}> : </div>
                        <div>{sender?.address?.street}</div>
                        <div style={labelStyle}></div>
                        <div style={labelStyle}></div>
                        <div>{sender?.address?.city}</div>
                        <div style={labelStyle}></div>
                        <div style={labelStyle}></div>
                        <div>{sender?.address?.state}</div>
                        <div style={labelStyle}></div>
                        <div style={labelStyle}></div>
                        <div>{sender?.address?.countryId}</div>
                    </div>
                </div>
                <div>
                    <h3>RECEIVER</h3>
                    <div style={gridStyle}>
                        <div style={labelStyle}>Name</div>
                        <div style={labelStyle}> : </div>
                        <div>{receiver?.name?.firstName} {receiver?.name?.lastName}</div>
                        <div style={labelStyle}>Contact</div>
                        <div style={labelStyle}> : </div>
                        <div>{receiver?.contactNumber}</div>
                        <div style={labelStyle}>Email</div>
                        <div style={labelStyle}> : </div>
                        <div>{receiver?.email}</div>
                        <div style={labelStyle}>Address</div>
                        <div style={labelStyle}> : </div>
                        <div>{receiver?.address?.street} ,</div>
                        <div style={labelStyle}></div>
                        <div style={labelStyle}></div>
                        <div>{receiver?.address?.city} ,</div>
                        <div style={labelStyle}></div>
                        <div style={labelStyle}></div>
                        <div>{receiver?.address?.state} ,</div>
                        <div style={labelStyle}></div>
                        <div style={labelStyle}></div>
                        <div>{receiver?.address?.countryId}</div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '30px' }}>
                <h3>Invoice Details</h3>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Description</TableHeadCell>
                            <TableHeadCell align="right">Weight (kg)</TableHeadCell>
                            <TableHeadCell align="right">Quantity</TableHeadCell>
                            <TableHeadCell align="right">Cost per Unit</TableHeadCell>
                            <TableHeadCell align="right">Total Cost</TableHeadCell>
                        </TableRow>
                    </thead>
                    <tbody>
                        <TableRow>
                            <TableCell>
                                {item.itemName}
                            </TableCell>
                            <TableCell>
                                {item.description}
                            </TableCell>
                            <TableCell align="right">{item.weight}</TableCell>
                            <TableCell align="right">{item.packageCount}</TableCell>
                            <TableCell align="right">{formatMoney(item.itemValue)}</TableCell>
                            <TableCell align="right">{formatMoney(item.packageCount * item.itemValue)}</TableCell>
                        </TableRow>
                    </tbody>
                    {/* <tfoot>
                    <TableRow>
                        <StyledFooterCell colSpan="4">Total:</StyledFooterCell>
                        <StyledFooterCell align="right">{formatMoney(totalCost)}</StyledFooterCell>
                    </TableRow>
                    </tfoot> */}
                </Table>
            </div>
            <div style={{ marginTop: '50px' }}>
                <QRCodeGenerator url={`${'http://localhost:3000/api/order/byOrderId/'}${order.orderId}`}></QRCodeGenerator>
            </div>
        </div>
    )
}

export default CommercialInvoice
