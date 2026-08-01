export interface DnsRecord {
  name: string;
  type: string;
  TTL: number;
  data: string;
}

export interface WebsiteInfo {
  url: string;
  domainName: string;
  status: string;
  statusCode: number;
  httpsEnabled: boolean;
  responseTimeMs: number;
  title: string;
  favicon: string;
}

export interface DnsInfo {
  a: DnsRecord[];
  aaaa: DnsRecord[];
  mx: DnsRecord[];
  ns: DnsRecord[];
  txt: DnsRecord[];
  cname: DnsRecord[];
}

export interface IpInfo {
  ipv4: string;
  ipv6: string;
  allIpv4: string[];
  allIpv6: string[];
}

export interface HostingInfo {
  country: string;
  countryCode: string;
  flag: string;
  flagUrl: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  timezone: string;
  postalCode: string;
}

export interface IspInfo {
  ispName: string;
  organisation: string;
  asn: string;
  networkName: string;
  connectionType: string;
}

export interface ServerInfo {
  serverHeader: string;
  webServer: string;
  os: string;
  httpVersion: string;
  contentType: string;
  poweredBy: string;
}

export interface SecurityHeaders {
  hsts: string;
  csp: string;
  xFrameOptions: string;
  xContentType: string;
  xXssProtection: string;
  referrerPolicy: string;
}

export interface SecurityInfo {
  sslEnabled: boolean;
  issuer: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  tlsVersion: string;
  bits: number;
  sans: string[];
  fingerprint: string;
  securityHeaders: SecurityHeaders;
}

export interface WhoisInfo {
  registrar: string;
  registrarUrl: string;
  creationDate: string;
  updatedDate: string;
  expiryDate: string;
  registrantCountry: string;
  domainStatus: string;
  nameservers: string[];
  dnssec: string;
  handle: string;
}

export interface NetworkStats {
  pingMs: number;
  dnsLookupTimeMs: number;
  connectionTimeMs: number;
  ttfbMs: number;
  totalLookupTimeMs: number;
  downloadSpeedEstimate: string;
}

export interface AiSecurityAudit {
  grade: "A+" | "A" | "B" | "C" | "F";
  riskScore: number;
  summary: string;
  recommendations: string[];
}

export interface LookupData {
  domain: string;
  fullUrl: string;
  searchTimestamp: string;
  website: WebsiteInfo;
  dns: DnsInfo;
  ip: IpInfo;
  hosting: HostingInfo;
  isp: IspInfo;
  server: ServerInfo;
  security: SecurityInfo;
  whois: WhoisInfo;
  networkStats: NetworkStats;
  aiAudit?: AiSecurityAudit;
}

export interface HistoryItem {
  id: string;
  domain: string;
  timestamp: string;
  status: string;
  ip: string;
  favicon: string;
  isFavorite: boolean;
  data?: LookupData;
}
