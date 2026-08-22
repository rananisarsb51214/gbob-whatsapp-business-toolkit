okay boss, ye rahi *exact file names + copy paste code* 👇

### *1. FILE NAME: `backend/invoice.js`*
Is file ko backend folder me banao aur ye pura code paste kar do:
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

async function generatePDF(invoiceData) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: 'Arial'; padding: 40px; color: #333; }
      .header { background: #25D366; color: white; padding: 20px; text-align: center; border-radius: 8px; }
      .logo { font-size: 24px; font-weight: bold; }
      .details { margin: 20px 0; display: flex; justify-content: space-between; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th { background: #f2f2f2; padding: 12px; text-align: left; }
      td { padding: 12px; border-bottom: 1px solid #ddd; }
      .total { text-align: right; font-size: 20px; font-weight: bold; margin-top: 20px; color: #25D366; }
      .footer { margin-top: 40px; text-align: center; color: #888; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="logo">GBOB Toolkit</div>
      <div>INVOICE #${invoiceData.invoice_no}</div>
    </div>
    <div class="details">
      <div><b>From:</b><br>${invoiceData.business_name}<br>${invoiceData.business_phone}</div>
      <div><b>To:</b><br>${invoiceData.customer_name}<br>${invoiceData.customer_phone}</div>
      <div><b>Date:</b> ${invoiceData.date}</div>
    </div>
    <table>
      <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
      ${invoiceData.items.map(item => `
        <tr><td>${item.name}</td><td>${item.qty}</td><td>Rs ${item.price}</td><td>Rs ${item.qty * item.price}</td></tr>
      `).join('')}
    </table>
    <div class="total">Grand Total: Rs ${invoiceData.grand_total}</div>
    <div class="footer">Powered by GBOB WhatsApp Business Toolkit</div>
  </body>
  </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  return pdf;
}

app.post('/generate-invoice', async (req, res) => {
  try {
    const pdfBuffer = await generatePDF(req.body);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice-${req.body.invoice_no}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
### *2. FILE NAME: `backend/package.json`*
Agar nahi hai to ye bhi add karo:
{
  "name": "gbob-backend",
  "version": "1.0.0",
  "main": "invoice.js",
  "scripts": {
    "dev": "node invoice.js",
    "start": "node invoice.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "puppeteer": "^21.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
### *3. FILE NAME: `backend/.env`*
PORT=3000
---

### *RUN KARNE KE COMMANDS*
cd backend
npm install
npm run dev
### *TEST KARNE KA COMMAND*
Postman ya Thunder Client me:
POST http://localhost:3000/generate-invoice
Body wala JSON upar wale msg me de chuka hun

---

Bas itna hi. Ab `/generate-invoice` API ready hai.

Agla step: *Isko Next.js frontend se connect karun?* ya *WhatsApp pe PDF auto bhejne ka code*