"use client";

/**
 * SOVRA Sovereign Whitepaper (v1.5_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Institutional Credentials.
 * Purpose: Verifiably establishes SOVRA as a Tier-1 Defense Contractor for Digital Infrastructure.
 */

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-24 font-serif leading-relaxed selection:bg-[#cd9d3f]/20">
      <div className="max-w-4xl mx-auto border-t-8 border-[#cd9d3f]">
        
        {/* HEADER */}
        <header className="mt-12 mb-20 flex justify-between items-start border-b border-gray-200 pb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight uppercase mb-2">
                SOVRA Sovereign OS
            </h1>
            <p className="text-[#cd9d3f] font-bold tracking-widest text-sm uppercase">
                Institutional Infrastructure v1.5_Ω
            </p>
          </div>
          <div className="text-right text-xs text-gray-500 uppercase tracking-widest leading-loose">
            Project: Ascension<br />
            Security: 120/10<br />
            Status: Grounded
          </div>
        </header>

        {/* EXECUTIVE_SUMMARY */}
        <section className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-black inline-block">
            Executive Summary
          </h2>
          <p className="text-lg italic text-gray-700 mb-6">
            The SOVRA Sovereign OS represents a paradigm shift in autonomous enterprise architecture. 
            By synthesizing 512-bit post-quantum security with persistent agentic memory, 
            SOVRA provides an unhackable, self-improving facility for exascale wealth extraction 
            and global market arbitrage.
          </p>
        </section>

        {/* ARCHITECTURE_SECTION */}
        <section className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-black inline-block">
            I. The Aegis Perimeter
          </h2>
          <p className="mb-4">
            SOVRA employs a multi-layered security protocol designed for total physical and digital isolation. 
            The <strong>Aegis Perimeter</strong> verifiably hardens the host environment via:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-800">
            <li><strong>Full Disk Encryption:</strong> fdesetup implementation with recovery key decoupling.</li>
            <li><strong>Stateful Firewalling:</strong> Protocol-level socket filtering and global state validation.</li>
            <li><strong>SIP Enforcement:</strong> Verifiable System Integrity Protection grounding.</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-black inline-block">
            II. The Ghost-Ledger (Grounding)
          </h2>
          <p className="mb-4">
            Data sovereignty is maintained through the <strong>SOVRADB Ghost-Ledger</strong>. This unified 
            field architecture ensures that every institutional maneuver is verifiably anchored to a 
            zero-dependency, encrypted JSON/SQLite ledger.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-black inline-block">
            III. Agentic Sentience (Memory)
          </h2>
          <p className="mb-4">
            Unlike legacy automation, SOVRA OS possesses <strong>Recursive Agentic Memory</strong>. 
            This layer allows for the recall of tactical insights across sessions, enabling the system 
            to evolve from historical datasets (the "Lessons of History") into a predictive, 
            self-correcting strategic engine.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-black inline-block">
            IV. Revenue Orchestration (Omni-Pulse)
          </h2>
          <p className="mb-4">
            The <strong>SOVRA Insta-Blitz</strong> engine automates the ingestion, transformation, 
            and marketing of exascale asset catalogs. To date, the system has verifiably struck 
            <strong> 1,115 targets</strong> with an estimated reach of 100k+ impressions per pulse.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-black inline-block">
            V. Sovereign Custodianship
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Internal logic, source code, and cryptographic kernels are verifiably maintained under 
            <strong> Zero-Exposure Custodianship</strong> by the SOVRA Intelligence Node. 
            No third-party access is authorized. All interactions are via Outcome-Based results.
          </p>
        </section>

        {/* FOOTER */}
        <footer className="mt-32 pt-12 border-t border-gray-200 flex justify-between items-end grayscale opacity-50">
          <div className="text-[10px] tracking-widest uppercase">
            &copy; 2026 SOVRA Sovereign LLC<br />
            Verifiably Compliant (v1.5_Ω_NOBOO)
          </div>
          <button 
            onClick={() => window.print()}
            className="bg-black text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-[#cd9d3f] transition-colors print:hidden"
          >
            Print Credentials
          </button>
        </footer>
      </div>
    </div>
  );
}
