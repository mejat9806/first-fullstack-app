import { UserType } from "../model/userModel";
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface IEmail {
  to: string;
  firstName: string;
  url: string;
  from: string;
  message: string;
}

export class Email implements IEmail {
  to: string;
  firstName: string;
  url: string;
  from: string;
  message: string;

  constructor(user: any, url: string, message: string) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Amer Aizat <${process.env.EMAIL_FROM}>`;
    this.message = message;
  }

  createNewTransport(): Transporter {
    if (process.env.NODE_ENV === "production") {
      const transportOptions: SMTPTransport.Options = {
        host: process.env.BREVO_HOST,
        port: parseInt(process.env.BREVO_PORT || "587", 10),
        secure: false,
        auth: {
          user: process.env.BREVO_LOGIN,
          pass: process.env.BREVO_KEY,
        },
      };
      return nodemailer.createTransport(transportOptions);
    } else if (process.env.NODE_ENV === "development") {
      const transportOptions: SMTPTransport.Options = {
        host: process.env.MAILTRAP_HOST,
        port: parseInt(process.env.MAILTRAP_PORT || "2525", 10),
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
      };
      return nodemailer.createTransport(transportOptions);
    } else {
      throw new Error("Invalid NODE_ENV");
    }
  }
  async send(subject: string) {
    const mailOptions = {
      firsName: this.firstName,
      url: this.url,
      to: this.to,
      text: this.message,
      subject,
    };
    await this.createNewTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send("welcome to my app");
  }
  async sendPasswordReset() {
    await this.send("Your Password reset valid for 10 minutes");
  }
}
