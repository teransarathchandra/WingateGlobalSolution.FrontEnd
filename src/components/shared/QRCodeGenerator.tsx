import QRCode from "qrcode";
import { useEffect, useState } from 'react';

const QRCodeGenerator = ({ url }) => {
    const [src, setSrc] = useState('');

    useEffect(() => {
        QRCode.toDataURL(url, { errorCorrectionLevel: 'H' }, (err, url) => {
            if (err) return console.error(err);
            setSrc(url);
        });
    }, [url]);

    return <img src={src} alt="QR Code" style={{ width: '120px', height: '120px' }} />;
};

export default QRCodeGenerator;