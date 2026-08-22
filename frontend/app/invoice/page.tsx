
‎
‎1. FRONTEND BUTTON - frontend/app/invoice/page.tsx
‎Ye file banao. "Generate Invoice" button + PDF download
‎'use client';
‎import { useState } from 'react';
‎
‎export default function InvoicePage() {
‎  const [loading, setLoading] = useState(false);
‎
‎  const invoiceData = {
‎    invoice_no: "GBOB" + Date.now(),
‎    date: new Date().toLocaleDateString('en-PK'),
‎    business_name: "GBOB Store",
‎    business_phone: "+92 3235052147",
‎    customer_name: "Test Customer",
‎    customer_phone: "+92 3408060167",
‎    items: [
‎      { name: "T-Shirt", qty: 2, price: 1500 },
‎      { name: "Jeans", qty: 1, price: 3500 }
‎    ],
‎    grand_total: 6500
‎  };
‎
‎  const handleGenerate = async () => {
‎    setLoading(true);
‎    try {
‎      const res = await fetch('http://localhost:3000/generate-invoice', {
‎        method: 'POST',
‎        headers: { 'Content-Type': 'application/json' },
‎        body: JSON.stringify(invoiceData)
‎      });
‎
‎      const blob = await res.blob();
‎      const url = window.URL.createObjectURL(blob);
‎      const a = document.createElement('a');
‎      a.href = url;
‎      a.download = Invoice-${invoiceData.invoice_no}.pdf;
‎      a.click();
‎    } catch (err) {
‎      alert('Error: ' + err);
‎    }
‎    setLoading(false);
‎  };
‎
‎  return (
‎    <div className="p-8">
‎      <h1 className="text-2xl font-bold mb-4">Generate Invoice</h1>
‎      <button 
‎        onClick={handleGenerate}
‎        disabled={loading}
‎        className="bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
‎
‎        {loading ? 'Generating...' : 'Download PDF Invoice'}
‎      </button>
‎    </div>
‎  );
‎}
‎2. WHATSAPP PE PDF BHEJNE KA CODE - backend/whatsapp.js
‎Ye file banao. Invoice banne ke baad auto WhatsApp pe bhej dega
‎const axios = require('axios');
‎const FormData = require('form-data');
‎
‎// .env me ye 2 add karo: WHATSAPP_TOKEN and PHONE_NUMBER_ID
‎const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
‎const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
‎
‎// STEP 1: PDF ko WhatsApp pe upload karo
‎async function uploadPDF(pdfBuffer, filename) {
‎  const form = new FormData();
‎  form.append('file', pdfBuffer, { filename });
‎  form.append('type', 'application/pdf');
‎  form.append('messaging_product', 'whatsapp');
‎
‎  const res = await axios.post(
‎    https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/media,
‎    form,
‎    { headers: { 'Authorization': Bearer ${WHATSAPP_TOKEN}, ...form.getHeaders() } }
‎  );
‎  return res.data.id; // media_id
‎}
‎
‎// STEP 2: Customer ko PDF bhejo
‎async function sendInvoiceWhatsApp(toPhone, pdfBuffer, invoiceNo) {
‎  const mediaId = await uploadPDF(pdfBuffer, Invoice-${invoiceNo}.pdf);
‎
‎  await axios.post(
‎    https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages,
‎    {
‎      messaging_product: "whatsapp",
‎      to: toPhone,
‎      type: "document",
‎      document: {
‎        id: mediaId,
‎        filename: Invoice-${invoiceNo}.pdf,
‎        caption: "Shukriya! Yeh raha aapka invoice 📄"
‎      }
‎    },
‎    { headers: { 'Authorization': Bearer ${WHATSAPP_TOKEN} } }
‎  );
‎}
‎
‎module.exports = { sendInvoiceWhatsApp };
‎3. DONO KO CONNECT KARO - backend/invoice.js me ye add karo
‎app.post('/generate-invoice') ke andar last me:
‎const { sendInvoiceWhatsApp } = require('./whatsapp');
‎
‎app.post('/generate-invoice', async (req, res) => {
‎  try {
‎    const pdfBuffer = await generatePDF(req.body);
‎
‎    // WhatsApp pe bhejne ke liye
‎    if(req.body.customer_phone) {
‎      await sendInvoiceWhatsApp(req.body.customer_phone, pdfBuffer, req.body.invoice_no);
‎    }
‎
‎    res.setHeader('Content-Type', 'application/pdf');
‎    res.setHeader('Content-Disposition', attachment; filename=Invoice-${req.body.invoice_no}.pdf);
‎    res.send(pdfBuffer);
‎  } catch (error) {
‎    res.status(500).json({ error: error.message });
‎  }
‎});
‎4. FILE NAME: backend/.env UPDATE
‎PORT=3000
‎WHATSAPP_TOKEN=your_token_here
‎PHONE_NUMBER_ID=your_phone_id_here
‎5. INSTALL 1 PACKAGE
‎cd backend
‎npm install axios form-data
‎
‎FLOW KYA HOGA
1. ‎Frontend pe button click → invoiceData backend pe jayega
2. ‎Backend PDF banayega → Download bhi dega + WhatsApp pe bhi bhej dega
3. ‎Customer ko WhatsApp pe PDF mil jayega
‎
