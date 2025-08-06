import { type Lead, type InsertLead } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
}

export class MemStorage implements IStorage {
  private leads: Map<string, Lead>;

  constructor() {
    this.leads = new Map();
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = { 
      ...insertLead, 
      id,
      createdAt: new Date()
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }
}

export const storage = new MemStorage();
