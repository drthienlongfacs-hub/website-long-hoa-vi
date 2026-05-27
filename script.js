/* ═══════════════════════════════════════════════════
   LONG HOA VĨ — Thiết Bị Khoan Đá Chuyên Dụng
   Interactive B2B E-Commerce Platform v3
   Advanced Search, Dual Filters, Multi-Catalog Browser
   ═══════════════════════════════════════════════════ */

// ═══ PRODUCT DATABASE ═══
const BASE_PRODUCTS = [
    // ─── Búa khoan, Mũi khoan, Phụ kiện DTH ───
    { id:'dth-hammer', cat:'Búa Khoan', brand:'Long Hoa Vĩ', title:'Búa Khoan Ngầm DTH', img:'product_images/page_03.png', badge:'Chủ lực',
      desc:'Búa khoan áp lực cao/trung/thấp: DHD, COP, QL, SD, Mission, CIR. Phục vụ khai mỏ, khoan giếng, xây dựng thủy điện.',
      specs:['7–25 bar','55–260mm','4.5–210 kg'], pressure:['low','medium','high'], apps:['mining','well','construction','exploration'],
      images:['product_images/page_03.png','product_images/page_05.png','product_images/page_07.png','product_images/page_09.png'],
      models:'CIR68/70/80/90/110, DHD340/340A/350/360/380, SD5/6/8/10/12, QL40/50/60/80, COP44/54/64, BR1/2/3',
      detail:'Búa khoan ngầm DTH hoạt động bằng khí nén, búa đặt ngay trên mũi khoan tại đáy hố. Truyền năng lượng trực tiếp vào đá, giảm hao tổn, tăng tốc độ khoan.\n\n• Áp thấp (CIR): 7–17 bar — khoan giếng, khoan nông\n• Áp trung bình (BR/Mission): 10–21 bar — xây dựng, neo đất\n• Áp cao (DHD/SD/QL/COP): 17–25 bar — khai mỏ, khoan sâu',
      specDetail:[{l:'Dải áp suất',v:'7–25 bar'},{l:'ĐK ngoài',v:'55–260mm'},{l:'ĐK lỗ khoan',v:'58–381mm'},{l:'Kết nối ren',v:'CIR / API 2⅜"–6" / Remet / Metzke'},{l:'Trọng lượng',v:'4.5–210 kg'},{l:'Dòng sản phẩm',v:'CIR, DHD, SD, QL, COP, Mission, BR'}] },

    { id:'dth-bit', cat:'Mũi Khoan', brand:'Long Hoa Vĩ', title:'Mũi Khoan Ngầm DTH', img:'product_images/page_35.png', badge:'Bền bỉ',
      desc:'Mũi khoan áp lực thấp/trung/cao. Mặt phẳng & lồi. Nút hợp kim cacbua vonfram cao cấp chống mài mòn mạnh.',
      specs:['50–400mm','4–16 rãnh xả','Nút cacbua WC'], pressure:['low','medium','high'], apps:['mining','well','construction'],
      images:['product_images/page_35.png','product_images/page_36.png','product_images/page_37.png','product_images/page_39.png'],
      models:'CIR50/60/65/70/80/90/110/150/170, BR1/2/3, COP/DHD, QL40–80, SD5–12',
      detail:'Mũi khoan DTH gắn nút hợp kim cacbua vonfram (tungsten carbide) với độ cứng và khả năng chống mài mòn cao.\n\n• Áp thấp (CIR): ĐK 50–400mm\n• Áp trung bình (BR): ĐK 64–105mm\n• Áp cao (COP/DHD/QL/SD): ĐK 105–381mm\n\nMặt phẳng (flat face) hoặc mặt lồi (convex face) tùy loại đá.',
      specDetail:[{l:'Đường kính',v:'50–400mm'},{l:'Loại mặt',v:'Phẳng / Lồi'},{l:'Nút hợp kim',v:'Cacbua vonfram (WC)'},{l:'Kích thước nút',v:'φ8–φ22mm'},{l:'Số rãnh xả phoi',v:'4–16 rãnh'}] },

    { id:'drill-pipe', cat:'Phụ Kiện', brand:'Long Hoa Vĩ', title:'Cần Khoan DTH', img:'product_images/page_47.png', badge:'',
      desc:'Cần khoan ren API chuẩn quốc tế, thép hợp kim đúc chịu lực va đập xoắn cực tốt. Chiều dài 1–6m.',
      specs:['API 2⅜"–4½"','1–6m dài','Ren REG/IF'], pressure:['low','medium','high'], apps:['mining','well','construction','exploration'],
      images:['product_images/page_47.png','product_images/page_48.png','product_images/page_49.png'],
      models:'API 2⅜" REG/IF, API 3½" REG/IF, API 4½" REG, Remet 3.5"–5", Metzke 4"–5"',
      detail:'Cần khoan DTH truyền lực xoay và khí nén từ máy khoan đến búa khoan tại đáy hố.\n\n• Ren API REG (Regular) và IF (Internal Flush)\n• Chiều dài: 1000–6000mm\n• Thép hợp kim rỗng, xử lý nhiệt tinh vi toàn bộ cần\n• Thiết kế mặt khóa tháo lắp nhanh',
      specDetail:[{l:'Loại ren',v:'API REG / API IF / Remet / Metzke'},{l:'ĐK ngoài',v:'57–114mm'},{l:'ĐK trong',v:'38–76mm'},{l:'Chiều dài',v:'1000–6000mm'},{l:'Vật liệu',v:'Thép hợp kim tôi nhiệt'}] },

    { id:'rc-hammer', cat:'Búa Khoan', brand:'Long Hoa Vĩ', title:'Búa Tuần Hoàn Ngược RC', img:'product_images/page_31.png', badge:'Thăm dò',
      desc:'Búa khoan lấy mẫu địa tầng tuần hoàn ngược. Độ sâu cao, bảo đảm mẫu không nhiễm bẩn địa tầng bên ngoài.',
      specs:['4"–5.5" cỡ búa','200–500 PSI','Ren Remet/Metzke'], pressure:['high'], apps:['exploration'],
      images:['product_images/page_31.png','product_images/page_32.png','product_images/page_33.png'],
      models:'RE 004, RE 542, RE 543, RE 545, PR 52, PR 54R',
      detail:'Búa RC thu hồi mẫu qua ống trong bằng luồng khí nén ngược chiều, đảm bảo mẫu không bị nhiễm bẩn.\n\n• Mẫu khoan sạch, đại diện địa chất chính xác 100%\n• Thu hồi liên tục, không cần dừng chu kỳ khoan\n• Phù hợp thăm dò sâu hàng trăm mét',
      specDetail:[{l:'Kích thước búa',v:'4"–5.5"'},{l:'Chiều dài',v:'1191–1294mm'},{l:'Trọng lượng',v:'52–81 kg'},{l:'Áp suất khí',v:'200–500 PSI'},{l:'Ren kết nối',v:'Remet / Metzke'}] },

    { id:'casing-tool', cat:'Phụ Kiện', brand:'Long Hoa Vĩ', title:'Dụng Cụ Khoan Ống Chống', img:'product_images/page_40.png', badge:'',
      desc:'Khoan đồng tâm/lệch tâm luồn ống chống. Giải pháp khoan qua địa tầng sạt lở, bùn cát chảy.',
      specs:['Đồng/Lệch tâm','89–324mm ống','DHD3.5–112'], pressure:['high'], apps:['well','construction'],
      images:['product_images/page_40.png','product_images/page_41.png','product_images/page_42.png'],
      models:'Đồng tâm DHD3.5/DHD340, Lệch tâm (ODEX) DHD350/360, Ring Bit + Casing Shoe',
      detail:'Khoan và lắp ống chống đồng thời. Đồng tâm (concentric) hoặc lệch tâm (eccentric/ODEX).\n\nPhụ kiện gồm: ống chống bảo vệ hố, đế ống chống (casing shoe), vòng định vị (ring bit), khóa định vị chuyên dụng.',
      specDetail:[{l:'Kiểu hệ thống',v:'Đồng tâm / Lệch tâm (ODEX)'},{l:'Tương thích búa',v:'DHD3.5–DHD112'},{l:'ĐK ống chống',v:'89–324mm'},{l:'Ứng dụng địa chất',v:'Đất yếu, cát chảy, sạt lở mạnh'}] },

    { id:'adapter', cat:'Phụ Kiện', brand:'Long Hoa Vĩ', title:'Đầu Nối Chuyển Đổi', img:'product_images/page_50.png', badge:'',
      desc:'Đầu nối ren API chuẩn: Box-Pin, Box-Box, Pin-Pin. Gia công CNC chính xác tuyệt đối.',
      specs:['API 2⅜"–4½"','Box/Pin ren','CNC nguyên khối'], pressure:['low','medium','high'], apps:['mining','well','construction','exploration'],
      images:['product_images/page_50.png','product_images/page_51.png'],
      models:'Box–Pin, Box–Box, Pin–Pin: 2⅜"×2⅜", 2⅜"×3½", 3½"×3½", 3½"×4½", API REG↔IF, API↔Remet/Metzke',
      detail:'Đầu nối chuyển đổi kết nối giữa các thiết bị có kích thước ren khác nhau.\n\n• Box–Pin (Trong–Ngoài): Phổ biến nhất\n• Box–Box (Trong–Trong): Nối 2 thiết bị ren ngoài\n• Pin–Pin (Ngoài–Ngoài): Nối 2 thiết bị ren trong\n\nGia công CNC, thép hợp kim, ren API chuẩn quốc tế.',
      specDetail:[{l:'Kiểu nối',v:'Box-Pin / Box-Box / Pin-Pin'},{l:'Quy cách ren',v:'2⅜"–4½" API REG/IF'},{l:'Vật liệu chế tạo',v:'Thép hợp kim xử lý nhiệt'},{l:'Mặt bản dẹt dập khóa',v:'65–120mm'}] },

    { id:'tapered-tool', cat:'Mũi Khoan', brand:'Long Hoa Vĩ', title:'Dụng Cụ Khoan Côn', img:'product_images/page_55.png', badge:'',
      desc:'Mũi khoan côn 7°/11°/12° nút hợp kim & chữ thập. Cần khoan côn lục giác H22 cao cấp.',
      specs:['Góc 7°/11°/12°','28–45mm đường kính','Cần H22 tôi cứng'], pressure:['low','medium'], apps:['construction'],
      images:['product_images/page_53.png','product_images/page_54.png','product_images/page_55.png'],
      models:'Mũi côn 7°/11°/12° chữ thập 28–40mm, Mũi côn nút 34–45mm, Cần H22: 610–8000mm',
      detail:'Dụng cụ khoan côn cho lỗ nhỏ (dưới 50mm) trong xây dựng, khai thác đá khối, neo giữ đất đá.\n\n• Mũi khoan côn: kiểu chữ thập (cross) hoặc kiểu nút (button)\n• Cần khoan côn H22: thân lục giác rỗng 22mm\n• Ưu điểm: trọng lượng nhẹ, tháo lắp thủ công nhanh, phù hợp máy cầm tay',
      specDetail:[{l:'Góc côn liên kết',v:'7° / 11° / 12°'},{l:'Loại mũi khoan',v:'Chữ thập / Nút hợp kim'},{l:'Đường kính mũi',v:'28–45mm'},{l:'Thân cần khoan',v:'Lục giác H22, rỗng giữa, 610–8000mm'},{l:'Vật liệu đầu gài',v:'Thép carbon siêu bền tôi nhiệt'}] },

    // ─── Khoan ren, Hầm lò, Thủy lực ───
    { id:'rhl-thread-bit', cat:'Mũi Khoan', brand:'Long Hoa Vĩ', title:'Mũi Khoan Ren Cao Cấp', img:'catalog_ren_ham_lo/page_04.png', badge:'Hợp kim R32/T38',
      desc:'Mũi khoan ren bán cầu và nút đạn R22, R25, R32, T38, T45, T51. Thích hợp cho khoan hầm mỏ lộ thiên & thủy điện.',
      specs:['Ren R22–T51', 'Đường kính 38–127mm', 'Nút cầu / Nút đạn'], pressure:['medium', 'high'], apps:['mining', 'construction'],
      images:['catalog_ren_ham_lo/page_04.png', 'catalog_ren_ham_lo/page_05.png', 'catalog_ren_ham_lo/page_06.png'],
      models:'Ren R22, Ren R25, Ren R28, Ren R32, Ren R35, Ren T38, Ren T45, Ren T51, Ren GT60',
      detail:'Mũi khoan ren được sản xuất bằng thép hợp kim chịu lực hàng đầu thế giới kết hợp với các nút hợp kim Cacbua Vonfram siêu cứng.\n\n• Ren nhỏ (R22–R32): ĐK 38–76mm, thích hợp khoan đá mỏ vừa, hầm lò nhỏ\n• Ren lớn (T38–T51): ĐK 76–127mm, chuyên dụng cho búa khoan thủy lực công suất lớn, khoan đá cứng lộ thiên.',
      specDetail:[{l:'Chuẩn ren',v:'R22, R25, R32, T38, T45, T51, GT60'},{l:'Đường kính',v:'38–127mm'},{l:'Số nút hợp kim',v:'6–12 nút'},{l:'Kiểu mặt',v:'Flat face / Drop center'}] },

    { id:'rhl-shank-adapter', cat:'Phụ Kiện', brand:'Long Hoa Vĩ', title:'Chuôi Búa Thủy Lực (Shank Adapter)', img:'catalog_ren_ham_lo/page_08.png', badge:'Chính xác CNC',
      desc:'Chuôi búa thủy lực tương thích Atlas Copco (Cop1838), Sandvik, Furukawa, Ingersoll Rand, Montabert. Tôi nhiệt chống xoắn cực tốt.',
      specs:['Thép tôi chịu mỏi', 'Ren & Côn ≤ 0.02mm', 'Atlas Copco/Sandvik'], pressure:['high'], apps:['mining', 'construction'],
      images:['catalog_ren_ham_lo/page_08.png', 'catalog_ren_ham_lo/page_09.png', 'catalog_ren_ham_lo/page_10.png'],
      models:'Atlas Copco (COP1838, COP1238), Sandvik (HLX5), Furukawa (HD712, HD715), Montabert (HC150), Ingersoll Rand',
      detail:'Chuôi búa (Shank Adapter) đóng vai trò truyền mô-men xoắn, lực đẩy và lực va đập từ búa thủy lực sang cần khoan.\n\n• Được làm từ thép đặc biệt chịu lực va đập xoắn lớn, xử lý nhiệt tinh vi\n• Đảm bảo độ thẳng tuyệt đối, bảo vệ piston búa khoan tối đa khỏi phản chấn đá cứng.',
      specDetail:[{l:'Tương thích búa',v:'Atlas Copco, Sandvik, Furukawa, Montabert, IR'},{l:'Vật liệu',v:'Thép đặc chủng chịu mỏi va đập'},{l:'Gia công',v:'Độ chính xác ren & côn ≤ 0.02mm'},{l:'Đặc tính',v:'Chống xoắn, chống mỏi rạn nứt'}] },

    { id:'rhl-coupling', cat:'Phụ Kiện', brand:'Long Hoa Vĩ', title:'Khớp Nối Ren (Coupling Sleeve)', img:'catalog_ren_ham_lo/page_11.png', badge:'',
      desc:'Khớp nối ren R22, R25, R32, T38, T45, T51. Liên kết bền bỉ các đoạn cần khoan dài, chống mài mòn ren cực tốt.',
      specs:['Khớp nối bán cầu / thẳng', 'Ren R22–T51', 'Thép tôi carbon'], pressure:['medium', 'high'], apps:['mining', 'construction'],
      images:['catalog_ren_ham_lo/page_11.png'],
      models:'Khớp nối ren R22, R25, R32, T38, T45, T51, Khớp nối chuyển đổi ren R32↔T38, T38↔T45',
      detail:'Khớp nối ren kết nối các đoạn cần khoan với nhau để đạt được chiều sâu khoan mong muốn trong thi công hầm lò.\n\n• Giúp liên kết ren chắc chắn, truyền năng lượng đập tối ưu từ búa\n• Thép tôi thấm carbon bề mặt chống hao mòn tối đa.',
      specDetail:[{l:'Chuẩn ren',v:'R22, R25, R32, T38, T45, T51'},{l:'Loại khớp',v:'Khớp nối thẳng (Sleeve) / Khớp nối bán cầu'},{l:'Vật liệu',v:'Thép hợp kim xử lý bề mặt'},{l:'Công dụng',v:'Nối cần extension rod hoặc chuyển đổi ren'}] },

    { id:'rhl-drill-rod', cat:'Phụ Kiện', brand:'Long Hoa Vĩ', title:'Cần Khoan Ren', img:'catalog_ren_ham_lo/page_13.png', badge:'',
      desc:'Cần khoan ren extension, cần M/F (Male/Female), cần lục giác Hexagonal/Round. Thép khoan rỗng chất lượng cao.',
      specs:['Cần R32 / T38 / T45 / T51', 'Dài 1.2m - 4.3m', 'M/F & Extension Rods'], pressure:['medium', 'high'], apps:['mining', 'construction'],
      images:['catalog_ren_ham_lo/page_13.png', 'catalog_ren_ham_lo/page_12.png', 'catalog_ren_ham_lo/page_14.png'],
      models:'Round Rods R32/T38/T45/T51, Hexagonal Rods R25/R28/R32, Male-Female (M/F) Speed Rods',
      detail:'Cần khoan ren chuyên dụng cho khoan hầm mỏ đá, khoan nổ mìn kỹ thuật.\n\n• Thép rỗng truyền khí xả phoi hơi hoặc nước rửa nguội hiệu quả\n• Cần M/F (Speed Rod) tích hợp sẵn đầu ren ren trong/ren ngoài giúp tháo lắp cực nhanh.',
      specDetail:[{l:'Kiểu thân cần',v:'Tròn (Round) hoặc Lục giác (Hexagonal)'},{l:'Đầu ren',v:'Extension Rods / M/F (Speed) Rods'},{l:'Chiều dài',v:'1220mm - 4270mm'},{l:'Quy cách ren',v:'R22, R25, R32, T38, T45, T51'}] },

    { id:'rhl-drifter', cat:'Thiết Bị', brand:'Long Hoa Vĩ', title:'Búa Khoan Thủy Lực (Hydraulic Drifter)', img:'catalog_ren_ham_lo/page_15.png', badge:'Công nghệ cao',
      desc:'Búa khoan thủy lực tần số cao PLK-18, PLK-20. Lắp đặt trên giàn khoan tự hành hoặc xe khoan hầm lò chuyên dụng.',
      specs:['Tần số 50-70 Hz', 'Công suất 15-20 kW', 'Rung chấn cực thấp'], pressure:['high'], apps:['mining', 'construction'],
      images:['catalog_ren_ham_lo/page_15.png', 'catalog_ren_ham_lo/page_16.png'],
      models:'PLK-18 (tương ứng COP1838), PLK-20 (tương ứng COP2238)',
      detail:'Búa khoan thủy lực cao cấp hoạt động ở tần số đập cực cao, đem lại tốc độ xâm thực đá ấn tượng vượt trội.\n\n• Hệ thống giảm chấn kép bảo vệ búa khoan khỏi lực dội phản chấn từ đá cứng\n• Tiết kiệm năng lượng, hiệu suất bền bỉ trong điều kiện mỏ khắc nghiệt.',
      specDetail:[{l:'Công suất đập',v:'18 kW / 20 kW'},{l:'Tần số đập',v:'50Hz - 70Hz'},{l:'Áp suất thủy lực',v:'130 - 200 bar'},{l:'Trọng lượng búa',v:'170 kg / 185 kg'}] },

    { id:'rhl-dth-hammer', cat:'Búa Khoan', brand:'Long Hoa Vĩ', title:'Búa Khoan Ngầm DTH Áp Cao', img:'catalog_ren_ham_lo/page_17.png', badge:'',
      desc:'Búa khoan ngầm áp suất cao HD-55A, HD-65A. Tiết kiệm khí nén hơi, xung lực đập mạnh mẽ.',
      specs:['HD-55A / HD-65A', 'Áp suất 10-25 bar', 'Hiệu suất đập cao'], pressure:['high'], apps:['mining', 'well', 'construction'],
      images:['catalog_ren_ham_lo/page_17.png', 'catalog_ren_ham_lo/page_18.png'],
      models:'HD-55A, HD-65A, HD-85A',
      detail:'Búa ngầm DTH được thiết kế tối ưu hóa buồng nén khí hơi, tạo ra xung đập cực lớn với lưu lượng khí nén hơi tối thiểu.\n\n• Vỏ búa tôi thấm chống cát mài mòn đá ngoài vỏ hố khoan tốt\n• Tương thích ren chuẩn API Reg.',
      specDetail:[{l:'Kích thước búa',v:'5 inch / 6 inch / 8 inch'},{l:'Dải áp suất hơi',v:'10 - 25 bar'},{l:'Kích thước đầu nối',v:'3½" API Reg / 4½" API Reg'},{l:'Trọng lượng búa',v:'38.5 kg / 68.0 kg'}] },

    { id:'rhl-dth-bit', cat:'Mũi Khoan', brand:'Long Hoa Vĩ', title:'Mũi Khoan Ngầm DTH Áp Cao', img:'catalog_ren_ham_lo/page_22.png', badge:'',
      desc:'Mũi khoan DTH áp cao DHD350, DHD360, QL60, SD6 nút cacbua. Phù hợp địa tầng đá cứng lộ thiên.',
      specs:['Kích cỡ 105–254mm', 'Đuôi DHD / QL / SD', 'Nút cacbua siêu chịu lực'], pressure:['high'], apps:['mining', 'well', 'construction'],
      images:['catalog_ren_ham_lo/page_22.png', 'catalog_ren_ham_lo/page_23.png', 'catalog_ren_ham_lo/page_24.png'],
      models:'DHD340/350/360/380, SD5/6/8, QL50/60/80',
      detail:'Mũi khoan DTH là sản phẩm tiêu chuẩn cao chuyên khoan đá mỏ lộ thiên, khoan địa chất và giếng nước sâu.\n\n• Mặt phẳng (Flat Face) cho đá cứng vừa đến siêu cứng, địa hình nứt nẻ\n• Mặt lõm (Concave Face) cho đá đồng nhất, định hướng lỗ cực tốt.',
      specDetail:[{l:'Đường kính mũi',v:'105mm - 254mm'},{l:'Chuẩn đuôi búa',v:'DHD340, DHD350, DHD360, QL60, SD6'},{l:'Kiểu nút',v:'Nút cầu (spherical) / Nút đạn (ballistic)'},{l:'Rãnh nước xả phoi',v:'4 - 8 rãnh xả rộng'}] },

    { id:'rhl-tapered', cat:'Mũi Khoan', brand:'Long Hoa Vĩ', title:'Dụng Cụ Khoan Côn', img:'catalog_ren_ham_lo/page_25.png', badge:'',
      desc:'Mũi khoan côn nút và côn chữ thập 7°, 11°, 12°. Cần khoan côn lục giác H22 tôi lõi rỗng dẻo dai.',
      specs:['Góc 7° / 11° / 12°', 'Mũi côn nút 30-45mm', 'Cần lục giác H22 rỗng'], pressure:['low', 'medium'], apps:['construction', 'mining'],
      images:['catalog_ren_ham_lo/page_25.png', 'catalog_ren_ham_lo/page_26.png'],
      models:'Mũi khoan côn nút 7° φ32/φ34/φ36/φ38, Mũi khoan côn chữ thập 11°/12° φ36/φ40, Cần H22 côn dài 0.6m - 4.8m',
      detail:'Hệ thống dụng cụ khoan côn gọn nhẹ, tháo lắp đơn giản bằng tay lực búa nhẹ, thích hợp tuyệt đối cho khoan mìn thủ công.\n\n• Nút hợp kim phân bố tối ưu giúp khoan đá nhanh hơn mũi chữ nhất\n• Cần H22 rỗng thép khoan cao cấp dẻo dai, chống gãy gập.',
      specDetail:[{l:'Góc côn kết nối',v:'7° / 11° / 12°'},{l:'Vật liệu thép cần',v:'Thép lục giác H22 tôi rỗng'},{l:'Kích thước mũi côn',v:'φ28mm - φ45mm'},{l:'Kiểu đầu gài búa',v:'H22 × 108mm chuẩn búa cầm tay'}] },

    { id:'rhl-pick', cat:'Phụ Kiện', brand:'Long Hoa Vĩ', title:'Răng Đào Hầm Lò & Phay Đường', img:'catalog_ren_ham_lo/page_27.png', badge:'Chịu mài mòn',
      desc:'Răng đào lò than TS30cx, răng cưa máy đào hầm lò, răng phay đường bê tông nhựa. Công nghệ rèn nhiệt áp lực cao bền bỉ.',
      specs:['TS30cx / U82 / U84', 'Rèn nhiệt áp lực cao', 'Đầu hợp kim Vonfram'], pressure:['low'], apps:['mining', 'construction'],
      images:['catalog_ren_ham_lo/page_27.png', 'catalog_ren_ham_lo/page_28.png', 'catalog_ren_ham_lo/page_29.png', 'catalog_ren_ham_lo/page_30.png'],
      models:'TS30cx, TS31cx, U82, U84, U92, U94, Răng phay đường bê tông 20mm/22mm',
      detail:'Dòng sản phẩm răng cưa đào cắt mỏ than và răng cưa phay tái tạo mặt đường bê tông nhựa.\n\n• Được chế tạo bằng phương pháp rèn nhiệt áp lực cao giúp cấu trúc tinh thể thép chắc chắn\n• Đầu hợp kim tungsten siêu cứng chống mòn chà xát liên tục cực đỉnh.',
      specDetail:[{l:'Dòng sản phẩm',v:'Răng đào lò (Coal Picks) / Răng phay đường (Road Milling)'},{l:'Vật liệu thân răng',v:'Thép rèn 42CrMo chịu lực cao'},{l:'Chất liệu đầu cắt',v:'Vonfram Cacbua siêu bền'},{l:'Đường kính gài',v:'φ20mm, φ22mm, φ25mm'}] },

    // ─── Máy khoan đá, Xe khoan, Phụ tùng ───
    { id:'mk-rock-drill', cat:'Thiết Bị', brand:'Long Hoa Vĩ', title:'Máy Khoan Đá Cầm Tay Chân Đỡ', img:'catalog_may_khoan/page_04.png', badge:'Phổ biến nhất',
      desc:'Máy khoan đá hơi khí nén chân đỡ YT24, YT27, YT28, YT29A nổi tiếng. Lực đập mạnh mẽ, độ bền vĩnh cửu.',
      specs:['YT28 / YT29A', 'Lực đập đập > 60J', 'Tần số hơi ≥ 37 Hz'], pressure:['low', 'medium'], apps:['mining', 'construction'],
      images:['catalog_may_khoan/page_04.png'],
      models:'YT24, YT27, YT28, YT29A, Y19A (máy khoan tay)',
      detail:'Dòng máy khoan đá bằng hơi khí nén chân nâng đỡ (Air-leg Rock Drill) cực kỳ thông dụng trong khai thác mỏ hầm lò tại Việt Nam.\n\n•YT28/YT29A có van phân phối khí nén cải tiến, vận hành êm ái, bôi trơn tự động bằng bình chứa dầu ngậm khí hơi\n• Chân khí nén chống nâng đỡ đẩy tự động giảm thiểu sức ép thể lực cho thợ khoan.',
      specDetail:[{l:'Trọng lượng máy',v:'26 kg - 28 kg'},{l:'Đường kính Piston',v:'80 mm'},{l:'Hành trình Piston',v:'60 mm'},{l:'Tốc độ khoan đá cứng',v:'≥ 300 mm/phút'},{l:'Tần số đập máy',v:'≥ 37 Hz'}] },

    { id:'mk-drill-rig', cat:'Thiết Bị', brand:'Long Hoa Vĩ', title:'Xe Khoan Đá Bánh Xích Tự Hành', img:'catalog_may_khoan/page_05.png', badge:'Thiết bị nặng',
      desc:'Dàn xe khoan nổ mìn bánh xích DTH SL-100Y, SL-120Y. Động cơ diesel mạnh mẽ, crawler leo dốc khỏe 30°.',
      specs:['SL-100Y / SL-120Y', 'Bánh xích tự hành crawler', 'ĐK lỗ khoan 90-115mm'], pressure:['high'], apps:['mining', 'construction'],
      images:['catalog_may_khoan/page_05.png'],
      models:'SL-100Y Pneumatic DTH Rig, SL-120Y Hydraulic Crawler DTH Rig',
      detail:'Dàn xe khoan nổ mìn tự hành bánh xích Crawler DTH chuyên dùng cho mỏ đá lộ thiên san lấp xây dựng thủy điện lớn.\n\n• Động cơ diesel công suất cao cung cấp thủy lực nâng góc cần và di chuyển crawler bánh xích\n• Hoạt động hoàn hảo trên mọi địa hình hiểm trở quặng mỏ dốc gồ ghề.',
      specDetail:[{l:'Đường kính khoan lỗ',v:'φ90 mm - φ115 mm'},{l:'Độ sâu khoan tối đa',v:'25 mét'},{l:'Tốc độ di chuyển crawler',v:'2.0 km/h'},{l:'Góc nâng cần khoan',v:'-15° đến +95°'}] },

    { id:'mk-parts', cat:'Phụ Kiện', brand:'Long Hoa Vĩ', title:'Phụ Tùng Máy Khoan Đá Hơi', img:'catalog_may_khoan/page_06.png', badge:'Phụ tùng chính hãng',
      desc:'Piston, quả dứa xoay rifle bar, kim hơi nước, van chia khí, bánh cóc thay thế chuẩn bản vẽ OEM YT28/YT29A.',
      specs:['YT28 / YT29A spare parts', 'Thép rèn thấm siêu bền', 'Dung sai OEM ≤ 0.01mm'], pressure:['low', 'medium'], apps:['mining', 'construction'],
      images:['catalog_may_khoan/page_06.png', 'catalog_may_khoan/page_07.png', 'catalog_may_khoan/page_08.png'],
      models:'Piston YT28, Rifle Bar (Trục quả dứa) YT28, Water Needle (Kim nước), Valve Chest (Van chia khí), Ratchet Wheel YT29A',
      detail:'Long Hoa Vĩ cung cấp đầy đủ các loại phụ tùng chi tiết máy khoan đá hơi YT24, YT27, YT28, YT29A hao mòn nhanh.\n\n• Phụ tùng chính hãng đảm bảo độ bền vật liệu, khớp kích thước 100%, kéo dài tuổi thọ khai thác hầm mỏ đá tối đa.',
      specDetail:[{l:'Dòng máy tương thích',v:'YT24, YT27, YT28, YT29A'},{l:'Vật liệu chế tạo',v:'Thép hợp kim rèn bề mặt thấm nitrogen chống mài mòn'},{l:'Dung sai chế tạo',v:'Độ chính xác OEM ≤ 0.01mm'},{l:'Linh kiện có sẵn',v:'Piston, quả dứa, bánh răng, kim nước, phớt chặn hơi'}] },

    // ─── Búa & Mũi DTH áp thấp/cao ───
    { id:'ks-dth-hammer-low', cat:'Búa Khoan', brand:'Long Hoa Vĩ', title:'Búa DTH Áp Thấp CIR', img:'product_images/page_03.png', badge:'Valveless',
      desc:'Búa khoan ngầm áp thấp CIR50–CIR200 thiết kế valveless (không van). Cấu tạo đơn giản, bảo trì dễ dàng, tiết kiệm khí nén.',
      specs:['0.5–0.7 MPa','CIR50–CIR200','Valveless design'], pressure:['low'], apps:['well','construction','mining'],
      models:'CIR50, CIR60, CIR65, CIR70, CIR80, CIR90, CIR110, CIR130, CIR150, CIR170, CIR200',
      detail:'Búa DTH áp thấp sử dụng thiết kế không van (valveless) giúp tăng tần số đập, giảm tiêu hao dầu/khí nén, bảo trì đơn giản.\\n\\n• Áp suất làm việc: 0.5–0.7 MPa\\n• Phù hợp khoan giếng nước, khoan mỏ đá nhỏ, khoan neo đất\\n• Dải model từ CIR50 (lỗ nhỏ 58mm) đến CIR200 (lỗ lớn 250mm)',
      specDetail:[{l:'Dải áp suất',v:'0.5–0.7 MPa (7–10 bar)'},{l:'Dòng model',v:'CIR50 → CIR200'},{l:'Thiết kế',v:'Valveless (không van) — giảm chi tiết, tăng tần số đập'},{l:'Ứng dụng',v:'Khoan giếng, mỏ đá, xây dựng'}] },

    { id:'ks-dth-hammer-high', cat:'Búa Khoan', brand:'Long Hoa Vĩ', title:'Búa DTH Áp Cao KD Series', img:'product_images/page_07.png', badge:'Công suất lớn',
      desc:'Búa khoan ngầm áp cao KD35–KD85 thiết kế valveless, ren multi-step dễ tháo lắp. Hiệu suất truyền năng lượng cao, khoan nhanh.',
      specs:['>1.2 MPa','KD35–KD85','25–188 kg'], pressure:['high'], apps:['mining','construction','exploration'],
      models:'KD35, KD45, KD55, KD65, KD85',
      detail:'Búa DTH áp cao dòng KD được thiết kế valveless với hiệu suất truyền năng lượng vượt trội.\\n\\n• KD35: φ82mm, 930mm, 25kg — cho lỗ khoan trung bình\\n• KD45: φ99mm, 1030mm, 39kg — đa năng\\n• KD55: φ126mm, 1214mm, 76.5kg — khai mỏ lớn\\n• KD65: φ142–148mm, 1248mm, 100kg — khoan sâu\\n• KD85: φ144–148mm, 1482mm, 188kg — công suất cực lớn\\n\\nRen multi-step giúp tháo lắp bảo trì nhanh chóng.',
      specDetail:[{l:'Model',v:'KD35 / KD45 / KD55 / KD65 / KD85'},{l:'ĐK ngoài',v:'φ82–φ148mm'},{l:'Chiều dài (không mũi)',v:'930–1482mm'},{l:'Trọng lượng',v:'25–188 kg'},{l:'Áp suất làm việc',v:'>1.2 MPa (>17 bar)'}] },

    { id:'ks-bit-low', cat:'Mũi Khoan', brand:'Long Hoa Vĩ', title:'Mũi Khoan DTH Áp Thấp CIR', img:'product_images/page_35.png', badge:'',
      desc:'Mũi khoan DTH áp thấp dòng CIR65–CIR170. Nút hợp kim cacbua vonfram cao cấp, thiết kế CAD/CNC tối ưu flushing.',
      specs:['CIR65–CIR170','ĐK 65–200mm','Nút WC cao cấp'], pressure:['low'], apps:['well','construction','mining'],
      models:'CIR65, CIR70, CIR80, CIR90, CIR110, CIR130, CIR150, CIR170',
      detail:'Mũi khoan DTH áp thấp dùng cho búa CIR series.\\n\\n• Thép hợp kim chịu lực cao kết hợp nút cacbua vonfram (WC) siêu cứng\\n• Thiết kế CAD, gia công CNC chính xác tuyệt đối\\n• Xử lý nhiệt nhiều lần tăng độ cứng và chống mỏi kim loại\\n• Rãnh xả phoi tối ưu đảm bảo flushing đều, giảm mài mòn thân mũi',
      specDetail:[{l:'Dòng sản phẩm',v:'CIR65, CIR70, CIR80, CIR90, CIR110, CIR130, CIR150, CIR170'},{l:'Đường kính mũi',v:'65–200mm'},{l:'Số spline',v:'4–6 spline'},{l:'Mặt mũi khoan',v:'Phẳng (Flat) / Lõm (Concave) / Lồi (Convex)'}] },

    { id:'ks-bit-high', cat:'Mũi Khoan', brand:'Long Hoa Vĩ', title:'Mũi Khoan DTH Áp Cao DHD', img:'product_images/page_36.png', badge:'',
      desc:'Mũi khoan DTH áp cao chuẩn DHD3.5–DHD112. Đa dạng kiểu mặt Flat/Concave/Convex, đường kính 3"–12"+.',
      specs:['DHD3.5–DHD112','ĐK 76–305mm+','Flat/Concave/Convex'], pressure:['high'], apps:['mining','well','construction','exploration'],
      models:'DHD3.5, DHD340A, DHD350, DHD360, DHD380, DHD112',
      detail:'Mũi khoan DTH áp cao tương thích chuẩn shank quốc tế DHD.\\n\\n• Mặt phẳng (Flat): bền bỉ nhất cho đá cứng, mài mòn cao\\n• Mặt lõm (Concave): giữ hướng khoan tốt nhất\\n• Mặt lồi (Convex): tốc độ khoan nhanh nhất cho đá mềm–trung bình\\n\\nNút hợp kim WC cao cấp với cấu hình nút tối ưu giảm mất nút, tăng tuổi thọ.',
      specDetail:[{l:'Chuẩn shank',v:'DHD3.5, DHD340, DHD350, DHD360, DHD380, DHD112'},{l:'Dải đường kính',v:'3\"–12\"+ (76–305mm+)'},{l:'Kiểu mặt',v:'Flat Face / Concave / Convex'},{l:'Nút hợp kim',v:'Cacbua vonfram (WC) — Spherical / Ballistic'}] },


    // ─── Búa & Mũi DTH bổ sung ───
    { id:'mas-dth-hammer', cat:'Búa Khoan', brand:'Long Hoa Vĩ', title:'Búa Khoan Ngầm DTH (CIR/DHD)', img:'bua_khoan_dth_images/DTH hammer CIR110 130.png', badge:'',
      desc:'Búa khoan DTH tương thích chuẩn DHD340–DHD380, CIR90–CIR150. Xung lực đập mạnh, tiết kiệm khí nén, độ bền cao.',
      specs:['DHD340–DHD380','CIR90–CIR150','Tương thích chuẩn quốc tế'], pressure:['low','high'], apps:['mining','well','construction'],
      models:'CIR90, CIR110, CIR130, CIR150, DHD340, DHD350, DHD360',
      detail:'Búa khoan DTH là dòng búa khoan nhập khẩu tương thích hoàn toàn với chuẩn shank quốc tế.\\n\\n• Tương thích búa CIR (áp thấp) và DHD (áp cao)\\n• Vỏ búa thép hợp kim tôi nhiệt chống mài mòn\\n• Buồng nén khí thiết kế tối ưu tiết kiệm lưu lượng khí nén\\n• Phù hợp thay thế cho các dàn khoan hiện hữu dùng búa CIR/DHD',
      specDetail:[{l:'Dòng áp thấp',v:'CIR90, CIR110, CIR130, CIR150'},{l:'Dòng áp cao',v:'DHD340, DHD350, DHD360'},{l:'Tương thích',v:'Chuẩn shank CIR / DHD quốc tế'},{l:'Vật liệu vỏ',v:'Thép hợp kim tôi nhiệt chống mài mòn'}] },

    { id:'mas-dth-bit', cat:'Mũi Khoan', brand:'Long Hoa Vĩ', title:'Mũi Khoan Ngầm DTH (CIR/DHD)', img:'bua_khoan_dth_images/DTH hammer CIR150.png', badge:'',
      desc:'Mũi khoan DTH nút hợp kim cacbua vonfram. Tương thích chuẩn CIR/DHD. Đường kính 90–203mm.',
      specs:['ĐK 90–203mm','Nút WC cao cấp','CIR/DHD shank'], pressure:['low','high'], apps:['mining','well','construction'],
      models:'Mũi CIR90, Mũi CIR110, Mũi CIR130, Mũi CIR150, Mũi DHD340, Mũi DHD350, Mũi DHD360',
      detail:'Mũi khoan DTH được chế tạo từ thép hợp kim cao cấp kết hợp nút cacbua vonfram siêu cứng.\\n\\n• Đường kính từ 90mm đến 203mm\\n• Kiểu mặt: Flat Face (đá cứng) và Concave (giữ hướng)\\n• Rãnh xả phoi thiết kế rộng, flushing hiệu quả\\n• Tương thích hoàn toàn với búa CIR/DHD các hãng',
      specDetail:[{l:'Đường kính mũi',v:'90–203mm'},{l:'Chuẩn đuôi shank',v:'CIR90/110/130/150, DHD340/350/360'},{l:'Nút hợp kim',v:'Cacbua vonfram (WC)'},{l:'Kiểu mặt mũi',v:'Flat Face / Concave'}] }
];

// Combine standard products with all 81 generated drill bit products (brand: Long Hoa Vĩ)
const PRODUCTS = [
    ...BASE_PRODUCTS,
    ...(typeof DRILL_BIT_PRODUCTS !== 'undefined' ? DRILL_BIT_PRODUCTS : [])
];

// ═══ CATALOG DEFINITIONS (Multiple Catalogs Support) ═══
const CATALOGS = {
    dth: {
        title: 'Catalog DTH & Phụ kiện',
        basePath: 'product_images/page_',
        pages: Array.from({length: 51}, (_, i) => i + 5), // [5, 6, ..., 55]
        toc: [
            {label:'Búa DTH áp thấp CIR',pages:[5,6]},
            {label:'Búa DTH áp cao DHD',pages:[7,8,9,10,11,12]},
            {label:'Búa DTH SD Series',pages:[13,14,15,16,17,18]},
            {label:'Búa DTH QL Series',pages:[19,20,21,22]},
            {label:'Búa DTH COP/Mission',pages:[23,24,25,26,27,28]},
            {label:'Búa DTH áp trung BR',pages:[29,30]},
            {label:'Búa RC tuần hoàn ngược',pages:[31,32,33,34]},
            {label:'Mũi khoan DTH',pages:[35,36,37,38,39]},
            {label:'Dụng cụ ống chống',pages:[40,41,42,43,44,45,46]},
            {label:'Cần khoan DTH',pages:[47,48,49]},
            {label:'Đầu nối chuyển đổi',pages:[50,51,52]},
            {label:'Dụng cụ khoan côn',pages:[53,54,55]},
        ]
    },
    ren: {
        title: 'Catalog Khoan ren & Hầm lò',
        basePath: 'catalog_ren_ham_lo/page_',
        pages: Array.from({length: 27}, (_, i) => i + 4), // [4, 5, ..., 30]
        toc: [
            {label:'Mũi khoan ren',pages:[4,5,6,7]},
            {label:'Chuôi búa (Shank Adapter)',pages:[8,9,10]},
            {label:'Khớp nối ren',pages:[11]},
            {label:'Cần khoan ren',pages:[12,13,14]},
            {label:'Búa khoan thủy lực',pages:[15,16]},
            {label:'Búa khoan DTH',pages:[17,18,19,20,21]},
            {label:'Mũi khoan DTH',pages:[22,23,24]},
            {label:'Khoan côn & Khai thác',pages:[25,26]},
            {label:'Răng đào lò & Phay lộ',pages:[27,28,29,30]},
        ]
    },
    may: {
        title: 'Catalog Máy khoan & Phụ tùng',
        basePath: 'catalog_may_khoan/page_',
        pages: Array.from({length: 5}, (_, i) => i + 4), // [4, 5, 6, 7, 8]
        toc: [
            {label:'Máy khoan khí nén YT',pages:[4]},
            {label:'Xe khoan bánh xích SL',pages:[5]},
            {label:'Phụ tùng & Linh kiện',pages:[6,7,8]},
        ]
    }
};

let currentCatalogKey = 'dth';
let currentPage = 5;

// ═══ SEARCH INDEX (Auto-indexing all products & model numbers) ═══
const SEARCH_INDEX = [];
PRODUCTS.forEach(p => {
    // Index product card
    SEARCH_INDEX.push({
        type: 'product',
        id: p.id,
        title: p.title,
        cat: p.cat,
        keywords: `${p.title} ${p.models} ${p.desc} ${p.cat} ${p.brand}`.toLowerCase()
    });
    
    // Index individual model codes listed inside p.models
    if (p.models) {
        const modelList = p.models.split(',').map(m => m.trim());
        modelList.forEach(model => {
            if (model.length >= 2) {
                SEARCH_INDEX.push({
                    type: 'model',
                    id: p.id,
                    title: model,
                    cat: p.cat,
                    keywords: `${model} ${p.cat} ${p.brand} ${p.title}`.toLowerCase()
                });
            }
        });
    }
});

// ═══ RENDER PRODUCT CARDS ═══
function renderProductGrid() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map(p => `
        <div class="product-card" data-id="${p.id}" data-brand="${p.brand}" data-cat="${p.cat}" data-pressure="${p.pressure.join(',')}" data-apps="${p.apps.join(',')}" onclick="showProductDetail('${p.id}')">
            <div class="card-image">
                <img src="${p.img}" alt="${p.title}" loading="lazy">
                <div class="card-overlay">${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}</div>
            </div>
            <div class="card-content">
                <div class="card-cat">${p.cat}</div>
                <h3 class="card-title">${p.title}</h3>
                <p class="card-desc">${p.desc}</p>
                <div class="card-specs">${p.specs.map(s => `<span>${s}</span>`).join('')}</div>
                <div class="card-footer">
                    <div class="card-action">Xem chi tiết →</div>
                    <button class="card-quote" onclick="event.stopPropagation();quickQuote('${p.title}')">Báo giá</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ═══ FILTER LOGIC (Multi-axis Brand × Category) ═══
let currentCategory = 'all';
let currentBrand = 'all';

function filterByCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('#category-filters .chip').forEach(c => {
        c.classList.toggle('active', c.dataset.filter === cat);
    });
    applyFilters();
}

function filterByBrand(brand) {
    currentBrand = brand;
    document.querySelectorAll('#brand-filters .chip').forEach(c => {
        c.classList.toggle('active', c.dataset.brand === brand);
    });
    applyFilters();
}

function applyFilters() {
    const pressure = document.getElementById('pressure-filter').value;
    const app = document.getElementById('app-filter').value;
    const sortVal = document.getElementById('sort-filter').value;
    const cards = Array.from(document.querySelectorAll('.product-card'));
    const grid = document.getElementById('product-grid');
    
    let displayedCount = 0;
    
    cards.forEach(card => {
        const id = card.dataset.id;
        const p = card.dataset.pressure;
        const a = card.dataset.apps;
        const brand = card.dataset.brand;
        const cat = card.dataset.cat;
        
        let show = true;
        if (currentCategory !== 'all' && cat !== currentCategory) show = false;
        if (currentBrand !== 'all' && brand !== currentBrand) show = false;
        if (pressure !== 'all' && !p.includes(pressure)) show = false;
        if (app !== 'all' && !a.includes(app)) show = false;
        
        card.classList.toggle('hidden', !show);
        if (show) displayedCount++;
    });
    
    // Sort logic
    if (sortVal === 'name-asc') {
        cards.sort((a, b) => a.querySelector('.card-title').textContent.localeCompare(b.querySelector('.card-title').textContent));
    } else if (sortVal === 'name-desc') {
        cards.sort((a, b) => b.querySelector('.card-title').textContent.localeCompare(a.querySelector('.card-title').textContent));
    } else {
        // Default Featured Sorting (by original array index)
        cards.sort((a, b) => {
            const indexA = PRODUCTS.findIndex(p => p.id === a.dataset.id);
            const indexB = PRODUCTS.findIndex(p => p.id === b.dataset.id);
            return indexA - indexB;
        });
    }
    
    // Re-append to grid in sorted order
    cards.forEach(card => grid.appendChild(card));
    
    // Update count indicator
    document.getElementById('result-count').textContent = displayedCount;
}

// ═══ UPDATE BADGE COUNTS ═══
function updateFilterCounts() {
    // All products are branded Long Hoa Vĩ (manufacturer names removed)
    
    // Category Counts
    const catAll = PRODUCTS.length;
    const catHammer = PRODUCTS.filter(p => p.cat === 'Búa Khoan').length;
    const catBit = PRODUCTS.filter(p => p.cat === 'Mũi Khoan').length;
    const catAccessory = PRODUCTS.filter(p => p.cat === 'Phụ Kiện').length;
    const catEquipment = PRODUCTS.filter(p => p.cat === 'Thiết Bị').length;
    
    if (document.getElementById('count-cat-all')) document.getElementById('count-cat-all').textContent = catAll;
    
    // Update Category Chips content to show counts dynamically
    const categoryChips = document.querySelectorAll('#category-filters .chip');
    categoryChips.forEach(chip => {
        const filter = chip.dataset.filter;
        if (filter === 'all') return;
        let count = 0;
        if (filter === 'Búa Khoan') count = catHammer;
        else if (filter === 'Mũi Khoan') count = catBit;
        else if (filter === 'Phụ Kiện') count = catAccessory;
        else if (filter === 'Thiết Bị') count = catEquipment;
        
        let text = filter === 'Búa Khoan' ? 'Búa Khoan DTH & RC' :
                   filter === 'Mũi Khoan' ? 'Mũi Khoan Hợp Kim' :
                   filter === 'Phụ Kiện' ? 'Cần Khoan & Phụ Kiện' :
                   filter === 'Thiết Bị' ? 'Máy & Xe Khoan Đá' : filter;
        
        chip.innerHTML = `${text} <span class="chip-count">${count}</span>`;
    });
}

// ═══ MULTI-CATALOG SWITCHER ═══
function selectCatalog(key) {
    currentCatalogKey = key;
    const cat = CATALOGS[key];
    currentPage = cat.pages[0];
    
    // Update catalog tab active states
    document.querySelectorAll('.catalog-selector .tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === `cat-btn-${key}`);
    });
    
    updateCatalogView();
}

function renderCatalogTOC() {
    const toc = document.getElementById('catalog-toc');
    if (!toc) return;
    const cat = CATALOGS[currentCatalogKey];
    toc.innerHTML = cat.toc.map(section =>
        `<a href="#" class="${section.pages.includes(currentPage)?'active':''}" onclick="goToCatalogPage(${section.pages[0]});return false">${section.label}</a>`
    ).join('');
}

function goToCatalogPage(page) { currentPage = page; updateCatalogView(); }

function changeCatalogPage(delta) {
    const cat = CATALOGS[currentCatalogKey];
    const currentIndex = cat.pages.indexOf(currentPage);
    if (currentIndex !== -1) {
        const newIndex = Math.max(0, Math.min(cat.pages.length - 1, currentIndex + delta));
        currentPage = cat.pages[newIndex];
        updateCatalogView();
    }
}

function updateCatalogView() {
    const img = document.getElementById('catalog-image');
    const indicator = document.getElementById('page-indicator');
    const cat = CATALOGS[currentCatalogKey];
    const currentIndex = cat.pages.indexOf(currentPage);
    
    if (img) {
        img.src = `${cat.basePath}${String(currentPage).padStart(2,'0')}.png`;
        img.alt = cat.title;
    }
    if (indicator && currentIndex !== -1) {
        indicator.textContent = `Trang ${currentIndex + 1} / ${cat.pages.length}`;
    }
    renderCatalogTOC();
}

// ═══ SEARCH FUNCTIONALITY ═══
const globalSearch = document.getElementById('global-search');
const searchDropdown = document.getElementById('search-dropdown');

function performSearch(query) {
    if (!query || query.length < 2) { searchDropdown.classList.remove('open'); return; }
    const q = query.toLowerCase().trim();
    const results = SEARCH_INDEX.filter(item => item.keywords.includes(q)).slice(0, 10);
    if (results.length === 0) {
        searchDropdown.innerHTML = '<div class="search-no-result">Không tìm thấy sản phẩm. Thử tìm: DHD340, CIR90, YT28, búa khoan, mũi khoan ren...</div>';
    } else {
        searchDropdown.innerHTML = results.map(r => `
            <div class="search-result" onclick="handleSearchClick('${r.id}','${r.type}')">
                <div class="search-result-icon">${r.type === 'model' ? '⚙' : '📦'}</div>
                <div class="search-result-text"><strong>${r.title}</strong><span>${r.cat}</span></div>
            </div>
        `).join('');
    }
    searchDropdown.classList.add('open');
}

function handleSearchClick(id, type) {
    searchDropdown.classList.remove('open');
    if (globalSearch) globalSearch.value = '';
    
    // Find the brand of the product
    const prod = PRODUCTS.find(p => p.id === id);
    if (prod) {
        // Reset brand & category filters to ensure product is displayed!
        filterByBrand('all');
        filterByCategory('all');
        
        document.getElementById('products').scrollIntoView({behavior:'smooth'});
        setTimeout(() => { showProductDetail(id); }, 300);
    }
}

globalSearch?.addEventListener('input', e => performSearch(e.target.value));
globalSearch?.addEventListener('focus', e => { if (e.target.value.length >= 2) performSearch(e.target.value); });
document.addEventListener('click', e => { if (!e.target.closest('.search-wrap')) searchDropdown.classList.remove('open'); });

document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        globalSearch?.focus();
    }
    if (e.key === 'Escape') searchDropdown?.classList.remove('open');
});

// Hero Banner Search
function executeHeroSearch() {
    const input = document.getElementById('hero-search-input');
    const q = input?.value.trim();
    if (!q) return;
    if (globalSearch) globalSearch.value = q;
    document.getElementById('products').scrollIntoView({behavior:'smooth'});
    setTimeout(() => performSearch(q), 300);
}
function quickSearch(term) {
    const input = document.getElementById('hero-search-input');
    if (input) {
        input.value = term;
        executeHeroSearch();
    }
}
document.getElementById('hero-search-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') executeHeroSearch();
});

// Mobile search toggle
document.getElementById('nav-search-btn')?.addEventListener('click', () => {
    const wrap = document.getElementById('search-wrap');
    if (!wrap) return;
    wrap.style.display = wrap.style.display === 'block' ? 'none' : 'block';
    wrap.style.position = 'absolute';
    wrap.style.top = '100%';
    wrap.style.left = '0';
    wrap.style.right = '0';
    wrap.style.padding = '8px 16px';
    wrap.style.background = 'var(--glass)';
    wrap.style.maxWidth = '100%';
    wrap.style.zIndex = '100';
    if (wrap.style.display === 'block') document.getElementById('global-search').focus();
});

// ═══ PRODUCT DETAIL MODAL ═══
function showProductDetail(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const modal = document.getElementById('product-modal');
    const body = document.getElementById('modal-body');
    if (!modal || !body) return;
    
    const imgsHTML = p.images.map(i => `<img src="${i}" alt="${p.title}" loading="lazy">`).join('');
    const specsHTML = p.specDetail.map(s => `<div class="info-row"><span>${s.l}</span><strong>${s.v}</strong></div>`).join('');
    const detailHTML = p.detail.replace(/\n/g,'<br>').replace(/•/g,'<span style="color:var(--accent)">•</span>');
    
    body.innerHTML = `
        <h2>${p.title}</h2>
        <p class="modal-subtitle">${p.cat} — ${p.desc}</p>
        <div class="modal-images">${imgsHTML}</div>
        <div class="modal-desc">${detailHTML}</div>
        <div style="margin-bottom:20px"><h3 style="font-size:15px;font-weight:700;color:var(--accent);margin-bottom:10px">Thông Số Kỹ Thuật Chi Tiết</h3>${specsHTML}</div>
        <div style="margin-bottom:20px"><h3 style="font-size:15px;font-weight:700;color:var(--accent);margin-bottom:10px">Các Models Kỹ Thuật Có Sẵn</h3><p style="font-size:13px;color:var(--text2);line-height:1.7;font-family:'JetBrains Mono',monospace">${p.models}</p></div>
        <div class="modal-cta">
            <button class="btn btn-primary" onclick="quickQuote('${p.title}');closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Yêu cầu báo giá ngay</button>
            <a href="tel:0385195501" class="btn" style="background:var(--bg4);color:var(--text);border:1px solid var(--border)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3"/></svg>Gọi điện trực tiếp</a>
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
document.getElementById('product-modal')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ═══ QUICK QUOTE FORM POPULATION ═══
function quickQuote(product) {
    const input = document.getElementById('cf-product');
    if (input) input.value = product;
    document.getElementById('contact').scrollIntoView({behavior:'smooth'});
}

// ═══ SPEC TABLE SEARCH FILTER ═══
function filterSpecTable() {
    const q = document.getElementById('spec-search').value.toLowerCase();
    document.querySelectorAll('.spec-table tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.classList.toggle('hidden-row', q.length >= 2 && !text.includes(q));
    });
}

// ═══ TECHNICAL SPECIFICATION TABS ═══
document.querySelectorAll('.tab-btn').forEach(btn => {
    // skip catalog switcher buttons
    if (btn.id.startsWith('cat-btn-')) return;
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => {
            if (!b.id.startsWith('cat-btn-')) b.classList.remove('active');
        });
        document.querySelectorAll('.catalog-table-wrap').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

// ═══ STICKY NAVIGATION & AUTO LINK ACTIVATION ═══
const nav = document.getElementById('main-nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
    document.getElementById('back-to-top')?.classList.toggle('visible', window.scrollY > 400);
    
    // Active navigation link detection
    let current = '';
    document.querySelectorAll('section[id]').forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
});

navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks?.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    const spans = navToggle?.querySelectorAll('span');
    if (spans) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
}));

// ═══ STAT COUNTER ANIMATIONS ═══
function animateCounters() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target, target = parseInt(el.dataset.target), start = performance.now();
            (function update(now) {
                const p = Math.min((now - start) / 2000, 1), eased = 1 - Math.pow(1 - p, 4);
                el.textContent = Math.round(target * eased);
                if (p < 1) requestAnimationFrame(update);
            })(start);
            observer.unobserve(el);
        });
    }, {threshold:.5});
    document.querySelectorAll('.stat-number[data-target]').forEach(c => observer.observe(c));
}

// ═══ SCROLL REVEAL ANIMATIONS ═══
function initScrollAnimations() {
    const els = document.querySelectorAll('.product-card,.trust-item,.info-card,.contact-method,.section-header');
    els.forEach(el => el.classList.add('fade-in'));
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, {threshold:.1,rootMargin:'0px 0px -40px 0px'});
    els.forEach(el => observer.observe(el));
}

// ═══ GLASSMORPHISM BG PARTICLES ═══
function createParticles() {
    const c = document.getElementById('particles');
    if (!c) return;
    for (let i=0;i<24;i++) {
        const p = document.createElement('div');
        p.className='particle';
        p.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;animation-duration:${3+Math.random()*5}s;animation-delay:${Math.random()*5}s;width:${2+Math.random()*2}px;height:${2+Math.random()*2}px;${Math.random()>.7?'background:#f59e0b':''}`;
        c.appendChild(p);
    }
}

// ═══ CONTACT FORM SUBMISSION ═══
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Yêu Cầu Đã Gửi Thành Công!';
    btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
    btn.style.borderColor = '#10b981';
    
    // Extract form values to notify
    const name = e.target.querySelector('input[type="text"]').value;
    const phone = e.target.querySelectorAll('input[type="text"]')[1].value;
    const product = document.getElementById('cf-product').value;
    const message = document.getElementById('cf-message').value;
    
    console.log("Quotation requested:", {name, phone, product, message});
    
    setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.style.borderColor = '';
        e.target.reset();
    }, 4000);
}

// ═══ SMOOTH SCROLL ROUTER ═══
function scrollToSection(sel) { document.querySelector(sel)?.scrollIntoView({behavior:'smooth'}); }
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const t = document.querySelector(this.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
    });
});

// ═══ PLATFORM BOOTSTRAP ═══
document.addEventListener('DOMContentLoaded', () => {
    renderProductGrid();
    updateFilterCounts();
    applyFilters(); // Initial render and sort
    renderCatalogTOC();
    createParticles();
    animateCounters();
    initScrollAnimations();

    // ═══ IMAGE PROTECTION — Anti-Copy Measures ═══
    // 1. Disable right-click on images
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            showCopyNotice();
        }
    });

    // 2. Prevent drag on images
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // 3. Prevent long-press save on mobile
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.style.webkitTouchCallout = 'none';
        }
    }, {passive: true});

    // Apply CSS protection to all images
    document.querySelectorAll('img').forEach(img => {
        img.style.webkitUserSelect = 'none';
        img.style.userSelect = 'none';
        img.style.pointerEvents = 'auto';
        img.setAttribute('draggable', 'false');
    });

    // MutationObserver to protect dynamically added images
    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.tagName === 'IMG') {
                    node.setAttribute('draggable', 'false');
                    node.style.webkitUserSelect = 'none';
                    node.style.userSelect = 'none';
                }
                if (node.querySelectorAll) {
                    node.querySelectorAll('img').forEach(img => {
                        img.setAttribute('draggable', 'false');
                        img.style.webkitUserSelect = 'none';
                        img.style.userSelect = 'none';
                    });
                }
            });
        });
    });
    observer.observe(document.body, {childList: true, subtree: true});
});

// Copy protection notice
function showCopyNotice() {
    let notice = document.getElementById('copy-notice');
    if (!notice) {
        notice = document.createElement('div');
        notice.id = 'copy-notice';
        notice.innerHTML = '🔒 Hình ảnh được bảo vệ bởi Công ty TNHH MTV Long Hoa Vĩ<br><small>Liên hệ 0385 195 501 để nhận catalog chính thức</small>';
        notice.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(10,14,23,0.95);color:#f59e0b;padding:14px 28px;border-radius:12px;font-size:14px;z-index:99999;text-align:center;border:1px solid rgba(245,158,11,0.3);backdrop-filter:blur(10px);transition:opacity 0.3s;line-height:1.6;';
        document.body.appendChild(notice);
    }
    notice.style.opacity = '1';
    notice.style.display = 'block';
    clearTimeout(notice._timer);
    notice._timer = setTimeout(() => {
        notice.style.opacity = '0';
        setTimeout(() => notice.style.display = 'none', 300);
    }, 3000);
}
