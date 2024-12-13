import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendBookingConfirmation = async (booking) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: booking.user.email,
      subject: 'Booking Confirmation',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Your booking for ${booking.hall.name} has been confirmed.</p>
        <p>Start Time: ${booking.startTime}</p>
        <p>End Time: ${booking.endTime}</p>
        <p>Purpose: ${booking.purpose}</p>
      `,
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};

export const sendBookingReminder = async (booking) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: booking.user.email,
      subject: 'Booking Reminder',
      html: `
        <h1>Booking Reminder</h1>
        <p>This is a reminder for your upcoming booking:</p>
        <p>Hall: ${booking.hall.name}</p>
        <p>Start Time: ${booking.startTime}</p>
        <p>End Time: ${booking.endTime}</p>
        <p>Purpose: ${booking.purpose}</p>
      `,
    });
  } catch (error) {
    console.error('Error sending reminder email:', error);
  }
};

export const sendAdminNotification = async (booking) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Booking Request',
      html: `
        <h1>New Booking Request</h1>
        <p>A new booking request has been submitted:</p>
        <p>User: ${booking.user.name}</p>
        <p>Hall: ${booking.hall.name}</p>
        <p>Start Time: ${booking.startTime}</p>
        <p>End Time: ${booking.endTime}</p>
        <p>Purpose: ${booking.purpose}</p>
      `,
    });
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
};

