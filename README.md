# Real Estate AI Lead Bot

An AI-powered real estate lead intake and qualification assistant that collects property inquiries, analyzes leads, assigns lead scores, determines urgency and intent, and generates professional follow-up messages.

## 🚀 Project Overview

The Real Estate AI Lead Bot is an automation project designed to help real estate agents manage incoming property inquiries more efficiently.

The system receives a potential client's property request, uses AI to analyze the lead, stores the lead information in a CRM data table, and generates a personalized follow-up message for qualified leads.

## ✨ Key Features

- 🏠 Real estate lead intake
- 🤖 AI-powered lead qualification
- 📊 Lead scoring from 0–100
- 🔥 Hot, Warm, and Cold lead classification
- ⚡ Urgency detection
- 🎯 Buyer, renter, seller, or unknown intent detection
- 📝 Automatic lead summaries
- 💬 AI-generated follow-up messages
- 🗂️ Lead storage in a CRM data table
- 🔄 Automated workflow using n8n
- 💻 React-based chat interface

## 🧠 How It Works

The system follows this process:

```text
User
  ↓
React AI Assistant
  ↓
n8n Webhook
  ↓
Lead Information Processing
  ↓
AI Lead Qualification
  ↓
Lead Score + Status + Intent + Urgency
  ↓
CRM Data Table
  ↓
AI Follow-Up Message
  ↓
Response to User