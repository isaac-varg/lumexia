import QRCode from "qrcode";
export const generateQR = async (content: string) => {
	try {
		const qr = await QRCode.toDataURL(content);
		return qr;
	} catch (error) {
		throw error;
	}
};
