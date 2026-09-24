import { PropertyDataPayload } from '../types/property';

export const PROMPT_SAMPLE_PAYLOAD: PropertyDataPayload = {
  search_postal: '560421',
  town: 'ANG MO KIO',
  resolved_address: {
    postal: '560421',
    block: '421',
    street_name: 'ANG MO KIO AVENUE 10',
    building: 'TECK GHEE HEARTLANDS',
    full_address: '421 ANG MO KIO AVENUE 10 TECK GHEE HEARTLANDS SINGAPORE 560421',
    town: 'ANG MO KIO',
    latitude: 1.365384,
    longitude: 103.852967
  },
  hdb_transactions: [
    {
      month: '2026-02',
      town: 'ANG MO KIO',
      flat_type: '4 ROOM',
      block: '421',
      street_name: 'ANG MO KIO AVE 10',
      storey_range: '07 TO 09',
      floor_area_sqm: 92,
      floor_area_sqft: 990,
      flat_model: 'New Generation',
      lease_commence_date: 1979,
      remaining_lease: '52 years 03 months',
      resale_price: 540000,
      psf: 545
    },
    {
      month: '2026-01',
      town: 'ANG MO KIO',
      flat_type: '3 ROOM',
      block: '421',
      street_name: 'ANG MO KIO AVE 10',
      storey_range: '10 TO 12',
      floor_area_sqm: 74,
      floor_area_sqft: 797,
      flat_model: 'New Generation',
      lease_commence_date: 1979,
      remaining_lease: '52 years 04 months',
      resale_price: 450000,
      psf: 565
    },
    {
      month: '2025-11',
      town: 'ANG MO KIO',
      flat_type: '3 ROOM',
      block: '421',
      street_name: 'ANG MO KIO AVE 10',
      storey_range: '04 TO 06',
      floor_area_sqm: 74,
      floor_area_sqft: 797,
      flat_model: 'New Generation',
      lease_commence_date: 1979,
      remaining_lease: '52 years 06 months',
      resale_price: 435000,
      psf: 546
    },
    {
      month: '2025-08',
      town: 'ANG MO KIO',
      flat_type: '4 ROOM',
      block: '421',
      street_name: 'ANG MO KIO AVE 10',
      storey_range: '01 TO 03',
      floor_area_sqm: 92,
      floor_area_sqft: 990,
      flat_model: 'New Generation',
      lease_commence_date: 1979,
      remaining_lease: '52 years 09 months',
      resale_price: 518000,
      psf: 523
    }
  ],
  hdb_metrics: {
    total_transactions: 4,
    median_price: 484000,
    median_psf: 545,
    min_price: 435000,
    max_price: 540000,
    min_psf: 523,
    max_psf: 565
  },
  ura_transactions: [
    {
      project: 'GRAND DUO',
      street: 'ANG MO KIO STREET 12',
      marketSegment: 'OCR',
      price: 1420000,
      area_sqm: 78,
      area_sqft: 840,
      contractDate: '0126',
      propertyType: 'Executive Condominium',
      psf: 1690,
      isBenchmarkSample: true
    },
    {
      project: 'CENTRO RESIDENCES',
      street: 'ANG MO KIO AVENUE 8',
      marketSegment: 'OCR',
      price: 1780000,
      area_sqm: 86,
      area_sqft: 926,
      contractDate: '0226',
      propertyType: 'Condominium',
      psf: 1922,
      isBenchmarkSample: true
    },
    {
      project: 'THE PANORAMA',
      street: 'ANG MO KIO AVENUE 2',
      marketSegment: 'OCR',
      price: 1650000,
      area_sqm: 94,
      area_sqft: 1012,
      contractDate: '1225',
      propertyType: 'Condominium',
      psf: 1630,
      isBenchmarkSample: true
    }
  ],
  ura_metrics: {
    total_transactions: 3,
    median_price: 1650000,
    median_psf: 1690,
    min_price: 1420000,
    max_price: 1780000,
    min_psf: 1630,
    max_psf: 1922
  },
  onemap_amenities: {
    mrt_stations: [
      { name: 'Ang Mo Kio MRT (NS16/CR11)', distance_meters: 380 },
      { name: 'Yio Chu Kang MRT (NS15)', distance_meters: 1680 },
      { name: 'Bishan MRT (NS17/CC15)', distance_meters: 1920 }
    ],
    primary_schools_1km: [
      { name: 'Townsville Primary School', distance_meters: 450, town: 'ANG MO KIO' },
      { name: 'Teck Ghee Primary School', distance_meters: 620, town: 'ANG MO KIO' },
      { name: 'Jing Shan Primary School', distance_meters: 950, town: 'ANG MO KIO' }
    ],
    primary_schools_2km: [
      { name: 'Ang Mo Kio Primary School', distance_meters: 1350, town: 'ANG MO KIO' },
      { name: 'Catholic High School (Primary)', distance_meters: 1780, town: 'BISHAN' },
      { name: 'CHIJ St. Nicholas Girls\' School (Primary)', distance_meters: 1890, town: 'ANG MO KIO' }
    ],
    supermarkets: [
      { name: 'FairPrice Teck Ghee (Blk 410)', distance_meters: 190, chain: 'FairPrice' },
      { name: 'FairPrice AMK Hub', distance_meters: 420, chain: 'FairPrice Xtra' },
      { name: 'Sheng Siong Supermarket (Blk 122)', distance_meters: 780, chain: 'Sheng Siong' }
    ],
    hawker_centers: [
      { name: 'Teck Ghee Square Market & Food Centre (Blk 409)', distance_meters: 180 },
      { name: 'Teck Ghee Court Market & Food Centre (Blk 341)', distance_meters: 460 },
      { name: 'Ang Mo Kio Central Market & Food Centre (Blk 724)', distance_meters: 650 }
    ],
    parks: [
      { name: 'Bishan-Ang Mo Kio Park', distance_meters: 680 },
      { name: 'Ang Mo Kio Town Garden East', distance_meters: 520 },
      { name: 'Ang Mo Kio Town Garden West', distance_meters: 1100 }
    ]
  }
};

export const QUICK_PRESETS = [
  { postal: '560421', label: '560421 (Ang Mo Kio Blk 421)', town: 'ANG MO KIO', tag: 'Sample Benchmark' },
  { postal: '520123', label: '520123 (Tampines St 11)', town: 'TAMPINES', tag: 'East Regional Hub' },
  { postal: '160001', label: '160001 (Bukit Merah / Membina)', town: 'BUKIT MERAH', tag: 'City Fringe / Prime' },
  { postal: '310150', label: '310150 (Toa Payoh Lor 1)', town: 'TOA PAYOH', tag: 'Mature Estate' },
  { postal: '821272', label: '821272 (Punggol Field)', town: 'PUNGGOL', tag: 'Young Homebuyer Hub' },
  { postal: '570215', label: '570215 (Bishan St 23)', town: 'BISHAN', tag: 'Top School Proximity' }
];
