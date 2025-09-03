const SITE_URL = process.env.SITE_URL || "https://tgf.example.org";

const defaultSEO = {
  titleTemplate: "%s | The Green Finance Project",
  defaultTitle: "The Green Finance Project",
  description:
    "Financing sustainable initiatives with measurable impact. Explore projects, data, and insights from TGF.",
  canonical: SITE_URL,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    site_name: "The Green Finance Project",
    images: [
      {
        url: `${SITE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "The Green Finance Project",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default defaultSEO;

