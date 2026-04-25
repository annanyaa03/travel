import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import { transporter } from '../config/nodemailer.js';
import { env } from '../config/env.js';
import { winstonLogger } from '../config/logger.js';

/**
 * Service for sending emails
 */
class EmailService {
  constructor() {
    this.templatesDir = path.join(process.cwd(), 'src', 'emails', 'templates');
  }

  /**
   * Send email using a template
   */
  async sendEmail(to, subject, templateName, context) {
    try {
      const templatePath = path.join(this.templatesDir, `${templateName}.hbs`);
      const templateSource = fs.readFileSync(templatePath, 'utf8');
      const template = handlebars.compile(templateSource);
      const html = template(context);

      const mailOptions = {
        from: env.EMAIL_FROM,
        to,
        subject,
        html,
      };

      const info = await transporter.sendMail(mailOptions);
      winstonLogger.info(`📧 Email sent: ${info.messageId} to ${to} (template: ${templateName})`);
      return info;
    } catch (error) {
      winstonLogger.error(`❌ Failed to send email to ${to}: ${error.message}`);
      // Don't throw, just log. Email failure shouldn't break the main flow.
      return null;
    }
  }

  async sendWelcome(email, fullName) {
    return this.sendEmail(email, 'Welcome to Travel App!', 'welcome', {
      fullName,
      frontendUrl: env.FRONTEND_URL
    });
  }

  async sendBookingConfirmation(email, booking) {
    return this.sendEmail(email, 'Booking Confirmation', 'booking-confirmation', {
      ...booking,
      frontendUrl: env.FRONTEND_URL
    });
  }

  async sendBookingCancellation(email, booking) {
    return this.sendEmail(email, 'Booking Cancelled', 'booking-cancellation', {
      ...booking,
      frontendUrl: env.FRONTEND_URL
    });
  }

  async sendPaymentSuccess(email, payment) {
    return this.sendEmail(email, 'Payment Successful', 'payment-success', {
      ...payment,
      frontendUrl: env.FRONTEND_URL
    });
  }
}

export default new EmailService();
