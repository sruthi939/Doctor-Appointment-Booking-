import sendEmail from '../utils/sendEmail.js';

export const sendBookingConfirmationEmail = async (userEmail, appointmentDetails) => {
    const subject = `Appointment Confirmation - #${appointmentDetails._id || appointmentDetails.id}`;
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0b0f19; color: #ffffff; border-radius: 16px;">
            <h2 style="color: #f43f5e;">MediCare Appointment Confirmed!</h2>
            <p>Dear Customer,</p>
            <p>Your appointment has been successfully scheduled with <strong>${appointmentDetails.doctorData?.name || 'Doctor'}</strong>.</p>
            <hr style="border: 1px solid #1e293b;" />
            <p><strong>Date:</strong> ${appointmentDetails.slotDate}</p>
            <p><strong>Time:</strong> ${appointmentDetails.slotTime}</p>
            <p><strong>Fee Paid:</strong> $${appointmentDetails.amount}</p>
            <p>Thank you for choosing MediCare!</p>
        </div>
    `;

    return await sendEmail({
        to: userEmail,
        subject,
        text: `Your appointment with ${appointmentDetails.doctorData?.name} on ${appointmentDetails.slotDate} at ${appointmentDetails.slotTime} is confirmed.`,
        html
    });
};
