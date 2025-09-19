import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";
import { google } from 'googleapis';

async function saveToGoogleSheets(leadData: any) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    if (!spreadsheetId) {
      console.warn('Google Spreadsheet ID not provided, skipping Google Sheets integration');
      return;
    }

    const values = [
      [
        new Date().toISOString(),
        leadData.fullName,
        leadData.email,
        leadData.phoneNumber,
        leadData.propertyAddress,
        leadData.city,
        leadData.state,
        leadData.zipCode,
        leadData.propertyType || '',
        leadData.bedrooms || '',
        leadData.bathrooms || '',
        leadData.squareFootage || '',
        leadData.propertyCondition || '',
        leadData.sellingReason || '',
        leadData.otherReason || '',
        leadData.additionalDetails || '',
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:P',
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('Successfully saved lead to Google Sheets');
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    // Don't throw error, just log it so the lead is still saved locally
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Create lead endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      
      // Save to local storage
      const lead = await storage.createLead(validatedData);
      
      // Save to Google Sheets (async, non-blocking)
      saveToGoogleSheets(validatedData).catch(console.error);
      
      res.json({ success: true, lead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating lead:", error);
        res.status(500).json({ 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get leads endpoint
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
