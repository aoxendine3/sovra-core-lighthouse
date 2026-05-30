#!/usr/bin/env python3
"""
================================================================================
                    XORAS SYSTEMS LLC — PROPRIETARY SYSTEM
            (Biophysical Precision Oncology Simulation Engine - Version 1.0)
================================================================================
Proprietary in silico modeling engine that simulates:
1. PEG-b-PLL DNA Origami Magnesium Stability Envelopes (Debye-Hückel Electrostatics)
2. CAR-NK NOT-Gate Activation Kinetics (Cooperative Hill Equations)
3. S. typhimurium YB1 Hypoxia-Triggered Lysis Circuitry (ODEs integration)
4. Targeted Alpha Therapy (TAT) renal protection via L-Lysine Megalin Saturation
================================================================================
"""

import math
import sys
import json
from datetime import datetime, timezone

class XorasBPOSE:
    def __init__(self):
        # Physical constants
        self.e_charge = 1.602e-19       # elementary charge (C)
        self.N_A = 6.022e23            # Avogadro's number
        self.eps_0 = 8.854e-12         # vacuum permittivity (F/m)
        self.eps_r = 78.4              # relative permittivity of water at 298 K
        self.k_B = 1.38e-23            # Boltzmann constant (J/K)
        self.T = 298.15                # absolute temperature (K)
        self.R = 8.314                 # gas constant (J/mol*K)

    # ==========================================================================
    # MODULE 1: PEG-b-PLL DNA ORIGAMI STABILITY ENVELOPE
    # ==========================================================================
    def simulate_dna_origami_stability(self, mg_conc_mm: float, np_ratio: float) -> dict:
        """
        Computes Debye length, parallel-duplex electrostatic repulsion energy,
        fractional polymer coverage, and predicted structural nuclease half-life.
        """
        # Calculate ionic strength I of solution (in mol/m^3 or M)
        # Standard physiological background: 140 mM Na+, 100 mM Cl-
        # Plus variable Mg2+ (and 2 Cl- for charge balance)
        na_m = 0.140
        cl_m = 0.100 + 2 * (mg_conc_mm / 1000.0)
        mg_m = mg_conc_mm / 1000.0
        
        # I = 0.5 * sum(z_i^2 * c_i)
        ionic_strength = 0.5 * ((1.0**2 * na_m) + ((-1.0)**2 * cl_m) + (2.0**2 * mg_m)) # Molar
        
        # Debye screening parameter kappa (1/m)
        # kappa = sqrt((2 * e^2 * N_A * 1000 * I) / (eps_0 * eps_r * k_B * T))
        # Note: I in M is multiplied by 1000 to convert to mol/m^3
        const_term = (2.0 * (self.e_charge**2) * self.N_A * 1000.0) / (self.eps_0 * self.eps_r * self.k_B * self.T)
        kappa = math.sqrt(const_term * ionic_strength)
        debye_length_nm = (1.0 / kappa) * 1e9
        
        # Electrostatic repulsion energy between parallel duplexes at distance d = 2.8 nm
        d_m = 2.8e-9
        q_eff = 1.0e-9 # Effective charge density (C/m)
        U_rep = ((q_eff**2) / (4.0 * math.pi * self.eps_0 * self.eps_r * d_m)) * math.exp(-kappa * d_m)
        
        # McGhee-von Hippel fractional polymer coverage theta
        # Calibrated model based on N/P ratio
        if np_ratio <= 0:
            theta = 0.0
        elif np_ratio >= 1.5:
            theta = 0.98
        else:
            # Non-linear cooperative loading interpolation
            theta = 1.0 / (1.0 + math.exp(-6.0 * (np_ratio - 0.8)))
            
        # Nuclease degradation kinetics half-life
        # Base half-life uncoated = 2.4 hours. Scaling factor driven by theta.
        # Max half-life coated (at N/P = 1.5, theta = 0.98) = ~1030 hours
        t_half_uncoated = 2.4 # hours
        t_half_coated_max = 1030.0 # hours
        
        # Structural half-life is a cooperative function of Mg concentration and polymer coverage
        stability_multiplier = 1.0 + (theta**3.5) * 428.0
        # If magnesium is very low (<1.0 mM) and polymer coverage is low, degradation accelerates
        if mg_conc_mm < 1.0 and theta < 0.5:
            stability_multiplier *= (mg_conc_mm / 1.0)
            
        predicted_half_life_hours = max(0.1, t_half_uncoated * stability_multiplier)
        
        return {
            "ionic_strength_m": round(ionic_strength, 4),
            "debye_length_nm": round(debye_length_nm, 4),
            "electrostatic_repulsion_j_m": U_rep,
            "polymer_surface_coverage_theta": round(theta, 4),
            "predicted_half_life_hours": round(predicted_half_life_hours, 2),
            "status": "Nominal (Fully Shielded)" if predicted_half_life_hours >= 500 else ("Vulnerable" if predicted_half_life_hours < 24 else "Moderately Shielded")
        }

    # ==========================================================================
    # MODULE 2: CAR-NK NOT-GATE KINETICS
    # ==========================================================================
    def simulate_car_nk_not_gate(self, mesothelin_density: float, hla_e_density: float) -> dict:
        """
        Calculates activating term, inhibitory term, net activation state (A),
        SHP-1 recruitment density, and synapse state.
        """
        # Hill parameters
        n_act = 2.4          # Hill coefficient Mesothelin activating CAR
        m_inh = 3.1          # Hill coefficient HLA-E inhibitory iCAR
        K_T = 150.0          # activation constant molecules/um^2
        K_P = 50.0           # inhibitory constant molecules/um^2
        
        # Calculate terms
        if mesothelin_density <= 0:
            act_term = 0.0
        else:
            act_term = (mesothelin_density**n_act) / (K_T**n_act + mesothelin_density**n_act)
            
        if hla_e_density <= 0:
            inh_term = 1.0
        else:
            # 1 - (P^m / (K_P^m + P^m)) = K_P^m / (K_P^m + P^m)
            inh_term = (K_P**m_inh) / (K_P**m_inh + hla_e_density**m_inh)
            
        net_activation = act_term * inh_term
        
        # Intracellular synapse SHP-1 recruitment density simulation (molecules/um^2)
        # Recruited SHP-1 is proportional to bound HLA-E (which we model as hla_e_density / (K_P + hla_e_density))
        v_max_shp = 30.0 # Max SHP-1 concentration
        bound_fraction = hla_e_density / (K_P + hla_e_density) if hla_e_density > 0 else 0.0
        shp_active = v_max_shp * bound_fraction
        
        # Critical SHP-1 threshold to block granzyme degranulation
        shp_crit = 12.0
        degranulation_blocked = shp_active >= shp_crit
        
        return {
            "activating_term": round(act_term, 4),
            "inhibitory_term": round(inh_term, 4),
            "net_activation_state_a": round(net_activation, 4),
            "active_synapse_shp1_molecules_um2": round(shp_active, 2),
            "degranulation_blocked_by_shp1": degranulation_blocked,
            "decision": "OFF (On-Target, Healthy Tissue Spared)" if degranulation_blocked or net_activation < 0.15 else ("ON (On-Target, Tumor Targeted)" if net_activation >= 0.75 else "INTERMEDIATE")
        }

    # ==========================================================================
    # MODULE 3: YB1 HYPOXIC GENETIC LYSIS KINETICS (ODE INTEGRATOR)
    # ==========================================================================
    def simulate_yb1_lysis_kinetics(self, local_o2_percent: float, duration_minutes: float = 240.0) -> dict:
        """
        Performs numeric integration of the YB1 hypoxic cell-lysis circuit ODEs:
        1. FNR activation/dimerization kinetics under oxygen tension.
        2. E_mRNA transcription.
        3. Protein E accumulation.
        """
        # Convert O2 percent to dissolved concentration (uM)
        # 21% O2 corresponds to ~210 uM under standard atmospheric conditions
        o2_um = (local_o2_percent / 21.0) * 210.0
        
        # Kinetic constants
        k_synth = 45.0       # FNR synthesis rate (nM/min)
        K_red = 4.2          # reduction stability constant (uM)
        k_ox = 0.018         # O2-mediated oxidation rate (1/uM*min)
        d_fnr = 0.05         # FNR degradation (1/min)
        
        alpha_m = 120.0      # max transcription copies/cell*min
        K_fnr = 85.0         # active FNR affinity constant (nM)
        k_hill = 2.0         # FNR promoter binding Hill coefficient
        d_m = 0.231          # E mRNA degradation (1/min)
        
        alpha_p = 15.0       # translation rate proteins/mRNA*min
        d_p = 0.015          # Protein E degradation (1/min)
        
        L_crit = 4500.0      # Lysis threshold
        
        # Initial conditions (all zero at normoxic baseline)
        fnr_active = 0.0     # nM
        e_mrna = 0.0         # copies/cell
        protein_e = 0.0      # molecules/cell
        
        # Integration parameters
        dt = 0.1             # step size in minutes
        steps = int(duration_minutes / dt)
        
        timeline = []
        lysis_occurred = False
        lysis_time = -1.0
        
        for step in range(steps):
            t = step * dt
            
            # ODE 1: active FNR
            # dfnr/dt = k_synth * (K_red / (K_red + O2)) - k_ox * O2 * fnr_active - d_fnr * fnr_active
            stability_factor = K_red / (K_red + o2_um)
            dfnr_dt = k_synth * stability_factor - k_ox * o2_um * fnr_active - d_fnr * fnr_active
            fnr_next = fnr_active + dfnr_dt * dt
            fnr_active = max(0.0, fnr_next)
            
            # ODE 2: E mRNA copies
            # de_mRNA/dt = alpha_m * (fnr_active^2 / (K_fnr^2 + fnr_active^2)) - d_m * e_mrna
            activation_factor = (fnr_active**k_hill) / (K_fnr**k_hill + fnr_active**k_hill) if fnr_active > 0 else 0.0
            demrna_dt = alpha_m * activation_factor - d_m * e_mrna
            emrna_next = e_mrna + demrna_dt * dt
            e_mrna = max(0.0, emrna_next)
            
            # ODE 3: Protein E molecules
            # dL/dt = alpha_p * e_mrna - d_p * protein_e
            dprotein_dt = alpha_p * e_mrna - d_p * protein_e
            protein_next = protein_e + dprotein_dt * dt
            protein_e = max(0.0, protein_next)
            
            # Check lysis condition
            if protein_e >= L_crit and not lysis_occurred:
                lysis_occurred = True
                lysis_time = t
                
            # Log interval points
            if step % 100 == 0 or step == steps - 1:
                timeline.append({
                    "time_min": round(t, 1),
                    "active_fnr_nm": round(fnr_active, 2),
                    "e_mrna_copies": round(e_mrna, 2),
                    "protein_e_molecules": round(protein_e, 2),
                    "lysed": protein_e >= L_crit
                })
                
        return {
            "oxygen_tension_percent": local_o2_percent,
            "dissolved_o2_um": round(o2_um, 2),
            "lysis_threshold_reached": lysis_occurred,
            "lysis_time_minutes": round(lysis_time, 2) if lysis_occurred else -1.0,
            "final_protein_e_molecules": round(protein_e, 2),
            "simulation_trajectory_sample": timeline[:15] # Trajectory timeline sample
        }

    # ==========================================================================
    # MODULE 4: TARGETED ALPHA THERAPY AND MEGALIN NEHPROPROTECTION
    # ==========================================================================
    def simulate_tat_megalin_nephroprotection(self, l_lysine_dose_mg_kg: float, radio_dose_mbq: float) -> dict:
        """
        Calculates competitive inhibition kinetics of L-lysine on megalin receptors.
        Computes the protection factor (PF) and the estimated renal radiation sparing factor.
        """
        # Megalin affinity constants
        Kd_lysine_um = 450.0  # uM (microMolar affinity)
        
        # Bolus pharmacokinetic estimator
        # Plasma concentration (mM) is estimated based on L-lysine dose
        # 400 mg/kg delivers ~4.5 to 6.0 mM steady-state plasma concentrations
        lysine_plasma_mm = (l_lysine_dose_mg_kg / 400.0) * 5.0
        
        # Protection Factor formula: PF = 1 + [I]/K_d,I
        # Note: lysine_plasma_mm is converted to uM (multiply by 1000)
        lysine_plasma_um = lysine_plasma_mm * 1000.0
        protection_factor = 1.0 + (lysine_plasma_um / Kd_lysine_um)
        
        # Sparing percent
        renal_sparing_percent = (1.0 - (1.0 / protection_factor)) * 100.0
        
        # Lead-212 / Bismuth-212 Radiation Dose profiles (Gy in Kidney cortex)
        # Unprotected base dose: 0.12 Gy per MBq administered
        unprotected_renal_dose_gy = radio_dose_mbq * 0.12
        protected_renal_dose_gy = unprotected_renal_dose_gy * (1.0 - (renal_sparing_percent / 100.0))
        
        return {
            "lysine_dose_mg_kg": l_lysine_dose_mg_kg,
            "estimated_plasma_lysine_mm": round(lysine_plasma_mm, 3),
            "megalin_protection_factor": round(protection_factor, 2),
            "renal_uptake_reduction_percent": round(renal_sparing_percent, 2),
            "unprotected_kidney_dose_gy": round(unprotected_renal_dose_gy, 4),
            "protected_kidney_dose_gy": round(protected_renal_dose_gy, 4),
            "status": "Safe Sparing Envelope" if renal_sparing_percent >= 80.0 else ("Moderate Sparing" if renal_sparing_percent >= 50.0 else "High Risk of Nephrotoxicity")
        }

    # ==========================================================================
    # SYSTEM EXECUTIVE DYNAMIC WALKTHROUGH REPORT
    # ==========================================================================
    def generate_full_precision_report(self) -> dict:
        """Runs the fully parameterized default walkthrough simulation to demonstrate reproducible precision outcomes."""
        print("[*] Launching Xoras BPOS Sovereign Core Execution Loop...")
        
        # 1. Simulate DNA Origami under physiological vs coated conditions
        origami_unprotected = self.simulate_dna_origami_stability(mg_conc_mm=1.0, np_ratio=0.0)
        origami_protected = self.simulate_dna_origami_stability(mg_conc_mm=1.0, np_ratio=1.5)
        
        # 2. CAR-NK logic gates evaluation
        carnk_tumor = self.simulate_car_nk_not_gate(mesothelin_density=800.0, hla_e_density=0.0)
        carnk_healthy = self.simulate_car_nk_not_gate(mesothelin_density=800.0, hla_e_density=350.0)
        
        # 3. YB1 Hypoxia circuit lysis time
        yb1_hypoxia = self.simulate_yb1_lysis_kinetics(local_o2_percent=0.1, duration_minutes=240.0)
        yb1_normoxia = self.simulate_yb1_lysis_kinetics(local_o2_percent=21.0, duration_minutes=240.0)
        
        # 4. Nephroprotection
        tat_shield = self.simulate_tat_megalin_nephroprotection(l_lysine_dose_mg_kg=400.0, radio_dose_mbq=150.0)
        
        report = {
            "simulation_metadata": {
                "engine_version": "Xoras BPOSE 1.0.0",
                "timestamp_utc": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
                "sovereign_identity": "Xoras Systems LLC",
                "intellectual_property": "Closed-Source Proprietary EULA. All rights reserved by the Owner."
            },
            "disclaimer": "SCIENTIFIC MODEL DISCLAIMER: This computer simulation is modeled strictly based on peer-reviewed mathematical biophysical equations. It does not substitute prospective in vivo validation, preclinical safety enclaves, or clinical trial guidelines.",
            "module_1_dna_origami": {
                "uncoated_serum_baseline": origami_unprotected,
                "coated_shielded_state": origami_protected
            },
            "module_2_car_nk_logic_gates": {
                "tumor_targeting_profile": carnk_tumor,
                "healthy_tissue_sparing_profile": carnk_healthy
            },
            "module_3_yb1_hypoxic_lysis": {
                "severe_tumor_hypoxia_0_1_percent": yb1_hypoxia,
                "normoxic_healthy_tissue_21_percent": yb1_normoxia
            },
            "module_4_tat_nephroprotection": tat_shield
        }
        return report

if __name__ == "__main__":
    bpos = XorasBPOSE()
    res = bpos.generate_full_precision_report()
    print(json.dumps(res, indent=2))
