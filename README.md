# Shielded Scan

# Build ScamShield — AI-Powered Multi-Modal Scam Detection Platform

You are an expert product designer, frontend engineer, cybersecurity UI/UX designer, and full-stack developer.

Build a polished, modern cybersecurity web application called **ScamShield**.

## Product Tagline

**"Scan Before You Trust."**

## Hero Message

**"Don't Get Scammed. Scan It First."**

ScamShield is a multi-modal scam detection platform designed especially for Indian users. It analyzes suspicious:

* Website URLs
* Screenshots
* QR codes
* SMS/messages

and produces an understandable **Scam Risk Score**, detailed reasons, technical indicators, and safety recommendations.

This should look and feel like a real cybersecurity SaaS product, NOT a basic college-project website.

---

# 1. IMPORTANT DEVELOPMENT APPROACH

Build the project in a way that the frontend can later connect to a Python/FastAPI AI detection backend.

For the first version:

* Build the complete frontend.
* Build realistic interactive scan flows.
* Create a clean API service layer.
* Use mock/demo analysis data where the real backend is not yet connected.
* Clearly structure the code so mock analysis can later be replaced by FastAPI endpoints.
* Do NOT pretend mock threat intelligence is real.
* Clearly label demo/mock data when applicable.

The final architecture should support:

```text
React Frontend
       ↓
API Service Layer
       ↓
FastAPI Backend
       ↓
Detection Engines
       ↓
Risk Engine
       ↓
Analysis Result
```

---

# 2. TECHNOLOGY

Use a modern frontend stack:

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Lucide React icons
* Recharts for charts
* React Router

Structure the application cleanly and use reusable components.

Do not create one huge component containing the entire application.

---

# 3. VISUAL DESIGN

Create a premium cybersecurity aesthetic.

Theme:

* Very dark navy/black background
* Subtle gradients
* Glassmorphism
* Neon cyan/green accents
* Red/orange for danger
* Soft glowing borders
* Modern cards
* Large readable typography
* Professional cybersecurity dashboard style

The design should feel inspired by a combination of:

* Cybersecurity SOC dashboard
* Modern AI SaaS
* Premium security product

Avoid:

* Generic Bootstrap styling
* Excessive neon
* Hacker clichés
* Skulls
* Matrix rain
* Overly bright backgrounds
* Cluttered layouts

Use subtle animations only where they improve the experience.

---

# 4. BRANDING

Application name:

**ScamShield**

Logo concept:

A shield combined with a scanning/radar/QR symbol.

Tagline:

**Scan Before You Trust.**

Primary CTA:

**Scan Now**

Secondary CTA:

**How It Works**

Use ScamShield branding consistently across all pages.

---

# 5. APPLICATION STRUCTURE

Create these routes:

```text
/
    Landing Page

/scan
    Multi-modal Scanner

/results/:id
    Scan Result

/dashboard
    Security Dashboard

/history
    Scan History

/learn
    Scam Awareness / Education

/about
    About ScamShield
```

---

# 6. LANDING PAGE

Create an impressive landing page.

## Navbar

Left:

**ScamShield**

Navigation:

* Home
* Scan
* Dashboard
* History
* Learn
* About

Right:

**Scan Now**

Make the navbar sticky.

On mobile, use a hamburger menu.

---

# 7. HERO SECTION

Main heading:

## "Don't Get Scammed. Scan It First."

Subtitle:

"Analyze suspicious websites, QR codes, screenshots and messages before they put your money, identity or account at risk."

Buttons:

**Scan Now**

**See How It Works**

Add a large interactive cybersecurity visualization.

Show a futuristic scanning shield/radar interface.

Example visual:

```text
             🛡
       SCAMSHIELD AI

      ANALYZING INPUT

       █████████░ 91%

       HIGH RISK
```

Add subtle animated scanning effects.

---

# 8. PROBLEM SECTION

Heading:

## "Scams Don't Always Look Like Scams."

Explain common real-world examples:

```text
"Your KYC will expire."

"Your electricity bill is pending."

"Congratulations! You won ₹50,000."

"Scan this QR code to receive payment."

"Your account will be blocked."
```

Explain that scammers use:

* Urgency
* Fear
* Fake rewards
* Brand impersonation
* Fake payment requests
* Fake KYC notifications
* Suspicious links

Add an elegant visual comparison between:

```text
Normal Message
        vs
Scam Message
```

---

# 9. MULTI-MODAL DETECTION SECTION

Heading:

## "One Shield. Multiple Detection Layers."

Create four feature cards.

### Website Scanner

Icon: Globe

"Analyze suspicious URLs, domains, redirects, HTTPS and typosquatting."

### Screenshot Scanner

Icon: Image

"Extract text using OCR and detect suspicious login/payment patterns."

### QR Scanner

Icon: Scan QR

"Decode QR codes and inspect their destination or UPI payment information."

### Message Scanner

Icon: MessageSquare

"Analyze SMS, WhatsApp-style messages and emails for scam patterns."

Cards should have hover animations.

---

# 10. HOW IT WORKS

Create a horizontal process diagram on desktop and vertical timeline on mobile.

```text
USER INPUT
    ↓
URL / IMAGE / QR / MESSAGE
    ↓
DETECTION ENGINES
    ↓
URL ANALYSIS
OCR
QR DECODER
NLP
    ↓
RISK ENGINE
    ↓
SCAM RISK SCORE
    ↓
EXPLANATION + RECOMMENDATION
```

Animate the flow when it enters the viewport.

---

# 11. SCAN PAGE

Create the main `/scan` experience.

Heading:

## "What do you want to check?"

Subheading:

"Choose an input type and let ScamShield analyze it."

Create four large selectable cards:

```text
🌐 Website URL

📷 Screenshot

🔳 QR Code

💬 Message
```

Also provide:

### Multi-Scan

Allow users to combine multiple types of evidence where practical.

---

# 12. URL SCANNER

When Website URL is selected, display:

```text
Analyze a suspicious website

Paste the URL below.

[ https://example.com                         ]

                    [ Analyze URL ]
```

Example button:

**Try Demo URL**

Demo:

```text
https://paytm-secure-login-example.com
```

Also provide a safe example:

```text
https://example.com
```

Show validation errors for invalid URLs.

---

# 13. SCREENSHOT SCANNER

Create a drag-and-drop upload area.

Text:

## "Upload a suspicious screenshot"

Supported:

```text
PNG
JPG
JPEG
WEBP
```

Display:

* Preview
* File name
* File size
* Remove button
* Analyze button

Add a simulated OCR/analyzing state.

Example:

```text
Scanning screenshot...

✓ Image processed
✓ OCR completed
✓ Suspicious phrases detected
✓ Risk analysis completed
```

---

# 14. QR SCANNER

Create QR upload functionality.

Allow:

* Upload QR image
* Drag and drop
* Camera placeholder for future implementation

After decoding, show:

```text
QR Code Detected

Destination:
https://example.com

OR

UPI Payment Request

Payee:
Example Merchant

UPI ID:
example@upi

Amount:
₹500
```

Add an important warning:

**"ScamShield never makes payments. Always verify the recipient before paying."**

Do not implement actual payment functionality.

---

# 15. MESSAGE SCANNER

Create a large text input.

Placeholder:

```text
Paste a suspicious SMS, WhatsApp message,
email or notification here...
```

Example:

```text
Your KYC will expire today.
Click this link immediately to prevent
your account from being blocked.
```

Button:

**Analyze Message**

Add a character counter.

---

# 16. ANALYSIS ANIMATION

After the user submits input, transition to a professional analysis screen.

Display:

```text
SCAMSHIELD AI

Analyzing...

✓ Input received
✓ Extracting indicators
✓ Checking suspicious patterns
✓ Analyzing content
✓ Calculating risk
```

Use a progress indicator.

Do not make the animation excessively long.

Then automatically show the result.

---

# 17. RESULT PAGE

Create `/results/:id`.

This is one of the most important pages.

At the top display a large risk score.

Example:

```text
🚨 HIGH RISK

91 / 100

HIGH RISK
```

Use a circular/donut risk visualization.

Animate the number from:

```text
0 → 91
```

Show a small confidence indicator:

```text
Analysis Confidence
94%
```

Do NOT imply that confidence equals factual certainty.

---

# 18. RESULT EXPLANATION

Heading:

## "Why ScamShield Flagged This"

Show individual indicators.

Example:

```text
✓ Possible brand impersonation

✓ Suspicious domain structure

✓ Sensitive information requested

✓ Urgency language detected

✓ Suspicious redirect

✓ Login/payment-related content
```

Each indicator should have:

* Icon
* Severity
* Short explanation
* Optional expandable technical details

---

# 19. URL ANALYSIS CARD

Show:

```text
URL ANALYSIS

Domain
paytm-secure-login-example.com

Protocol
HTTPS

URL Length
42 characters

Subdomains
0

Suspicious Parameters
2

HTTPS
✓ Enabled

Domain Reputation
Unknown

Typosquatting
Possible
```

Use badges:

```text
SAFE
WARNING
SUSPICIOUS
CRITICAL
```

Do not invent real domain age/reputation information in demo mode.

If information is unavailable, display:

**Unavailable**

not a fake value.

---

# 20. SCREENSHOT/OCR RESULTS

If screenshot analysis was performed, show:

## Extracted Text

Example:

```text
"Enter your OTP"

"Verify your bank account"

"Your account will be blocked"
```

Then:

## Detected Patterns

```text
Urgency language
Credential request
Bank impersonation
Account threat
```

---

# 21. QR RESULTS

If QR analysis was performed:

Show:

```text
QR ANALYSIS

QR Type
URL / UPI

Decoded Data
https://example.com

Destination
example.com

Risk
HIGH
```

For UPI:

```text
Payee
Example Merchant

UPI ID
example@upi

Amount
₹500

Currency
INR
```

Never initiate transactions.

---

# 22. MESSAGE ANALYSIS

Show:

```text
MESSAGE ANALYSIS

Urgency
HIGH

Financial Request
DETECTED

Credential Request
DETECTED

Brand Impersonation
POSSIBLE

Suspicious Link
DETECTED
```

Use visual severity indicators.

---

# 23. RECOMMENDATION CARD

Create a prominent recommendation card.

For high-risk example:

## "Do Not Interact With This Request"

Recommendations:

* Do not enter your OTP.
* Do not share your UPI PIN.
* Do not enter card details.
* Do not download unknown applications.
* Do not make a payment.
* Verify the sender through an official channel.

Add:

**"ScamShield never asks for your OTP, PIN, password or card details."**

---

# 24. TECHNICAL ANALYSIS

Create an expandable section:

## Technical Analysis

Show the detection pipeline:

```text
Input
 ↓
Preprocessing
 ↓
URL Engine
 ↓
OCR Engine
 ↓
NLP Engine
 ↓
QR Engine
 ↓
Threat Intelligence
 ↓
Risk Engine
 ↓
Final Score
```

Show status for each applicable engine.

Example:

```text
URL Analyzer       ✓ Complete
OCR Analyzer       — Not applicable
QR Analyzer        — Not applicable
NLP Analyzer       ✓ Complete
Threat Intel       ✓ Complete
Risk Engine        ✓ Complete
```

This section is particularly important because ScamShield is also intended as a cybersecurity/ML project demonstration.

---

# 25. RISK SCORING UI

Use five levels:

```text
0–20      SAFE
21–40     LOW
41–60     MEDIUM
61–80     HIGH
81–100    CRITICAL
```

Create a reusable `RiskScore` component.

The component should accept:

```typescript
score
riskLevel
confidence
```

and visually adapt to the risk level.

---

# 26. DASHBOARD

Create `/dashboard`.

Heading:

## "Security Overview"

Cards:

```text
Total Scans
127

Threats Detected
38

Safe Scans
89

Average Risk Score
47
```

Create charts using Recharts.

### Risk Distribution

Show:

* Safe
* Low
* Medium
* High
* Critical

### Scan Types

Show:

* URLs
* Screenshots
* QR Codes
* Messages

### Recent Threats

Display the latest suspicious scans.

---

# 27. HISTORY PAGE

Create `/history`.

Table:

```text
Date
Type
Target
Risk Score
Risk Level
Status
Action
```

Example:

```text
17 Aug 2026
URL
example-login.com
91
HIGH
Analyzed
View
```

Features:

* Search
* Filter
* Sort
* View result
* Delete history

For the first version, local persistence is acceptable.

Structure it so a database can later replace local storage.

---

# 28. LEARN PAGE

Create `/learn`.

Heading:

## "Learn to Spot a Scam"

Create educational cards:

### How Phishing Works

### How QR Scams Work

### How UPI Scams Work

### How Typosquatting Works

### How Fake KYC Messages Work

### How Scammers Use Urgency

### How to Protect Your OTP

### How to Identify Fake Websites

Use examples relevant to India.

Add a section:

## "Never Share These"

```text
OTP
UPI PIN
CVV
ATM PIN
Password
Banking credentials
```

---

# 29. ABOUT PAGE

Create `/about`.

Explain:

### What is ScamShield?

### Why ScamShield was created

### How the detection system works

### Technology

```text
React
FastAPI
Python
OpenCV
Tesseract OCR
scikit-learn
DNS / WHOIS
URL analysis
NLP
```

### Future Scope

Include:

* Real-time threat intelligence
* Browser extension
* WhatsApp integration
* Mobile application
* Multilingual scam detection
* Voice scam detection
* AI-powered phishing detection
* Community threat reporting

---

# 30. INDIAN SCAM DETECTION

Make the interface and demo data relevant to India.

Include example scam categories:

* KYC scams
* UPI scams
* Fake electricity bill
* Fake courier
* Fake government notice
* Fake bank message
* Fake job offer
* Lottery/reward scam
* Fake loan
* Investment scam
* Refund scam
* Cashback scam

Use brands carefully.

Do not label a legitimate brand/domain as malicious simply because its name appears in a message.

---

# 31. BACKEND-READY API LAYER

Create:

```text
src/services/api.ts
```

Define service functions such as:

```typescript
analyzeUrl(url)
analyzeMessage(message)
analyzeQr(file)
analyzeScreenshot(file)
getScanResult(id)
getScanHistory()
```

Initially these can use mock/demo responses.

But structure the functions so they can later call:

```text
POST /api/scan/url
POST /api/scan/message
POST /api/scan/qr
POST /api/scan/screenshot

GET /api/scan/:id
GET /api/history
DELETE /api/history/:id
```

The frontend must NOT contain the actual ML logic.

---

# 32. EXPECTED BACKEND RESPONSE

Design the frontend around a response like:

```json
{
  "scan_id": "scan_123",
  "input_type": "url",
  "risk_score": 91,
  "risk_level": "HIGH",
  "confidence": 0.94,
  "summary": "This URL contains several suspicious indicators.",
  "indicators": [
    {
      "title": "Possible brand impersonation",
      "severity": "high",
      "description": "The domain resembles a known brand."
    },
    {
      "title": "Suspicious domain structure",
      "severity": "high",
      "description": "The domain contains multiple security-related keywords."
    }
  ],
  "recommendations": [
    "Do not enter credentials.",
    "Do not make a payment.",
    "Verify the website independently."
  ],
  "technical_analysis": {
    "url_engine": "complete",
    "ocr_engine": "not_applicable",
    "qr_engine": "not_applicable",
    "nlp_engine": "complete",
    "risk_engine": "complete"
  }
}
```

Build reusable UI components around this structure.

---

# 33. DEMO MODE

The application must be impressive even without the backend.

Create demo scenarios:

### Demo 1 — Suspicious Website

```text
https://paytm-secure-login-example.com
```

Expected demonstration result:

```text
Risk Score: 91
Risk Level: HIGH
```

Reasons:

* Possible brand impersonation
* Suspicious domain structure
* Login-related keywords
* Security-related keywords

Clearly mark this as:

**Demo Analysis**

Do not claim real-time threat intelligence.

---

### Demo 2 — Scam Message

```text
Your KYC will expire today.
Click this link immediately to prevent
your account from being blocked.
```

Show:

```text
Urgency detected
Account threat detected
KYC-related language
Suspicious call-to-action
```

---

### Demo 3 — QR Code

Provide a sample QR workflow using a safe demo destination.

---

# 34. EMPTY STATES

Design polished empty states.

Examples:

```text
No scans yet.

Your analyzed websites, messages
and QR codes will appear here.
```

Button:

**Start Your First Scan**

---

# 35. LOADING STATES

Use skeleton loaders and scanning animations.

Example:

```text
Analyzing...

[ animated progress ]

Checking URL structure
Analyzing content
Detecting suspicious patterns
Calculating risk
```

---

# 36. ERROR STATES

Handle:

* Invalid URL
* Unsupported file
* File too large
* QR not detected
* OCR failed
* Analysis unavailable
* Network failure
* Backend unavailable

Use friendly messages.

Never show raw errors or stack traces.

---

# 37. SECURITY & PRIVACY UX

Add a small privacy section near the scanner:

```text
🔒 Privacy First

ScamShield does not need your passwords,
OTP, UPI PIN, CVV or banking credentials.

Never enter sensitive credentials into ScamShield.
```

For uploaded screenshots:

```text
Uploaded files are used only for analysis.
```

Do not make unsupported claims about permanent deletion unless the backend actually implements it.

---

# 38. RESPONSIVE DESIGN

The website must work perfectly on:

* Desktop
* Laptop
* Tablet
* Mobile

Desktop scanner:

```text
Input Selection
      ↓
Large Analysis Workspace
```

Mobile:

```text
Input Cards
↓
Upload/Input
↓
Analyze
↓
Result
```

Make touch targets large enough for mobile users.

---

# 39. ACCESSIBILITY

Implement:

* Keyboard navigation
* Proper labels
* ARIA where necessary
* Good color contrast
* Focus states
* Alt text
* Accessible forms

Do not use color alone to communicate risk.

For example:

```text
🔴 HIGH
🟢 SAFE
```

should also include text labels.

---

# 40. SECURITY DEVELOPMENT PRINCIPLES

The future Python backend will perform the actual security analysis.

Design the frontend with secure principles:

* Validate input
* Validate file types
* Limit upload size
* Never expose API keys
* Never collect passwords
* Never collect OTPs
* Never initiate payments
* Never execute user-provided content
* Never automatically submit credentials
* Handle API failures safely

For URL analysis, do not assume that the backend can safely visit arbitrary URLs. The backend should eventually use isolated/controlled fetching to avoid SSRF and access to internal networks.

---

# 41. OWASP

Create a small educational reference section explaining that ScamShield's secure development approach is informed by OWASP web security principles.

Reference concepts including:

* Broken access control
* Security misconfiguration
* Injection
* Authentication failures
* Security logging/monitoring

Do not claim ScamShield detects every OWASP vulnerability.

---

# 42. COMPONENT ARCHITECTURE

Create reusable components such as:

```text
Navbar
Footer
Hero
ScanCard
UploadBox
UrlInput
MessageInput
QrUploader
ScreenshotUploader
RiskScore
RiskBadge
IndicatorCard
RecommendationCard
TechnicalAnalysis
ScanProgress
StatsCard
RiskChart
ScanHistoryTable
EmptyState
ErrorState
```

Keep components modular.

---

# 43. DATA ARCHITECTURE

Create TypeScript types/interfaces for:

```text
Scan
ScanResult
RiskLevel
Indicator
Recommendation
TechnicalAnalysis
ScanHistory
```

Do not scatter untyped objects throughout the application.

---

# 44. MOCK DATA

Create a dedicated mock service:

```text
src/services/mockApi.ts
```

Do not mix mock data directly into UI components.

This will make it easy to replace:

```text
mockApi
```

with:

```text
FastAPI
```

later.

---

# 45. README

Create a professional README explaining:

* ScamShield overview
* Problem statement
* Features
* Architecture
* Tech stack
* Frontend setup
* Backend integration
* API structure
* Demo mode
* Future scope
* Security considerations

---

# 46. FINAL PRODUCT EXPERIENCE

The final website should allow a user to do this:

```text
Open ScamShield
      ↓
Click "Scan Now"
      ↓
Choose:
URL / Screenshot / QR / Message
      ↓
Provide suspicious input
      ↓
Click Analyze
      ↓
Professional scanning animation
      ↓
Risk Score
      ↓
Risk Level
      ↓
Reasons
      ↓
Technical Analysis
      ↓
Safety Recommendation
```

The result should feel like a real AI/cybersecurity product.

---

# 47. IMPORTANT — START BUILDING

Do not stop after creating a landing page.

Start by:

1. Inspecting the existing project.
2. Setting up the React/TypeScript/Tailwind/shadcn architecture.
3. Creating the global ScamShield design system.
4. Building the landing page.
5. Building the `/scan` page.
6. Building all four scanner interfaces.
7. Building the analysis/loading state.
8. Building the result dashboard.
9. Building dashboard/history/learn/about pages.
10. Creating mock API services.
11. Creating TypeScript data models.
12. Connecting scanner inputs to mock analysis.
13. Testing every user flow.
14. Fixing responsive issues.
15. Fixing console/build errors.
16. Making the final UI polished and presentation-ready.

Most importantly:

**Build the actual working website, not just a visual prototype.**

Every major button should perform an action.

Every scanner should have a working demo flow.

Every result should be generated from structured data.

Keep the architecture ready for a Python/FastAPI + OpenCV + Tesseract + scikit-learn backend.

The final result should be suitable for a **college project, cybersecurity hackathon, portfolio demonstration, and future real-world development.**

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e40b35d7-8c86-4e0c-9dee-a874a55334b1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
