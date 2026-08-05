import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
            port: process.env.EMAIL_PORT || 587,
            auth: {
                user: process.env.EMAIL_USER || 'demo@ethereal.email',
                pass: process.env.EMAIL_PASS || 'demopass'
            }
        });

        const info = await transporter.sendMail({
            from: '"MediCare Booking" <no-reply@medicare.com>',
            to,
            subject,
            text,
            html
        });

        console.log('[Email Service] Email sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('[Email Service Error]', error.message);
        return false;
    }
};

export default sendEmail;
