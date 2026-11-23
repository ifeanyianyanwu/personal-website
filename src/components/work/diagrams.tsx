/**
 * Architecture diagrams for the `Compare` wipe. They are drawn for the site and
 * labelled as diagrams on the page, never passed off as screenshots or sketches.
 * Fixed palette: they always sit on sand-100 (before) or sky-300 (after).
 */

const box = { fill: "none", stroke: "currentColor", strokeWidth: 3 } as const;
const thin = { fill: "none", stroke: "currentColor", strokeWidth: 2 } as const;
const dashed = { ...thin, strokeDasharray: "6 6" } as const;

function Arrow({ d, dash = false }: { d: string; dash?: boolean }) {
  return <path d={d} {...(dash ? dashed : box)} strokeLinecap="round" markerEnd="url(#arrow)" />;
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg aria-hidden viewBox="0 0 640 340" className="h-auto w-full" fontSize="21" fill="currentColor">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

function DeimrBefore() {
  return (
    <Frame>
      <rect x="6" y="130" width="124" height="80" rx="18" {...box} />
      <text x="68" y="176" textAnchor="middle">Browser</text>
      <Arrow d="M 136 170 L 178 170" />
      <rect x="188" y="20" width="264" height="300" rx="20" fill="var(--color-sand-200)" stroke="currentColor" strokeWidth="3" />
      <text x="320" y="58" textAnchor="middle" fontWeight="600">One bundle, every page</text>
      {[208, 292, 376].map((x) => (
        <rect key={x} x={x} y="80" width="72" height="72" rx="10" {...thin} />
      ))}
      <rect x="208" y="172" width="224" height="120" rx="10" {...dashed} />
      <text x="320" y="238" textAnchor="middle">Full-size images</text>
      <Arrow d="M 458 170 L 500 170" />
      <rect x="510" y="130" width="124" height="80" rx="18" {...box} />
      <text x="572" y="164" textAnchor="middle">API, every</text>
      <text x="572" y="188" textAnchor="middle">visit</text>
    </Frame>
  );
}

function DeimrAfter() {
  return (
    <Frame>
      <rect x="6" y="130" width="124" height="80" rx="18" {...box} />
      <text x="68" y="176" textAnchor="middle">Browser</text>
      <Arrow d="M 136 170 L 178 170" />
      <rect x="188" y="20" width="264" height="300" rx="20" fill="var(--color-sky-200)" stroke="currentColor" strokeWidth="3" />
      <text x="320" y="58" textAnchor="middle" fontWeight="600">Server-rendered page</text>
      <rect x="208" y="80" width="72" height="72" rx="10" />
      <text x="244" y="121" textAnchor="middle" fontSize="16" fill="var(--color-sand-100)">this page</text>
      {[292, 376].map((x) => (
        <g key={x}>
          <rect x={x} y="80" width="72" height="72" rx="10" {...dashed} />
          <text x={x + 36} y="121" textAnchor="middle" fontSize="16">later</text>
        </g>
      ))}
      <rect x="208" y="172" width="224" height="120" rx="10" {...thin} />
      <text x="320" y="238" textAnchor="middle">WebP images</text>
      <Arrow d="M 458 150 L 500 150" />
      <rect x="510" y="110" width="124" height="80" rx="18" />
      <text x="572" y="156" textAnchor="middle" fill="var(--color-sand-100)">Cache</text>
      <Arrow d="M 572 196 L 572 236" dash />
      <rect x="510" y="246" width="124" height="60" rx="18" {...thin} />
      <text x="572" y="282" textAnchor="middle">API</text>
    </Frame>
  );
}

function DocsSaid() {
  return (
    <Frame>
      <rect x="30" y="30" width="220" height="280" rx="16" fill="var(--color-sand-50)" stroke="currentColor" strokeWidth="3" />
      <text x="140" y="72" textAnchor="middle" fontWeight="600">Tap to pay guide</text>
      {[104, 134, 164, 194, 224, 254].map((y, i) => (
        <path key={y} d={`M 56 ${y} L ${i % 2 ? 196 : 224} ${y}`} {...thin} strokeLinecap="round" />
      ))}
      <Arrow d="M 262 170 L 390 170" />
      <text x="326" y="152" textAnchor="middle" fontSize="17">follow the steps</text>
      <rect x="400" y="120" width="210" height="100" rx="18" {...box} />
      <text x="505" y="166" textAnchor="middle">Payments</text>
      <text x="505" y="190" textAnchor="middle">just work</text>
    </Frame>
  );
}

function DocsTook() {
  const pages = [
    { x: 14, y: 24, t: "Guide" },
    { x: 138, y: 24, t: "Linked page" },
    { x: 14, y: 190, t: "Linked page" },
    { x: 138, y: 190, t: "Linked page" },
  ];
  return (
    <Frame>
      {pages.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width="110" height="126" rx="12" fill="var(--color-sky-100)" stroke="currentColor" strokeWidth="2" />
          <text x={p.x + 55} y={p.y + 30} textAnchor="middle" fontSize="16">{p.t}</text>
          <path d={`M ${p.x + 16} ${p.y + 56} L ${p.x + 94} ${p.y + 56} M ${p.x + 16} ${p.y + 80} L ${p.x + 78} ${p.y + 80}`} {...thin} strokeLinecap="round" />
        </g>
      ))}
      <Arrow d="M 124 86 L 136 86" />
      <Arrow d="M 193 152 L 193 186" />
      <Arrow d="M 136 252 L 126 252" />
      <Arrow d="M 69 186 L 69 154" dash />
      {[
        { y: 30, t: "OAuth 1.0a" },
        { y: 140, t: ".p12 keys" },
        { y: 250, t: "Tap to pay" },
      ].map((p) => (
        <g key={p.y}>
          <rect x="300" y={p.y} width="150" height="60" rx="14" {...box} />
          <text x="375" y={p.y + 36} textAnchor="middle">{p.t}</text>
          <Arrow d={`M 456 ${p.y + 30} C 480 ${p.y + 30}, 480 170, 500 170`} />
        </g>
      ))}
      <Arrow d="M 254 170 L 292 170" dash />
      <rect x="506" y="126" width="128" height="88" rx="18" />
      <text x="570" y="164" textAnchor="middle" fill="var(--color-sand-100)">Sandbox</text>
      <text x="570" y="188" textAnchor="middle" fill="var(--color-sand-100)">works</text>
    </Frame>
  );
}

/** Sequence diagrams: one lane per actor, messages run top to bottom. */
type LaneSet = Record<string, { x: number; name: string }>;

const paywall = {
  browser: { x: 64, name: "Browser" },
  app: { x: 192, name: "App" },
  stripe: { x: 320, name: "Stripe" },
  webhook: { x: 448, name: "Webhook" },
  db: { x: 576, name: "Database" },
} satisfies LaneSet;

const session = {
  pwa: { x: 100, name: "Installed app" },
  proxy: { x: 320, name: "Next.js proxy" },
  auth: { x: 540, name: "Supabase Auth" },
} satisfies LaneSet;

function Lanes({ set, fill, w = 112 }: { set: LaneSet; fill: string; w?: number }) {
  return (
    <>
      {Object.entries(set).map(([k, l]) => (
        <g key={k}>
          <path d={`M ${l.x} 54 L ${l.x} 334`} {...dashed} strokeWidth={1.5} />
          <rect x={l.x - w / 2} y="12" width={w} height="42" rx="12" fill={fill} stroke="currentColor" strokeWidth="2.5" />
          <text x={l.x} y="40" textAnchor="middle" fontSize="17" fontWeight="600">
            {l.name}
          </text>
        </g>
      ))}
    </>
  );
}

function Msg({ a, b, y, label, dash = false }: { a: number; b: number; y: number; label: string; dash?: boolean }) {
  const dir = Math.sign(b - a);
  return (
    <g>
      <Arrow d={`M ${a + dir * 4} ${y} L ${b - dir * 8} ${y}`} dash={dash} />
      <text x={(a + b) / 2} y={y - 9} textAnchor="middle" fontSize="15">
        {label}
      </text>
    </g>
  );
}

/** A labelled box sitting on one lane. */
function Note({ x, y, w, label, fill }: { x: number; y: number; w: number; label: string; fill: string }) {
  return (
    <g>
      <rect x={x - w / 2} y={y} width={w} height="34" rx="9" fill={fill} stroke="currentColor" strokeWidth="2" />
      <text x={x} y={y + 22} textAnchor="middle" fontSize="14">
        {label}
      </text>
    </g>
  );
}

type P = keyof typeof paywall;
function PayMsg({ from, to, ...rest }: { from: P; to: P; y: number; label: string; dash?: boolean }) {
  return <Msg a={paywall[from].x} b={paywall[to].x} {...rest} />;
}

function PaywallBefore() {
  return (
    <Frame>
      <rect x="20" y="120" width="610" height="98" rx="14" fill="var(--color-sand-300)" opacity="0.6" />
      <text x="626" y="212" textAnchor="end" fontSize="14" fontWeight="600">race</text>
      <Lanes set={paywall} fill="var(--color-sand-50)" />
      <PayMsg from="browser" to="stripe" y={96} label="pay as a guest" />
      <PayMsg from="stripe" to="webhook" y={146} label="paid" />
      <PayMsg from="webhook" to="db" y={146} label="token" />
      <PayMsg from="browser" to="app" y={196} label="poll, up to 15s" dash />
      <PayMsg from="app" to="db" y={196} label="token yet?" dash />
      <rect x="14" y="230" width="100" height="30" rx="8" fill="var(--color-sand-50)" stroke="currentColor" strokeWidth="2" />
      <text x="64" y="250" textAnchor="middle" fontSize="13">token on device</text>
      <PayMsg from="browser" to="app" y={292} label="claim" dash />
      <PayMsg from="browser" to="app" y={326} label="restore" dash />
    </Frame>
  );
}

function PaywallAfter() {
  return (
    <Frame>
      <Lanes set={paywall} fill="var(--color-sky-100)" />
      <PayMsg from="browser" to="app" y={96} label="email + code" />
      <PayMsg from="app" to="db" y={132} label="create account" />
      <PayMsg from="browser" to="stripe" y={178} label="pay, with user ID" />
      <PayMsg from="stripe" to="webhook" y={218} label="paid" />
      <PayMsg from="webhook" to="db" y={258} label="subscription" />
      <PayMsg from="app" to="db" y={310} label="has access? one query" />
    </Frame>
  );
}

const { pwa, proxy, auth } = session;

function SessionBefore() {
  return (
    <Frame>
      <Lanes set={session} fill="var(--color-sand-50)" w={168} />
      <Msg a={pwa.x} b={proxy.x} y={100} label="reopen the app" />
      <Note x={proxy.x} y={128} w={196} label="getClaims(), checked locally" fill="var(--color-sand-50)" />
      <Note x={auth.x} y={128} w={150} label="never asked" fill="var(--color-sand-200)" />
      <Msg a={proxy.x} b={pwa.x} y={214} label="redirect to /auth/login" />
      <Note x={pwa.x} y={246} w={168} label="signed out, again" fill="var(--color-sand-300)" />
    </Frame>
  );
}

function SessionAfter() {
  return (
    <Frame>
      <Lanes set={session} fill="var(--color-sky-100)" w={168} />
      <Msg a={pwa.x} b={proxy.x} y={100} label="reopen, 400-day cookie" />
      <Msg a={proxy.x} b={auth.x} y={150} label="getUser()" />
      <Msg a={auth.x} b={proxy.x} y={200} label="refreshed session" />
      <Msg a={proxy.x} b={pwa.x} y={250} label="home feed + new cookie" />
      <Note x={pwa.x} y={282} w={168} label="still signed in" fill="var(--color-sky-100)" />
    </Frame>
  );
}

export const diagrams = {
  "session-before": SessionBefore,
  "session-after": SessionAfter,
  "paywall-before": PaywallBefore,
  "paywall-after": PaywallAfter,
  "deimr-before": DeimrBefore,
  "deimr-after": DeimrAfter,
  "docs-said": DocsSaid,
  "docs-took": DocsTook,
};

export type DiagramKey = keyof typeof diagrams;
