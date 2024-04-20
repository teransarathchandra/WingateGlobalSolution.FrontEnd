import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ url }) => {
    return <QRCode value={url} size={128} level={"H"} />;
};

export default QRCodeGenerator;