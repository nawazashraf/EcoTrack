export type ScopeBreakdown = {
  _id: string;      
  totalCO2e: number; 
};
export type AnalyticsOverview = {
  totalEmissions: string;     
  breakdown: ScopeBreakdown[];
};
