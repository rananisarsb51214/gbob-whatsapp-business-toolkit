# GBOB WhatsApp Business Toolkit 🚀

Transform your WhatsApp into a 24/7 Sales Agent! This toolkit integrates Auto-Reply, Product Catalog, Quick Invoice generation, and Broadcast messaging, all within a single, streamlined dashboard. Built for Pakistani SMEs with Next.js and Node.js.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

*   **🤖 Auto Reply Bot**: Configure keywords to provide instant responses to customer inquiries, ensuring no lead is missed.
*   **🛍️ Smart Catalog**: Easily add and manage your products, then share them directly via WhatsApp.
*   **🧾 Quick Invoice**: Generate and send professional PDF invoices in seconds, streamlining your billing process.
*   **📢 Broadcast Messaging**: Send promotional offers or updates to up to 5000 contacts with a single click.
*   **📊 Analytics Dashboard**: Monitor key metrics like messages sent, invoices generated, and revenue to track business growth.
*   **📱 Mobile First Design**: Manage your WhatsApp business efficiently, even on the go.

## 🛠️ Tech Stack

*   **Frontend**: Next.js 14, Tailwind CSS
*   **Backend**: Node.js, Express.js
*   **Database**: Supabase / Firebase (mentioned in existing README, but not implemented in provided code)
*   **WhatsApp Integration**: Meta WhatsApp Cloud API
*   **Hosting**: Vercel + Railway (mentioned in existing README)

## 🚀 Quick Start - Deploy in Minutes

Follow these steps to get the GBOB WhatsApp Business Toolkit up and running locally:

### 1. Clone the Repository
```bash
git clone https://github.com/rananisarsb51214/gbob-whatsapp-business-toolkit.git
cd gbob-whatsapp-business-toolkit
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with your WhatsApp API credentials:
```env
PORT=3000
WHATSAPP_TOKEN=PASTE_YOUR_WHATSAPP_TOKEN
PHONE_NUMBER_ID=PASTE_YOUR_PHONE_NUMBER_ID
```

Run the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend` directory and configure the API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Run the frontend development server:
```bash
npm run dev
```

## 🔗 Meta WhatsApp Setup

1.  Go to [developers.facebook.com](https://developers.facebook.com/) and create a new App.
2.  Enable the WhatsApp Cloud API for your app.
3.  Configure your Webhook:
    *   **Callback URL**: `YOUR_BACKEND_URL/webhook` (Replace `YOUR_BACKEND_URL` with your deployed backend URL).
    *   **Verify Token**: `GBOB123` (or your custom token).
4.  Ensure your Phone Number ID and WhatsApp Token are correctly set in the backend `.env` file.

For a detailed guide, refer to `DEPLOY.md` (if available, otherwise use general Meta documentation).

## ⚙️ Core Functionality & API Endpoints

This toolkit exposes several key functionalities through its backend API:

### 1. Broadcast Messaging (`/broadcast`)

*   **Purpose**: Send bulk messages to a list of phone numbers.
*   **Rate Limit**: Designed to respect WhatsApp's rate limits (approx. 50ms delay per message).
*   **Max Recipients**: Supports up to 5000 phone numbers per broadcast.
*   **Implementation**: Located in `backend/broadcast.js`.
*   **Example Usage (POST Request)**:
    ```bash
    POST https://your-app.up.railway.app/broadcast
    {
      "phoneNumbers": ["923001234567", "923011234567"],
      "message": "Assalamualaikum! GBOB ki nayi sale 30% OFF 🔥 Shop now: yourlink.com"
    }
    ```

### 2. Invoice Generation (`/generate-invoice`)

*   **Purpose**: Create and download PDF invoices, and optionally send them via WhatsApp.
*   **Technology**: Uses `puppeteer` for PDF generation.
*   **WhatsApp Integration**: Can send the generated PDF directly to a customer's WhatsApp number.
*   **Implementation**: Main logic in `backend/invoice.js`, with WhatsApp sending handled by `backend/whatsapp.js`.
*   **Example Data (JSON Body)**:
    ```json
    {
      "invoice_no": "GBOB1678886400000",
      "date": "2024-01-15",
      "business_name": "GBOB Store",
      "business_phone": "+92 3235052147",
      "customer_name": "Test Customer",
      "customer_phone": "+92 3408060167",
      "items": [
        { "name": "T-Shirt", "qty": 2, "price": 1500 },
        { "name": "Jeans", "qty": 1, "price": 3500 }
      ],
      "grand_total": 6500
    }
    ```

### 3. Template Messaging (`sendTemplate` function in `backend/template.js`)

*   **Purpose**: Send pre-approved message templates to users, especially when the 24-hour messaging window has closed.
*   **Template**: Requires a pre-approved template named `gbob_promo` in Meta's Business Manager.
    *   Example Template: `Hi {{1}}! GBOB ki nayi sale {{2}}% OFF 🔥 Shop: {{3}}`
*   **Implementation**: The `sendTemplate` function can be called to send personalized promotional messages.

### 4. Analytics (`/analytics`)

*   **Purpose**: Provides dummy data for an analytics dashboard.
*   **Metrics**: Includes total messages sent, invoices generated, revenue, and active users.
*   **Implementation**: Mock data is returned from `backend/analytics.js`. This would typically be integrated with a database.

## 📂 Project Structure

```
/
├── backend/
│   ├── .env             # Environment variables (add these manually)
│   ├── .env.example     # Example environment variables
│   ├── Dockerfile       # Docker configuration
│   ├── broadcast.js     # Broadcast functionality
│   ├── invoice.js       # Invoice generation and WhatsApp integration
│   ├── invoice-template.html # HTML template for invoice PDF
│   ├── package.json     # Backend dependencies
│   ├── whatsapp.js        # WhatsApp media upload and sending logic
│   ├── template.js      # WhatsApp template message sending
│   └── analytics.js     # Analytics data endpoint (mocked)
├── frontend/
│   ├── app/
│   │   ├── broadcast/
│   │   │   └── page.tsx     # Broadcast UI component
│   │   ├── invoice/
│   │   │   └── page.tsx     # Invoice generation UI component
│   │   ├── layout.tsx       # Main layout file (includes metadata for icons)
│   │   └── page.tsx         # (Likely homepage/dashboard)
│   ├── components/
│   ├── public/
│   │   ├── favicon.ico      # Favicon
│   │   ├── logo.png         # Repository logo
│   │   └── mockup.png       # Product mockup image
│   ├── .env.local         # Frontend environment variables
│   ├── .env.local.example # Example frontend env variables
│   └── package.json       # Frontend dependencies
├── banner                 # Unused or auxiliary file
├── bash                   # Unused or auxiliary file
├── code                   # Unused or auxiliary file
├── icon                   # Unused or auxiliary file
├── javascript code        # Unused or auxiliary file
├── route.ts               # Stripe webhook handler (backend/app/api/route.ts)
├── backend/DockerfileFROM node:20-slim # Duplicated Dockerfile entry
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md              # Project README file
```

## 📦 Dependencies

**Backend Dependencies (from `backend/package.json`)**:

*   `express`
*   `puppeteer`
*   `cors`
*   `dotenv`
*   `axios`
*   `form-data`

**Frontend Dependencies (implied by `frontend/app/` structure and `tailwind.config.js`)**:

*   `next`
*   `react`
*   `tailwindcss`

*(Note: Specific versions are in the respective `package.json` files which were not fully provided in the analysis.)*

## 🏗️ How to Use

1.  **Set up WhatsApp API**: Obtain your WhatsApp Business API credentials (Token and Phone Number ID) from Meta for Developers.
2.  **Configure Backend**: Update the `.env` file in the `backend` directory with your credentials.
3.  **Deploy Backend**: Deploy the backend to a platform like Railway or Vercel.
4.  **Configure Frontend**: Update the `.env.local` file in the `frontend` directory with your deployed backend URL.
5.  **Run Frontend**: Start the Next.js development server.
6.  **Broadcast**: Navigate to the Broadcast page in the frontend, input phone numbers (one per line) and your message, then click 'Send Broadcast'.
7.  **Generate Invoice**: Use the Invoice page to generate a sample invoice. You can download the PDF and optionally send it to a customer via WhatsApp (if `customer_phone` is provided).
8.  **Auto-Reply & Catalog**: These features are mentioned but their implementation details (e.g., webhook configuration, UI components) are not fully visible in the provided code snippets. They would typically involve setting up webhook endpoints to receive incoming messages and logic to process them based on keywords or product data.

## 📄 API Reference

*   **POST `/broadcast`**: Initiates a broadcast message.
    *   **Request Body**: `{ "phoneNumbers": ["string"], "message": "string" }`
    *   **Response**: `{ "status": "string", "total": number }`
*   **POST `/generate-invoice`**: Generates a PDF invoice.
    *   **Request Body**: JSON object containing invoice details (see example above).
    *   **Response**: PDF file or error message.
*   **GET `/analytics`**: Retrieves dummy analytics data.
    *   **Response**: JSON object with analytics metrics and chart data.

## 🤝 Contributing

Contributions are welcome! Please follow standard open-source contribution guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes relevant tests if applicable.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Important Links

*   **Repository**: [rananisarsb51214/gbob-whatsapp-business-toolkit](https://github.com/rananisarsb51214/gbob-whatsapp-business-toolkit)
*   **Author**: [rananisarsb51214](https://github.com/rananisarsb51214)

---

Built with ❤️ by the GBOB Team.

**Star ⭐ | Fork 🍴 | Watch 👀** this repository to stay updated!


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**