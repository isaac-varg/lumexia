import QRCode from 'easyqrcodejs-nodejs'
export const generateQR = async (context: string, width: number = 512, height: number = 512) => {


	const options = {
		text: context,
		width,
		height,
	}

	const qr = new QRCode(options)

	const qrData = await qr.toDataURL();

	return qrData;
}
