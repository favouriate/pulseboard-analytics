/**
 * Dashboard-related types
 */

export interface DashboardMetric {
  label: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  trend?: number[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'churned';
  plan: string;
  mrr: number;
  joinedAt: Date;
  lastActive?: Date;
}

export interface Subscription {
  id: string;
  customerId: string;
  plan: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  mrr: number;
}

export interface RevenueData {
  date: string;
  mrr: number;
  arr: number;
  churn: number;
  newCustomers: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

