export interface HdbTransaction {
  month: string;
  town: string;
  flat_type: string;
  block: string;
  street_name: string;
  storey_range: string;
  floor_area_sqm: number | string;
  floor_area_sqft?: number | string;
  flat_model: string;
  lease_commence_date: number | string;
  remaining_lease: string;
  resale_price: number | string;
  psf: number | string;
}

export interface UraTransaction {
  project: string;
  street: string;
  marketSegment: string;
  price: number | string;
  area_sqm: number | string;
  area_sqft?: number | string;
  contractDate: string;
  propertyType: string;
  psf: number | string;
  tenure?: string;
  typeOfSale?: string;
  isBenchmarkSample?: boolean;
}

export interface AmenityItem {
  name: string;
  distance_meters: number;
  town?: string;
  chain?: string;
}

export interface OneMapAmenities {
  mrt_stations: AmenityItem[];
  primary_schools_1km: AmenityItem[];
  primary_schools_2km?: AmenityItem[];
  supermarkets?: AmenityItem[];
  hawker_centers?: AmenityItem[];
  parks?: AmenityItem[];
}

export interface ResolvedAddress {
  postal?: string;
  block?: string;
  street_name?: string;
  building?: string;
  full_address?: string;
  town?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface SummaryMetrics {
  total_transactions: number;
  median_price: number | string;
  median_psf: number | string;
  min_price: number | string;
  max_price: number | string;
  min_psf: number | string;
  max_psf: number | string;
}

export interface PropertyDataPayload {
  search_postal: string;
  town: string;
  resolved_address?: ResolvedAddress;
  hdb_transactions: HdbTransaction[];
  hdb_metrics?: SummaryMetrics;
  ura_transactions: UraTransaction[];
  ura_metrics?: SummaryMetrics;
  ura_status?: string;
  onemap_amenities: OneMapAmenities;
  onemap_status?: string;
}

export interface GeminiReportResponse {
  status: string;
  postal_code: string;
  town: string;
  model: string;
  generated_at: string;
  report: string;
}

export interface HealthStatusResponse {
  status: string;
  timestamp: string;
  hdbConfigured: boolean;
  uraConfigured: boolean;
  oneMapConfigured: boolean;
  geminiConfigured: boolean;
  upstreamStatus: {
    hdb: string;
    ura: string;
    oneMap: string;
    gemini: string;
  };
}
