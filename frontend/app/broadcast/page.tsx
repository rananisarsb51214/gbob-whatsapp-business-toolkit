use client';
‎import { useState } from 'react';
‎
‎export default function BroadcastPage() {
‎  const [numbers, setNumbers] = useState('');
‎  const [message, setMessage] = useState('');
‎  const [loading, setLoading] = useState(false);
‎  const [result, setResult] = useState<any>(null);
‎
‎  const handleBroadcast = async () => {
‎    setLoading(true);
‎    const phoneNumbers = numbers.split('\n').map(n => n.trim()).filter(Boolean);
‎
‎    try {
‎      const res = await fetch('https://your-app.up.railway.app/broadcast', {
‎        method: 'POST',
‎        headers: { 'Content-Type': 'application/json' },
‎        body: JSON.stringify({ phoneNumbers, message })
‎      });
‎      const data = await res.json();
‎      setResult(data);
‎    } catch (err) {
‎      alert('Error: ' + err);
‎    }
‎    setLoading(false);
‎  };
‎
‎  return (
‎    <div className="p-8 max-w-2xl">
‎      <h1 className="text-2xl font-bold mb-4">WhatsApp Broadcast</h1>
‎      <p className="text-gray-500 mb-4">Max 5000 numbers. 1 per line</p>
‎
‎      <textarea 
‎        placeholder="923001234567&#10;923011234567"
‎        value={numbers}
‎        onChange={e => setNumbers(e.target.value)}
‎        className="w-full h-40 border rounded p-3 mb-4"
‎      />
‎
‎      <textarea 
‎        placeholder="Assalamualaikum! 30% OFF Sale 🔥"
‎        value={message}
‎        onChange={e => setMessage(e.target.value)}
‎        className="w-full h-24 border rounded p-3 mb-4"
‎      />
‎
‎      <button 
‎        onClick={handleBroadcast}
‎        disabled={loading}
‎        className="bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold"
‎
‎        {loading ? 'Sending...' : 'Send Broadcast'}
‎      </button>
‎
‎      {result && <div className="mt-4 p-4 bg-green-100 rounded">Status: {result.status}</div>}
‎    </div>
‎  );
‎}
‎
‎2. 24-HOUR TEMPLATE APPROVAL CODE - backend/template.js
‎Jab 24h se baat na hui ho tab ye template bhejo
‎
‎FILE NAME: backend/template.js
‎const axios = require('axios');
‎const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
‎const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
‎
‎// PEHLE META ME YE TEMPLATE APPROVE KARWANA HOGA
‎// Name: gbob_promo
‎// Category: MARKETING
‎// Body: Hi {{1}}! GBOB ki nayi sale {{2}}% OFF 🔥 Shop: {{3}}
‎
‎async function sendTemplate(toPhone, name, discount, link) {
‎  await axios.post(
‎    https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages,
‎    {
‎      messaging_product: "whatsapp",
‎      to: toPhone,
‎      type: "template",
‎      template: {
‎        name: "gbob_promo",
‎        language: { code: "en_US" },
‎        components: [
‎          {
‎            type: "body",
‎            parameters: [
‎              { type: "text", text: name },
‎              { type: "text", text: discount },
‎              { type: "text", text: link }
‎            ]
‎          }
‎        ]
‎      }
‎    },
‎    { headers: { 'Authorization': Bearer ${WHATSAPP_TOKEN} } }
‎  );
‎}
‎
‎module.exports = { sendTemplate };
‎TEMPLATE APPROVE KAISE KARNA HAI:
1. ‎Meta Business > WhatsApp > Message Templates
2. ‎New Template > Category: Marketing
3. ‎Name: gbob_promo
4. ‎Body: Hi ! GBOB ki nayi sale % OFF 🔥 Shop: 
5. ‎1-2 din me approve ho jayega
‎
‎---
‎
‎3. ANALYTICS DASHBOARD API - backend/analytics.js
‎Messages, Invoices, Revenue ka data
‎
‎FILE NAME: backend/analytics.js
‎const express = require('express');
‎const app = express();
‎
‎// YE DATA BAAD ME DATABASE SE AYEGA. FILHAL DUMMY
‎let stats = {
‎  messages_sent: 12450,
‎  invoices_generated: 340,
‎  revenue: 1250000,
‎  active_users: 89
‎};
‎
‎app.get('/analytics', (req, res) => {
‎  res.json({
‎    status: "success",
‎    data: {
‎      total_messages: stats.messages_sent,
‎      total_invoices: stats.invoices_generated,
‎      total_revenue: Rs ${stats.revenue.toLocaleString()},
‎      active_businesses: stats.active_users,
‎      growth: "+23.5%"
‎    },
‎    chart_data: {
‎      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
‎      messages: [1200, 1500, 1800, 1700, 2100, 2300, 1850],
‎      invoices: [40, 45, 52, 48, 60, 55, 40]
‎    }
‎  });
‎});
‎
‎module.exports = app;
‎backend/invoice.js ME YE ADD KARO:
‎const analyticsApp = require('./analytics');
‎app.use(analyticsApp);
‎FRONTEND ME CHART DIKHANE KE LIYE:
‎npm install recharts karke dashboard bana lena
‎
‎---
‎
‎FINAL backend/invoice.js - SAB CONNECT
‎const express = require('express');
‎const cors = require('cors');
‎require('dotenv').config();
‎
‎const app = express();
‎app.use(cors());
‎app.use(express.json({ limit: '10mb' }));
‎
‎// 3no files import
‎const { sendInvoiceWhatsApp } = require('./whatsapp');
‎const { sendBroadcast } = require('./broadcast'); 
‎const { sendTemplate } = require('./template');
‎const analyticsApp = require('./analytics');
‎
‎app.use(analyticsApp);
‎
‎// ... yahan pehle wala /generate-invoice aur /broadcast code rahega
‎
‎const PORT = process.env.PORT || 3000;
‎app.listen(PORT, () => console.log(✅ Server running on ${PORT}));
‎
‎SUMMARY
1. ‎/broadcast - 5000 msgs bhejta hai
2. ‎/analytics - Dashboard data deta hai  
3. ‎sendTemplate() - 24h rule bypass ke 