

const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const config = require("./config");

async function sendEmail() {
  try {
    // Konfigurace transporteru pro odesílání emailu
    const transporter = nodemailer.createTransport({
      host: "smtp.seznam.cz",
      port: 465,
      secure: true,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // cesty k soubourům co mají být poslány jako příloha

    const screenshotFolder = "cypress/reports/screenshots/email.cy.js";
    const videoFolder = "cypress/reports/videos";
    const htmlFolder = "cypress/reports/";
    const jsonFolder = "cypress/reports/.jsons";

    const screenshotFiles = fs
      .readdirSync(screenshotFolder)
      .filter((file) => file.endsWith(".png"))
      .map((file) => ({
        filename: file,
        path: path.join(screenshotFolder, file),
      }));

    const videoFiles = fs
      .readdirSync(videoFolder)
      .filter((file) => file.endsWith(".mp4"))
      .map((file) => ({
        filename: file,
        path: path.join(videoFolder, file),
      }));

    const htmlFiles = fs
      .readdirSync(htmlFolder)
      .filter((file) => file.endsWith(".html"))
      .map((file) => ({
        filename: file,
        path: path.join(htmlFolder, file),
      }));

    const jsonFiles = fs
      .readdirSync(jsonFolder)
      .filter((file) => file.endsWith(".json"))
      .map((file) => ({
        filename: file,
        path: path.join(jsonFolder, file),
      }));

    const attachments = [
      ...screenshotFiles,
      ...videoFiles,
      ...htmlFiles,
      ...jsonFiles,
    ];

    // Nastavení informací o emailu
    const mailOptions = {
      from: "kleric13@seznam.cz",
      to: "kleric13@seznam.cz",
      subject: "Test Report",
      html: "<p>Připojený je testovací report.</p>",
      attachments: attachments,
    };

    // Odeslání emailu
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Spuštění funkce pro odeslání emailu
sendEmail();
