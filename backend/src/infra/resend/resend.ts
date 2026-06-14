import { env } from '@/core/env';
import { Resend as RawResend } from 'resend';

const resend = new RawResend(env.RESEND_API_KEY);

const FROM = 'Quosel <noreply@quosel.com>';
const REPLY_TO = 'hello@quosel.com';

export class Resend {
  static async sendWelcome(to: string, givenName: string) {
    const greeting = givenName ? `Hi ${givenName}` : 'Hi';

    return await resend.emails.send({
      from: FROM,
      to,
      replyTo: REPLY_TO,
      subject: 'Welcome to Quosel',
      html: `<p>${greeting},</p><p>Thanks for signing up for Quosel. Your account is ready and your first website is waiting for you.</p>`,
    });
  }
}
