import { useState, useRef } from "react";

const BRAND = {
  bg: "#0D0D0D",
  surface: "#141414",
  surfaceAlt: "#1A1A1A",
  border: "#2A2A2A",
  green: "#5A6B46",
  greenLight: "#6B7F55",
  greenDim: "#3D4A30",
  text: "#F0EDE8",
  textMuted: "#8A8A8A",
  textDim: "#555",
  error: "#C0392B",
};

const SERVICES = [
  "HVAC (Heating & Cooling)", "Plumbing", "Electrical", "Roofing", "Gutters & Drainage",
  "Siding & Exterior", "Windows & Doors", "Insulation", "Drywall & Plastering",
  "Painting (Interior & Exterior)", "Flooring", "Tile & Stone", "Carpentry & Trim",
  "Cabinets & Millwork", "Kitchen Remodeling", "Bathroom Remodeling", "Basement Finishing",
  "General Contracting", "Home Additions", "Demolition", "Concrete & Flatwork",
  "Masonry & Brickwork", "Waterproofing & Foundation", "Excavation & Grading",
  "Landscaping & Hardscaping", "Irrigation & Sprinklers", "Tree Service & Arborist",
  "Fencing", "Decks & Patios", "Pool & Spa", "Garage Doors", "Locksmith",
  "Pest Control", "Cleaning Services", "Junk Removal", "Moving Services",
  "Appliance Repair", "Generator Installation", "Solar & Energy",
  "Security Systems", "Smart Home / AV",
];

const STEPS = [
  { id: 1, label: "Business Info" },
  { id: 2, label: "Services" },
  { id: 3, label: "Service Area" },
  { id: 4, label: "Trust & Credibility" },
  { id: 5, label: "Brand & Positioning" },
  { id: 6, label: "Assets" },
];

const inputStyle = {
  width: "100%",
  background: "#1A1A1A",
  border: `1px solid ${BRAND.border}`,
  borderRadius: "4px",
  color: BRAND.text,
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "14px",
  padding: "11px 14px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

const labelStyle = {
  display: "block",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: BRAND.textMuted,
  marginBottom: "6px",
};

function Field({ label, required, hint, children }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: BRAND.green, marginLeft: "3px" }}>*</span>}
      </label>
      {hint && <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: BRAND.textDim, marginBottom: "7px", marginTop: "0" }}>{hint}</p>}
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text", required }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...inputStyle, borderColor: focused ? BRAND.green : BRAND.border }}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...inputStyle, resize: "vertical", borderColor: focused ? BRAND.green : BRAND.border }}
    />
  );
}

function Select({ value, onChange, options, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...inputStyle, borderColor: focused ? BRAND.green : BRAND.border, appearance: "none", cursor: "pointer" }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function RadioGroup({ value, onChange, options }) {
  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      {options.map(o => (
        <label key={o.value} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: value === o.value ? BRAND.text : BRAND.textMuted }}>
          <div onClick={() => onChange(o.value)} style={{ width: "16px", height: "16px", borderRadius: "50%", border: `2px solid ${value === o.value ? BRAND.green : BRAND.border}`, background: value === o.value ? BRAND.green : "transparent", flexShrink: 0, transition: "all 0.15s", cursor: "pointer" }} />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function Toggle({ value, onChange, label }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: "40px", height: "22px", borderRadius: "11px",
          background: value ? BRAND.green : BRAND.border,
          position: "relative", transition: "background 0.2s", cursor: "pointer", flexShrink: 0
        }}
      >
        <div style={{
          position: "absolute", top: "3px", left: value ? "20px" : "3px",
          width: "16px", height: "16px", borderRadius: "50%", background: "#fff",
          transition: "left 0.2s"
        }} />
      </div>
      <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: BRAND.text }}>{label}</span>
    </label>
  );
}

function FileUpload({ label, hint, multiple, accept, onChange, files }) {
  const ref = useRef();
  return (
    <div>
      <div
        onClick={() => ref.current.click()}
        style={{
          border: `1px dashed ${BRAND.border}`, borderRadius: "4px",
          padding: "24px", textAlign: "center", cursor: "pointer",
          background: BRAND.surfaceAlt, transition: "border-color 0.15s"
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = BRAND.green}
        onMouseLeave={e => e.currentTarget.style.borderColor = BRAND.border}
      >
        <div style={{ fontSize: "24px", marginBottom: "8px" }}>📎</div>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: BRAND.textMuted, margin: 0 }}>{label}</p>
        {hint && <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", color: BRAND.textDim, margin: "4px 0 0" }}>{hint}</p>}
        <input ref={ref} type="file" multiple={multiple} accept={accept} onChange={onChange} style={{ display: "none" }} />
      </div>
      {files && files.length > 0 && (
        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {Array.from(files).map((f, i) => (
            <span key={i} style={{ background: BRAND.greenDim, color: BRAND.text, fontFamily: "'Montserrat', sans-serif", fontSize: "11px", padding: "4px 10px", borderRadius: "3px" }}>
              {f.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── STEPS ──────────────────────────────────────────────────────────────────

function Step1({ data, set }) {
  return (
    <div>
      <Field label="Business Name" required>
        <Input value={data.businessName} onChange={e => set("businessName", e.target.value)} placeholder="Acme Plumbing Co." required />
      </Field>
      <Field label="Owner / Primary Contact Name" required>
        <Input value={data.ownerName} onChange={e => set("ownerName", e.target.value)} placeholder="John Smith" required />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Field label="Phone Number" required>
          <Input value={data.phone} onChange={e => set("phone", e.target.value)} placeholder="(555) 000-0000" type="tel" required />
        </Field>
        <Field label="Email Address" required>
          <Input value={data.email} onChange={e => set("email", e.target.value)} placeholder="you@business.com" type="email" required />
        </Field>
      </div>
      <Field label="Current Website" hint="Leave blank if you don't have one.">
        <Input value={data.website} onChange={e => set("website", e.target.value)} placeholder="https://yourbusiness.com" />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Field label="Year Founded">
          <Input value={data.yearFounded} onChange={e => set("yearFounded", e.target.value)} placeholder="2008" type="number" />
        </Field>
        <Field label="Number of Jobs Completed" hint="Rough estimate is fine.">
          <Input value={data.jobsCompleted} onChange={e => set("jobsCompleted", e.target.value)} placeholder="500+" />
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Field label="Team Size" hint="Total technicians / crew members.">
          <Input value={data.teamSize} onChange={e => set("teamSize", e.target.value)} placeholder="e.g. 6" type="number" />
        </Field>
        <Field label="License Number" hint="Optional. Displayed for trust.">
          <Input value={data.licenseNumber} onChange={e => set("licenseNumber", e.target.value)} placeholder="TX-123456" />
        </Field>
      </div>
      <Field label="Who Do You Serve?" required>
        <RadioGroup
          value={data.clientType}
          onChange={v => set("clientType", v)}
          options={[
            { value: "residential", label: "Residential" },
            { value: "commercial", label: "Commercial" },
            { value: "both", label: "Both" },
          ]}
        />
      </Field>
      <Field label="Describe Your Business" required hint="1–2 sentences in your own words. This becomes the foundation of your site copy.">
        <Textarea value={data.description} onChange={e => set("description", e.target.value)} placeholder="We're a family-owned HVAC company that's been keeping Austin homes comfortable since 2008. We specialize in same-day repairs and new system installs." rows={4} />
      </Field>
    </div>
  );
}

function Step2({ data, set }) {
  const toggleService = (s) => {
    const current = data.services || [];
    const updated = current.includes(s) ? current.filter(x => x !== s) : [...current, s];
    set("services", updated);
  };

  return (
    <div>
      <Field label="Services Offered" required hint="Select everything that applies.">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {SERVICES.map(s => {
            const active = (data.services || []).includes(s);
            return (
              <label key={s} onClick={() => toggleService(s)} style={{
                display: "flex", alignItems: "center", gap: "10px", cursor: "pointer",
                padding: "9px 12px", borderRadius: "4px",
                background: active ? BRAND.greenDim : BRAND.surfaceAlt,
                border: `1px solid ${active ? BRAND.green : BRAND.border}`,
                transition: "all 0.15s"
              }}>
                <div style={{
                  width: "14px", height: "14px", borderRadius: "3px", flexShrink: 0,
                  border: `2px solid ${active ? BRAND.green : BRAND.border}`,
                  background: active ? BRAND.green : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {active && <span style={{ color: "#fff", fontSize: "9px", fontWeight: "bold" }}>✓</span>}
                </div>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: active ? BRAND.text : BRAND.textMuted }}>{s}</span>
              </label>
            );
          })}
        </div>
      </Field>
      <Field label="Other Services Not Listed">
        <Input value={data.servicesOther} onChange={e => set("servicesOther", e.target.value)} placeholder="e.g. Commercial refrigeration, specialty coatings..." />
      </Field>
      <div style={{ borderTop: `1px solid ${BRAND.border}`, paddingTop: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
        <Toggle value={data.emergency24hr} onChange={v => set("emergency24hr", v)} label="We offer 24-hour / emergency service" />
        <Toggle value={data.freeEstimates} onChange={v => set("freeEstimates", v)} label="We offer free estimates" />
        <Toggle value={data.licensed} onChange={v => set("licensed", v)} label="Licensed, bonded, and insured" />
      </div>
    </div>
  );
}

function Step3({ data, set }) {
  return (
    <div>
      <Field label="Primary City" required>
        <Input value={data.primaryCity} onChange={e => set("primaryCity", e.target.value)} placeholder="Austin, TX" required />
      </Field>
      <Field label="Additional Cities or Counties Served" hint="List all areas you want to show up in search results for.">
        <Textarea value={data.additionalAreas} onChange={e => set("additionalAreas", e.target.value)} placeholder="Round Rock, Cedar Park, Pflugerville, Hays County, Williamson County..." rows={3} />
      </Field>
      <Field label="Service Radius">
        <Select
          value={data.serviceRadius}
          onChange={e => set("serviceRadius", e.target.value)}
          placeholder="Select a radius..."
          options={[
            { value: "10", label: "Within 10 miles" },
            { value: "25", label: "Within 25 miles" },
            { value: "50", label: "Within 50 miles" },
            { value: "100", label: "Within 100 miles" },
            { value: "statewide", label: "Statewide" },
          ]}
        />
      </Field>
      <Field label="Google Business Profile URL" hint="Helps us pull your reviews and verify your service area.">
        <Input value={data.gbpUrl} onChange={e => set("gbpUrl", e.target.value)} placeholder="https://maps.google.com/..." />
      </Field>
    </div>
  );
}

function Step4({ data, set }) {
  const updateTestimonial = (i, field, val) => {
    const t = [...(data.testimonials || [{}, {}, {}])];
    t[i] = { ...t[i], [field]: val };
    set("testimonials", t);
  };
  const testimonials = data.testimonials || [{}, {}, {}];

  return (
    <div>
      <Field label="Customer Testimonials" hint="Add up to 3. These go directly on your site.">
        {[0, 1, 2].map(i => (
          <div key={i} style={{ background: BRAND.surfaceAlt, border: `1px solid ${BRAND.border}`, borderRadius: "4px", padding: "16px", marginBottom: "12px" }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: "600", color: BRAND.green, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 0, marginBottom: "12px" }}>Review {i + 1}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div>
                <label style={labelStyle}>Customer Name</label>
                <Input value={testimonials[i]?.name || ""} onChange={e => updateTestimonial(i, "name", e.target.value)} placeholder="Sarah M." />
              </div>
              <div>
                <label style={labelStyle}>Star Rating</label>
                <Select
                  value={testimonials[i]?.rating || ""}
                  onChange={e => updateTestimonial(i, "rating", e.target.value)}
                  placeholder="Select..."
                  options={[
                    { value: "5", label: "★★★★★  5 stars" },
                    { value: "4", label: "★★★★  4 stars" },
                    { value: "3", label: "★★★  3 stars" },
                  ]}
                />
              </div>
            </div>
            <label style={labelStyle}>Their Words</label>
            <Textarea value={testimonials[i]?.quote || ""} onChange={e => updateTestimonial(i, "quote", e.target.value)} placeholder="They showed up on time, fixed the issue fast, and were upfront about pricing. Won't call anyone else." rows={2} />
          </div>
        ))}
      </Field>

      <Field label="Review Platform Links" hint="Any combination is fine.">
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Input value={data.googleReviewLink} onChange={e => set("googleReviewLink", e.target.value)} placeholder="Google Reviews URL" />
          <Input value={data.yelpLink} onChange={e => set("yelpLink", e.target.value)} placeholder="Yelp URL (optional)" />
          <Input value={data.angiLink} onChange={e => set("angiLink", e.target.value)} placeholder="Angi / HomeAdvisor URL (optional)" />
        </div>
      </Field>

      <Field label="Certifications, Awards & Affiliations" hint="BBB, NARI, ACCA, manufacturer certifications, awards, etc.">
        <Textarea value={data.certifications} onChange={e => set("certifications", e.target.value)} placeholder="BBB A+ Accredited, NATE-Certified Technicians, Trane Comfort Specialist, 2023 Best of Austin Award..." rows={2} />
      </Field>

      <Field label="Guarantees or Warranties" hint="What do you stand behind? This builds conversion.">
        <Textarea value={data.guarantees} onChange={e => set("guarantees", e.target.value)} placeholder="1-year labor warranty on all repairs. 100% satisfaction guarantee or we come back for free." rows={2} />
      </Field>
    </div>
  );
}

function Step5({ data, set }) {
  return (
    <div>
      <Field label="What Sets You Apart?" required hint="Your USP — 1 to 2 sentences. Be specific, not generic.">
        <Textarea value={data.usp} onChange={e => set("usp", e.target.value)} placeholder="We're the only licensed plumber in the area that offers same-day service with a flat-rate price before we start — no surprises on the bill." rows={3} />
      </Field>

      <Field label="Ideal Customer" hint="Who do you want calling you most?">
        <Input value={data.idealCustomer} onChange={e => set("idealCustomer", e.target.value)} placeholder="Homeowners in North Austin with older homes, property managers, custom builders..." />
      </Field>

      <Field label="Competitor Names in Your Market" hint="Internal use only — helps us position your site correctly.">
        <Input value={data.competitors} onChange={e => set("competitors", e.target.value)} placeholder="ABC Plumbing, Premier HVAC, Smith Brothers..." />
      </Field>

      <Field label="Site Tone / Vibe" required hint="Pick the one that feels most like your business.">
        <RadioGroup
          value={data.tone}
          onChange={v => set("tone", v)}
          options={[
            { value: "professional", label: "Professional & Formal" },
            { value: "friendly", label: "Friendly & Approachable" },
            { value: "bold", label: "Bold & Urgent" },
            { value: "local", label: "Local & Community-First" },
          ]}
        />
      </Field>

      <Field label="Brand Colors" hint="If you have specific colors, list them here. Hex codes, Pantone, or just describe them.">
        <Input value={data.brandColors} onChange={e => set("brandColors", e.target.value)} placeholder="Navy blue and white, or #1A3A5C" />
      </Field>

      <Field label="Websites You Like" hint="Drop 2–3 URLs of competitor or industry sites whose look or feel you respect. Not copying — just direction.">
        <Textarea value={data.inspirationUrls} onChange={e => set("inspirationUrls", e.target.value)} placeholder="https://example.com&#10;https://example2.com" rows={2} />
      </Field>
    </div>
  );
}

function Step6({ data, set }) {
  return (
    <div>
      <Field label="Logo" hint="PNG or SVG preferred. Send the highest-res version you have.">
        <FileUpload
          label="Upload your logo"
          hint=".PNG, .SVG, .AI, or .PDF accepted"
          accept=".png,.svg,.ai,.pdf,.jpg,.jpeg,.eps"
          onChange={e => set("logo", e.target.files)}
          files={data.logo}
        />
      </Field>

      <Field label="Job / Work Photos" hint="Best results come from real job site photos. Up to 10.">
        <FileUpload
          label="Upload work photos (up to 10)"
          hint="Before/after shots and finished work perform best"
          multiple
          accept="image/*"
          onChange={e => set("photos", e.target.files)}
          files={data.photos}
        />
      </Field>

      <Field label="Truck or Equipment Photos" hint="Branded vehicles and gear build credibility.">
        <FileUpload
          label="Upload truck / equipment photos"
          hint="Optional but recommended"
          multiple
          accept="image/*"
          onChange={e => set("truckPhotos", e.target.files)}
          files={data.truckPhotos}
        />
      </Field>

      <Field label="Video Link" hint="YouTube or Vimeo. Company intro, testimonials, job walkthroughs — anything you've got.">
        <Input value={data.videoUrl} onChange={e => set("videoUrl", e.target.value)} placeholder="https://youtube.com/watch?v=..." />
      </Field>

      <Field label="Existing Marketing Materials" hint="Flyers, door hangers, mailers — we'll pull any useful copy or branding from these.">
        <FileUpload
          label="Upload any marketing materials"
          hint=".PDF, .JPG, .PNG accepted"
          multiple
          accept=".pdf,image/*"
          onChange={e => set("marketingFiles", e.target.files)}
          files={data.marketingFiles}
        />
      </Field>

      <Field label="Anything Else We Should Know">
        <Textarea value={data.notes} onChange={e => set("notes", e.target.value)} placeholder="Seasonal promotions, upcoming rebrand, important dates, specific pages you want, things to avoid..." rows={3} />
      </Field>
    </div>
  );
}

// ─── CONFIRMATION ────────────────────────────────────────────────────────────

function Confirmation({ data }) {
  const pill = (text) => (
    <span style={{ background: BRAND.greenDim, color: BRAND.text, fontFamily: "'Montserrat', sans-serif", fontSize: "11px", padding: "3px 10px", borderRadius: "3px", display: "inline-block", margin: "2px" }}>{text}</span>
  );

  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: BRAND.greenDim, border: `2px solid ${BRAND.green}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "28px" }}>✓</div>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "0.05em", color: BRAND.text, margin: "0 0 8px" }}>You're all set.</h2>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: BRAND.textMuted, maxWidth: "400px", margin: "0 auto 32px", lineHeight: "1.6" }}>
        We received everything. Expect a message from Carter at carter@sitework.build within 1 business day to confirm next steps.
      </p>

      <div style={{ textAlign: "left", background: BRAND.surfaceAlt, border: `1px solid ${BRAND.border}`, borderRadius: "6px", padding: "24px", maxWidth: "480px", margin: "0 auto" }}>
        <p style={{ ...labelStyle, marginBottom: "16px" }}>Submission Summary</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "'Montserrat', sans-serif", fontSize: "13px" }}>
          <div><span style={{ color: BRAND.textMuted }}>Business: </span><span style={{ color: BRAND.text }}>{data.step1?.businessName || "—"}</span></div>
          <div><span style={{ color: BRAND.textMuted }}>Contact: </span><span style={{ color: BRAND.text }}>{data.step1?.ownerName} · {data.step1?.email}</span></div>
          <div><span style={{ color: BRAND.textMuted }}>Location: </span><span style={{ color: BRAND.text }}>{data.step3?.primaryCity || "—"}</span></div>
          <div><span style={{ color: BRAND.textMuted }}>Services: </span>
            <div style={{ marginTop: "6px" }}>
              {(data.step2?.services || []).slice(0, 6).map(s => pill(s))}
              {(data.step2?.services || []).length > 6 && pill(`+${data.step2.services.length - 6} more`)}
            </div>
          </div>
          <div><span style={{ color: BRAND.textMuted }}>Tone: </span><span style={{ color: BRAND.text, textTransform: "capitalize" }}>{data.step5?.tone || "—"}</span></div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function SiteworkOnboarding() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    step1: { businessName: "", ownerName: "", phone: "", email: "", website: "", yearFounded: "", jobsCompleted: "", teamSize: "", licenseNumber: "", clientType: "residential", description: "" },
    step2: { services: [], servicesOther: "", emergency24hr: false, freeEstimates: false, licensed: false },
    step3: { primaryCity: "", additionalAreas: "", serviceRadius: "", gbpUrl: "" },
    step4: { testimonials: [{}, {}, {}], googleReviewLink: "", yelpLink: "", angiLink: "", certifications: "", guarantees: "" },
    step5: { usp: "", idealCustomer: "", competitors: "", tone: "professional", brandColors: "", inspirationUrls: "" },
    step6: { logo: null, photos: null, truckPhotos: null, videoUrl: "", marketingFiles: null, notes: "" },
  });

  const setStepField = (stepKey) => (field, value) => {
    setFormData(prev => ({ ...prev, [stepKey]: { ...prev[stepKey], [field]: value } }));
  };

  const stepKeys = ["step1", "step2", "step3", "step4", "step5", "step6"];
  const currentKey = stepKeys[step - 1];

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const s1 = formData.step1;
      const s2 = formData.step2;
      const s3 = formData.step3;
      const s4 = formData.step4;
      const s5 = formData.step5;
      const s6 = formData.step6;

      const body = {
        access_key: "b58b32ac-9c44-4db1-adac-c99f038af2f2",
        subject: `New SITEWORK Client Onboarding — ${s1.businessName}`,
        from_name: s1.ownerName,
        email: s1.email,

        "Business Name": s1.businessName,
        "Owner": s1.ownerName,
        "Phone": s1.phone,
        "Email": s1.email,
        "Current Website": s1.website || "None",
        "Year Founded": s1.yearFounded,
        "Jobs Completed": s1.jobsCompleted,
        "Team Size": s1.teamSize,
        "License Number": s1.licenseNumber || "Not provided",
        "Client Type": s1.clientType,
        "Business Description": s1.description,

        "Services": (s2.services || []).join(", "),
        "Other Services": s2.servicesOther,
        "24hr Emergency": s2.emergency24hr ? "Yes" : "No",
        "Free Estimates": s2.freeEstimates ? "Yes" : "No",
        "Licensed/Bonded/Insured": s2.licensed ? "Yes" : "No",

        "Primary City": s3.primaryCity,
        "Additional Areas": s3.additionalAreas,
        "Service Radius": s3.serviceRadius,
        "GBP URL": s3.gbpUrl,

        "Testimonial 1": s4.testimonials?.[0]?.name ? `${s4.testimonials[0].name} (${s4.testimonials[0].rating}★): ${s4.testimonials[0].quote}` : "Not provided",
        "Testimonial 2": s4.testimonials?.[1]?.name ? `${s4.testimonials[1].name} (${s4.testimonials[1].rating}★): ${s4.testimonials[1].quote}` : "Not provided",
        "Testimonial 3": s4.testimonials?.[2]?.name ? `${s4.testimonials[2].name} (${s4.testimonials[2].rating}★): ${s4.testimonials[2].quote}` : "Not provided",
        "Google Reviews": s4.googleReviewLink,
        "Yelp": s4.yelpLink,
        "Angi": s4.angiLink,
        "Certifications": s4.certifications,
        "Guarantees": s4.guarantees,

        "USP": s5.usp,
        "Ideal Customer": s5.idealCustomer,
        "Competitors": s5.competitors,
        "Tone": s5.tone,
        "Brand Colors": s5.brandColors,
        "Inspiration URLs": s5.inspirationUrls,

        "Video URL": s6.videoUrl,
        "Notes": s6.notes,
        "Logo Uploaded": s6.logo?.length ? `${s6.logo.length} file(s)` : "No",
        "Photos Uploaded": s6.photos?.length ? `${s6.photos.length} file(s)` : "No",
        "Truck Photos Uploaded": s6.truckPhotos?.length ? `${s6.truckPhotos.length} file(s)` : "No",
        "Marketing Files Uploaded": s6.marketingFiles?.length ? `${s6.marketingFiles.length} file(s)` : "No",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or email carter@sitework.build.");
      }
    } catch (err) {
      setError("Submission failed. Please email carter@sitework.build directly.");
    }
    setSubmitting(false);
  };

  const canProceed = () => {
    if (step === 1) {
      const d = formData.step1;
      return d.businessName && d.ownerName && d.phone && d.email && d.description && d.clientType;
    }
    if (step === 2) return (formData.step2.services || []).length > 0;
    if (step === 3) return formData.step3.primaryCity;
    if (step === 5) return formData.step5.usp && formData.step5.tone;
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1 data={formData.step1} set={setStepField("step1")} />;
      case 2: return <Step2 data={formData.step2} set={setStepField("step2")} />;
      case 3: return <Step3 data={formData.step3} set={setStepField("step3")} />;
      case 4: return <Step4 data={formData.step4} set={setStepField("step4")} />;
      case 5: return <Step5 data={formData.step5} set={setStepField("step5")} />;
      case 6: return <Step6 data={formData.step6} set={setStepField("step6")} />;
      default: return null;
    }
  };

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${BRAND.bg}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${BRAND.bg}; }
        ::-webkit-scrollbar-thumb { background: ${BRAND.border}; border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: ${BRAND.textDim}; }
        select option { background: ${BRAND.surfaceAlt}; color: ${BRAND.text}; }
      `}</style>

      <div style={{ minHeight: "100vh", background: BRAND.bg, padding: "0 0 80px" }}>

        {/* Header */}
        <div style={{ borderBottom: `1px solid ${BRAND.border}`, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: BRAND.bg, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "0.1em", color: BRAND.text }}>SITEWORK</span>
            <span style={{ width: "1px", height: "18px", background: BRAND.border }} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", color: BRAND.textMuted, letterSpacing: "0.05em" }}>CLIENT ONBOARDING</span>
          </div>
          {!submitted && (
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: BRAND.textMuted }}>
              Step {step} of {STEPS.length}
            </span>
          )}
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div style={{ height: "2px", background: BRAND.border }}>
            <div style={{ height: "100%", width: `${progressPct}%`, background: BRAND.green, transition: "width 0.4s ease" }} />
          </div>
        )}

        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 24px" }}>

          {submitted ? (
            <div style={{ paddingTop: "60px" }}>
              <Confirmation data={formData} />
            </div>
          ) : (
            <>
              {/* Step header */}
              <div style={{ paddingTop: "48px", paddingBottom: "32px" }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: BRAND.green, marginBottom: "8px" }}>
                  Step {step} / {STEPS.length}
                </p>
                <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "40px", letterSpacing: "0.04em", color: BRAND.text, lineHeight: 1 }}>
                  {STEPS[step - 1].label}
                </h1>
              </div>

              {/* Step navigation pills */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "32px" }}>
                {STEPS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => s.id < step && setStep(s.id)}
                    style={{
                      fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: "600",
                      letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 10px",
                      borderRadius: "3px", border: "none", cursor: s.id < step ? "pointer" : "default",
                      background: s.id === step ? BRAND.green : s.id < step ? BRAND.greenDim : BRAND.surfaceAlt,
                      color: s.id <= step ? BRAND.text : BRAND.textDim,
                      transition: "all 0.15s"
                    }}
                  >
                    {s.id < step ? "✓ " : ""}{s.label}
                  </button>
                ))}
              </div>

              {/* Form content */}
              {renderStep()}

              {/* Error */}
              {error && (
                <div style={{ background: "#2C1010", border: `1px solid ${BRAND.error}`, borderRadius: "4px", padding: "12px 16px", marginTop: "16px", fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: "#E74C3C" }}>
                  {error}
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "40px", paddingTop: "24px", borderTop: `1px solid ${BRAND.border}` }}>
                <button
                  onClick={() => setStep(s => s - 1)}
                  disabled={step === 1}
                  style={{
                    fontFamily: "'Montserrat', sans-serif", fontSize: "12px", fontWeight: "600",
                    letterSpacing: "0.06em", textTransform: "uppercase", padding: "12px 24px",
                    borderRadius: "4px", border: `1px solid ${BRAND.border}`, cursor: step === 1 ? "not-allowed" : "pointer",
                    background: "transparent", color: step === 1 ? BRAND.textDim : BRAND.textMuted,
                    transition: "all 0.15s"
                  }}
                >
                  ← Back
                </button>

                {step < STEPS.length ? (
                  <button
                    onClick={() => { if (canProceed()) setStep(s => s + 1); }}
                    style={{
                      fontFamily: "'Montserrat', sans-serif", fontSize: "12px", fontWeight: "700",
                      letterSpacing: "0.08em", textTransform: "uppercase", padding: "12px 32px",
                      borderRadius: "4px", border: "none", cursor: canProceed() ? "pointer" : "not-allowed",
                      background: canProceed() ? BRAND.green : BRAND.greenDim,
                      color: canProceed() ? "#fff" : BRAND.textDim,
                      transition: "all 0.15s", opacity: canProceed() ? 1 : 0.6
                    }}
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{
                      fontFamily: "'Montserrat', sans-serif", fontSize: "12px", fontWeight: "700",
                      letterSpacing: "0.08em", textTransform: "uppercase", padding: "12px 32px",
                      borderRadius: "4px", border: "none", cursor: submitting ? "wait" : "pointer",
                      background: BRAND.green, color: "#fff", transition: "all 0.15s",
                      opacity: submitting ? 0.7 : 1
                    }}
                  >
                    {submitting ? "Sending..." : "Submit →"}
                  </button>
                )}
              </div>

              {/* Required note */}
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", color: BRAND.textDim, marginTop: "16px", textAlign: "right" }}>
                <span style={{ color: BRAND.green }}>*</span> Required fields
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
