import { CSSProperties } from "react";

const PDFLayout = ({ content }) => {
    const { COMPANYNAME, HOUSENO, STREET, CITY, COUNTRY, MOBILENO, COMPANY_LOGO_URL } = process.env;

    const headerInfo = {
        companyName: COMPANYNAME,
        houseNo: HOUSENO,
        street: STREET,
        city: CITY,
        country: COUNTRY,
        mobileNo: MOBILENO
    };

    const layoutStyle: CSSProperties = {
        fontFamily: 'Arial, sans-serif',
        width: '210mm',
        height: '297mm',
        margin: 'auto',
        padding: '0 5mm',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    const headerStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    };

    const addressStyle: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'auto 20px auto',
        gap: '5px 10px',
        alignItems: 'center',
        margin: '10px 0',
        padding: '10px',
    };

    const labelStyle: CSSProperties = {
        fontWeight: 'bold',
        textAlign: 'left',
    };

    const footerInfo = {
        companyName: COMPANYNAME,
        companyDetails: `${HOUSENO}, ${STREET}, ${CITY}, ${COUNTRY}`,
        generatedDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    };

    return (
        <div style={layoutStyle}>
            <header style={headerStyle}>
                <img src={COMPANY_LOGO_URL} alt="Company Logo" style={{ width: '200px', height: '200px' }} />
                <div style={addressStyle}>
                    <div style={labelStyle}>Address</div>
                    <div style={labelStyle}> :</div>
                    <div>{headerInfo.companyName} ,</div>
                    <div style={labelStyle}></div>
                    <div style={labelStyle}></div>
                    <div>{headerInfo.houseNo} ,</div>
                    <div style={labelStyle}></div>
                    <div style={labelStyle}></div>
                    <div>{headerInfo.street} ,</div>
                    <div style={labelStyle}></div>
                    <div style={labelStyle}></div>
                    <div>{headerInfo.city} ,</div>
                    <div style={labelStyle}></div>
                    <div style={labelStyle}></div>
                    <div>{headerInfo.country}</div>
                    <div style={labelStyle}>Telephone</div>
                    <div style={labelStyle}> : </div>
                    <div>{headerInfo.mobileNo}</div>
                    <div style={labelStyle}>Fax</div>
                    <div style={labelStyle}> : </div>
                    <div>{headerInfo.mobileNo}</div>
                </div>
            </header>
            <main style={{ flexGrow: 1 }}>
                {content}
            </main>
            <footer style={{ marginTop: 'auto', padding: '2mm 0', borderTop: '1px solid #ccc' }}>
                <p>{footerInfo.companyName} | {footerInfo.companyDetails}</p>
                <p>Generated on : {footerInfo.generatedDate}</p>
            </footer>
        </div>
    );
};

export default PDFLayout;