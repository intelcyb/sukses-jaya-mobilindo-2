export type CarStatus = "Available" | "Booked" | "Sold";

export type CarImage = {
  url: string;
  alt: string;
  category: "Exterior" | "Interior" | "Dashboard" | "Engine" | "Seats" | "Trunk" | "Document";
};

export type Car = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  mileage: number;
  transmission: "AT" | "CVT" | "MT";
  fuelType: "Bensin" | "Diesel" | "Hybrid";
  color: string;
  bodyType: string;
  status: CarStatus;
  isFeatured: boolean;
  description: string;
  images: CarImage[];
  specs: {
    plateArea: string;
    taxStatus: string;
    ownership: string;
    documentStatus: string;
  };
};

const img = (id: string, q = "80") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=${q}`;

const gallery = (name: string, base: string): CarImage[] => [
  { url: base, alt: `${name} tampak eksterior depan`, category: "Exterior" },
  { url: img("1503376780353-7e6692767b70"), alt: `${name} interior kabin`, category: "Interior" },
  { url: img("1492144534655-ae79c964c9d7"), alt: `${name} dashboard`, category: "Dashboard" },
  { url: img("1542362567-b07e54358753"), alt: `${name} ruang mesin`, category: "Engine" },
  { url: img("1503736334956-4c8f8e92946d"), alt: `${name} jok dan kursi`, category: "Seats" },
  { url: img("1549924231-f129b911e442"), alt: `${name} bagasi`, category: "Trunk" }
];

export const cars: Car[] = [
  {
    id: "sjm-001",
    slug: "toyota-fortuner-vrz-24-at-2021",
    name: "Toyota Fortuner VRZ 2.4 AT",
    brand: "Toyota",
    model: "Fortuner",
    variant: "VRZ 2.4 AT",
    year: 2021,
    price: 425000000,
    mileage: 41000,
    transmission: "AT",
    fuelType: "Diesel",
    color: "Hitam",
    bodyType: "SUV",
    status: "Available",
    isFeatured: true,
    description:
      "SUV diesel premium dengan kabin lega, tenaga responsif, dan tampilan berkelas. Cocok untuk keluarga, perjalanan bisnis, maupun penggunaan harian di Pekanbaru.",
    images: gallery("Toyota Fortuner VRZ 2021", img("1552519507-da3b142c6e3d")),
    specs: { plateArea: "BM Pekanbaru", taxStatus: "Pajak hidup", ownership: "Tangan pertama", documentStatus: "BPKB dan STNK lengkap" }
  },
  {
    id: "sjm-002",
    slug: "toyota-innova-reborn-24-v-at-2020",
    name: "Toyota Innova Reborn 2.4 V AT",
    brand: "Toyota",
    model: "Innova Reborn",
    variant: "2.4 V AT",
    year: 2020,
    price: 335000000,
    mileage: 52000,
    transmission: "AT",
    fuelType: "Diesel",
    color: "Putih",
    bodyType: "MPV",
    status: "Available",
    isFeatured: true,
    description:
      "MPV diesel favorit keluarga dengan kenyamanan kabin matang, konsumsi efisien, dan reputasi durabilitas Toyota yang sangat kuat.",
    images: gallery("Toyota Innova Reborn 2020", img("1541899481282-d53bffe3c35d")),
    specs: { plateArea: "BM Pekanbaru", taxStatus: "Pajak panjang", ownership: "Perorangan", documentStatus: "Dokumen lengkap" }
  },
  {
    id: "sjm-003",
    slug: "honda-hr-v-prestige-18-at-2022",
    name: "Honda HR-V Prestige 1.8 AT",
    brand: "Honda",
    model: "HR-V",
    variant: "Prestige 1.8 AT",
    year: 2022,
    price: 348000000,
    mileage: 26000,
    transmission: "AT",
    fuelType: "Bensin",
    color: "Meteoroid Gray",
    bodyType: "SUV",
    status: "Booked",
    isFeatured: true,
    description:
      "Compact SUV modern dengan fitur lengkap, posisi mengemudi nyaman, dan desain yang tetap terlihat segar untuk mobilitas profesional.",
    images: gallery("Honda HR-V Prestige 2022", img("1619767886558-efdc259cde1a")),
    specs: { plateArea: "BM", taxStatus: "Pajak hidup", ownership: "Tangan pertama", documentStatus: "Faktur tersedia" }
  },
  {
    id: "sjm-004",
    slug: "mitsubishi-pajero-sport-dakar-4x2-2021",
    name: "Mitsubishi Pajero Sport Dakar 4x2",
    brand: "Mitsubishi",
    model: "Pajero Sport",
    variant: "Dakar 4x2",
    year: 2021,
    price: 448000000,
    mileage: 38000,
    transmission: "AT",
    fuelType: "Diesel",
    color: "Quartz White",
    bodyType: "SUV",
    status: "Available",
    isFeatured: true,
    description:
      "SUV ladder frame dengan karakter gagah, kabin nyaman, dan mesin diesel bertenaga untuk perjalanan luar kota maupun aktivitas keluarga.",
    images: gallery("Mitsubishi Pajero Sport Dakar 2021", img("1533473359331-0135ef1b58bf")),
    specs: { plateArea: "BM Pekanbaru", taxStatus: "Pajak hidup", ownership: "Perorangan", documentStatus: "BPKB ready" }
  },
  {
    id: "sjm-005",
    slug: "toyota-avanza-veloz-15-q-cvt-2022",
    name: "Toyota Avanza Veloz 1.5 Q CVT",
    brand: "Toyota",
    model: "Veloz",
    variant: "1.5 Q CVT",
    year: 2022,
    price: 258000000,
    mileage: 31000,
    transmission: "CVT",
    fuelType: "Bensin",
    color: "Silver",
    bodyType: "MPV",
    status: "Available",
    isFeatured: false,
    description:
      "MPV modern dengan kabin fleksibel, transmisi CVT halus, dan fitur keselamatan yang pas untuk keluarga muda.",
    images: gallery("Toyota Avanza Veloz 2022", img("1609521263047-f8f205293f24")),
    specs: { plateArea: "BM", taxStatus: "Pajak panjang", ownership: "Tangan pertama", documentStatus: "Dokumen lengkap" }
  },
  {
    id: "sjm-006",
    slug: "honda-brio-rs-cvt-2021",
    name: "Honda Brio RS CVT",
    brand: "Honda",
    model: "Brio",
    variant: "RS CVT",
    year: 2021,
    price: 186000000,
    mileage: 24000,
    transmission: "CVT",
    fuelType: "Bensin",
    color: "Rallye Red",
    bodyType: "Hatchback",
    status: "Available",
    isFeatured: false,
    description:
      "City car lincah, irit, dan stylish. Pilihan ideal untuk pemakaian harian dengan biaya perawatan ringan.",
    images: gallery("Honda Brio RS 2021", img("1502877338535-766e1452684a")),
    specs: { plateArea: "BM", taxStatus: "Pajak hidup", ownership: "Perorangan", documentStatus: "Lengkap" }
  },
  {
    id: "sjm-007",
    slug: "daihatsu-terios-r-deluxe-at-2020",
    name: "Daihatsu Terios R Deluxe AT",
    brand: "Daihatsu",
    model: "Terios",
    variant: "R Deluxe AT",
    year: 2020,
    price: 218000000,
    mileage: 47000,
    transmission: "AT",
    fuelType: "Bensin",
    color: "Bronze",
    bodyType: "SUV",
    status: "Available",
    isFeatured: false,
    description:
      "SUV tujuh penumpang dengan ground clearance tinggi, tampilan tangguh, dan kabin praktis untuk keluarga aktif.",
    images: gallery("Daihatsu Terios R Deluxe 2020", img("1507136566006-cfc505b114fc")),
    specs: { plateArea: "BM Pekanbaru", taxStatus: "Pajak hidup", ownership: "Tangan pertama", documentStatus: "Lengkap" }
  },
  {
    id: "sjm-008",
    slug: "toyota-hilux-double-cabin-24-g-2021",
    name: "Toyota Hilux Double Cabin 2.4 G",
    brand: "Toyota",
    model: "Hilux",
    variant: "Double Cabin 2.4 G",
    year: 2021,
    price: 392000000,
    mileage: 45000,
    transmission: "MT",
    fuelType: "Diesel",
    color: "Hitam",
    bodyType: "Double Cabin",
    status: "Available",
    isFeatured: false,
    description:
      "Double cabin tangguh untuk kebutuhan operasional dan gaya hidup. Mesin diesel kuat dengan reputasi keandalan tinggi.",
    images: gallery("Toyota Hilux Double Cabin 2021", img("1504215680853-026ed2a45def")),
    specs: { plateArea: "BM", taxStatus: "Pajak hidup", ownership: "Perusahaan", documentStatus: "Dokumen lengkap" }
  },
  {
    id: "sjm-009",
    slug: "mitsubishi-xpander-ultimate-at-2022",
    name: "Mitsubishi Xpander Ultimate AT",
    brand: "Mitsubishi",
    model: "Xpander",
    variant: "Ultimate AT",
    year: 2022,
    price: 274000000,
    mileage: 29000,
    transmission: "AT",
    fuelType: "Bensin",
    color: "Graphite Gray",
    bodyType: "MPV",
    status: "Available",
    isFeatured: true,
    description:
      "MPV keluarga dengan desain dinamis, suspensi nyaman, dan ruang kabin yang lega untuk perjalanan bersama keluarga.",
    images: gallery("Mitsubishi Xpander Ultimate 2022", img("1563720223185-11003d516935")),
    specs: { plateArea: "BM", taxStatus: "Pajak panjang", ownership: "Tangan pertama", documentStatus: "Lengkap" }
  },
  {
    id: "sjm-010",
    slug: "toyota-rush-trd-sportivo-at-2021",
    name: "Toyota Rush TRD Sportivo AT",
    brand: "Toyota",
    model: "Rush",
    variant: "TRD Sportivo AT",
    year: 2021,
    price: 246000000,
    mileage: 36000,
    transmission: "AT",
    fuelType: "Bensin",
    color: "Putih",
    bodyType: "SUV",
    status: "Sold",
    isFeatured: false,
    description:
      "SUV tujuh penumpang bergaya sporty dengan fitur lengkap dan karakter praktis untuk aktivitas harian.",
    images: gallery("Toyota Rush TRD Sportivo 2021", img("1511918984145-48de785d4c4e")),
    specs: { plateArea: "BM", taxStatus: "Pajak hidup", ownership: "Perorangan", documentStatus: "Lengkap" }
  },
  {
    id: "sjm-011",
    slug: "honda-cr-v-turbo-prestige-2020",
    name: "Honda CR-V Turbo Prestige",
    brand: "Honda",
    model: "CR-V",
    variant: "Turbo Prestige",
    year: 2020,
    price: 438000000,
    mileage: 42000,
    transmission: "CVT",
    fuelType: "Bensin",
    color: "Modern Steel",
    bodyType: "SUV",
    status: "Available",
    isFeatured: true,
    description:
      "SUV premium dengan mesin turbo, kabin elegan, dan fitur keselamatan lengkap untuk kenyamanan kelas atas.",
    images: gallery("Honda CR-V Turbo Prestige 2020", img("1549317661-bd32c8ce0db2")),
    specs: { plateArea: "BM", taxStatus: "Pajak hidup", ownership: "Tangan pertama", documentStatus: "Faktur dan BPKB ready" }
  },
  {
    id: "sjm-012",
    slug: "toyota-alphard-25-g-at-2019",
    name: "Toyota Alphard 2.5 G AT",
    brand: "Toyota",
    model: "Alphard",
    variant: "2.5 G AT",
    year: 2019,
    price: 825000000,
    mileage: 57000,
    transmission: "AT",
    fuelType: "Bensin",
    color: "Black",
    bodyType: "Luxury",
    status: "Available",
    isFeatured: true,
    description:
      "Luxury MPV dengan kenyamanan eksekutif, captain seat, kabin senyap, dan aura prestisius untuk perjalanan keluarga maupun bisnis.",
    images: gallery("Toyota Alphard 2.5 G 2019", img("1525609004556-c46c7d6cf023")),
    specs: { plateArea: "BM Pekanbaru", taxStatus: "Pajak hidup", ownership: "Perorangan", documentStatus: "Dokumen lengkap" }
  }
];

export const brands = Array.from(new Set(cars.map((car) => car.brand))).sort();
export const bodyTypes = ["MPV", "SUV", "Sedan", "Hatchback", "Pickup", "Double Cabin", "Commercial", "Luxury"];
export const featuredCars = cars.filter((car) => car.isFeatured);
export const getCarBySlug = (slug: string) => cars.find((car) => car.slug === slug);
export const getRelatedCars = (car: Car) =>
  cars.filter((item) => item.id !== car.id && (item.brand === car.brand || item.bodyType === car.bodyType)).slice(0, 3);
