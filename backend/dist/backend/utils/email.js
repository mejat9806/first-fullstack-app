import nodemailer from "nodemailer";
import { render } from "@react-email/render";
export class Email {
  to;
  firstName;
  url;
  pageUrl;
  from;
  message;
  type;
  html;
  constructor(user, url, pageUrl = "null", message, type, html = undefined) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.pageUrl = pageUrl;
    this.from = `Amer Aizat <${process.env.EMAIL_FROM}>`;
    this.message = message;
    this.type = type;
    this.html = html;
    this.from = `Amer Aizat <${process.env.EMAIL_FROM}>`;
  }
  createNewTransport() {
    if (process.env.NODE_ENV === "production") {
      console.log(process.env.BREVO_HOST);
      const transportOptions = {
        host: process.env.BREVO_HOST,
        port: parseInt(process.env.BREVO_PORT || "587", 10),
        secure: false,
        auth: {
          user: process.env.BREVO_LOGIN,
          pass: process.env.BREVO_KEY,
        },
      };
      console.log(transportOptions);
      console.log(process.env.BREVO_LOGIN);
      return nodemailer.createTransport(transportOptions);
    } else if (process.env.NODE_ENV === "development") {
      const transportOptions = {
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
  async send(subject) {
    const emailHtml = render(this.html);
    console.log(this.url);
    const mailOptions = {
      firsName: this.firstName,
      from: this.from,
      url: this.url,
      to: this.to,
      pageUrl: this.pageUrl,
      text: this.message,
      html: emailHtml,
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
