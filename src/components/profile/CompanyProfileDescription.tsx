"use client";

import { ChevronsDown, ChevronsUp } from "lucide-react";
import useParagraphLineClamped from "~/hook/useParagraphLineClamped";

export default function CompanyProfileDescription() {
  const { contentRef, maxHeight, isClamped, seeMore, toggleSeeMore } =
    useParagraphLineClamped({
      linesAllowed: 7,
    });

  return (
    <div className="rounded-lg overflow-hidden max-w-[1200px] mx-auto bg-white">
      <div className="bg-c-primary px-5 py-2">
        <p className="text-2xl text-c-text-dark font-semibold">Về chúng tôi</p>
      </div>
      <div className="p-5 space-y-2">
        <div
          style={{
            maxHeight: seeMore ? "none" : maxHeight,
            overflowY: "hidden",
          }}
          ref={contentRef}
          className="relative whitespace-pre-line break-word-legacy transition-all ease-linear list-class"
        >
          Với hơn 14 năm xây dựng và phát triển, CMC Telecom tự hào nằm trong
          TOP 4 nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam và được vinh
          danh là 1 trong 5 doanh nghiệp cung cấp dịch vụ có ảnh hưởng nhất tới
          Internet Việt Nam trong thập kỷ, tập trung cung cấp dịch vụ Viễn thông
          - Công nghệ thông tin chất lượng cao cho nhóm khách hàng doanh nghiệp,
          tổ chức chính phủ, tập đoàn nước ngoài tại VN nổi bật như: Điện toán
          đám mây trong nước và quốc tế, Datacenter, Kết nối viễn thông trong
          nước-quốc tế,... Chúng tôi khao khát hướng tới sứ mệnh chinh phục thế
          giới số, đưa Việt Nam dẫn đầu trong kỷ nguyên số. Trên hành trình đầy
          thách thức này, chúng tôi đang không ngừng tìm kiếm những người đồng
          hành trẻ dám thử thách, ham học hỏi với bộ óc đầy sáng tạo và niềm đam
          mê bất tận cho công nghệ. Nếu bạn là một người trẻ với trái tim rực
          cháy đam mê và ước muốn đưa Việt Nam đi nhanh hơn, vươn xa hơn trên
          bản đồ thế giới số, hãy gia nhập cùng đại gia đình CMC Telecom - nơi
          mọi trái tim yêu công nghệ hòa chung một nhịp.
          <br />* Địa Điểm:
          <ul className="list-class">
            <li>
              Develop and maintain websites and real-time front-end systems
              across multiple platforms: PC, Mobile, Tablet.
            </li>
            <li>
              Optimize website performance, ensure standardization and SEO best
              practices, and help build the company's brand image.
            </li>
            <li>
              Convert UI/UX design files (PSD, Figma, XD, etc.) into responsive
              and modern HTML/CSS interfaces.
            </li>
            <li>
              Write clean, well-documented, and tested JavaScript/TypeScript,
              HTML, and CSS code.
            </li>
            <li>
              Integrate with RESTful APIs and collaborate closely with UI/UX
              designers, backend developers, and team members.
            </li>
            <li>
              Ensure cross-browser and cross-device compatibility for all
              front-end features.
            </li>
            <li>
              Participate in improving workflows and sharing knowledge with the
              team.
            </li>
          </ul>
        </div>
        {isClamped && (
          <button
            onClick={toggleSeeMore}
            className="flex items-center justify-center mx-auto text-c-dark-primary cursor-pointer"
          >
            {!seeMore ? <ChevronsDown /> : <ChevronsUp />}
            <p className="">{seeMore ? " Thu gọn" : "Xem thêm"}</p>
          </button>
        )}
      </div>
    </div>
  );
}
