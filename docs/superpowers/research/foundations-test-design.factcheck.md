# Fact-check: Test Design with Claude (rounds 1-2, 2026-10-10)

Sources fetched by the checker on 2026-10-10: S1 CTFL syllabus v4.0 PDF (text extracted with pdftotext), S2 CTAL-TA syllabus v4.0 PDF, S3 common-workflows, S4 best-practices, S5 ISTQB Glossary 2.3 PDF, S6 Playwright "Parameterize tests", S7 Playwright "Test Agents".

Syllabus versions checked against the documents themselves:
- S1: cover "v4.0", footer "v4.0 ... 2023-04-21", "formally released by the General Assembly of the ISTQB on 21 April 2023", copyright 2023. The page says "CTFL syllabus v4.0, released in 2023": matches. (A v4.0.1 exists; the PDF cited is v4.0, so the page is right for its URL.)
- S2: cover "v4.0", "v4.0 GA ... 2025/05/02", "formally released ... May 2nd, 2025". The page says "CTAL-TA syllabus v4.0" with no year: matches. Section 3.1.2 is "Combinatorial Testing": matches the source title.
- S5: "Version 2.3 (dd. March 28th, 2014)": the page says "glossary v2.3 (2014)": matches.

All 7 sources are cited at least once; every `<Cite n>` (1-7) exists.

Writer-flagged items: decision table "gaps and contradictions" = row 29 (PASS); valid-transitions "most widely used" = row 35 (PASS); Playwright parameterize = row 58 (PASS).

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| 1 | What test design is | Techniques help decide what to test (analysis) and how (design); "a relatively small, but sufficient, set of test cases in a systematic way" | 1 | PASS | S1 4.1: "Test techniques support the tester in test analysis (what to test) and in test design (how to test). Test techniques help to develop a relatively small, but sufficient, set of test cases in a systematic way." |
| 2 | What test design is | Techniques classified as black-box, white-box, experience-based | 1 | PASS | S1 4.1: "test techniques are classified as black-box, white-box, and experience-based." |
| 3 | What test design is | Black-box (specification-based) uses specified behavior, not internal structure; cases stay useful if implementation changes | 1 | PASS | S1 4.1: "if the implementation changes, but the required behavior stays the same, then the test cases are still useful." |
| 4 | What test design is | Four common black-box techniques: EP, BVA, decision table, state transition | 1 | PASS | S1 4.2: "Commonly used black-box test techniques ...: Equivalence Partitioning, Boundary Value Analysis, Decision Table Testing, State Transition Testing". |
| 5 | What test design is | White-box: statement and branch testing; branch coverage subsumes statement coverage | 1 | PASS | S1 4.3: "Branch coverage subsumes statement coverage." |
| 6 | What test design is | Experience-based uses tester knowledge; can find defects others miss; complementary | 1 | PASS | S1 4.1: "can detect defects that may be missed using the black-box and white-box test techniques ... complementary". |
| 7 | Callout: which syllabus | Black-box and experience-based techniques come from CTFL v4.0, released in 2023 | 1 | PASS | See version check above. |
| 8 | Callout: which syllabus | Pairwise testing is not in the Foundation syllabus; it is in CTAL-TA v4.0 | 2 | PASS | S2 3.1.2: "Pairwise coverage, in which coverage items are pairs of parameter-value pairs for any two parameters". A text search of S1 finds no "pairwise" or "combinatorial". (The "not in Foundation" half is shown by S1's absence, not by S2.) |
| 9 | How to work with Claude | 6-step workflow "is this tutorial's suggestion" | none | OPINION-OK | Labeled as the tutorial's own advice; no checkable claim. |
| 10 | How to work with Claude | The docs list "error conditions, boundary values, and unexpected inputs" | 3 | PASS | S3: "suggest tests for error conditions, boundary values, and unexpected inputs that are often overlooked". |
| 11 | How to work with Claude | "write a test for foo.py covering the edge case where the user is logged out. avoid mocks." | 4 | PASS | S4 "Scope the task" row, same text. |
| 12 | Equivalence partitioning | EP divides data into partitions; elements processed the same way; one test per partition sufficient | 1 | PASS | S1 4.2.1: "Therefore, one test for each partition is sufficient." |
| 13 | Equivalence partitioning | Partitions for inputs, outputs, configuration items, internal values, time-related values, interface parameters | 1 | PASS | S1 4.2.1, same list. |
| 14 | Equivalence partitioning | Partitions must not overlap and must not be empty | 1 | PASS | S1: "The partitions must not overlap and must be non-empty sets." |
| 15 | Equivalence partitioning | Valid vs invalid partition | 1 | PASS | S1: "A partition containing valid values is called a valid partition. A partition containing invalid values is called an invalid partition." |
| 16 | Equivalence partitioning | Coverage items are partitions; coverage = partitions exercised / total, as percentage; 100% includes invalid partitions | 1 | PASS | S1: "Coverage is measured as the number of partitions exercised by at least one test case, divided by the total number of identified partitions, and is expressed as a percentage." |
| 17 | Equivalence partitioning | Each Choice coverage; does not consider combinations | 1 | PASS | S1: "Each Choice coverage does not take into account combinations of partitions." |
| 18 | Equivalence partitioning | Quantity-field partition table P1-P4 and EP prompt | none | EXAMPLE-OK | Labeled "Example"; partitions follow the S1 rules (non-overlapping, non-empty, valid and invalid). |
| 19 | Boundary value analysis | BVA exercises boundaries of partitions; only for ordered partitions; min and max are boundary values | 1 | PASS | S1 4.2.2: "BVA can only be used for ordered partitions. The minimum and maximum values of a partition are its boundary values." |
| 20 | Boundary value analysis | Developers more likely to err at boundaries; typical defects: boundary misplaced above/below or omitted | 1 | PASS | S1: "developers are more likely to make errors with these boundary values ... misplaced to positions above or below their intended positions or are omitted altogether." |
| 21 | Boundary value analysis | 2-value and 3-value BVA definitions; 3-value more rigorous; `if (x <= 10)` vs `if (x = 10)` example with x = 9 | 1 | PASS | S1: "this boundary value and its closest neighbor belonging to the adjacent partition"; "this boundary value and both its neighbors"; "no test data derived from the 2-value BVA (x = 10, x = 11) can detect the defect. However, x = 9, derived from the 3-value BVA, is likely to detect it." |
| 22 | Boundary value analysis | Coverage = boundary values exercised / total; 3-value counts neighbors too | 1 | PASS | S1: "number of boundary values and their neighbors exercised, divided by the total number of identified boundary values and their neighbors". |
| 23 | Boundary value analysis | Test values for 1-100: 2-value 0,1 and 100,101; 3-value 0,1,2 and 99,100,101 | none | EXAMPLE-OK | Labeled "Example"; values follow the S1 definitions for a 1-100 range (checked by hand). |
| 24 | Decision tables | Used for requirements where combinations of conditions give different outcomes; effective for complex logic like business rules | 1 | PASS | S1 4.2.3: "an effective way of recording complex logic, such as business rules." |
| 25 | Decision tables | Rows are conditions and actions; each column is a decision rule; limited-entry = Boolean; extended-entry = more values | 1 | PASS | S1 4.2.3, same wording. |
| 26 | Decision tables | Notation `T`, `F`, `–`, `N/A`, `X`, blank | 1 | PASS | S1: "'T' (true) means that the condition is satisfied. 'F' ... '–' means that the value of the condition is irrelevant ... 'N/A' means that the condition is infeasible ... 'X' means that the action should occur. Blank means that the action should not occur." |
| 27 | Decision tables | Full table; simplify by deleting infeasible columns; minimize by merging columns; coverage items are columns with feasible combinations | 1 | PASS | S1: "The table can be simplified by deleting columns containing infeasible combinations ... minimized by merging columns". |
| 28 | Decision tables | Rules grow exponentially; use minimized table or risk-based approach | 1 | PASS | S1: "the number of rules grows exponentially with the number of conditions ... a minimized decision table or a risk-based approach may be used." |
| 29 | Decision tables | A decision table also shows gaps and contradictions in the requirements | 1 | PASS | S1: "It also helps to find any gaps or contradictions in the requirements." (Writer's flag: supported in the syllabus text, not only a notes column.) |
| 30 | Decision tables | Discount-rules table and prompt | none | EXAMPLE-OK | Labeled "Example"; table uses only `T`/`F`/`X`/blank; rows are consistent (Member x Order total gives 4 rules). |
| 31 | State transition testing | Diagram shows states and valid transitions; event, optional guard; label `event [guard condition] / action` | 1 | PASS | S1 4.2.4: "The common transition labeling syntax is as follows: 'event [guard condition] / action'." |
| 32 | State transition testing | State table: rows states, columns events, cells target state + actions; shows invalid transitions as empty cells | 1 | PASS | S1: "the state table explicitly shows invalid transitions, which are represented by empty cells." |
| 33 | State transition testing | A test case is a sequence of events; one case usually covers several transitions | 1 | PASS | S1: "One test case may, and usually will, cover several transitions between states." |
| 34 | State transition testing (table) | All states; valid transitions (0-switch); all transitions coverage criteria | 1 | PASS | S1: "all states coverage ... valid transitions coverage (also called 0-switch coverage) ... all transitions coverage". |
| 35 | State transition testing (table) | Valid transitions coverage "is the most widely used" | 1 | PASS | S1: "Valid transitions coverage is the most widely used coverage criterion." (Writer's flag resolved: quoted in the syllabus.) |
| 36 | State transition testing | All-transitions coverage also gives all-states and valid-transitions coverage | 1 | PASS | S1: "full all transitions coverage guarantees both full all states coverage and full valid transitions coverage". |
| 37 | State transition testing | Test one invalid transition per test case to prevent fault masking | 1 | PASS | S1: "Testing only one invalid transition in a single test case helps to avoid fault masking". |
| 38 | State transition testing | Bug-ticket state table and prompt | none | EXAMPLE-OK | Labeled "Example"; the table is a valid state table (empty cells = invalid transitions). |
| 39 | Pairwise testing | Pairwise is a combinatorial technique from CTAL-TA; combinatorial testing explores combinations to reveal interaction failures | 2 | PASS | S2 3.1.2: "Combinatorial testing aims to reveal such failures by exploring these parameter value combinations." |
| 40 | Pairwise testing | A parameter-value pair is a parameter and its value, e.g. `(color, red)` | 2 | PASS | S2: "A specific parameter-value pair consists of a parameter and its value (e.g., '(color, red)')." |
| 41 | Pairwise testing | Pairwise coverage items are pairs of parameter-value pairs for any two parameters | 2 | PASS | S2: "coverage items are pairs of parameter-value pairs for any two parameters." |
| 42 | Pairwise testing | Tools can generate coverage items; finding a minimal set is generally difficult | 2 | PASS | S2: "Tools are available for generating coverage items. However, finding a minimal set of test cases achieving pairwise coverage is generally difficult." |
| 43 | Pairwise testing | Many values: apply EP first | 2 | PASS | S2: "For parameters with many values, EP may first be applied". |
| 44 | Pairwise testing | Most failures from one value or few parameters; limited study: about 97% from one or two interacting conditions | 2 | PASS | S2: "most failures are triggered by a single parameter value or interactions between a relatively small number of parameters"; "In a limited study (D. Kuhn et al., 2004), the results showed that about 97% of failures are caused by only one or two interacting conditions". |
| 45 | Pairwise testing | "A cheaper alternative is base choice coverage." (round 2: now "Another criterion is base choice coverage.") | 2 | PASS (round 2) | Round 2: "cheaper" removed; the sentence is now supported by S2 3.1.2 (base choice coverage is one of the combinatorial coverage criteria). Round 1 verdict was UNCITED. Original note: | S2 describes base choice coverage but never says it is cheaper than pairwise. Fix: write "Another criterion is base choice coverage." (or cite a source that compares cost). |
| 46 | Pairwise testing | Base choice: choose base value per parameter; base test combines them; each further test replaces one base value with a non-base value | 2 | PASS | S2: "A base parameter-value pair is chosen for each parameter, and a base coverage item is the combination of base parameter-value pairs. Subsequent coverage items are created from the base coverage item for each parameter by replacing its base parameter-value pair with each non-base value." |
| 47 | Pairwise testing | (superseded in round 2 by row 48) ISTQB glossary v2.3 (2014) defines n-wise testing as executing all possible discrete combinations of any set of n input parameters | 5 | PASS | S5: "n-wise testing: A black box test design technique in which test cases are designed to execute all possible discrete combinations of any set of n input parameters." |
| 48 | Pairwise testing | "Pairwise testing is n-wise testing with n = 2." (round 2: replaced by a quote of the glossary pairwise entry) | 5 | PASS (round 2) | Round 2: the page now says the glossary "defines pairwise testing as 'A black box test design technique in which test cases are designed to execute all possible discrete combinations of each pair of input parameters.'" S5 pairwise entry: "A black box test design technique in which test cases are designed to execute all possible discrete combinations of each pair of input parameters." Exact match. Round 1 verdict was UNCITED. Original note: | S5 does not state this. Its pairwise entry reads: "test cases are designed to execute all possible discrete combinations of each pair of input parameters. See also combinatorial testing, n-wise testing". The equivalence is a fair reading but is the tutorial's inference. Fix: quote the glossary's pairwise entry ("each pair of input parameters") instead of the "n = 2" step. |
| 49 | Pairwise testing | Example 3 x 2 x 3 x 2 = 36 full combinations; "a pairwise set needs far fewer tests" | none | EXAMPLE-OK | Arithmetic is correct (36). A pairwise set for these parameters needs at least 9 rows (3 x 3 pairs), so "far fewer" holds. Labeled "Example". |
| 50 | Callout: hand-made minimal set | Hard to find a minimal pairwise set; use a generator script | 2 | PASS | S2: "finding a minimal set ... is generally difficult". The advice to use a script is OPINION-OK. |
| 51 | Experience-based techniques | Three techniques: error guessing, exploratory, checklist-based; effectiveness depends heavily on tester skills | 1 | PASS | S1 4.4 list; 4.1: "The effectiveness of these techniques depends heavily on the tester's skills." |
| 52 | Error guessing | Anticipates errors from past behavior, typical developer errors, failures in similar apps; fault attacks = list of errors then tests | 1 | PASS | S1 4.4.1, same list and "Fault attacks are a methodical approach to the implementation of error guessing." |
| 53 | Exploratory testing | Design, execute, evaluate simultaneously; time-box, charter, debrief; useful when specs are few or inadequate or time is short | 1 | PASS | S1 4.4.2: "simultaneously designed, executed, and evaluated"; "defined time-box ... test charter ... debriefing"; "useful when there are few or inadequate specifications or there is significant time pressure". |
| 54 | Checklist-based testing | Checklists should not contain items checkable automatically, items better as entry/exit criteria, items too general | 1 | PASS | S1 4.4.3, same wording. |
| 55 | Acceptance criteria | Conditions the implementation must meet; viewable as test conditions; two common formats: scenario-oriented (Given/When/Then) and rule-oriented | 1 | PASS | S1 4.5.2. |
| 56 | Acceptance criteria | ATDD writes test cases before the story is implemented; first positive, then negative, then non-functional | 1 | PASS | S1 4.5.3: "Test cases are created prior to implementing the user story"; "first test cases are positive ... negative testing ... non-functional quality characteristics". |
| 57 | From designed cases to automated tests | Claude matches the style of existing tests; run new tests, fix failures; show evidence | 3, 4 | PASS | S3: "Claude examines your existing test files to match the style"; "run the new tests and fix any failures". S4: "Have Claude show evidence rather than asserting success". |
| 58 | From designed cases to automated tests | "Playwright can parameterize tests from a list of data, as long as each test name is unique." | 6 | PASS | S6 example iterates an array with `.forEach(...)`; its comment: "You can also do it with test.describe() or with multiple tests as long the test name is unique." Paraphrase is accurate. |
| 59 | From designed cases to automated tests | Playwright ships three agents: planner (explores app, Markdown plan), generator (plan to test files), healer (runs suite, repairs failing tests) | 7 | PASS | S7: "planner explores the app and produces a Markdown test plan"; "generator transforms the Markdown plan into the Playwright Test files"; "healer executes the test suite and automatically repairs failing tests". |
| 60 | From designed cases to automated tests | `npx playwright init-agents --loop=claude`; run again when Playwright updates | 7 | PASS | S7: "`npx playwright init-agents --loop=claude`"; "These definitions should be regenerated whenever Playwright is updated". |
| 61 | From designed cases to automated tests | `specs/` holds Markdown test plans; `tests/seed.spec.ts` is the seed test | 7 | PASS | S7 conventions: "specs/ # human-readable test plans"; "seed.spec.ts # seed test for environment". |
| 62 | Callout: keep the healer honest | Advice not to change production code to pass a test | none | OPINION-OK | Advice; no checkable claim. |
| 63 | A reusable test-design skill | Skill = directory with `SKILL.md` in `.claude/skills/<name>/`; example uses `name`, `description`, `disable-model-invocation`; `$ARGUMENTS`; start with `/skill-name` | 4 | PASS | S4: "adding a directory with a `SKILL.md` to `.claude/skills/`"; `fix-issue` example with `name`, `description`, `disable-model-invocation: true` and `$ARGUMENTS`; "Run `/fix-issue 1234`". "`$ARGUMENTS` receives the text after the command" is the natural reading of that example. |
| 64 | A reusable test-design skill | SKILL.md example (technique field, case counts "this tutorial's sanity heuristic, not a standard") | none | EXAMPLE-OK | Labeled example; frontmatter fields all appear in S4. Heuristic is labeled the tutorial's own. |
| 65 | nav description | "Turn requirements into test cases with ISTQB test design techniques." | page | PASS | Page applies ISTQB CTFL/CTAL-TA techniques to requirements; sources S1, S2 support. Tagline "from requirements to solid test cases" makes no checkable claim. |
| 66 | metadata description | "equivalence partitions, boundary values, decision tables, state transitions, and pairwise testing" | page | PASS | Each has a section with sources. |

## Round 2 (2026-10-10, writer commit 709ada9)

Diff checked: `git diff 64592ce 709ada9 -- content/foundations/test-design.mdx lib/nav.ts`. Two changed sentences (rows 45 and 48 above). `lib/nav.ts` is unchanged. The row 47 sentence (n-wise definition, glossary v2.3 (2014)) was removed from the page with the row 48 change; the glossary version label "v2.3 (2014)" is kept and still matches the PDF (Version 2.3, March 28th, 2014). The syllabus versions on the page (CTFL v4.0, 2023; CTAL-TA v4.0) are unchanged and still match their documents.

Open FAILs: 0

## Round 3 (review polish, 6b5b76d)

Diff checked: `git show 6b5b76d -- content/foundations/test-design.mdx`. Sources S2 (CTAL-TA v4.0 PDF, `pdftotext`) and S3 (`common-workflows.md`) re-fetched. Three changed lines.

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| R3-1 | Equivalence partitioning, example table | New row "P5 | A number that is not a whole number, for example `2.5` | Invalid" | none (Example) | EXAMPLE-OK | The table is under "Example: a quantity field accepts whole numbers from 1 to 100." P5 is consistent with that rule, and P1 to P4 are unchanged. It states no external fact. |
| R3-2 | How to work with Claude on test design | "The docs say Claude can suggest tests for \"error conditions, boundary values, and unexpected inputs that are often overlooked\"." | 3 | PASS | S3: "Claude can analyze your code paths and suggest tests for error conditions, boundary values, and unexpected inputs that are often overlooked." The quote is verbatim. |
| R3-3 | Pairwise testing, example | "A pairwise set must cover each pair of values for any two of these parameters." (36 full combinations = 3 x 2 x 3 x 2 is unchanged) | 2 | PASS | S2 3.1.2: "Pairwise coverage, in which coverage items are pairs of parameter-value pairs for any two parameters." Cite 2 is the CTAL-TA source, so the number is correct. The old "far fewer tests" claim is gone. |

Cite numbers: all exist; all 7 sources are still cited.

Open FAILs: 0

## Round 4 (final review fixes)

Scope: `git diff 451b292 HEAD -- content/` (commit 8a78933; later commits 6c7651c and 564d1b3 do not touch this page). Sources re-fetched 2026-10-10.

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| R4-1 | A reusable test-design skill | SKILL.md example: `description: Designs test cases ... Use when the user asks for test cases or coverage.` | none (labeled example) | EXAMPLE-OK | Labeled "Example". `name`, `description`, `disable-model-invocation`, `$ARGUMENTS` are the fields in the cited docs example (source 4, round 2 row 63). Description text is the tutorial's own. |
| R4-2 | A reusable test-design skill | "- Aim for 6 to 12 cases in total." and "If coverage needs more than 12 cases, list the coverage items and ask which to keep." | none | EXAMPLE-OK | Inside the SKILL.md example under the heading "Sanity heuristic (this tutorial's, not a standard)". No standard is claimed. |
| R4-3 | Sources | Publisher of sources 6 and 7: "Microsoft (Playwright docs)" -> "Microsoft (playwright.dev)"; URLs unchanged | 6, 7 | PASS | URL list unchanged (script check). |

Cite numbers: unchanged; all 7 exist and are used.

Open FAILs: 0
