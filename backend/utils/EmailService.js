const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // or 587
    secure: true, 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false, // Use for development only
    },
});


const sendOverdueEmail = async (recipientEmail, userName, bookDetails) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: `Overdue Book Reminder for ${userName}`,
            html: `
                <h3>Hello ${userName},</h3>
                <p>The following book(s) from our library are overdue:</p>
                <ul>
                    ${bookDetails
                        .map((book) => `<li><strong>${book.title}</strong> - Due on ${new Date(book.dueDate).toLocaleDateString()}</li>`)
                        .join('')}
                </ul>
                <p>Please return them as soon as possible to avoid further fines.</p>
                <p>Thank you,<br/>Library Management Team</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${recipientEmail}`);
    } catch (error) {
        console.error('Error sending overdue email:', error);
    }
};
const sendAvailableBookEmail = async (recipientEmail, userName, bookDetails) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: recipientEmail,
        subject: `Book Now Available: ${bookDetails.title}`,
        html: `
            <h3>Hello ${userName},</h3>
            <p>Good news! The following book you reserved is now available:</p>
            <ul>
                <li><strong>${bookDetails.title}</strong> by ${bookDetails.author}</li>
            </ul>
            <p>Please visit the library to borrow it at your earliest convenience. Availability is on a first-come, first-served basis.</p>
            <p>Thank you,<br/>Library Management Team</p>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipientEmail} for available book "${bookDetails.title}"`);
};

module.exports = { sendOverdueEmail,sendAvailableBookEmail };