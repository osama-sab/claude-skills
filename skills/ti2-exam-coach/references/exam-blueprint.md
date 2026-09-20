# TI2 Exam Blueprint

Frequency-rated topic map, lecture-slide anchors, per-block generation recipes, cheat-sheet essentials, and the study plan. Slide numbers refer to the SS-2026 lecture deck (206 slides). Frequency is judged across the available Altklausuren/Gedächtnisprotokolle (2010, 2017, 2020, SoSe21, SoSe22, 2024, Nachklausur 2024) and the four Übungsblätter.

## Table of contents
1. The six blocks, rated (with slide anchors)
2. Per-block generation recipes
3. Past-paper anchor index
4. Cheat-sheet / reference essentials
5. Study-plan flow
6. Older vs recent paper differences

---

## 1. The six blocks, rated

Frequency: ●●● = on essentially every paper · ●● = most papers · ● = occasional.

### Block 1 — Boolesche Algebra & Normalformen ●●●
Slides 15–47, 57–60.
- **Huntingtonsche Axiome, Dualitätsprinzip, Schaltalgebra** (16–24). Occasionally a *proof* task (derive idempotence/absorption/de-Morgan from the axioms — Blatt 1 A3) or "is this structure a Boolean algebra?" (Blatt 1 A2; 2017 true/false).
- **Vollständige Operatorensysteme** (33–36): prove `{NAND}` or `{NOR}` complete, given `{¬,∨,∧}` or `{¬,∨}` is complete. Recurring (2010, 2020, 2024 C). Recipe: express $\overline{a}$, $a\wedge b$, $a\vee b$ using only the target operator.
- **Funktionstabelle → DNF/KNF** (38–47): the bread-and-butter. Read minterms (rows where $f=1$) for the DNF, maxterms (rows where $f=0$) for the KNF. Mark Min-/Maxterme with a cross.
- **Schaltnetz** with NOT/AND/OR realizing a given function (2024 A1, 2017 A1, Blatt 5/6).
- **NAND-/NOR-Konversion** (59–60): convert a DNF/KNF circuit to pure NAND (or NOR) via double negation. Appears as its own sub-part (2024 D, Nachklausur 1A, Blatt 3 A3).

### Block 2 — Shannonscher Entwicklungssatz & (R)OBDD ●●●
Slides 48–56.
- **Shannon expansion** $f = \overline{x_i}\,f|_{x_i=0} \vee x_i\,f|_{x_i=1}$ to reach the DNF (SoSe21 A1, SoSe22 1.1, Nachklausur 1B, Blatt 2 A1).
- **OBDD → ROBDD**: fill leaves from the truth table for a *given variable order* ($x_0<x_1<x_2$), then reduce (merge isomorphic subtrees, remove redundant nodes), then **read the minimal disjunctive form off the reduced diagram** (2024 A3, 2017 A4, SoSe21 A2, Nachklausur 3). Blatt 2 A4 compares two variable orders for ROBDD size.
- Watch: the reduction *rules* must be shown/explained, not just the final diagram.

### Block 3 — Minimierung: KV-Diagramme & Quine-McCluskey ●●●
Slides 61–90.
- **KV-Diagramm** (64–74), usually **with don't-cares** (77–79): choose don't-care values to grow implicants, then give **all Primimplikanten**, **all Kernprimimplikanten** (with their order), and a **minimal (disjunctive) form** (2024 A2, 2017 A2, SoSe21 A3, SoSe22 1.3, Nachklausur 2). Justify each don't-care choice briefly.
- **Bündelminimierung** (75–76): minimize several output functions sharing implicants (Blatt 3 A2).
- **Quine-McCluskey** (80–89): 1. Quinesche Tabelle 0./1. Ordnung → Primimplikanten → 2. Quinesche Tabelle → Kernimplikanten-, Spalten-, Zeilenregel (in that order) → minimal cover (2010, 2024 A4, Nachklausur 4, Blatt 3 A3).
- Vocabulary that must be exact: Implikant *k*-ter Ordnung, Primimplikant, Kernprimimplikant, Überdeckung.

### Block 4 — Laufzeiteffekte, Hazards, Flipflops ●●
Slides 91–118.
- **Impulsdiagramm** with per-gate delays (1 ns, 2 ns…): draw intermediate points and the output over $t$; **name the hazard** (static/dynamic, 0-/1-Hazard); show the KV-diagram and how an added implicant removes it; and (with D-flipflops added) the min clock spacing (SoSe21 A4, 2017 A1b/c, Blatt 3 A4). This is often the hardest-rated part.
- **Flipflops** (100–118): RS (NOR/NAND), RS mit Zustandssteuerung (109), Taktflankensteuerung (112), Master-Slave (113), D (116), JK (117), T (118). Know their tables and pulse behaviour (Blatt 3 A4 walks all five types).

### Block 5 — Schaltwerke & Automaten ●●●
Slides 119–154.
- **Automaton type**: Mealy vs Moore vs Medvedev — decide from whether the output depends on input directly (Mealy), only on state (Moore), or is the state itself (Medvedev). Justify (2010 A2, SoSe21 A5, SoSe22 2.2, Blatt 4).
- **Analysis**: given a Schaltplan with flipflops, read off $z_1^{+}, z_0^{+}, y$ (132–136), complete the **Automatentabelle** (133), count states ($2^{\#\text{flipflops}}$), and draw the **Automatengraph** (129) with `input/output` edge labels (SoSe21 A5, 2017 A5).
- **Sets** $X$ (inputs), $Y$ (outputs), $S$ (states) — and how $S$ is implemented in the circuit (2010 A2, 2020, SoSe22 2.2).
- **Design**: Automatengraph → Ablauftabelle → Übergangsfunktionen → Schaltwerk, choosing a flipflop type (139–141; Blatt 4 A1, the Getränkeautomat with a Gray-code counter).
- Special circuits (146–154): Multiplexer, Demultiplexer, Addierer (Halb-/Voll-, and Halb-/Voll-Subtrahierer per SoSe22 2.1), Register, Schieberegister, Zähler, ALU.

### Block 6 — Maschinenzahlen & Rechnerarchitektur ●●●
Slides 155–205.
- **Zahlensysteme** (157–163): decimal ↔ base-$b$ incl. fractional part (division for the integer part, multiplication for the fraction). Bases seen: 2, 8, 16, and exotic (Basis 15 "Pentadezimal" in 2010). Cross-conversions dual↔oktal↔hex by grouping bits.
- **Kodierung**: BCD (2020), Gray-Kodierung (165), ASCII (167).
- **Negative numbers** (168–173): Betrag+Vorzeichen, Einerkomplement, Zweierkomplement; conversions and value ranges; addition in two's complement (2024 A5, SoSe22 3.1, Nachklausur 5, Blatt 3/4).
- **IEEE-754 single precision** (174–179): 1 sign + 8 characteristic + 23 mantissa, bias $+127$. Show the normalized form $1.\text{m}\times 2^{E}$, the characteristic $= E + 127$, and the mantissa bits. Special values (∞, NaN) asked in Nachklausur 5B; largest/smallest representable in Nachklausur 5C/D. This is on essentially every paper.
- **Von-Neumann-Architektur** (183–189): name the components (Rechenwerk/ALU, Steuerwerk/Leitwerk, Speicher, Ein-/Ausgabe, Bus); the stored-program idea; the Befehlszyklus.
- **Toy-Rechner** (190–205): CISC vs RISC (RISC — few, simple, fixed-format instructions), the **2-Phasen-Takt** (why: separate fetch/decode from execute so reads and writes to shared registers don't collide), the ALU (74181), the Befehlszähler (PC), and which line supplies which control bit — e.g. the RAM read/write bit comes from the **ALU**, the micro-instruction address from the **PC**, the RAM address from **Adr(IR)** and **PC** (2010 A3, 2020, 2024 A6, Nachklausur 6, 2017 A2).

### Verständnisfragen (true/false) ●
Recurring claims to be ready for: "Medvedev is a special Mealy" (true — output = state, a restricted Mealy), "Mealy and Moore are equivalent/equally powerful" (true), a flipflop-count formula for $n$ states ($\lceil\log_2 n\rceil$), "the state-transition function is a Schaltnetz" (true), tautology checks, and whether a given set forms a Boolean algebra (2010 Zusatz, 2017 A7).

---

## 2. Per-block generation recipes

Use these to build fresh problems at exam difficulty. Keep everything calculator-free.

- **Block 1**: pick a 3-variable $f$ as a short formula or a small circuit. Ask for the table, DNF, KNF, a NOT/AND/OR circuit, and one NAND- or NOR-conversion. Optionally a `{NAND}`/`{NOR}` completeness proof.
- **Block 2**: give a 3-variable $f$ (formula or partial table). Ask to apply Shannon to a chosen variable, and/or draw the OBDD for a stated order then reduce to ROBDD and read the DMF. To vary difficulty, choose an $f$ whose ROBDD collapses a lot (easier) or barely (harder).
- **Block 3**: build a 4-variable KV with 1–2 don't-cares placed so a good choice yields a size-4 group. Ask for all Primimplikanten, Kernprimimplikanten, minimal form. For a QMC variant, give ~5–7 minterms and require the two Quinesche Tabellen with the reduction rules in order.
- **Block 4**: a 2-level AND/OR circuit with a NOT-delay on one path; supply input waveforms; ask for the pulse diagram, hazard type, KV with the offending gap, the fixing implicant, and (if flipflops added) min clock spacing = worst-case path delay.
- **Block 5**: give a small 2-flipflop circuit or a graph/table. Ask type + justification, $z_i^{+}$/$y$, the Automatentabelle, the graph, and $X,Y,S$. For design, give a word problem (a vending/counter automaton) and ask for graph → functions → circuit.
- **Block 6**: choose a clean decimal like $12.625$, $-14.3125$, $83.625$ for IEEE-754 and base work; a small negative integer for two's complement; and one Toy-Rechner / Von-Neumann conceptual question.

---

## 3. Past-paper anchor index

- **Klausur 2024**: A1 normal forms + NAND-conv; A2 KV with don't-care (PI/KPI/min); A3 OBDD fill+reduce+DMF; A4 Quine-McCluskey tables; A5 base conversion + two's complement; A6 Toy-Rechner + counting functions + completeness across arities.
- **Nachklausur 2024**: 1A KNF→table/DNF/NOR-conv, 1B Shannon→DNF; 2 KV PI/KPI/min; 3 ROBDD→table + reduce; 4 Quine-McCluskey with costs; 5 base/two's-complement + IEEE-754 specials (∞/NaN), largest/smallest; 6 ALU storage, Toy-Rechner ACCU→PC line, KV with only 1st-order-free minterms.
- **SoSe21 (has official solution — use as cold mock)**: A1 circuit→function + Shannon/DNF; A2 OBDD; A3 KV don't-care; A4 Impulsdiagramm/Hazard; A5 automaton (states/functions/table/graph); A6 IEEE-754 $-14.3125$; A7 true/false + Toy-Rechner + ripple counter.
- **SoSe22**: Shannon; Min-/Maxterme+KNF; KV DMF + KPI order; OBDD; Halb-/Voll-Subtrahierer; automaton type + set $S$; base/one's-complement addition; IEEE; NVRAM/Floating-Gates (older-paper topic).
- **2017**: circuit→function; hazard on an RS-flipflop circuit; KV don't-care; Shannon; ROBDD→DMF; automaton (states/functions/table/graph); IEEE $-14.3125$; true/false; ripple counter.
- **2010 & 2020**: `{NOR}`/`{NAND}` completeness; DNF; Quine-McCluskey; Moore↔Mealy conversion; base conversions incl. Basis-15 and BCD; IEEE; Von-Neumann components; Toy-Rechner CISC/RISC + 2-Phasen-Takt; semiconductor-memory sorting.

---

## 4. Cheat-sheet / reference essentials

(Confirm first whether notes are allowed — past papers were largely closed-book.)
- **IEEE-754 single**: `[1 sign][8 characteristic][23 mantissa]`, characteristic $=E+127$, hidden leading 1. Worked mini-example.
- **Two's complement**: invert all bits, add 1; value range $[-2^{n-1}, 2^{n-1}-1]$; one's-complement range $[-(2^{n-1}-1), 2^{n-1}-1]$.
- **Base conversion**: integer part by repeated division (read remainders bottom-up); fraction by repeated ×base (read carries top-down); dual↔oktal↔hex by 3-/4-bit grouping.
- **QMC rule order**: Kernimplikantenregel → Spaltenregel → Zeilenregel.
- **KV don't-cares**: set to 1 only if it enlarges an implicant/creates a Kernprimimplikant; else 0.
- **Automata**: Mealy (out = f(state,input)), Moore (out = f(state)), Medvedev (out = state); $\#\text{states}\le 2^{\#\text{flipflops}}$.
- **NAND/NOR conversion**: $a\wedge b=\overline{\overline{a\wedge b}}$; $a\vee b=\overline{\overline a\wedge\overline b}$ (de Morgan), and duals for NOR.
- **Toy-Rechner control lines**: RAM R/W bit ← ALU; micro-address ← PC; RAM address ← Adr(IR)/PC. 2-Phasen-Takt separates fetch from execute.

---

## 5. Study-plan flow

Default ordering, highest point-density first. Compress for shorter runways.

1. **Normalformen + Konversionen** (Blocks 1) — table→DNF/KNF reflex, NAND/NOR, completeness proofs.
2. **Minimierung** (Block 3) — KV with don't-cares until PI/KPI/min is automatic; then QMC by hand.
3. **Maschinenzahlen** (Block 6, numbers half) — base conversions, two's complement, IEEE-754 drilled to speed.
4. **Automaten** (Block 5) — type classification, analysis (functions/table/graph), then design.
5. **Shannon/OBDD** (Block 2) — expansion + reduce-and-read.
6. **Hazards/Flipflops** (Block 4) — pulse diagrams and the fix; flipflop tables.
7. **Rechnerarchitektur** (Block 6, architecture half) — Von-Neumann + Toy-Rechner conceptuals; cheap points, learn last.
8. **Cold mock** on a reserved past paper (SoSe21 has a solution to self-check), then patch weak blocks.

If only days remain: hit Blocks 1, 3, 5, and 6-numbers (the four on every paper), plus the true/false freebies.

---

## 6. Older vs recent paper differences

The 2010 and 2020 papers are **older** and stylistically distinct from the **recent** papers (2017, SoSe21, SoSe22, 2024, Nachklausur). The recent set reflects the current exam style — default to it. The procedures are the same across both, but note:
- The older papers leaned on **BCD**, **exotic bases** (Basis 15), and **semiconductor-memory** detail (sorting memory types, NVRAM, Floating Gates) — the last of these keys off a specific Skript page and is **less emphasized in the recent papers**; treat it as low-priority unless the student's own notes cover it.
- The recent papers emphasize **OBDD/ROBDD reduction**, **Quine-McCluskey with the explicit rule order**, **KV with don't-cares**, and the **Toy-Rechner control-line** questions.
- When unsure which flavour to drill, default to the recent-paper pattern above.
