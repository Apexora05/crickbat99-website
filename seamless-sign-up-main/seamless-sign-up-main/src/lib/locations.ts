export type Location = {
  slug: string;
  city: string;
  region: string; // state / emirate
  country: "India" | "UAE";
  countryCode: "IN" | "AE";
  lat: string;
  lng: string;
  language: string;
  blurb: string;
};

export const LOCATIONS: Location[] = [
  { slug: "mumbai", city: "Mumbai", region: "Maharashtra", country: "India", countryCode: "IN", lat: "19.0760", lng: "72.8777", language: "Hindi, Marathi & English", blurb: "Wankhede se lekar IPL night games tak — Mumbai players ke liye instant cricket ID." },
  { slug: "delhi", city: "Delhi", region: "Delhi NCR", country: "India", countryCode: "IN", lat: "28.6139", lng: "77.2090", language: "Hindi & English", blurb: "Delhi NCR ke punters ke liye fastest UPI deposit aur 24x7 WhatsApp desk." },
  { slug: "bangalore", city: "Bangalore", region: "Karnataka", country: "India", countryCode: "IN", lat: "12.9716", lng: "77.5946", language: "Kannada, Hindi & English", blurb: "RCB fans ke liye ball-by-ball IPL exchange rates aur instant ID." },
  { slug: "kolkata", city: "Kolkata", region: "West Bengal", country: "India", countryCode: "IN", lat: "22.5726", lng: "88.3639", language: "Bengali, Hindi & English", blurb: "Eden Gardens matches par live session betting with best odds." },
  { slug: "chennai", city: "Chennai", region: "Tamil Nadu", country: "India", countryCode: "IN", lat: "13.0827", lng: "80.2707", language: "Tamil, Hindi & English", blurb: "CSK ke yellow army ke liye trusted online cricket ID provider." },
  { slug: "hyderabad", city: "Hyderabad", region: "Telangana", country: "India", countryCode: "IN", lat: "17.3850", lng: "78.4867", language: "Telugu, Hindi & English", blurb: "Hyderabad players ke liye 24x7 withdrawal aur casino markets." },
  { slug: "pune", city: "Pune", region: "Maharashtra", country: "India", countryCode: "IN", lat: "18.5204", lng: "73.8567", language: "Marathi, Hindi & English", blurb: "Pune ke liye 2-minute ID activation aur instant UPI payouts." },
  { slug: "ahmedabad", city: "Ahmedabad", region: "Gujarat", country: "India", countryCode: "IN", lat: "23.0225", lng: "72.5714", language: "Gujarati, Hindi & English", blurb: "Narendra Modi Stadium matches par best cricket betting rates." },
  { slug: "jaipur", city: "Jaipur", region: "Rajasthan", country: "India", countryCode: "IN", lat: "26.9124", lng: "75.7873", language: "Hindi & English", blurb: "Jaipur ke players ke liye safe aur verified betting ID." },
  { slug: "lucknow", city: "Lucknow", region: "Uttar Pradesh", country: "India", countryCode: "IN", lat: "26.8467", lng: "80.9462", language: "Hindi & English", blurb: "LSG matches, Teen Patti aur Andar Bahar — sab ek ID par." },
  { slug: "indore", city: "Indore", region: "Madhya Pradesh", country: "India", countryCode: "IN", lat: "22.7196", lng: "75.8577", language: "Hindi & English", blurb: "Indore ke liye instant deposit aur 5-minute withdrawal." },
  { slug: "surat", city: "Surat", region: "Gujarat", country: "India", countryCode: "IN", lat: "21.1702", lng: "72.8311", language: "Gujarati, Hindi & English", blurb: "Surat players ke liye high-limit cricket exchange ID." },
  { slug: "nagpur", city: "Nagpur", region: "Maharashtra", country: "India", countryCode: "IN", lat: "21.1458", lng: "79.0882", language: "Marathi, Hindi & English", blurb: "Nagpur ke liye trusted ID with 24x7 support." },
  { slug: "chandigarh", city: "Chandigarh", region: "Punjab & Haryana", country: "India", countryCode: "IN", lat: "30.7333", lng: "76.7794", language: "Punjabi, Hindi & English", blurb: "Tricity punters ke liye fastest online betting ID." },
  { slug: "patna", city: "Patna", region: "Bihar", country: "India", countryCode: "IN", lat: "25.5941", lng: "85.1376", language: "Hindi & Bhojpuri", blurb: "Patna ke liye chhote deposit se shuru karne wali cricket ID." },
  { slug: "kanpur", city: "Kanpur", region: "Uttar Pradesh", country: "India", countryCode: "IN", lat: "26.4499", lng: "80.3319", language: "Hindi & English", blurb: "Kanpur ke players ke liye instant WhatsApp ID service." },
  { slug: "bhopal", city: "Bhopal", region: "Madhya Pradesh", country: "India", countryCode: "IN", lat: "23.2599", lng: "77.4126", language: "Hindi & English", blurb: "Bhopal ke liye safe UPI deposits aur live casino." },
  { slug: "ludhiana", city: "Ludhiana", region: "Punjab", country: "India", countryCode: "IN", lat: "30.9010", lng: "75.8573", language: "Punjabi, Hindi & English", blurb: "Punjab ke punters ke liye best IPL odds aur instant payout." },
  { slug: "kochi", city: "Kochi", region: "Kerala", country: "India", countryCode: "IN", lat: "9.9312", lng: "76.2673", language: "Malayalam, Hindi & English", blurb: "Kerala players ke liye verified online cricket ID." },
  { slug: "guwahati", city: "Guwahati", region: "Assam", country: "India", countryCode: "IN", lat: "26.1445", lng: "91.7362", language: "Assamese, Hindi & English", blurb: "North-East ke liye 24x7 cricket betting ID desk." },
  { slug: "dubai", city: "Dubai", region: "Dubai", country: "UAE", countryCode: "AE", lat: "25.2048", lng: "55.2708", language: "Hindi, Urdu & English", blurb: "Dubai ke NRI players ke liye AED-friendly deposits aur instant ID." },
  { slug: "abu-dhabi", city: "Abu Dhabi", region: "Abu Dhabi", country: "UAE", countryCode: "AE", lat: "24.4539", lng: "54.3773", language: "Hindi, Urdu & English", blurb: "Abu Dhabi T10 aur IPL markets ke liye trusted betting ID." },
  { slug: "sharjah", city: "Sharjah", region: "Sharjah", country: "UAE", countryCode: "AE", lat: "25.3463", lng: "55.4209", language: "Hindi, Urdu & English", blurb: "Sharjah stadium matches par live betting ID in minutes." },
];

export const LOCATION_MAP: Record<string, Location> = Object.fromEntries(
  LOCATIONS.map((l) => [l.slug, l]),
);

export function locationKeywords(l: Location) {
  const c = l.city.toLowerCase();
  return [
    `cricbet99 ${c}`,
    `cricbet 99 ${c}`,
    `crickbet99 ${c}`,
    `cricbet99 ind`,
    `cricbet99.ac`,
    `online cricket id ${c}`,
    `cricket betting id ${c}`,
    `ipl betting id ${c}`,
    `betting id in ${c}`,
    `online betting id ${c} whatsapp`,
    `best cricket id provider ${c}`,
    `teen patti online ${c}`,
    `online casino id ${c}`,
    `${l.country.toLowerCase()} cricket id`,
  ].join(", ");
}
