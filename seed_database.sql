-- Comprehensive USDA Rural Development Programs, FAQs, and Documents Seed Data

-- Insert Programs
INSERT INTO programs (title, description, url, category, eligibility, benefits, application_process) VALUES

-- Housing Programs
('Single Family Housing Direct Home Loans (Section 502)',
'The Section 502 Direct Loan Program assists low- and very-low-income applicants in obtaining adequate housing in rural areas by providing payment assistance to increase an applicant''s repayment ability.',
'https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-direct-home-loans',
'housing',
'Must have income at or below the low-income limit for the area. Unable to obtain affordable credit elsewhere. Must occupy the dwelling as their primary residence. Property must be located in an eligible rural area.',
'Payment assistance through subsidies that can reduce your interest rate to as low as 1%. 100% financing - no down payment required. 33 or 38-year loan terms. Can be used for new construction, purchase, or repair.',
'Contact your local USDA Rural Development office. Complete a loan application (Form RD 410-4). Provide proof of income, credit history, and ability to repay. Property must meet appraisal and inspection requirements.'),

('Single Family Housing Guaranteed Loan Program (Section 502)',
'USDA guarantees loans made by private lenders to low- and moderate-income borrowers, making homeownership more accessible in rural areas.',
'https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-guaranteed-loan-program',
'housing',
'Must have income at or below the moderate-income limit for the area. Must demonstrate ability to repay the loan. Property must be located in an eligible rural area and be a modest, single-family dwelling. Must occupy as primary residence.',
'100% financing available (no down payment). Lower mortgage insurance rates compared to FHA. Competitive interest rates. Can finance closing costs. No maximum purchase price limit.',
'Find an approved lender in your area. Apply through the lender who will process your application. Lender submits loan to USDA for guarantee approval. Close on your home loan.'),

('Single Family Housing Repair Loans & Grants (Section 504)',
'Loans and grants to very-low-income homeowners to repair, improve, or modernize their homes or grants to elderly very-low-income homeowners to remove health and safety hazards.',
'https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-repair-loans-grants',
'housing',
'Must be very-low income. Unable to obtain affordable credit elsewhere. Must own and occupy the home. Home must be in an eligible rural area. For grants: must be age 62 or older.',
'Loan amount up to $40,000 at 1% interest for 20 years. Grant amount up to $10,000. Can be used for repairs, improvements, or removing health and safety hazards. Can combine loan and grant.',
'Contact your local USDA Rural Development office. Complete application Form RD 410-4. Provide income verification and property documentation. Inspection required. Must provide estimates for proposed repairs.'),

('Multi-Family Housing Direct Loans (Section 515)',
'Provides financing to develop affordable multi-family rental housing for very low-, low-, and moderate-income families, the elderly, and persons with disabilities in eligible rural areas.',
'https://www.rd.usda.gov/programs-services/multi-family-housing-programs/multi-family-housing-direct-loans',
'housing',
'Must be a legal entity (individual, nonprofit, limited partnership, etc.). Property must serve very low-, low-, and moderate-income rural residents. Located in eligible rural areas.',
'Below-market interest rate loans. 30-50 year term. Up to 50 units typically. Can finance new construction, acquisition with or without rehabilitation. Rental assistance available for tenants.',
'Submit pre-application to state office. If selected, submit full application with architectural plans, market study, operating budget. Environmental review required. Must meet USDA design standards.'),

-- Business Programs
('Business & Industry Loan Guarantees (B&I)',
'USDA guarantees up to 80% of a loan made by a commercial lender to a business in a rural area, improving access to capital for rural businesses.',
'https://www.rd.usda.gov/programs-services/business-programs/business-industry-loan-guarantees',
'business',
'Business must be located in an eligible rural area (generally under 50,000 population). Must demonstrate ability to repay loan. Must provide tangible balance sheet equity of at least 10% (25% for new businesses). Cannot provide funds for prohibited uses like golf courses, racetracks.',
'Guarantee up to 80% or $25 million, whichever is less. Can be used for working capital, machinery, equipment, buildings, real estate. Lenders more likely to make loans with guarantee. Longer repayment terms possible.',
'Work with a commercial lender. Lender prepares application and submits to USDA. USDA reviews and issues commitment. Close on loan through lender.'),

('Rural Business Development Grants',
'Provides grants to eligible entities to finance and facilitate development of small and emerging private businesses in rural areas.',
'https://www.rd.usda.gov/programs-services/business-programs/rural-business-development-grants',
'business',
'Must be a public body, nonprofit corporation, Indian tribe, or cooperative. Must serve rural area. Project must support business development, training, or technical assistance.',
'Grant awards up to $500,000. Can be used for training, technical assistance, acquisition of equipment for training, economic development planning. 25% match required.',
'Submit application through Grants.gov or state USDA Rural Development office. Must demonstrate capacity to deliver program. Project must show economic impact. Competitive application process.'),

('Value-Added Producer Grants',
'Helps agricultural producers enter into value-added activities to generate new products, expand marketing opportunities, and increase producer income.',
'https://www.rd.usda.gov/programs-services/business-programs/value-added-producer-grants',
'business',
'Must be an independent producer, agricultural producer group, farmer/rancher cooperative, or majority-controlled producer-based business. Must be adding value to agricultural commodity.',
'Planning grants up to $75,000. Working capital grants up to $250,000. Can be used for feasibility studies, business plans, marketing strategies, working capital for processing and marketing. 50% match required.',
'Applications accepted through Grants.gov. Must submit detailed business plan or feasibility study. Show how project adds value to agricultural commodity. Competitive scoring process.'),

('Rural Microentrepreneur Assistance Program',
'Provides loans and grants to Microenterprise Development Organizations (MDOs) to support the development of microenterprises in rural areas.',
'https://www.rd.usda.gov/programs-services/business-programs/rural-microentrepreneur-assistance-program',
'business',
'Microenterprises must have fewer than 10 employees. Must be located in rural area. MDO must demonstrate capacity to deliver microenterprise services.',
'Direct loans to microenterprises up to $50,000. Grants to MDOs for technical assistance. Low interest rates. Can be used for working capital, equipment, supplies, inventory.',
'Microenterprises work through approved MDOs. MDO helps prepare loan application. USDA provides loan funds to MDO who then loans to microenterprise.'),

-- Broadband Programs
('ReConnect Program',
'Provides loans, grants, and loan/grant combinations to facilitate broadband deployment in areas of rural America without sufficient access to high-speed internet.',
'https://www.rd.usda.gov/programs-services/telecommunications-programs/reconnect-program',
'broadband',
'Must serve rural area without sufficient access to broadband (speed threshold set in NOFO). Must offer minimum 100 Mbps download/20 Mbps upload speeds. Open to corporations, limited liability companies, cooperatives, nonprofits, and others.',
'100% grants, 50/50 loan/grant combinations, or 100% loans available. Up to $35 million per application. Can be used for construction, improvement, or acquisition of facilities and equipment. Covers costs of deployment.',
'Applications accepted through Grants.gov during announced funding rounds. Must submit detailed project area map, network design, cost estimates, subscriber projections. Competitive scoring process.'),

('Community Connect Grant Program',
'Provides financial assistance to eligible applicants that will provide broadband service in rural, economically-challenged communities.',
'https://www.rd.usda.gov/programs-services/telecommunications-programs/community-connect-grants',
'broadband',
'Must serve rural area lacking broadband service. At least 15% of households must have income below poverty line or area unemployment rate 150% of national average. Must establish community center with free broadband access.',
'Grants up to $3 million (may vary by funding round). Must provide minimum 100 Mbps download/20 Mbps upload. Must include community center with public computer access. No matching funds required.',
'Submit application during announced funding window through Grants.gov. Must include network design, cost estimates, community center details. Show economic need of service area.'),

('Telecommunications Infrastructure Loan Program',
'Provides direct loans for the costs of construction, improvement, or acquisition of facilities and equipment needed to provide broadband service in eligible rural areas.',
'https://www.rd.usda.gov/programs-services/telecommunications-programs/telecommunications-infrastructure-loans-loan-guarantees',
'broadband',
'Must be legally organized entity (cooperative, nonprofit, mutual, public body, for-profit). Must serve rural area lacking sufficient broadband. Financial capability to repay loan required.',
'Loans up to 50% of total project costs (exceptions may apply). Cost-of-money interest rate (tied to Treasury rates). Terms up to 25 years typically. Can be used for broadband deployment infrastructure.',
'Submit application to USDA Rural Development. Provide detailed engineering plans, financial projections, subscriber forecasts. Must demonstrate technical and financial feasibility.'),

-- Energy Programs
('Rural Energy for America Program (REAP)',
'Provides guaranteed loan financing and grant funding to agricultural producers and rural small businesses for renewable energy systems or to make energy efficiency improvements.',
'https://www.rd.usda.gov/programs-services/energy-programs/rural-energy-america-program-renewable-energy-systems-energy-efficiency-improvement-guaranteed-loans',
'energy',
'Agricultural producers (at least 50% income from agricultural operations) or rural small businesses in eligible rural areas. Small businesses must be located in a town of 50,000 or less.',
'Grants up to 25% of project costs (maximum $500,000 for renewables, $250,000 for EE). Loan guarantees up to 75% of costs (maximum $25 million). Can be combined. Eligible renewable energy types: solar, wind, biomass, geothermal, hydropower, hydrogen.',
'Submit application through state USDA Rural Development office or Grants.gov. Provide technical reports, cost estimates, energy production calculations. Applications accepted year-round. Competitive scoring for grants.'),

('High Energy Cost Grant Program',
'Provides financial assistance to communities with extremely high residential energy costs to acquire, construct, extend, upgrade, or otherwise improve energy generation, transmission, or distribution facilities.',
'https://www.rd.usda.gov/programs-services/energy-programs/high-energy-cost-grants',
'energy',
'Must be in a community where average residential energy cost per household exceeds 275% of the national average. Population under 10,000. Located in a state with average energy costs exceeding 150% of national average.',
'Grants up to 75% of project costs (up to $3 million per project, $7.5 million per state). Can be used for energy generation, transmission, distribution improvements. May include renewables, efficiency upgrades.',
'Applications announced through Federal Register notices. Submit through Grants.gov. Must document energy costs, proposed improvements, community benefit. Include engineering reports and cost estimates.'),

-- Water Programs
('Water & Waste Disposal Loan & Grant Program',
'Provides funding to develop water and waste disposal systems in rural areas and towns with populations of 10,000 or less.',
'https://www.rd.usda.gov/programs-services/water-environmental-programs/water-waste-disposal-loan-grant-program',
'water',
'Must be a public body, nonprofit organization, or Indian tribe. Serve rural area or town with population 10,000 or less. Must have legal capacity, authority, and ability to borrow, repay, and maintain facilities.',
'Loans with terms up to 40 years at affordable rates. Grants based on median household income (lower income = higher grant percentage). Can combine loans and grants. Used for drinking water, sanitary sewers, solid waste, storm drainage.',
'Contact state USDA Rural Development office. Submit Form RD 1942-1 (pre-application). If selected, submit full application with engineering report, environmental review, financial documents.',
'Grant amounts based on community median household income and project costs. Lower-income communities receive higher grant percentages.'),

('Water & Waste Disposal Predevelopment Planning Grants',
'Provides funding to assist in the predevelopment costs of proposed water and waste disposal projects.',
'https://www.rd.usda.gov/programs-services/water-environmental-programs/water-waste-disposal-predevelopment-planning-grants',
'water',
'Eligible applicants must be public bodies, nonprofit organizations, or federally recognized tribes serving rural areas with populations of 10,000 or less.',
'Grants up to $30,000 or 75% of costs. Can be used for preliminary engineering feasibility studies, design reports, environmental analyses. Helps communities prepare for full project applications.',
'Submit application to state USDA Rural Development office. Provide project description, preliminary cost estimates, explanation of need. Show that community cannot afford planning costs.'),

('Emergency Community Water Assistance Grants',
'Assists rural communities experiencing a significant decline in quality or quantity of drinking water due to an emergency.',
'https://www.rd.usda.gov/programs-services/water-environmental-programs/emergency-community-water-assistance-grants',
'water',
'Must have a significant decline in quantity or quality of water. Natural disaster or unforeseen circumstance. Serves rural area or town of 10,000 or less. MHI at or below state nonmetropolitan median.',
'Grants up to $150,000 for 120 days or less, or up to $1 million if over 120 days. Can be used for waterline extensions, repairs, new water sources, treatment facilities. No matching funds required.',
'Apply immediately when emergency occurs. Contact state USDA Rural Development office. Provide documentation of emergency, proposed solution, cost estimates. Expedited review process.'),

-- Community Facilities
('Community Facilities Direct Loan & Grant Program',
'Provides affordable funding to develop essential community facilities in rural areas, including healthcare, public safety, and public services.',
'https://www.rd.usda.gov/programs-services/community-facilities/community-facilities-direct-loan-grant-program',
'community',
'Public bodies, nonprofit organizations, and Indian tribes in rural areas and towns with populations of 20,000 or less. Must have legal authority to borrow, repay, and maintain facilities.',
'Loans up to 40 years at affordable rates. Grants based on community income and project type. Can combine loans and grants. Used for hospitals, fire stations, schools, libraries, childcare, community centers, public buildings.',
'Submit pre-application Form RD 1942-1 to state office. If selected, submit full application with project details, financial statements, legal documents. Environmental review required. Board resolution authorizing project.'),

('Community Facilities Technical Assistance & Training Grants',
'Provides funding to associations to provide technical assistance and training to rural communities on community facility projects.',
'https://www.rd.usda.gov/programs-services/community-facilities/community-facilities-technical-assistance-training-grants',
'community',
'Must be a public body or private nonprofit corporation. Must have experience providing technical assistance. Serve multiple states or a state/substate area.',
'Grants up to $150,000 (multi-state) or $75,000 (state/substate). Can be used for feasibility studies, technical assistance, training programs. Help communities prepare applications, manage projects.',
'Submit application through Grants.gov during announced funding periods. Demonstrate experience and capacity. Show how assistance will help rural communities. Competitive selection process.'),

('Rural Healthcare Programs',
'Multiple programs supporting rural healthcare infrastructure, telemedicine, and healthcare access in rural and tribal communities.',
'https://www.rd.usda.gov/programs-services/community-facilities/healthcare-programs',
'community',
'Healthcare providers, networks, and organizations serving rural areas. Specific eligibility varies by program type (direct care, telemedicine, network grants).',
'Various funding types: loans, grants, loan guarantees for healthcare facilities. Telemedicine equipment and services. Healthcare network development. Distance learning for medical education.',
'Program-specific applications. Contact state USDA Rural Development office or visit website for current funding opportunities. May require needs assessment, network plan, or equipment proposals.')

ON CONFLICT DO NOTHING;

-- Insert FAQs
INSERT INTO faqs (question, answer, category) VALUES

('What is a rural area according to USDA?',
'Generally, USDA defines rural areas as any area other than a city or town with a population of more than 50,000 and the urbanized area contiguous to such city or town. However, definitions vary by program. Some programs use population thresholds of 10,000, 20,000, or 35,000. You can check if your address is eligible using the USDA property eligibility website at: https://eligibility.sc.egov.usda.gov/eligibility/welcomeAction.do',
'housing'),

('Do I need a down payment for a USDA home loan?',
'For the Section 502 Direct Loan, no down payment is required - 100% financing is available. For the Section 502 Guaranteed Loan (through approved lenders), 100% financing is also available, meaning no down payment is required. However, you''ll need funds for closing costs, though these can sometimes be financed into the loan or paid by the seller.',
'housing'),

('What are the income limits for USDA housing programs?',
'Income limits vary by county, household size, and program type. For Direct Loans (Section 502), income must be at or below low-income limits (typically 50-80% of area median income). For Guaranteed Loans, income must be at or below moderate-income limits (typically up to 115% of area median income). Check current limits for your area at the USDA website or contact your local office.',
'housing'),

('Can I use a USDA loan to build a house?',
'Yes, both the Section 502 Direct Loan and Section 502 Guaranteed Loan can be used for new construction. The home must meet USDA property standards and be built by a licensed contractor. Construction must be completed within a specified timeframe. The home must be modest in size and design - no luxury features like swimming pools.',
'housing'),

('What credit score do I need for a USDA guaranteed loan?',
'While USDA doesn''t set a minimum credit score requirement, most approved lenders require a credit score of at least 640 for automated underwriting approval. Scores below 640 may still be eligible but require manual underwriting and additional documentation. Some lenders may have higher requirements.',
'housing'),

('What is the Rural Energy for America Program (REAP)?',
'REAP provides grants and loan guarantees to help agricultural producers and rural small businesses install renewable energy systems (solar, wind, biomass, geothermal, hydropower) or make energy efficiency improvements. Grants can cover up to 25% of project costs, and loan guarantees can cover up to 75%. The programs can be combined.',
'energy'),

('Who is eligible for REAP grants?',
'Agricultural producers who derive at least 50% of their gross income from agricultural operations, or rural small businesses located in eligible rural areas (generally towns of 50,000 or less). The business or farm must be located in a rural area. Agricultural producers can be located anywhere in rural America.',
'energy'),

('What types of energy improvements are eligible for REAP?',
'Renewable energy systems including solar panels, wind turbines, biomass systems, geothermal heat pumps, small hydropower, hydrogen systems, and renewable fuel production. Energy efficiency improvements include HVAC upgrades, insulation, lighting upgrades, cooling systems, and other measures that reduce energy consumption. Must show measurable energy savings.',
'energy'),

('What is the ReConnect Program?',
'ReConnect provides loans, grants, and loan-grant combinations to build broadband infrastructure in rural areas that currently lack sufficient broadband access. The program aims to deploy high-speed internet (minimum 100 Mbps download/20 Mbps upload) to unserved or underserved rural areas. Funding is competitive and announced through periodic funding rounds.',
'broadband'),

('Who can apply for ReConnect funding?',
'Eligible applicants include corporations, limited liability companies, cooperatives, nonprofit organizations, public bodies, and federally recognized tribes. Applicants must propose to serve rural areas that lack sufficient broadband access (specific speed thresholds defined in each funding round). Must demonstrate technical and financial capability.',
'broadband'),

('What can Community Facilities funds be used for?',
'Community Facilities funding can be used for essential community facilities including healthcare facilities (hospitals, clinics), public safety buildings (fire stations, police), community centers, libraries, schools, childcare centers, senior centers, and other public service facilities. Both construction of new facilities and improvements to existing ones are eligible.',
'community'),

('What is the Business & Industry (B&I) Loan Guarantee Program?',
'The B&I program guarantees loans made by commercial lenders to rural businesses. USDA can guarantee up to 80% of a loan or $25 million, whichever is less. This reduces risk for lenders, making them more likely to approve loans for rural businesses. Funds can be used for working capital, equipment, real estate, and business acquisitions.',
'business'),

('What is the difference between USDA Direct Loans and Guaranteed Loans for housing?',
'Direct Loans are funded by USDA and offered to very-low and low-income applicants. They feature payment assistance subsidies that can reduce interest rates to as low as 1%. Guaranteed Loans are made by commercial lenders with USDA providing a guarantee. They''re available to low and moderate-income applicants. Guaranteed loans typically have faster processing since they go through private lenders.',
'housing'),

('Can I refinance my home with a USDA loan?',
'The USDA Section 502 Guaranteed Loan program does allow refinancing in certain situations through the Streamline Assist refinance option (for existing USDA borrowers) or the Non-Streamline refinance option. You must currently have a USDA loan, be current on payments, and meet program requirements. Refinancing must benefit the borrower through lower interest rate or more stable loan terms.',
'housing'),

('How long does USDA loan approval take?',
'For Guaranteed Loans (through lenders), the USDA portion typically takes 7-10 business days once the lender submits a complete application. The overall loan process takes 30-45 days from application to closing. For Direct Loans (through USDA offices), the process takes longer - typically 60-90 days due to the detailed review process and often high application volume.',
'housing'),

('What grants are available for small rural businesses?',
'Rural Business Development Grants provide up to $500,000 for technical assistance, training, and business development. Value-Added Producer Grants help farmers/ranchers create value-added products (up to $250,000). Rural Microentrepreneur Assistance provides loans up to $50,000 for very small businesses. Grants for technical assistance and feasibility studies may also be available.',
'business')

ON CONFLICT DO NOTHING;

-- Insert Documents
INSERT INTO documents (title, description, document_url, document_type, category, file_format) VALUES

('Single Family Housing Direct Loan Fact Sheet',
'Overview of the Section 502 Direct Loan program including eligibility, benefits, and how to apply.',
'https://www.rd.usda.gov/sites/default/files/fact-sheet/508_RD_FS_RHS_SFH502Direct.pdf',
'Fact Sheet',
'housing',
'pdf'),

('Single Family Housing Guaranteed Loan Fact Sheet',
'Information about USDA loan guarantees for moderate-income rural homebuyers.',
'https://www.rd.usda.gov/sites/default/files/fact-sheet/508_RD_FS_RHS_SFH502Guaranteed.pdf',
'Fact Sheet',
'housing',
'pdf'),

('Rural Energy for America Program (REAP) Fact Sheet',
'Details on REAP grants and loan guarantees for renewable energy and energy efficiency projects.',
'https://www.rd.usda.gov/sites/default/files/fact-sheet/508_RD_FS_RBS_REAP.pdf',
'Fact Sheet',
'energy',
'pdf'),

('ReConnect Program Guide',
'Comprehensive guide to the ReConnect rural broadband program.',
'https://www.rd.usda.gov/programs-services/telecommunications-programs/reconnect-program',
'Guide',
'broadband',
'pdf'),

('Community Facilities Program Overview',
'Overview of loans and grants available for essential community facilities in rural areas.',
'https://www.rd.usda.gov/sites/default/files/fact-sheet/508_RD_FS_RUS_CommFacilities.pdf',
'Fact Sheet',
'community',
'pdf'),

('Water & Waste Disposal Loans & Grants Fact Sheet',
'Information about funding for rural water and wastewater infrastructure projects.',
'https://www.rd.usda.gov/sites/default/files/fact-sheet/508_RD_FS_RUS_WaterWasteDisposal.pdf',
'Fact Sheet',
'water',
'pdf'),

('Business & Industry Loan Guarantee Fact Sheet',
'Details on B&I loan guarantees to help rural businesses access capital.',
'https://www.rd.usda.gov/sites/default/files/fact-sheet/508_RD_FS_RBS_BILoanGuarantee.pdf',
'Fact Sheet',
'business',
'pdf'),

('Value-Added Producer Grant Program Overview',
'Information about grants to help agricultural producers develop value-added products.',
'https://www.rd.usda.gov/sites/default/files/fact-sheet/508_RD_FS_RBS_VAPG.pdf',
'Fact Sheet',
'business',
'pdf')

ON CONFLICT DO NOTHING;
