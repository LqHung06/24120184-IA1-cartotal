# Self Assessment Report: IA#1 — cartTotal with a harness

- **Student ID**: 24120184
- **Repository Link**: https://github.com/LqHung06/24120184-IA1-cartotal
- **CI Run Link**: https://github.com/LqHung06/24120184-IA1-cartotal/actions/runs/36390366810 (Workflow `CI Harness Gate` — Run #1, Commit `21fa4cb`, Status: Passing / Green)
- **Total Marks Claimed**: **100 / 100**

---

## 1. Bảng Tự Đánh Giá Chi Tiết Theo Rubric

| # | Tiêu chí | Điểm tối đa | Điểm tự chấm | Dẫn chứng kiểm chứng cụ thể File, Dòng, Test, Commit |
|---|---|:---:|:---:|---|
| **1** | **cartTotal behaves as specified** | **30** | **30** | • Đúng giá trị ví dụ mẫu `467400` dạng number (không dùng `toFixed` trả về string): kiểm chứng tại `test/cart.test.js`, dòng 7–14 và `src/cart.js`, dòng 20.<br>• Giỏ rỗng dạng mảng trả về `0` đúng contract: `src/cart.js`, dòng 3–5.<br>• Miễn phí vận chuyển khi đạt hoặc vượt ngưỡng: `subtotal >= options.freeShipFrom ? 0 : options.shipFee`, `src/cart.js`, dòng 18.<br>• Ném `RangeError` khi giá âm: `src/cart.js`, dòng 8–10.<br>• Ném `RangeError` khi số lượng không phải số nguyên dương `!Number.isInteger(qty) || qty <= 0`): `src/cart.js`, dòng 11–13.<br>• Làm tròn số đồng nguyên duy nhất 1 lần ở cuối bằng `Math.round`: `src/cart.js`, dòng 20.<br>• Minh chứng commit: `8c676c1`. |
| **2** | **Tests** | **20** | **20** | • `npm test` pass toàn bộ 13/13 tests  sử dụng `node:test` và `node:assert/strict`.<br>• Giữ nguyên vẹn test mẫu ban đầu: `test/cart.test.js`, dòng 7–14.<br>• Bao phủ toàn diện theo nguyên tắc *"One test = one reason to fail"*: giỏ rỗng (dòng 22, 26), phí ship dưới ngưỡng (dòng 30), đúng ngưỡng freeship (dòng 35), vượt ngưỡng freeship (dòng 40), giá âm ném RangeError (dòng 45), giá 0đ hợp lệ (dòng 53), qty 1.5 ném RangeError (dòng 58), qty 0 ném RangeError (dòng 66), qty âm ném RangeError (dòng 74), làm tròn số lẻ (dòng 82), kiểm tra kiểu number (dòng 88).<br>• Minh chứng commit: `41c8451`. |
| **3** | **The harness** | **20** | **20** | • Rules file `AGENTS.md` gồm đúng 31 dòng, đầy đủ Tech Stack, Commands, Scope và 7 điều luật cấm *NEVER*: commit `c2e78a4`.<br>• Quality Gate hoạt động chuẩn zero-dependency (`node --check` + `npm test`): `package.json`, commit `3d969a1`.<br>• GitHub Actions CI chạy tự động trên sự kiện `push`: file `.github/workflows/ci.yml`, commit `86d8b91`.<br>• Giảm quyền của workflow xuống mức chỉ đọc bằng `permissions: contents: read` (nguyên tắc Least Privilege): commit `21fa4cb`.<br>• Link kiểm chứng trực tiếp lần chạy CI xanh: [Run #1 trên GitHub Actions](https://github.com/LqHung06/24120184-IA1-cartotal/actions/runs/36390366810). |
| **4** | **The brief** | **15** | **15** | • File `BRIEF.md` nêu rõ: file được phép sửa (`src/cart.js`, `test/cart.test.js`), file cấm đụng, contract chi tiết, các ca lỗi ngoại lệ, ràng buộc zero-dependency.<br>• Định nghĩa rõ ràng tiêu chí Done: `npm run gate` xanh, bao phủ đủ các ca kiểm thử.<br>• Bổ sung mục `## Freedom` yêu cầu AI trình bày kế hoạch trước khi code và minh bạch các giả định ngầm (*assumptions*).<br>• Cấm Agent tự chạy lệnh Git để giữ quyền kiểm soát cho con người.<br>• Minh chứng commit: `dbe3222`. |
| **5** | **AI-LOG.md** | **15** | **15** | • File `AI-LOG.md` ghi chép chi tiết, trung thực công cụ sử dụng (Google Antigravity và Codex phản biện).<br>• **Bằng chứng phản biện rõ ràng**: Codex phát hiện Antigravity tự tiện thêm `!items` và `typeof !== 'number'` ngoài contract $\rightarrow$ đã xem xét, từ chối và sửa code, đồng thời cân nhắc thêm trường hợp TypeError.<br>• Đối chiếu khớp với lịch sử git diff (`git show 8c676c1` và `git show 21fa4cb`).<br>• Tách bạch rõ ràng phần đóng góp của các trợ lý AI và phần tự thực hiện. |
| **Tổng điểm** | | **100** | **100** | **Điểm tự chấm hoàn toàn dựa trên kết quả kiểm chứng thực tế (Local gate & GitHub Actions CI đều xanh).** |

---

## 2. Phần Tự Đánh Giá Khó Khăn & Bài Học Rút Ra

### A. What I did not manage 
Về mặt chức năng và yêu cầu của Rubric, toàn bộ 5/5 tiêu chí đều đã hoàn thành trọn vẹn và đạt kết quả kiểm thử xanh. Tuy nhiên, vẫn có 2 điểm hạn chế mang tính kỹ thuật mà chưa thực hiện mở rộng trong phạm vi bài tập này:
1. **Chưa tích hợp công cụ Linter chuyên sâu (như ESLint hay Biome)**: Do tuân thủ triệt để ràng buộc cốt lõi của đề bài là *zero external dependencies*, dự án chỉ sử dụng `node --check` có sẵn của Node.js để kiểm tra tính hợp lệ cú pháp mà chưa phân tích sâu được style code hoặc code smells.
2. **Chưa thiết lập ma trận kiểm thử đa phiên bản Node (Matrix Build)**: Workflow CI hiện tại chỉ cấu hình chạy trên một phiên bản Node.js 20 duy nhất mà chưa chạy đồng thời trên Node.js 22 và Node.js 24 để kiểm tra tính tương thích lâu dài giữa các phiên bản runtime.

### B. Reflection & Lessons Learned 
1. **Tư duy Harness-First**:
   Việc dựng rules file `AGENTS.md` và script gate trước là tối quan trọng: nó đóng vai trò là "chiếc lồng bảo vệ" giữ cho AI không tự tiện cài thêm npm dependencies hay sửa đổi file ngoài phạm vi được giao.
2. **Giám sát và Phản biện AI (Human-in-the-loop & Multi-AI Review)**:
   Điểm giá trị nhất trong bài tập này là việc phát hiện AI có xu hướng "phòng thủ quá đà" (thêm `!items` và `typeof item.price !== 'number'`). Nhờ sự phân tích của Codex khi soi diff, đã nhận ra đoạn code đó vi phạm điều cấm của đề bài (*"no extra validation beyond the cases listed above"*). Việc duy trì quyền kiểm soát Git và soi diff từng dòng giúp làm chủ hoàn toàn mã nguồn của mình, không bị phụ thuộc thụ động vào AI.
3. **Cải tiến bảo mật CI**:
   Việc bổ sung cấu hình `permissions: contents: read` vào file CI workflow giúp tôi hiểu thêm về nguyên tắc đặc quyền tối thiểu (Least Privilege) trong quy trình CI/CD thực tế, giảm thiểu rủi ro bảo mật cho repository.
