import json
import os
from supabase import create_client, Client

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Comprehensive USDA Rural Development Programs
programs = [
    {
        "title": "Section 502 Direct Loan Program",
        "title_es": "Programa de Préstamos Directos Sección 502",
        "title_zh": "502节直接贷款计划",
        "title_vi": "Chương trình Vay trực tiếp Mục 502",
        "description": "Provides low-interest loans to low and very-low income applicants to purchase, build, repair, renovate or relocate a home in eligible rural areas.",
        "description_es": "Proporciona préstamos de bajo interés a solicitantes de ingresos bajos y muy bajos para comprar, construir, reparar, renovar o reubicar una vivienda en áreas rurales elegibles.",
        "description_zh": "为低收入和极低收入申请人提供低息贷款，用于在符合条件的农村地区购买、建造、修理、翻新或搬迁房屋。",
        "description_vi": "Cung cấp các khoản vay lãi suất thấp cho người nộp đơn có thu nhập thấp và rất thấp để mua, xây dựng, sửa chữa, cải tạo hoặc di chuyển nhà ở các khu vực nông thôn đủ điều kiện.",
        "url": "https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-direct-home-loans",
        "category": "Housing",
        "eligibility": "Must be a U.S. citizen, U.S. non-citizen national, or qualified alien. Must have low or very low income (typically 50-80% of area median income). Must be unable to obtain conventional credit. Property must be located in an eligible rural area. Must demonstrate repayment ability.",
        "benefits": "Low fixed interest rates (as low as 1%). No down payment required for qualified applicants. 100% financing available. 30 or 33-year terms. Payment assistance available through subsidy programs.",
        "application_process": "1. Contact your local USDA Rural Development office. 2. Complete a pre-application to determine eligibility. 3. Gather required documentation (proof of income, credit history, employment verification). 4. Submit formal application. 5. Property appraisal and inspection. 6. Loan closing and funding.",
        "keywords": ["housing", "home loan", "502", "direct loan", "low income", "rural housing", "purchase", "build"]
    },
    {
        "title": "Section 504 Home Repair Loans and Grants",
        "title_es": "Préstamos y Subvenciones para Reparación de Viviendas Sección 504",
        "title_zh": "504节房屋维修贷款和补助金",
        "title_vi": "Vay và Trợ cấp Sửa chữa Nhà Mục 504",
        "description": "Provides loans and grants to very-low-income homeowners to repair, improve or modernize their homes or to remove health and safety hazards.",
        "description_es": "Proporciona préstamos y subvenciones a propietarios de viviendas de ingresos muy bajos para reparar, mejorar o modernizar sus hogares o para eliminar peligros para la salud y la seguridad.",
        "description_zh": "为极低收入房主提供贷款和补助金，用于修理、改善或现代化他们的房屋或消除健康和安全隐患。",
        "description_vi": "Cung cấp các khoản vay và trợ cấp cho chủ nhà có thu nhập rất thấp để sửa chữa, cải thiện hoặc hiện đại hóa nhà của họ hoặc loại bỏ các mối nguy hiểm về sức khỏe và an toàn.",
        "url": "https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-repair-loans-grants",
        "category": "Housing",
        "eligibility": "Must be very low income (50% or less of area median income). Must own and occupy the property. Property must be in eligible rural area. For grants: Must be 62 years or older and unable to repay a loan.",
        "benefits": "Loans up to $40,000 at 1% interest for 20 years. Grants up to $10,000 for seniors 62+. Can combine loan and grant (up to $50,000 total). No monthly payments during active agricultural season for farmer applicants.",
        "application_process": "1. Contact local USDA Rural Development office. 2. Submit application with income documentation. 3. Property inspection to identify needed repairs. 4. Approval and fund disbursement. 5. Complete repairs with approved contractors.",
        "keywords": ["housing", "repair", "504", "grant", "loan", "seniors", "home improvement", "very low income"]
    },
    {
        "title": "Section 515 Rural Rental Housing Loans",
        "title_es": "Préstamos para Viviendas de Alquiler Rurales Sección 515",
        "title_zh": "515节农村租赁住房贷款",
        "title_vi": "Vay Nhà cho thuê Nông thôn Mục 515",
        "description": "Provides loans to develop affordable multi-family rental housing for very low-, low-, and moderate-income families; the elderly; and persons with disabilities in eligible rural areas.",
        "description_es": "Proporciona préstamos para desarrollar viviendas de alquiler multifamiliares asequibles para familias de ingresos muy bajos, bajos y moderados; personas mayores; y personas con discapacidades en áreas rurales elegibles.",
        "description_zh": "提供贷款用于为极低收入、低收入和中等收入家庭、老年人和残疾人在符合条件的农村地区开发负担得起的多户租赁住房。",
        "description_vi": "Cung cấp các khoản vay để phát triển nhà cho thuê đa gia đình giá cả phải chăng cho các gia đình có thu nhập rất thấp, thấp và trung bình; người cao tuổi; và người khuyết tật ở các khu vực nông thôn đủ điều kiện.",
        "url": "https://www.rd.usda.gov/programs-services/multi-family-housing-programs/multi-family-housing-direct-loans",
        "category": "Housing",
        "eligibility": "Available to individuals, trusts, associations, partnerships, limited partnerships, State or local public agencies, consumer cooperatives, and profit or nonprofit corporations. Must serve very low-, low-, and moderate-income families in rural areas. Property must remain affordable for at least 20 years.",
        "benefits": "Direct loans up to 100% of development costs. 50-year terms. 1% interest rate. No prepayment penalty after 20 years. Can be combined with Low-Income Housing Tax Credits and other financing.",
        "application_process": "1. Pre-application submission. 2. Site review and approval. 3. Detailed application with architectural plans. 4. Environmental review. 5. Loan approval and closing. 6. Construction and inspection. 7. Final disbursement.",
        "keywords": ["housing", "515", "rental", "multi-family", "apartment", "affordable housing", "developers", "nonprofits"]
    },
    {
        "title": "Business & Industry (B&I) Loan Guarantee Program",
        "title_es": "Programa de Garantía de Préstamos para Negocios e Industria (B&I)",
        "title_zh": "商业与工业（B&I）贷款担保计划",
        "title_vi": "Chương trình Bảo lãnh Vay Kinh doanh & Công nghiệp (B&I)",
        "description": "Provides loan guarantees to lenders to develop or finance business and industry in rural areas. Supports job creation, retention, and economic development.",
        "description_es": "Proporciona garantías de préstamos a prestamistas para desarrollar o financiar negocios e industrias en áreas rurales. Apoya la creación de empleos, la retención y el desarrollo económico.",
        "description_zh": "为贷款人提供贷款担保，以在农村地区发展或融资企业和工业。支持创造就业、保留就业和经济发展。",
        "description_vi": "Cung cấp bảo lãnh vay cho người cho vay để phát triển hoặc tài trợ kinh doanh và công nghiệp ở các khu vực nông thôn. Hỗ trợ tạo việc làm, duy trì và phát triển kinh tế.",
        "url": "https://www.rd.usda.gov/programs-services/business-programs/business-industry-loan-guarantees",
        "category": "Business",
        "eligibility": "Must be a legally organized entity. Must be located in eligible rural area (generally communities of 50,000 or less). Must demonstrate feasibility and create or save jobs. For-profit businesses, cooperatives, Indian tribes, and public bodies eligible.",
        "benefits": "Loan guarantees up to $25 million (80% for loans up to $5M, 70% for loans $5-10M, 60% for loans over $10M). Can finance working capital, equipment, real estate, and business acquisition. Long-term financing available. Competitive interest rates.",
        "application_process": "1. Work with an approved lender to prepare application. 2. Submit application to USDA including business plan and financial projections. 3. USDA review and environmental assessment. 4. Conditional commitment issued. 5. Final loan closing with lender. 6. Begin operations.",
        "keywords": ["business", "b&i", "loan guarantee", "financing", "economic development", "rural business", "manufacturing", "processing"]
    },
    {
        "title": "Rural Energy for America Program (REAP)",
        "title_es": "Programa de Energía Rural para América (REAP)",
        "title_zh": "美国农村能源计划（REAP）",
        "title_vi": "Chương trình Năng lượng Nông thôn cho Mỹ (REAP)",
        "description": "Provides guaranteed loan financing and grant funding to agricultural producers and rural small businesses for renewable energy systems and energy efficiency improvements.",
        "description_es": "Proporciona financiamiento de préstamos garantizados y fondos de subvención a productores agrícolas y pequeñas empresas rurales para sistemas de energía renovable y mejoras de eficiencia energética.",
        "description_zh": "为农业生产者和农村小企业提供可再生能源系统和能源效率改进的担保贷款融资和赠款资金。",
        "description_vi": "Cung cấp tài trợ vay được bảo lãnh và quỹ trợ cấp cho các nhà sản xuất nông nghiệp và doanh nghiệp nhỏ nông thôn cho các hệ thống năng lượng tái tạo và cải thiện hiệu quả năng lượng.",
        "url": "https://www.rd.usda.gov/programs-services/energy-programs/rural-energy-america-program-renewable-energy-systems-energy-efficiency-improvement-guaranteed-loans",
        "category": "Energy",
        "eligibility": "Agricultural producers with at least 50% gross income from agricultural operations. Rural small businesses in eligible rural areas. Must demonstrate technical and economic feasibility.",
        "benefits": "Grants up to 25% of total eligible project costs (maximum $500,000 for renewable energy, $250,000 for energy efficiency). Loan guarantees up to $25 million. Can combine grant and loan guarantee. Covers solar, wind, biomass, geothermal, hydropower, and energy efficiency projects.",
        "application_process": "1. Conduct energy audit or renewable energy assessment. 2. Complete feasibility study. 3. Submit application during open application window. 4. USDA competitive review and scoring. 5. Award notification. 6. Project implementation and verification.",
        "keywords": ["energy", "reap", "renewable", "solar", "wind", "biomass", "energy efficiency", "grant", "agricultural"]
    },
    {
        "title": "ReConnect Program",
        "title_es": "Programa ReConnect",
        "title_zh": "ReConnect计划",
        "title_vi": "Chương trình ReConnect",
        "description": "Provides loans, grants, and loan/grant combinations to facilitate broadband deployment in rural areas that currently lack sufficient access to broadband.",
        "description_es": "Proporciona préstamos, subvenciones y combinaciones de préstamos/subvenciones para facilitar el despliegue de banda ancha en áreas rurales que actualmente carecen de acceso suficiente a banda ancha.",
        "description_zh": "提供贷款、赠款和贷款/赠款组合，以促进在目前缺乏足够宽带接入的农村地区部署宽带。",
        "description_vi": "Cung cấp các khoản vay, trợ cấp và kết hợp vay/trợ cấp để tạo điều kiện triển khai băng thông rộng ở các khu vực nông thôn hiện thiếu quyền truy cập băng thông rộng đầy đủ.",
        "url": "https://www.rd.usda.gov/programs-services/telecommunications-programs/reconnect-program",
        "category": "Utilities",
        "eligibility": "Legally organized entities including cooperatives, nonprofits, for-profit corporations, tribes, and state/local governments. Must serve areas with less than 100 Mbps download/20 Mbps upload speeds. Must provide at least 100/100 Mbps symmetrical service.",
        "benefits": "100% grants up to $35 million for extremely underserved areas. 50/50 loan/grant combinations. 100% loans with favorable terms. Covers construction, improvement, and acquisition of broadband infrastructure. Priority for areas with no existing broadband.",
        "application_process": "1. Review Funding Opportunity Announcement (FOA). 2. Determine service area eligibility. 3. Prepare detailed application with network design. 4. Submit during application window. 5. USDA review and scoring. 6. Award announcement. 7. Environmental review. 8. Construction and deployment.",
        "keywords": ["broadband", "reconnect", "internet", "fiber", "rural connectivity", "telecommunications", "high-speed internet"]
    },
    {
        "title": "Water & Waste Disposal Loan & Grant Program",
        "title_es": "Programa de Préstamos y Subvenciones para Agua y Eliminación de Desechos",
        "title_zh": "水和废物处理贷款和补助金计划",
        "title_vi": "Chương trình Vay và Trợ cấp Nước & Xử lý Chất thải",
        "description": "Provides funding to develop water and wastewater systems in rural communities with 10,000 or fewer residents. Helps ensure clean, reliable drinking water systems and sanitary waste disposal.",
        "description_es": "Proporciona financiamiento para desarrollar sistemas de agua y aguas residuales en comunidades rurales con 10,000 o menos residentes. Ayuda a garantizar sistemas de agua potable limpios y confiables y la eliminación sanitaria de desechos.",
        "description_zh": "为拥有10,000名或更少居民的农村社区开发供水和废水系统提供资金。帮助确保清洁、可靠的饮用水系统和卫生废物处理。",
        "description_vi": "Cung cấp tài trợ để phát triển hệ thống nước và nước thải ở các cộng đồng nông thôn có 10.000 cư dân trở xuống. Giúp đảm bảo hệ thống nước uống sạch, đáng tin cậy và xử lý chất thải vệ sinh.",
        "url": "https://www.rd.usda.gov/programs-services/water-environmental-programs/water-waste-disposal-loan-grant-program",
        "category": "Utilities",
        "eligibility": "Public bodies, nonprofits, and federally recognized tribes. Must serve rural areas with 10,000 or fewer residents. Must demonstrate need and financial capacity. Priority to communities with health and sanitary problems.",
        "benefits": "Loans up to the full development cost. Grants based on median household income and project costs. Can combine loans and grants. Long-term financing (up to 40 years). Low interest rates. Covers construction, improvements, and acquisitions of water/waste systems.",
        "application_process": "1. Contact state USDA Rural Development office. 2. Pre-application submission. 3. Preliminary engineering report. 4. Full application with environmental review. 5. Loan/grant approval. 6. Procurement and construction. 7. Project completion and closeout.",
        "keywords": ["water", "wastewater", "waste disposal", "sewer", "infrastructure", "drinking water", "sanitation", "rural utilities"]
    },
    {
        "title": "Community Facilities Direct Loan & Grant Program",
        "title_es": "Programa de Préstamos y Subvenciones Directas para Instalaciones Comunitarias",
        "title_zh": "社区设施直接贷款和补助金计划",
        "title_vi": "Chương trình Vay trực tiếp và Trợ cấp Cơ sở vật chất Cộng đồng",
        "description": "Provides funding to develop essential community facilities in rural areas including healthcare clinics, schools, libraries, childcare centers, fire stations, and community centers.",
        "description_es": "Proporciona financiamiento para desarrollar instalaciones comunitarias esenciales en áreas rurales, incluidas clínicas de salud, escuelas, bibliotecas, centros de cuidado infantil, estaciones de bomberos y centros comunitarios.",
        "description_zh": "提供资金用于在农村地区开发基本社区设施，包括医疗诊所、学校、图书馆、托儿中心、消防站和社区中心。",
        "description_vi": "Cung cấp tài trợ để phát triển các cơ sở vật chất cộng đồng thiết yếu ở các khu vực nông thôn bao gồm phòng khám y tế, trường học, thư viện, trung tâm chăm sóc trẻ em, trạm cứu hỏa và trung tâm cộng đồng.",
        "url": "https://www.rd.usda.gov/programs-services/community-facilities/community-facilities-direct-loan-grant-program",
        "category": "Community Facilities",
        "eligibility": "Public bodies, community-based nonprofits, and federally recognized tribes. Must serve rural areas with 20,000 or fewer residents. Must demonstrate need, feasibility, and financial capacity.",
        "benefits": "Loans up to full project cost with up to 40-year terms. Grants available based on community need and income levels. Can combine loans and grants. Covers construction, enlargement, equipment, and land acquisition for essential community facilities.",
        "application_process": "1. Determine project feasibility and community need. 2. Contact state USDA office. 3. Pre-application submission. 4. Full application with architectural plans and budget. 5. Environmental and historical review. 6. Loan/grant approval. 7. Construction and inspections. 8. Project completion.",
        "keywords": ["community facilities", "healthcare", "school", "library", "fire station", "childcare", "public safety", "rural infrastructure"]
    },
    {
        "title": "Rural Microentrepreneur Assistance Program (RMAP)",
        "title_es": "Programa de Asistencia para Microempresarios Rurales (RMAP)",
        "title_zh": "农村微型企业家援助计划（RMAP）",
        "title_vi": "Chương trình Hỗ trợ Nhà doanh nghiệp Nhỏ Nông thôn (RMAP)",
        "description": "Provides loans and grants to support the development of rural microenterprises and microentrepreneurs. Helps create rural jobs and economic opportunities.",
        "description_es": "Proporciona préstamos y subvenciones para apoyar el desarrollo de microempresas y microempresarios rurales. Ayuda a crear empleos rurales y oportunidades económicas.",
        "description_zh": "提供贷款和赠款以支持农村微型企业和微型企业家的发展。帮助创造农村就业机会和经济机会。",
        "description_vi": "Cung cấp các khoản vay và trợ cấp để hỗ trợ phát triển các doanh nghiệp nhỏ nông thôn và nhà doanh nghiệp nhỏ. Giúp tạo việc làm nông thôn và cơ hội kinh tế.",
        "url": "https://www.rd.usda.gov/programs-services/business-programs/rural-microentrepreneur-assistance-program",
        "category": "Business",
        "eligibility": "Rural microenterprises with 10 or fewer employees. Microenterprise Development Organizations (MDOs) to provide technical assistance and loans. Must be located in rural areas. Startups and existing businesses eligible.",
        "benefits": "Direct microloans up to $50,000 to microenterprises. Grants to MDOs to establish revolving loan funds and provide training/technical assistance. Low interest rates. Flexible terms. Technical assistance available.",
        "application_process": "Microenterprises: 1. Contact participating MDO. 2. Develop business plan. 3. Apply through MDO. 4. Receive technical assistance. 5. Loan closing and funding. MDOs: 1. Submit grant application to USDA. 2. Demonstrate capacity. 3. Award and establish program. 4. Provide loans and technical assistance.",
        "keywords": ["microenterprise", "small business", "startup", "entrepreneur", "microloan", "rural jobs", "business development"]
    },
    {
        "title": "Distance Learning and Telemedicine (DLT) Grants",
        "title_es": "Subvenciones para Aprendizaje a Distancia y Telemedicina (DLT)",
        "title_zh": "远程学习和远程医疗（DLT）补助金",
        "title_vi": "Trợ cấp Học từ xa và Y học từ xa (DLT)",
        "description": "Provides financial assistance to help rural communities use telecommunications technology to connect to each other and to the world for educational and medical purposes.",
        "description_es": "Proporciona asistencia financiera para ayudar a las comunidades rurales a utilizar tecnología de telecomunicaciones para conectarse entre sí y con el mundo con fines educativos y médicos.",
        "description_zh": "提供财政援助，帮助农村社区使用电信技术相互连接并连接世界以实现教育和医疗目的。",
        "description_vi": "Cung cấp hỗ trợ tài chính để giúp các cộng đồng nông thôn sử dụng công nghệ viễn thông để kết nối với nhau và với thế giới cho mục đích giáo dục và y tế.",
        "url": "https://www.rd.usda.gov/programs-services/telecommunications-programs/distance-learning-telemedicine-grants",
        "category": "Community Facilities",
        "eligibility": "Entities providing education or health care through telecommunications, including schools, libraries, colleges, medical facilities, and consortiums. Must serve rural areas. Must demonstrate need and capacity.",
        "benefits": "Grants up to $1 million (or $3 million for remote Alaska). Covers equipment, software, technical assistance, and instructional programming. Supports broadband transmission, audio/video equipment, and network connectivity. Enables access to specialists and educational resources.",
        "application_process": "1. Form consortium if applicable. 2. Conduct needs assessment. 3. Develop detailed application with network design. 4. Submit during application window. 5. USDA review and scoring. 6. Award notification. 7. Equipment procurement. 8. Installation and training. 9. Begin operations.",
        "keywords": ["distance learning", "telemedicine", "telehealth", "education", "healthcare", "telecommunications", "rural health", "technology"]
    }
]

# Comprehensive FAQs
faqs = [
    {
        "question": "What is considered a rural area?",
        "question_es": "¿Qué se considera un área rural?",
        "question_zh": "什么被认为是农村地区？",
        "question_vi": "Khu vực nông thôn được coi là gì?",
        "answer": "For most USDA Rural Development programs, rural areas are defined as communities with populations of 35,000 or fewer. However, specific programs have different population requirements: Housing programs typically serve areas with 35,000 or fewer residents; Business programs often serve communities with 50,000 or fewer; Community Facilities can serve areas up to 20,000; Water & Waste programs serve communities with 10,000 or fewer. You can check if a specific address is eligible using the USDA Rural Development Eligibility Map on their website.",
        "answer_es": "Para la mayoría de los programas de Desarrollo Rural del USDA, las áreas rurales se definen como comunidades con poblaciones de 35,000 o menos. Sin embargo, los programas específicos tienen diferentes requisitos de población: Los programas de vivienda generalmente sirven áreas con 35,000 o menos residentes; Los programas comerciales a menudo sirven comunidades con 50,000 o menos; Las Instalaciones Comunitarias pueden servir áreas de hasta 20,000; Los programas de Agua y Desechos sirven comunidades con 10,000 o menos. Puede verificar si una dirección específica es elegible usando el Mapa de Elegibilidad de Desarrollo Rural del USDA en su sitio web.",
        "answer_zh": "对于大多数美国农业部农村发展计划，农村地区定义为人口为35,000人或更少的社区。然而，特定计划有不同的人口要求：住房计划通常服务于35,000名或更少居民的地区；商业计划通常服务于50,000名或更少的社区；社区设施可以服务多达20,000的地区；水和废物计划服务于10,000名或更少的社区。您可以使用USDA农村发展资格地图在其网站上检查特定地址是否符合条件。",
        "answer_vi": "Đối với hầu hết các chương trình Phát triển Nông thôn USDA, các khu vực nông thôn được định nghĩa là các cộng đồng có dân số 35.000 người trở xuống. Tuy nhiên, các chương trình cụ thể có yêu cầu dân số khác nhau: Các chương trình nhà ở thường phục vụ các khu vực có 35.000 cư dân trở xuống; Các chương trình kinh doanh thường phục vụ các cộng đồng có 50.000 người trở xuống; Cơ sở vật chất cộng đồng có thể phục vụ các khu vực lên đến 20.000; Các chương trình Nước & Chất thải phục vụ các cộng đồng có 10.000 người trở xuống. Bạn có thể kiểm tra xem một địa chỉ cụ thể có đủ điều kiện hay không bằng cách sử dụng Bản đồ Đủ điều kiện Phát triển Nông thôn USDA trên trang web của họ.",
        "category": "Housing",
        "keywords": ["eligibility", "rural", "area", "population", "definition"]
    },
    {
        "question": "What income limits apply for USDA housing programs?",
        "question_es": "¿Qué límites de ingresos se aplican para los programas de vivienda del USDA?",
        "question_zh": "USDA住房计划有哪些收入限制？",
        "question_vi": "Giới hạn thu nhập nào áp dụng cho các chương trình nhà ở USDA?",
        "answer": "USDA housing programs use area median income (AMI) to determine eligibility. Section 502 Direct Loans: Low income (50-80% of AMI) and Very Low Income (up to 50% of AMI) qualified. No upper income limit for Section 502 Guaranteed Loans. Section 504 Repair Loans & Grants: Must be Very Low Income (50% of AMI or below). Income limits vary by county and household size. For example, a family of 4 in a county with $70,000 median income would need: Section 502 Direct: $56,000 or less; Section 504: $35,000 or less. Check with your local USDA office for specific income limits in your area.",
        "answer_es": "Los programas de vivienda del USDA usan el ingreso medio del área (AMI) para determinar la elegibilidad. Préstamos Directos Sección 502: Ingresos bajos (50-80% de AMI) y Ingresos Muy Bajos (hasta 50% de AMI) calificados. Sin límite de ingresos superiores para Préstamos Garantizados Sección 502. Préstamos y Subvenciones de Reparación Sección 504: Debe ser Ingreso Muy Bajo (50% de AMI o menos). Los límites de ingresos varían según el condado y el tamaño del hogar. Por ejemplo, una familia de 4 en un condado con un ingreso medio de $70,000 necesitaría: Sección 502 Directo: $56,000 o menos; Sección 504: $35,000 o menos. Consulte con su oficina local del USDA para conocer los límites de ingresos específicos en su área.",
        "answer_zh": "USDA住房计划使用地区中位收入（AMI）来确定资格。502节直接贷款：低收入（AMI的50-80%）和极低收入（AMI的50%以下）合格。502节担保贷款没有收入上限。504节维修贷款和补助金：必须是极低收入（AMI的50%或以下）。收入限制因县和家庭规模而异。例如，在中位收入为70,000美元的县中，一个4口之家需要：502节直接贷款：56,000美元或更少；504节：35,000美元或更少。请咨询您当地的USDA办公室了解您所在地区的具体收入限制。",
        "answer_vi": "Các chương trình nhà ở USDA sử dụng thu nhập trung bình khu vực (AMI) để xác định đủ điều kiện. Vay trực tiếp Mục 502: Thu nhập thấp (50-80% AMI) và Thu nhập rất thấp (tối đa 50% AMI) đủ điều kiện. Không có giới hạn thu nhập trên cho Vay được Bảo lãnh Mục 502. Vay & Trợ cấp Sửa chữa Mục 504: Phải là Thu nhập Rất thấp (50% AMI hoặc thấp hơn). Giới hạn thu nhập khác nhau theo quận và quy mô hộ gia đình. Ví dụ, một gia đình 4 người ở một quận có thu nhập trung bình 70.000 đô la sẽ cần: Mục 502 Trực tiếp: 56.000 đô la hoặc ít hơn; Mục 504: 35.000 đô la hoặc ít hơn. Kiểm tra với văn phòng USDA địa phương của bạn để biết giới hạn thu nhập cụ thể trong khu vực của bạn.",
        "category": "Housing",
        "keywords": ["income", "eligibility", "limits", "502", "504", "housing"]
    },
    {
        "question": "How long does the application process take?",
        "question_es": "¿Cuánto tiempo toma el proceso de solicitud?",
        "question_zh": "申请流程需要多长时间？",
        "question_vi": "Quy trình đăng ký mất bao lâu?",
        "answer": "Application processing times vary by program: Section 502 Housing Loans: Typically 30-90 days from complete application to closing. Business & Industry Loans: 60-180 days depending on project complexity. REAP Grants: Competitive process with 6-12 months from application to award. Community Facilities: 90-180 days for loans, 6-12 months for grants. ReConnect: 12-18 months from application to award due to competitive review process. Timeline can be shortened by: Submitting complete applications with all required documentation, responding quickly to information requests, working with experienced consultants or lenders, and starting the pre-application process early. Contact your state or local USDA office for specific program timelines.",
        "answer_es": "Los tiempos de procesamiento de solicitudes varían según el programa: Préstamos de Vivienda Sección 502: Típicamente 30-90 días desde la solicitud completa hasta el cierre. Préstamos de Negocios e Industria: 60-180 días dependiendo de la complejidad del proyecto. Subvenciones REAP: Proceso competitivo con 6-12 meses desde la solicitud hasta la adjudicación. Instalaciones Comunitarias: 90-180 días para préstamos, 6-12 meses para subvenciones. ReConnect: 12-18 meses desde la solicitud hasta la adjudicación debido al proceso de revisión competitiva. El cronograma puede acortarse: Enviando solicitudes completas con toda la documentación requerida, respondiendo rápidamente a las solicitudes de información, trabajando con consultores o prestamistas experimentados y comenzando el proceso de pre-solicitud temprano. Contacte a su oficina estatal o local del USDA para conocer los plazos específicos del programa.",
        "answer_zh": "申请处理时间因计划而异：502节住房贷款：从完整申请到结束通常需要30-90天。商业与工业贷款：根据项目复杂性需要60-180天。REAP补助金：竞争性流程，从申请到奖励需要6-12个月。社区设施：贷款需要90-180天，补助金需要6-12个月。ReConnect：由于竞争性审查流程，从申请到奖励需要12-18个月。可以通过以下方式缩短时间：提交包含所有必需文件的完整申请，快速回应信息请求，与经验丰富的顾问或贷款人合作，以及尽早开始预申请流程。请联系您所在州或当地的USDA办公室了解具体的计划时间表。",
        "answer_vi": "Thời gian xử lý đơn đăng ký khác nhau tùy theo chương trình: Vay Nhà ở Mục 502: Thông thường 30-90 ngày từ đơn đăng ký hoàn chỉnh đến kết thúc. Vay Kinh doanh & Công nghiệp: 60-180 ngày tùy thuộc vào độ phức tạp của dự án. Trợ cấp REAP: Quy trình cạnh tranh với 6-12 tháng từ đơn đăng ký đến giải thưởng. Cơ sở vật chất Cộng đồng: 90-180 ngày cho vay, 6-12 tháng cho trợ cấp. ReConnect: 12-18 tháng từ đơn đăng ký đến giải thưởng do quy trình xem xét cạnh tranh. Thời gian có thể được rút ngắn bằng cách: Nộp đơn đăng ký hoàn chỉnh với tất cả các tài liệu cần thiết, trả lời nhanh chóng các yêu cầu thông tin, làm việc với các nhà tư vấn hoặc người cho vay có kinh nghiệm và bắt đầu quy trình tiền đăng ký sớm. Liên hệ với văn phòng USDA tiểu bang hoặc địa phương của bạn để biết thời gian cụ thể của chương trình.",
        "category": "Housing",
        "keywords": ["timeline", "process", "application", "how long", "time"]
    },
    {
        "question": "Can I apply for multiple USDA programs at the same time?",
        "question_es": "¿Puedo solicitar múltiples programas del USDA al mismo tiempo?",
        "question_zh": "我可以同时申请多个USDA计划吗？",
        "question_vi": "Tôi có thể nộp đơn cho nhiều chương trình USDA cùng một lúc không?",
        "answer": "Yes, you can apply for multiple compatible USDA programs simultaneously. Common combinations include: REAP grants with B&I loan guarantees for business energy projects. Section 502 housing loans with Section 504 repair grants for home purchase and improvements. Community Facilities loans combined with Distance Learning/Telemedicine grants. Water & Waste loans combined with Community Facilities for integrated projects. However, you cannot receive duplicate funding for the same purpose (e.g., two loans for the same equipment). Stacking multiple funding sources can help reduce your out-of-pocket costs and make projects more affordable. Work with your local USDA office to identify complementary programs and coordinate applications to avoid delays or conflicts.",
        "answer_es": "Sí, puede solicitar múltiples programas compatibles del USDA simultáneamente. Las combinaciones comunes incluyen: Subvenciones REAP con garantías de préstamos B&I para proyectos de energía empresarial. Préstamos de vivienda Sección 502 con subvenciones de reparación Sección 504 para compra y mejoras de vivienda. Préstamos de Instalaciones Comunitarias combinados con subvenciones de Aprendizaje a Distancia/Telemedicina. Préstamos de Agua y Desechos combinados con Instalaciones Comunitarias para proyectos integrados. Sin embargo, no puede recibir financiamiento duplicado para el mismo propósito (por ejemplo, dos préstamos para el mismo equipo). Apilar múltiples fuentes de financiamiento puede ayudar a reducir sus costos de bolsillo y hacer que los proyectos sean más asequibles. Trabaje con su oficina local del USDA para identificar programas complementarios y coordinar solicitudes para evitar demoras o conflictos.",
        "answer_zh": "是的，您可以同时申请多个兼容的USDA计划。常见组合包括：用于商业能源项目的REAP补助金与B&I贷款担保。502节住房贷款与504节维修补助金用于购房和改进。社区设施贷款与远程学习/远程医疗补助金相结合。水和废物贷款与社区设施相结合用于综合项目。但是，您不能为同一目的获得重复资金（例如，为同一设备获得两笔贷款）。堆叠多个资金来源可以帮助减少您的自付费用并使项目更实惠。与您当地的USDA办公室合作，确定互补计划并协调申请以避免延误或冲突。",
        "answer_vi": "Có, bạn có thể nộp đơn cho nhiều chương trình USDA tương thích cùng một lúc. Các kết hợp phổ biến bao gồm: Trợ cấp REAP với bảo lãnh vay B&I cho các dự án năng lượng kinh doanh. Vay nhà ở Mục 502 với trợ cấp sửa chữa Mục 504 để mua nhà và cải thiện. Vay Cơ sở vật chất Cộng đồng kết hợp với trợ cấp Học từ xa/Y học từ xa. Vay Nước & Chất thải kết hợp với Cơ sở vật chất Cộng đồng cho các dự án tích hợp. Tuy nhiên, bạn không thể nhận được tài trợ trùng lặp cho cùng một mục đích (ví dụ: hai khoản vay cho cùng một thiết bị). Xếp chồng nhiều nguồn tài trợ có thể giúp giảm chi phí tự túc của bạn và làm cho các dự án có giá cả phải chăng hơn. Làm việc với văn phòng USDA địa phương của bạn để xác định các chương trình bổ sung và phối hợp các ứng dụng để tránh chậm trễ hoặc xung đột.",
        "category": "Business",
        "keywords": ["multiple", "programs", "combine", "stacking", "funding"]
    },
    {
        "question": "What credit score do I need for USDA loans?",
        "question_es": "¿Qué puntaje de crédito necesito para préstamos del USDA?",
        "question_zh": "我需要什么信用评分才能获得USDA贷款？",
        "question_vi": "Tôi cần điểm tín dụng nào cho các khoản vay USDA?",
        "answer": "USDA credit requirements vary by program: Section 502 Direct Loans: No minimum credit score required, but credit history is evaluated. Applicants with no credit score can qualify with alternative credit documentation (utility payments, rent receipts). Applicants with credit issues may still qualify if they can show circumstances were beyond their control and credit has improved. Section 502 Guaranteed Loans: Lenders typically require 640+ credit score, though some may accept lower scores with compensating factors. Business & Industry Loans: No specific minimum, but lenders evaluate creditworthiness. Business credit and owner credit both considered. For poor or no credit: Be prepared to explain credit problems and show current responsible payment history. Provide letters of explanation for any collections or late payments. Consider credit counseling to improve score before applying. Work with USDA-approved housing counselors for housing programs.",
        "answer_es": "Los requisitos de crédito del USDA varían según el programa: Préstamos Directos Sección 502: No se requiere puntaje de crédito mínimo, pero se evalúa el historial de crédito. Los solicitantes sin puntaje de crédito pueden calificar con documentación de crédito alternativa (pagos de servicios públicos, recibos de alquiler). Los solicitantes con problemas de crédito aún pueden calificar si pueden demostrar que las circunstancias estaban fuera de su control y que el crédito ha mejorado. Préstamos Garantizados Sección 502: Los prestamistas generalmente requieren un puntaje de crédito de 640+, aunque algunos pueden aceptar puntajes más bajos con factores compensatorios. Préstamos de Negocios e Industria: Sin mínimo específico, pero los prestamistas evalúan la solvencia. Se considera tanto el crédito comercial como el crédito del propietario. Para crédito pobre o sin crédito: Prepárese para explicar problemas de crédito y mostrar el historial de pagos responsable actual. Proporcione cartas de explicación para cualquier cobro o pago atrasado. Considere asesoramiento crediticio para mejorar la puntuación antes de aplicar. Trabaje con consejeros de vivienda aprobados por USDA para programas de vivienda.",
        "answer_zh": "USDA信用要求因计划而异：502节直接贷款：不需要最低信用评分，但会评估信用历史。没有信用评分的申请人可以通过替代信用文件（公用事业付款、租金收据）获得资格。有信用问题的申请人如果能证明情况超出了他们的控制范围并且信用已经改善，仍然可以获得资格。502节担保贷款：贷款人通常要求640+信用评分，尽管有些可能接受较低的评分并有补偿因素。商业与工业贷款：没有具体的最低要求，但贷款人评估信用worthiness。考虑商业信用和所有者信用。对于信用不良或无信用：准备解释信用问题并显示当前负责任的付款历史。为任何催收或逾期付款提供解释信。考虑在申请前进行信用咨询以提高评分。与USDA批准的住房顾问合作进行住房计划。",
        "answer_vi": "Yêu cầu tín dụng USDA khác nhau tùy theo chương trình: Vay Trực tiếp Mục 502: Không yêu cầu điểm tín dụng tối thiểu, nhưng lịch sử tín dụng được đánh giá. Người nộp đơn không có điểm tín dụng có thể đủ điều kiện với tài liệu tín dụng thay thế (thanh toán tiện ích, biên lai thuê nhà). Người nộp đơn có vấn đề về tín dụng vẫn có thể đủ điều kiện nếu họ có thể cho thấy hoàn cảnh nằm ngoài tầm kiểm soát của họ và tín dụng đã được cải thiện. Vay Được Bảo lãnh Mục 502: Người cho vay thường yêu cầu điểm tín dụng 640+, mặc dù một số có thể chấp nhận điểm thấp hơn với các yếu tố bù đắp. Vay Kinh doanh & Công nghiệp: Không có mức tối thiểu cụ thể, nhưng người cho vay đánh giá mức độ tín nhiệm. Cả tín dụng kinh doanh và tín dụng chủ sở hữu đều được xem xét. Đối với tín dụng kém hoặc không có tín dụng: Hãy chuẩn bị giải thích các vấn đề tín dụng và cho thấy lịch sử thanh toán có trách nhiệm hiện tại. Cung cấp thư giải thích cho bất kỳ khoản thu hoặc thanh toán chậm nào. Xem xét tư vấn tín dụng để cải thiện điểm trước khi nộp đơn. Làm việc với các cố vấn nhà ở được USDA phê duyệt cho các chương trình nhà ở.",
        "category": "Housing",
        "keywords": ["credit", "score", "requirements", "eligibility", "loans"]
    }
]

print("Importing programs...")
try:
    result = supabase.table("programs").insert(programs).execute()
    print(f"Successfully imported {len(programs)} programs")
except Exception as e:
    print(f"Error importing programs: {e}")

print("\nImporting FAQs...")
try:
    result = supabase.table("faqs").insert(faqs).execute()
    print(f"Successfully imported {len(faqs)} FAQs")
except Exception as e:
    print(f"Error importing FAQs: {e}")

print("\nImporting documents from data.json...")
try:
    with open("data.json", "r") as f:
        documents_data = json.load(f)

    # Transform and batch insert documents
    documents = []
    for doc in documents_data:
        documents.append({
            "title": doc.get("t", ""),
            "description": doc.get("u", "") if doc.get("u") else None,
            "document_url": doc.get("d", ""),
            "document_type": "PDF" if ".pdf" in doc.get("d", "") else "Document",
            "category": doc.get("c", "General"),
            "keywords": []
        })

    # Insert in batches of 100
    batch_size = 100
    for i in range(0, len(documents), batch_size):
        batch = documents[i:i + batch_size]
        try:
            result = supabase.table("documents").insert(batch).execute()
            print(f"Imported batch {i//batch_size + 1}: {len(batch)} documents")
        except Exception as e:
            print(f"Error importing batch {i//batch_size + 1}: {e}")

    print(f"\nSuccessfully imported {len(documents)} documents")
except Exception as e:
    print(f"Error importing documents: {e}")

print("\n=== Import Complete ===")
