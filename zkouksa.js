// const nodemailer = require('nodemailer');

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

async function sendEmail() {
  try {
    // Konfigurace transporteru pro odesílání emailu
    const transporter = nodemailer.createTransport({
      host: 'smtp.seznam.cz',
      port: 465,
      secure: true,
      auth: {
        user: 'kleric13@seznam.cz',
        pass: 'Jirka1993',
      },   tls: {
        rejectUnauthorized: false,
      },
    });

    // cesty k soubourům co mají být poslány jako příloha

    const screenshotFolder = 'cypress/reports/html/screenshots';
    const videoFolder = 'cypress/reports/html/videos';
    const htmlFolder = 'cypress/reports/html';
    const successMessage = 'Vše proběhlo v pořádku.';


// Získání seznamu souborů ve složce screenshots
const screenshotFiles = fs.readdirSync(screenshotFolder)
  .filter(file => file.startsWith('template') && file.endsWith('.png'))
  .map(file => ({
    filename: file,
    path: path.join(screenshotFolder, file),
  }));

// Kontrola existence souborů
if (screenshotFiles.length === 0) {
  const successFilePath = path.join(screenshotFolder, 'success.txt');
  fs.writeFileSync(successFilePath, successMessage);
  process.exit(0); // Ukončení skriptu bez chybového kódu
}

    const videoFiles = fs.readdirSync(videoFolder)
      .filter(file => file.endsWith('.mp4'))
      .map(file => ({
        filename: file,
        path: path.join(videoFolder, file),
      }));
    const htmlFiles = fs.readdirSync(htmlFolder)
      .filter(file => file.endsWith('.html'))
      .map(file => ({
        filename: file,
        path: path.join(htmlFolder, file),
      }));

    const attachments = [...screenshotFiles, ...videoFiles, ...htmlFiles];


    const videoFile = 'cypress/reports/html/videos/email.cy.js.mp4';
    const videoAttachment = {
      filename: 'video.mp4',
      path: videoFile,
    };

    const htmlFile = 'cypress/reports/html/index.html';
    const htmlAttachment = {
      filename: 'report.html',
      path: htmlFile,
    };

 

    // Nastavení informací o emailu
    const mailOptions = {
      from: 'kleric13@seznam.cz',
      to: 'kleric13@seznam.cz',
      subject: 'Test Report',
      html: '<p>Připojený je testovací report.</p>',
      attachments: attachments,
      
    };
  

    // Odeslání emailu
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
  
}


// Spuštění funkce pro odeslání emailu
sendEmail();