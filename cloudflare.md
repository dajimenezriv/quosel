# Cloudflare

Account ID (📝 CLOUDFLARE_ACCOUNT_ID): `b3cb2c555e1271b2732cdf8c9ac34afe`

⭐ Analytics > Dashboards

## 🌐 Domains

### Overview

#### quosel.com

##### DNS > Records

| Name                               | Type  | Content                                                                                       | Proxy status | TTL  | Priority |
| ---------------------------------- | ----- | --------------------------------------------------------------------------------------------- | ------------ | ---- | -------- |
| app.quosel.com                     | CNAME | quosel-frontend.pages.dev                                                                     | Proxied      | Auto | —        |
| assets.quosel.com                  | R2    | quosel                                                                                        | Proxied      | Auto | —        |
| backend.quosel.com                 | CNAME | dazus9vw.up.railway.app                                                                       | Proxied      | Auto | —        |
| quosel.com                         | CNAME | quosel-landing.pages.dev                                                                      | Proxied      | Auto | —        |
| www.quosel.com                     | CNAME | quosel-landing.pages.dev                                                                      | Proxied      | Auto | —        |
| quosel.com                         | MX    | route3.mx.cloudflare.net                                                                      | DNS only     | Auto | 87       |
| quosel.com                         | MX    | route2.mx.cloudflare.net                                                                      | DNS only     | Auto | 33       |
| quosel.com                         | MX    | route1.mx.cloudflare.net                                                                      | DNS only     | Auto | 96       |
| send.quosel.com                    | MX    | feedback-smtp.eu-west-1.amazonses.com                                                         | DNS only     | 1 hr | 10       |
| cf2024-1._domainkey.quosel.com     | TXT   | "v=DKIM1; h=sha256; k=rsa; p=..."                                                             | DNS only     | Auto | —        |
| _dmarc.quosel.com                  | TXT   | "v=DMARC1; p=none; rua=mailto:918046d4a2764c64afb7471b3ca2a29f@dmarc-reports.cloudflare.net;" | DNS only     | Auto | —        |
| quosel.com                         | TXT   | "v=spf1 include:_spf.mx.cloudflare.net ~all"                                                  | DNS only     | Auto | —        |
| _railway-verify.backend.quosel.com | TXT   | "railway-verify=a91507a8153aa2819d0a80ce07de044349bc70a4a0b5134b356a39a9e474bf0a"             | DNS only     | 1 hr | —        |
| resend._domainkey.quosel.com       | TXT   | "p=..."                                                                                       | DNS only     | 1 hr | —        |
| send.quosel.com                    | TXT   | "v=spf1 include:amazonses.com ~all"                                                           | DNS only     | 1 hr | —        |

##### Rules > Overview
	
- Redirect from WWW to root
- URI Full wildcard r"https://www.*"
- 301 redirect to wildcard_replace(http.request.full_uri, r"https://www.*", r"https://${1}")

#### quosel.app

##### DNS > Records

| Name                           | Type | Content                                      | Proxy status | TTL  | Priority |
| ------------------------------ | ---- | -------------------------------------------- | ------------ | ---- | -------- |
| *.quosel.app                   | AAAA | 100::                                        | Proxied      | Auto | —        |
| quosel.app                     | MX   | route3.mx.cloudflare.net                     | DNS only     | Auto | 13       |
| quosel.app                     | MX   | route2.mx.cloudflare.net                     | DNS only     | Auto | 39       |
| quosel.app                     | MX   | route1.mx.cloudflare.net                     | DNS only     | Auto | 86       |
| cf2024-1._domainkey.quosel.app | TXT  | "v=DKIM1; h=sha256; k=rsa; p=..."            | DNS only     | Auto | —        |
| quosel.app                     | TXT  | "v=spf1 include:_spf.mx.cloudflare.net ~all" | DNS only     | Auto | —        |

##### Rules > Overview

- 	 Redirect from WWW to root
- URI Full wildcard r"https://www.*"
- 301 redirect to wildcard_replace(http.request.full_uri, r"https://www.*", r"https://${1}")

### Registrations

| Domain     | Status | Auto-renew | Expires      |
| ---------- | ------ | ---------- | ------------ |
| quosel.app | Active | True       | Jul 8, 2027  |
| quosel.com | Active | True       | May 22, 2027 |

## 🧮 Compute

### Workers

#### quosel-sites

Uses `wrangler.jsonc`

##### Bindings

| Type         | Name    | Value   |
| ------------ | ------- | ------- |
| KV namespace | DOMAINS | DOMAINS |
| R2 bucket    | SITES   | quosel  |

##### Custom domains and routes

| Name             | Environment | Zone       |
| ---------------- | ----------- | ---------- |
| \*.quosel.app/\* | Route       | quosel.app |


### Pages

#### quosel-frontend

- Domains: app.quosel.com quosel-frontend.pages.dev
- Custom domains: app.quosel.com
- Production branch: main

#### quosel-landing
- Domains: quosel.com www.quosel.com quosel-landing.pages.dev
- Custom domains: quosel.com, www.quosel.com
- Production branch: main

### Email Service > Email Routing

| Domain     | Routing Rule | Action                 | Status |
| ---------- | ------------ | ---------------------- | ------ |
| quosel.com | Catch-all    | dajimenezriv@gmail.com | Active |
| quosel.app | Catch-all    | dajimenezriv@gmail.com | Active |

## 🗄️ Storage & databases

### R2 Object Storage

#### "Quosel" bucket

- backups
- images
- websites

### Workers KV

#### "DOMAINS" KV

Namespace ID (📝 DOMAINS_KV_NAMESPACE_ID): `788820ad7a3d4664a1441e237c2dd784`

!!! note "KV Pairs"
    | Key         | Value  |
    | ----------- | ------ |
    | gestelsl.es | gestel |

## 🛡️ Application security

### Security Insights

| Severity | Description                 | Subject    | Insight type             |
| -------- | --------------------------- | ---------- | ------------------------ |
| Low      | Security.txt not configured | quosel.com | Configuration suggestion |
| Low      | DMARC Record Error detected | quosel.com | Email Security           |
| Low      | DMARC Record Error detected | quosel.com | Email Security           |
| Low      | DMARC Record Error detected | quosel.com | Email Security           |
| Moderate | Bot Fight Mode not enabled  | quosel.com | Configuration suggestion |
| Low      | Security.txt not configured | quosel.app | Configuration suggestion |
| Moderate | Bot Fight Mode not enabled  | quosel.app | Configuration suggestion |

## ⚙️ Manage Account

### Account API tokens

- Backend - Workers KV Storage Write - 📝 CLOUDFLARE_API_TOKEN = "cfat_*"
- Frontend - Pages Write
