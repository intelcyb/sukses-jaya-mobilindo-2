export const showroom = {
  name: "Sukses Jaya Mobilindo 2",
  address:
    "Jl. Soekarno - Hatta No.99 A-B, RT.01/RW.04, Sidomulyo Tim., Kec. Marpoyan Damai, Kota Pekanbaru, Riau 28282",
  shortAddress: "Jl. Soekarno-Hatta No.99 A-B, Pekanbaru",
  phone: "0851-9969-9988",
  whatsapp: "6285199699988",
  rating: "5.0",
  reviews: "602",
  openInfo: "Buka sampai 18.00",
  mapsEmbed: "Google Maps showroom placeholder"
};

export const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

export const formatKm = (value: number) => `${new Intl.NumberFormat("id-ID").format(value)} km`;

export const waLink = (message: string) =>
  `https://wa.me/${showroom.whatsapp}?text=${encodeURIComponent(message)}`;
