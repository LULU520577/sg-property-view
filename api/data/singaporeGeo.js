/**
 * Singapore Geocoding, Postal Sector Mapping & Landmark Registry
 * Coordinates in WGS84 (Lat, Lng)
 */

export const POSTAL_SECTOR_TO_TOWN = {
  '01': { town: 'CENTRAL AREA', name: 'Raffles Place / Marina', region: 'CCR' },
  '02': { town: 'CENTRAL AREA', name: 'Anson / Tanjong Pagar', region: 'CCR' },
  '03': { town: 'CENTRAL AREA', name: 'Queenstown / Alexandra', region: 'RCR' },
  '04': { town: 'CENTRAL AREA', name: 'Telok Blangah / Harbourfront', region: 'RCR' },
  '05': { town: 'PASIR PANJANG', name: 'Pasir Panjang / Clementi', region: 'RCR' },
  '06': { town: 'CENTRAL AREA', name: 'City Hall / Clarke Quay', region: 'CCR' },
  '07': { town: 'CENTRAL AREA', name: 'Bugis / Beach Road', region: 'CCR' },
  '08': { town: 'CENTRAL AREA', name: 'Little India / Farrer Park', region: 'RCR' },
  '09': { town: 'CENTRAL AREA', name: 'Orchard / Cairnhill', region: 'CCR' },
  '10': { town: 'CENTRAL AREA', name: 'Tanglin / Holland', region: 'CCR' },
  '11': { town: 'CENTRAL AREA', name: 'Newton / Novena', region: 'CCR' },
  '12': { town: 'CENTRAL AREA', name: 'Balestier / Toa Payoh', region: 'RCR' },
  '13': { town: 'CENTRAL AREA', name: 'MacPherson / Potong Pasir', region: 'RCR' },
  '14': { town: 'GEYLANG', name: 'Geylang / Eunos', region: 'RCR' },
  '15': { town: 'MARINE PARADE', name: 'Katong / Marine Parade', region: 'RCR' },
  '16': { town: 'BEDOK', name: 'Bedok / Bayshore', region: 'OCR' },
  '17': { town: 'PASIR RIS', name: 'Changi / Loyang', region: 'OCR' },
  '18': { town: 'TAMPINES', name: 'Tampines / Pasir Ris', region: 'OCR' },
  '19': { town: 'SERANGOON', name: 'Serangoon / Hougang', region: 'OCR' },
  '20': { town: 'ANG MO KIO', name: 'Ang Mo Kio / Bishan', region: 'OCR' },
  '21': { town: 'CLEMENTI', name: 'Clementi / Ulu Pandan', region: 'RCR' },
  '22': { town: 'JURONG WEST', name: 'Jurong West / Boon Lay', region: 'OCR' },
  '23': { town: 'BUKIT BATOK', name: 'Bukit Batok / Bukit Panjang', region: 'OCR' },
  '24': { town: 'CHOA CHU KANG', name: 'Choa Chu Kang / Yew Tee', region: 'OCR' },
  '25': { town: 'WOODLANDS', name: 'Woodlands / Admiralty', region: 'OCR' },
  '26': { town: 'SEMBAWANG', name: 'Sembawang / Canberra', region: 'OCR' },
  '27': { town: 'YISHUN', name: 'Yishun / Khatib', region: 'OCR' },
  '28': { town: 'SELETAR', name: 'Seletar / Sengkang West', region: 'OCR' },
  // 6-digit sector first 2 digits
  '56': { town: 'ANG MO KIO', name: 'Ang Mo Kio', region: 'OCR' },
  '57': { town: 'BISHAN', name: 'Bishan / Thomson', region: 'RCR' },
  '52': { town: 'TAMPINES', name: 'Tampines', region: 'OCR' },
  '51': { town: 'PASIR RIS', name: 'Pasir Ris', region: 'OCR' },
  '53': { town: 'HOUGANG', name: 'Hougang', region: 'OCR' },
  '54': { town: 'SENGKANG', name: 'Sengkang', region: 'OCR' },
  '55': { town: 'SERANGOON', name: 'Serangoon Garden', region: 'OCR' },
  '82': { town: 'PUNGGOL', name: 'Punggol', region: 'OCR' },
  '73': { town: 'WOODLANDS', name: 'Woodlands', region: 'OCR' },
  '75': { town: 'SEMBAWANG', name: 'Sembawang', region: 'OCR' },
  '76': { town: 'YISHUN', name: 'Yishun', region: 'OCR' },
  '68': { town: 'CHOA CHU KANG', name: 'Choa Chu Kang', region: 'OCR' },
  '67': { town: 'BUKIT PANJANG', name: 'Bukit Panjang', region: 'OCR' },
  '65': { town: 'BUKIT BATOK', name: 'Bukit Batok', region: 'OCR' },
  '64': { town: 'JURONG WEST', name: 'Jurong West', region: 'OCR' },
  '60': { town: 'JURONG EAST', name: 'Jurong East', region: 'OCR' },
  '12': { town: 'CLEMENTI', name: 'Clementi', region: 'RCR' },
  '14': { town: 'QUEENSTOWN', name: 'Queenstown', region: 'RCR' },
  '15': { town: 'QUEENSTOWN', name: 'Bukit Merah', region: 'RCR' },
  '16': { town: 'BUKIT MERAH', name: 'Tiong Bahru / Bukit Merah', region: 'RCR' },
  '31': { town: 'TOA PAYOH', name: 'Toa Payoh', region: 'RCR' },
  '32': { town: 'NOVENA', name: 'Balestier / Novena', region: 'CCR' },
  '38': { town: 'GEYLANG', name: 'Geylang', region: 'RCR' },
  '39': { town: 'KALLANG/WHAMPOA', name: 'Kallang', region: 'RCR' },
  '46': { town: 'BEDOK', name: 'Bedok', region: 'OCR' },
  '44': { town: 'MARINE PARADE', name: 'Marine Parade', region: 'RCR' }
};

export const SINGAPORE_MRT_STATIONS = [
  { name: 'Ang Mo Kio MRT (NS16/CR11)', lat: 1.3699, lng: 103.8496 },
  { name: 'Yio Chu Kang MRT (NS15)', lat: 1.3817, lng: 103.8449 },
  { name: 'Bishan MRT (NS17/CC15)', lat: 1.3508, lng: 103.8481 },
  { name: 'Braddell MRT (NS18)', lat: 1.3405, lng: 103.8468 },
  { name: 'Toa Payoh MRT (NS19)', lat: 1.3327, lng: 103.8476 },
  { name: 'Novena MRT (NS20)', lat: 1.3204, lng: 103.8438 },
  { name: 'Newton MRT (NS21/DT11)', lat: 1.3123, lng: 103.8380 },
  { name: 'Orchard MRT (NS22/TE14)', lat: 1.3040, lng: 103.8319 },
  { name: 'Somerset MRT (NS23)', lat: 1.3003, lng: 103.8390 },
  { name: 'Dhoby Ghaut MRT (NS24/NE6/CC1)', lat: 1.2990, lng: 103.8458 },
  { name: 'City Hall MRT (NS25/EW13)', lat: 1.2931, lng: 103.8522 },
  { name: 'Raffles Place MRT (NS26/EW14)', lat: 1.2830, lng: 103.8519 },
  { name: 'Marina Bay MRT (NS27/CE2/TE20)', lat: 1.2764, lng: 103.8546 },
  { name: 'Tampines MRT (EW2/DT32)', lat: 1.3533, lng: 103.9452 },
  { name: 'Tampines East MRT (DT33)', lat: 1.3562, lng: 103.9546 },
  { name: 'Tampines West MRT (DT31)', lat: 1.3455, lng: 103.9384 },
  { name: 'Simei MRT (EW3)', lat: 1.3432, lng: 103.9533 },
  { name: 'Pasir Ris MRT (EW1/CP1)', lat: 1.3730, lng: 103.9493 },
  { name: 'Bedok MRT (EW5)', lat: 1.3240, lng: 103.9300 },
  { name: 'Bedok Reservoir MRT (DT30)', lat: 1.3366, lng: 103.9330 },
  { name: 'Bedok North MRT (DT29)', lat: 1.3347, lng: 103.9180 },
  { name: 'Kembangan MRT (EW6)', lat: 1.3210, lng: 103.9129 },
  { name: 'Eunos MRT (EW7)', lat: 1.3197, lng: 103.9030 },
  { name: 'Paya Lebar MRT (EW8/CC9)', lat: 1.3181, lng: 103.8931 },
  { name: 'Aljunied MRT (EW9)', lat: 1.3164, lng: 103.8829 },
  { name: 'Kallang MRT (EW10)', lat: 1.3115, lng: 103.8714 },
  { name: 'Bugis MRT (EW12/DT14)', lat: 1.3008, lng: 103.8560 },
  { name: 'Tanjong Pagar MRT (EW15)', lat: 1.2765, lng: 103.8458 },
  { name: 'Outram Park MRT (EW16/NE3/TE17)', lat: 1.2804, lng: 103.8395 },
  { name: 'Tiong Bahru MRT (EW17)', lat: 1.2865, lng: 103.8270 },
  { name: 'Redhill MRT (EW18)', lat: 1.2896, lng: 103.8168 },
  { name: 'Queenstown MRT (EW19)', lat: 1.2944, lng: 103.8061 },
  { name: 'Commonwealth MRT (EW20)', lat: 1.3024, lng: 103.7983 },
  { name: 'Buona Vista MRT (EW21/CC22)', lat: 1.3073, lng: 103.7900 },
  { name: 'Dover MRT (EW22)', lat: 1.3114, lng: 103.7786 },
  { name: 'Clementi MRT (EW23)', lat: 1.3151, lng: 103.7652 },
  { name: 'Jurong East MRT (EW24/NS1/JE5)', lat: 1.3331, lng: 103.7423 },
  { name: 'Chinese Garden MRT (EW25)', lat: 1.3424, lng: 103.7326 },
  { name: 'Lakeside MRT (EW26)', lat: 1.3442, lng: 103.7210 },
  { name: 'Boon Lay MRT (EW27/JS8)', lat: 1.3386, lng: 103.7060 },
  { name: 'HarbourFront MRT (NE1/CC29)', lat: 1.2654, lng: 103.8224 },
  { name: 'Chinatown MRT (NE4/DT19)', lat: 1.2843, lng: 103.8440 },
  { name: 'Clarke Quay MRT (NE5)', lat: 1.2884, lng: 103.8466 },
  { name: 'Little India MRT (NE7/DT12)', lat: 1.3068, lng: 103.8492 },
  { name: 'Farrer Park MRT (NE8)', lat: 1.3124, lng: 103.8535 },
  { name: 'Boon Keng MRT (NE9)', lat: 1.3194, lng: 103.8617 },
  { name: 'Potong Pasir MRT (NE10)', lat: 1.3314, lng: 103.8691 },
  { name: 'Woodleigh MRT (NE11)', lat: 1.3392, lng: 103.8708 },
  { name: 'Serangoon MRT (NE12/CC13)', lat: 1.3497, lng: 103.8736 },
  { name: 'Kovan MRT (NE13)', lat: 1.3601, lng: 103.8850 },
  { name: 'Hougang MRT (NE14/CR8)', lat: 1.3713, lng: 103.8924 },
  { name: 'Buangkok MRT (NE15)', lat: 1.3829, lng: 103.8931 },
  { name: 'Sengkang MRT (NE16/STC)', lat: 1.3917, lng: 103.8955 },
  { name: 'Punggol MRT (NE17/PTC/CP4)', lat: 1.4052, lng: 103.9022 },
  { name: 'Woodlands MRT (NS9/TE2)', lat: 1.4369, lng: 103.7865 },
  { name: 'Admiralty MRT (NS10)', lat: 1.4406, lng: 103.8010 },
  { name: 'Sembawang MRT (NS11)', lat: 1.4491, lng: 103.8201 },
  { name: 'Canberra MRT (NS12)', lat: 1.4431, lng: 103.8297 },
  { name: 'Yishun MRT (NS13)', lat: 1.4294, lng: 103.8350 },
  { name: 'Khatib MRT (NS14)', lat: 1.4172, lng: 103.8330 },
  { name: 'Bukit Panjang MRT (DT1/BP6)', lat: 1.3790, lng: 103.7619 },
  { name: 'Choa Chu Kang MRT (NS4/BP1/JS1)', lat: 1.3854, lng: 103.7443 },
  { name: 'Bukit Batok MRT (NS2)', lat: 1.3490, lng: 103.7496 },
  { name: 'Bukit Gombak MRT (NS3)', lat: 1.3587, lng: 103.7519 },
  { name: 'Upper Thomson MRT (TE8)', lat: 1.3544, lng: 103.8329 },
  { name: 'Bright Hill MRT (TE7/CR13)', lat: 1.3633, lng: 103.8329 },
  { name: 'Mayflower MRT (TE6)', lat: 1.3715, lng: 103.8365 },
  { name: 'Lentor MRT (TE5)', lat: 1.3854, lng: 103.8359 },
  { name: 'Springleaf MRT (TE4)', lat: 1.3976, lng: 103.8178 }
];

export const SINGAPORE_PRIMARY_SCHOOLS = [
  { name: 'Townsville Primary School', lat: 1.3619, lng: 103.8538, town: 'ANG MO KIO' },
  { name: 'Teck Ghee Primary School', lat: 1.3659, lng: 103.8475, town: 'ANG MO KIO' },
  { name: 'Ang Mo Kio Primary School', lat: 1.3691, lng: 103.8398, town: 'ANG MO KIO' },
  { name: 'Jing Shan Primary School', lat: 1.3703, lng: 103.8524, town: 'ANG MO KIO' },
  { name: 'CHIJ St. Nicholas Girls\' School (Primary)', lat: 1.3739, lng: 103.8340, town: 'ANG MO KIO' },
  { name: 'Mayflower Primary School', lat: 1.3653, lng: 103.8415, town: 'ANG MO KIO' },
  { name: 'Catholic High School (Primary)', lat: 1.3547, lng: 103.8447, town: 'BISHAN' },
  { name: 'Kuo Chuan Presbyterian Primary School', lat: 1.3496, lng: 103.8550, town: 'BISHAN' },
  { name: 'Ai Tong School', lat: 1.3606, lng: 103.8359, town: 'BISHAN' },
  { name: 'Guangyang Primary School', lat: 1.3475, lng: 103.8530, town: 'BISHAN' },
  { name: 'St. Hilda\'s Primary School', lat: 1.3494, lng: 103.9367, town: 'TAMPINES' },
  { name: 'Poi Ching School', lat: 1.3588, lng: 103.9388, town: 'TAMPINES' },
  { name: 'Tampines Primary School', lat: 1.3498, lng: 103.9482, town: 'TAMPINES' },
  { name: 'Gongshang Primary School', lat: 1.3578, lng: 103.9497, town: 'TAMPINES' },
  { name: 'Chongzheng Primary School', lat: 1.3512, lng: 103.9515, town: 'TAMPINES' },
  { name: 'Yumin Primary School', lat: 1.3514, lng: 103.9511, town: 'TAMPINES' },
  { name: 'Nan Hua Primary School', lat: 1.3211, lng: 103.7699, town: 'CLEMENTI' },
  { name: 'Clementi Primary School', lat: 1.3157, lng: 103.7667, town: 'CLEMENTI' },
  { name: 'Pei Tong Primary School', lat: 1.3168, lng: 103.7711, town: 'CLEMENTI' },
  { name: 'Henry Park Primary School', lat: 1.3165, lng: 103.7844, town: 'BUKIT TIMAH' },
  { name: 'Nanyang Primary School', lat: 1.3211, lng: 103.8075, town: 'BUKIT TIMAH' },
  { name: 'Raffles Girls\' Primary School', lat: 1.3298, lng: 103.8062, town: 'BUKIT TIMAH' },
  { name: 'Rosyth School', lat: 1.3727, lng: 103.8744, town: 'SERANGOON' },
  { name: 'CHIJ Our Lady of Good Counsel', lat: 1.3589, lng: 103.8647, town: 'SERANGOON' },
  { name: 'Zhonghua Primary School', lat: 1.3601, lng: 103.8698, town: 'SERANGOON' },
  { name: 'Radin Mas Primary School', lat: 1.2750, lng: 103.8242, town: 'BUKIT MERAH' },
  { name: 'Zhangde Primary School', lat: 1.2845, lng: 103.8252, town: 'BUKIT MERAH' },
  { name: 'CHIJ (Kellock)', lat: 1.2754, lng: 103.8277, town: 'BUKIT MERAH' },
  { name: 'Queenstown Primary School', lat: 1.2995, lng: 103.8058, town: 'QUEENSTOWN' },
  { name: 'New Town Primary School', lat: 1.3021, lng: 103.7997, town: 'QUEENSTOWN' },
  { name: 'Punggol Green Primary School', lat: 1.4011, lng: 103.8998, town: 'PUNGGOL' },
  { name: 'Mee Toh School', lat: 1.4005, lng: 103.9089, town: 'PUNGGOL' },
  { name: 'Horizon Primary School', lat: 1.3992, lng: 103.9142, town: 'PUNGGOL' },
  { name: 'Edgefield Primary School', lat: 1.3982, lng: 103.9069, town: 'PUNGGOL' },
  { name: 'Nan Chiau Primary School', lat: 1.3920, lng: 103.8906, town: 'SENGKANG' },
  { name: 'Anchor Green Primary School', lat: 1.3912, lng: 103.8878, town: 'SENGKANG' },
  { name: 'Compassvale Primary School', lat: 1.3934, lng: 103.9002, town: 'SENGKANG' },
  { name: 'Springdale Primary School', lat: 1.3892, lng: 103.8932, town: 'SENGKANG' },
  { name: 'Pei Hwa Presbyterian Primary School', lat: 1.3382, lng: 103.7761, town: 'BUKIT TIMAH' },
  { name: 'Bukit Panjang Primary School', lat: 1.3739, lng: 103.7691, town: 'BUKIT PANJANG' },
  { name: 'Keming Primary School', lat: 1.3458, lng: 103.7562, town: 'BUKIT BATOK' },
  { name: 'Rulang Primary School', lat: 1.3468, lng: 103.7188, town: 'JURONG WEST' },
  { name: 'Chongfu School', lat: 1.4385, lng: 103.8402, town: 'YISHUN' },
  { name: 'Tao Nan School', lat: 1.3060, lng: 103.9102, town: 'MARINE PARADE' },
  { name: 'Kong Hwa School', lat: 1.3142, lng: 103.8872, town: 'GEYLANG' },
  { name: 'Maha Bodhi School', lat: 1.3288, lng: 103.9021, town: 'GEYLANG' },
  { name: 'CHIJ Primary (Toa Payoh)', lat: 1.3327, lng: 103.8425, town: 'TOA PAYOH' },
  { name: 'Pei Chun Public School', lat: 1.3377, lng: 103.8549, town: 'TOA PAYOH' }
];

export const SINGAPORE_HAWKER_CENTRES = [
  { name: 'Chomp Chomp Food Centre', lat: 1.3644, lng: 103.8660 },
  { name: 'Teck Ghee Court Market & Food Centre (Blk 341)', lat: 1.3637, lng: 103.8488 },
  { name: 'Teck Ghee Square Market & Food Centre (Blk 409)', lat: 1.3647, lng: 103.8554 },
  { name: 'Ang Mo Kio Central Market & Food Centre (Blk 724)', lat: 1.3722, lng: 103.8480 },
  { name: 'Kebun Baru Market & Food Centre (Blk 226D)', lat: 1.3671, lng: 103.8398 },
  { name: 'Bishan 511 Food Centre', lat: 1.3498, lng: 103.8487 },
  { name: 'Tampines Round Market & Food Centre', lat: 1.3464, lng: 103.9442 },
  { name: 'Our Tampines Hub Hawker Centre', lat: 1.3533, lng: 103.9398 },
  { name: 'Bedok 85 Fengshan Market & Food Centre', lat: 1.3320, lng: 103.9385 },
  { name: 'Old Airport Road Food Centre', lat: 1.3082, lng: 103.8858 },
  { name: 'Maxwell Food Centre', lat: 1.2803, lng: 103.8447 },
  { name: 'Amoy Street Food Centre', lat: 1.2796, lng: 103.8466 },
  { name: 'Tiong Bahru Market', lat: 1.2848, lng: 103.8322 },
  { name: 'Toa Payoh West Market & Food Centre (Blk 127)', lat: 1.3349, lng: 103.8443 },
  { name: 'Toa Payoh Vista Market (Blk 74)', lat: 1.3339, lng: 103.8519 },
  { name: 'One Punggol Hawker Centre', lat: 1.4070, lng: 103.9015 },
  { name: 'Whampoa Drive Makan Place', lat: 1.3235, lng: 103.8540 },
  { name: 'Ghim Moh Market & Food Centre', lat: 1.3117, lng: 103.7885 },
  { name: 'Clementi 448 Market & Food Centre', lat: 1.3135, lng: 103.7645 },
  { name: 'Yishun Park Hawker Centre', lat: 1.4239, lng: 103.8450 }
];

export const SINGAPORE_SUPERMARKETS = [
  { name: 'FairPrice Teck Ghee (Blk 410)', lat: 1.3642, lng: 103.8548, chain: 'FairPrice' },
  { name: 'FairPrice AMK Hub', lat: 1.3695, lng: 103.8485, chain: 'FairPrice Xtra' },
  { name: 'Sheng Siong Supermarket (Blk 122 AMK)', lat: 1.3702, lng: 103.8430, chain: 'Sheng Siong' },
  { name: 'FairPrice Finest Junction 8', lat: 1.3505, lng: 103.8485, chain: 'FairPrice Finest' },
  { name: 'Cold Storage Compass One', lat: 1.3920, lng: 103.8948, chain: 'Cold Storage' },
  { name: 'FairPrice Tampines Mall', lat: 1.3528, lng: 103.9448, chain: 'FairPrice' },
  { name: 'Sheng Siong Tampines Central', lat: 1.3540, lng: 103.9420, chain: 'Sheng Siong' },
  { name: 'FairPrice Waterway Point', lat: 1.4065, lng: 103.9020, chain: 'FairPrice Finest' },
  { name: 'Cold Storage Great World', lat: 1.2932, lng: 103.8322, chain: 'Cold Storage' },
  { name: 'FairPrice Tiong Bahru Plaza', lat: 1.2862, lng: 103.8272, chain: 'FairPrice' },
  { name: 'Sheng Siong Clementi Blk 420A', lat: 1.3129, lng: 103.7661, chain: 'Sheng Siong' }
];

export const SINGAPORE_PARKS = [
  { name: 'Bishan-Ang Mo Kio Park', lat: 1.3620, lng: 103.8450 },
  { name: 'Ang Mo Kio Town Garden East', lat: 1.3688, lng: 103.8520 },
  { name: 'Ang Mo Kio Town Garden West', lat: 1.3745, lng: 103.8420 },
  { name: 'Punggol Waterway Park', lat: 1.4095, lng: 103.9050 },
  { name: 'Tampines Eco Green', lat: 1.3600, lng: 103.9460 },
  { name: 'Bedok Reservoir Park', lat: 1.3410, lng: 103.9310 },
  { name: 'East Coast Park', lat: 1.3010, lng: 103.9120 },
  { name: 'Singapore Botanic Gardens', lat: 1.3138, lng: 103.8159 },
  { name: 'MacRitchie Reservoir Park', lat: 1.3420, lng: 103.8320 },
  { name: 'Jurong Lake Gardens', lat: 1.3390, lng: 103.7280 },
  { name: 'Telok Blangah Hill Park', lat: 1.2780, lng: 103.8120 }
];

/**
 * Calculates Haversine distance in meters between two coordinates.
 */
export function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Calculates nearby amenities from reference coordinates
 */
export function computeNearbyAmenities(lat, lng) {
  const mrtWithDist = SINGAPORE_MRT_STATIONS.map(item => ({
    name: item.name,
    distance_meters: getDistanceMeters(lat, lng, item.lat, item.lng)
  }))
    .sort((a, b) => a.distance_meters - b.distance_meters)
    .slice(0, 4);

  const schoolsWithDist = SINGAPORE_PRIMARY_SCHOOLS.map(item => ({
    name: item.name,
    town: item.town,
    distance_meters: getDistanceMeters(lat, lng, item.lat, item.lng)
  })).sort((a, b) => a.distance_meters - b.distance_meters);

  const primary_schools_1km = schoolsWithDist.filter(s => s.distance_meters <= 1000);
  const primary_schools_2km = schoolsWithDist.filter(s => s.distance_meters > 1000 && s.distance_meters <= 2000);

  const supermarkets = SINGAPORE_SUPERMARKETS.map(item => ({
    name: item.name,
    chain: item.chain,
    distance_meters: getDistanceMeters(lat, lng, item.lat, item.lng)
  }))
    .sort((a, b) => a.distance_meters - b.distance_meters)
    .slice(0, 3);

  const hawker_centers = SINGAPORE_HAWKER_CENTRES.map(item => ({
    name: item.name,
    distance_meters: getDistanceMeters(lat, lng, item.lat, item.lng)
  }))
    .sort((a, b) => a.distance_meters - b.distance_meters)
    .slice(0, 3);

  const parks = SINGAPORE_PARKS.map(item => ({
    name: item.name,
    distance_meters: getDistanceMeters(lat, lng, item.lat, item.lng)
  }))
    .sort((a, b) => a.distance_meters - b.distance_meters)
    .slice(0, 3);

  return {
    mrt_stations: mrtWithDist,
    primary_schools_1km,
    primary_schools_2km,
    supermarkets,
    hawker_centers,
    parks
  };
}

/**
 * Resolves postal sector to town
 */
export function resolvePostalToTown(postal) {
  if (!postal) return 'ANG MO KIO';
  const clean = String(postal).padStart(6, '0').slice(0, 6);
  const sector = clean.slice(0, 2);
  const mapped = POSTAL_SECTOR_TO_TOWN[sector];
  if (mapped) return mapped.town;

  // Fallback defaults
  if (clean.startsWith('56') || clean.startsWith('57')) return 'ANG MO KIO';
  if (clean.startsWith('52') || clean.startsWith('51')) return 'TAMPINES';
  if (clean.startsWith('14') || clean.startsWith('15')) return 'QUEENSTOWN';
  if (clean.startsWith('31') || clean.startsWith('32')) return 'TOA PAYOH';
  if (clean.startsWith('82')) return 'PUNGGOL';
  return 'ANG MO KIO';
}
