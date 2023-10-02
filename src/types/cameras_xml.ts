interface urlset {}

interface url {
  url: url_values[];
}

export interface url_values {
  loc: [string];
  lastmod: [string];
  changefreq: [string];
}

export interface cameras_xml {
  urlset: url;
}
