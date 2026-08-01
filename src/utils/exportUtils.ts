import { LookupData } from "../types";

// Download JSON payload
export function downloadJson(data: LookupData) {
  const filename = `${data.domain}-intelligence-${Date.now()}.json`;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Download CSV report
export function downloadCsv(data: LookupData) {
  const filename = `${data.domain}-report.csv`;
  const rows = [
    ["Category", "Property", "Value"],
    ["Website", "URL", data.website.url],
    ["Website", "Domain", data.website.domainName],
    ["Website", "Status", data.website.status],
    ["Website", "HTTPS", data.website.httpsEnabled ? "Yes" : "No"],
    ["Website", "Response Time (ms)", data.website.responseTimeMs],
    ["Website", "Title", `"${data.website.title.replace(/"/g, '""')}"`],
    ["IP Address", "IPv4", data.ip.ipv4],
    ["IP Address", "IPv6", data.ip.ipv6],
    ["Hosting", "Country", data.hosting.country],
    ["Hosting", "City", data.hosting.city],
    ["Hosting", "Region", data.hosting.region],
    ["Hosting", "Latitude", data.hosting.latitude],
    ["Hosting", "Longitude", data.hosting.longitude],
    ["Hosting", "Timezone", data.hosting.timezone],
    ["ISP", "ISP Name", data.isp.ispName],
    ["ISP", "Organisation", data.isp.organisation],
    ["ISP", "ASN", data.isp.asn],
    ["Server", "Server Header", data.server.serverHeader],
    ["Server", "HTTP Version", data.server.httpVersion],
    ["Security", "SSL Enabled", data.security.sslEnabled ? "Yes" : "No"],
    ["Security", "SSL Issuer", data.security.issuer],
    ["Security", "SSL Valid To", data.security.validTo],
    ["Security", "SSL Days Left", data.security.daysRemaining],
    ["Security", "HSTS Header", data.security.securityHeaders.hsts],
    ["Security", "CSP Header", data.security.securityHeaders.csp],
    ["WHOIS", "Registrar", data.whois.registrar],
    ["WHOIS", "Creation Date", data.whois.creationDate],
    ["WHOIS", "Expiry Date", data.whois.expiryDate],
  ];

  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Generate printable HTML PDF report
export function printPdfReport(data: LookupData) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Website Intelligence Report — ${data.domain}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 30px; color: #1e293b; background: #ffffff; }
          .header { border-bottom: 2px solid #00bfff; padding-bottom: 12px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
          .title { font-size: 24px; font-weight: bold; color: #0284c7; }
          .sub { color: #64748b; font-size: 13px; }
          .card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px; page-break-inside: avoid; }
          .card-title { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 12px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 6px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; }
          .item-label { font-weight: 600; color: #475569; }
          .item-val { color: #0f172a; word-break: break-all; }
          .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; background: #e0f2fe; color: #0369a1; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 8px; }
          th, td { border: 1px solid #e2e8f0; padding: 6px 10px; text-align: left; }
          th { background: #f8fafc; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">Website Intelligence Analysis Report</div>
            <div class="sub">Domain: <strong>${data.domain}</strong> | Analyzed: ${new Date(data.searchTimestamp).toLocaleString()}</div>
          </div>
          <div>
            <span class="badge">STATUS: ${data.website.status}</span>
          </div>
        </div>

        <div class="card">
          <div class="card-title">1. Website Summary</div>
          <div class="grid">
            <div><span class="item-label">URL:</span> <span class="item-val">${data.website.url}</span></div>
            <div><span class="item-label">Response Time:</span> <span class="item-val">${data.website.responseTimeMs} ms</span></div>
            <div><span class="item-label">HTTPS Enabled:</span> <span class="item-val">${data.website.httpsEnabled ? "Yes" : "No"}</span></div>
            <div><span class="item-label">Page Title:</span> <span class="item-val">${data.website.title}</span></div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">2. IP Address & Geolocation</div>
          <div class="grid">
            <div><span class="item-label">IPv4 Address:</span> <span class="item-val">${data.ip.ipv4}</span></div>
            <div><span class="item-label">IPv6 Address:</span> <span class="item-val">${data.ip.ipv6}</span></div>
            <div><span class="item-label">Hosting Country:</span> <span class="item-val">${data.hosting.country} (${data.hosting.countryCode})</span></div>
            <div><span class="item-label">Hosting City / Region:</span> <span class="item-val">${data.hosting.city}, ${data.hosting.region}</span></div>
            <div><span class="item-label">Coordinates:</span> <span class="item-val">${data.hosting.latitude}, ${data.hosting.longitude}</span></div>
            <div><span class="item-label">ISP / ASN:</span> <span class="item-val">${data.isp.ispName} (${data.isp.asn})</span></div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">3. Security & SSL Certificate</div>
          <div class="grid">
            <div><span class="item-label">SSL Enabled:</span> <span class="item-val">${data.security.sslEnabled ? "Yes" : "No"}</span></div>
            <div><span class="item-label">Certificate Issuer:</span> <span class="item-val">${data.security.issuer}</span></div>
            <div><span class="item-label">Valid Expiry:</span> <span class="item-val">${data.security.validTo} (${data.security.daysRemaining} days left)</span></div>
            <div><span class="item-label">TLS Protocol:</span> <span class="item-val">${data.security.tlsVersion} (${data.security.bits} bits)</span></div>
            <div><span class="item-label">HSTS Status:</span> <span class="item-val">${data.security.securityHeaders.hsts}</span></div>
            <div><span class="item-label">CSP Status:</span> <span class="item-val">${data.security.securityHeaders.csp}</span></div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">4. DNS Records</div>
          <table>
            <thead>
              <tr><th>Type</th><th>Host</th><th>TTL</th><th>Target / Value</th></tr>
            </thead>
            <tbody>
              ${Object.entries(data.dns)
                .flatMap(([_, records]) => records)
                .map(
                  (r) => `
                <tr>
                  <td><strong>${r.type}</strong></td>
                  <td>${r.name}</td>
                  <td>${r.TTL}s</td>
                  <td>${r.data}</td>
                </tr>`
                )
                .join("") || "<tr><td colspan='4'>No public records found</td></tr>"}
            </tbody>
          </table>
        </div>

        <div class="card">
          <div class="card-title">5. WHOIS Registration</div>
          <div class="grid">
            <div><span class="item-label">Registrar:</span> <span class="item-val">${data.whois.registrar}</span></div>
            <div><span class="item-label">Created Date:</span> <span class="item-val">${data.whois.creationDate}</span></div>
            <div><span class="item-label">Expiration Date:</span> <span class="item-val">${data.whois.expiryDate}</span></div>
            <div><span class="item-label">Domain Status:</span> <span class="item-val">${data.whois.domainStatus}</span></div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px; font-size: 11px; color: #94a3b8;">
          Generated by Website Intelligence Platform • ${new Date().toLocaleDateString()}
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

// Format markdown formatted full text summary
export function copyFormattedMarkdown(data: LookupData): string {
  return `### 🌐 Website Intelligence Report: ${data.domain}
- **URL**: ${data.website.url}
- **Status**: ${data.website.status} (${data.website.responseTimeMs} ms)
- **IPv4**: \`${data.ip.ipv4}\`
- **IPv6**: \`${data.ip.ipv6}\`
- **Hosting**: ${data.hosting.city}, ${data.hosting.country} ${data.hosting.flag}
- **ISP**: ${data.isp.ispName} (${data.isp.asn})
- **Server**: ${data.server.serverHeader} (${data.server.httpVersion})
- **SSL**: ${data.security.sslEnabled ? `Valid (${data.security.issuer}) - ${data.security.daysRemaining} days left` : "Disabled"}
- **Registrar**: ${data.whois.registrar} (Expires: ${data.whois.expiryDate})
`;
}
