export type DonationVersion = "v0" | "v1";

export type DonationAddress = {
  version: DonationVersion;
  chain: string;
  label: string;
  address: string;
  note: string;
};

const zcashAddress =
  "u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89";

export const donationV0Address: DonationAddress = {
  version: "v0",
  chain: "Zcash",
  label: "Zcash Unified Address",
  address: zcashAddress,
  note: "Shielded by default. Send ZEC only.",
};

export const donationV1Addresses: readonly DonationAddress[] = [
  {
    version: "v1",
    chain: "Zcash",
    label: "Zcash address",
    address: zcashAddress,
    note: "Unified address. Send ZEC only.",
  },
  {
    version: "v1",
    chain: "Ycash",
    label: "Ycash address",
    address: "ys1t2e77wawylp8zky7wq3gzky2j4w6rpgd8632vmvqqj370thgpls8t973qutj4gn5wsc3qmcy56y",
    note: "Send YEC only.",
  },
  {
    version: "v1",
    chain: "Namada",
    label: "Namada address",
    address: "znam1qp9v3gvs6dx576wx938kns0xx5ancxgv7z8athjq3gp7qp4uxk9qzdqdwqycpkyp0emtlsg9wlzzr",
    note: "Send NAM only.",
  },
  {
    version: "v1",
    chain: "Penumbra",
    label: "Penumbra address",
    address:
      "penumbra1jy08usn0vmp05amty8d74c3xt5kv4dg36snzql9ndp2xefmvk3fwmrzytrfdpvxduaak8t76gsdggtgtscd26tknjnkwkxh8us3pprjv0nknmkqmx9h4xermdsw3dl7ev36sx7",
    note: "Send PENUMBRA only.",
  },
  {
    version: "v1",
    chain: "Dash",
    label: "Dash address",
    address: "dash1zqe06svxpmrnegzd20htgqa0gxkcurhdg8u4r3vxpxyhuyzjx7lq4nap9vzm7wcf5ndv6pqcegyh5",
    note: "Send DASH only.",
  },
];

export const allDonationAddresses: readonly DonationAddress[] = [
  donationV0Address,
  ...donationV1Addresses,
];

export const donationSourceUrl = "https://zechub.wiki/donation";
