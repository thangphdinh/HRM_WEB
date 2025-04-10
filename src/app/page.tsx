"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* === Section 1: Hero === */}
      <section className="snap-start h-screen flex items-center justify-center bg-white dark:bg-black px-6">
        <motion.div
          className="max-w-3xl text-center flex flex-col items-center gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src="/icon_hrm.png"
            alt="HRM Logo"
            width={480}
            height={88}
            className="w-auto h-auto"
            priority
          />
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
            Human Resource Management System
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Modern, secure & streamlined HR solution — built for teams.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-base sm:text-lg font-medium hover:opacity-80 transition"
            >
              Go to Login
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* === Section 2+: Benefits === */}
      {benefits.map((item, i) => (
        <section
          key={i}
          className="snap-start h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-black"
        >
          <motion.div
            className="max-w-2xl flex flex-col items-center text-center gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 2 }}
          >
            <Image
              src={item.icon}
              alt={`${item.title} icon`}
              width={1064}
              height={1064}
              className="w-[320px] h-auto"
            />
            <h3 className="text-2xl font-semibold">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
          </motion.div>
        </section>
      ))}

      {/* === Footer === */}
      <footer className="snap-start h-auto py-6 px-4 bg-gray-100 dark:bg-gray-900 text-sm text-gray-600 dark:text-gray-300 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span>© {new Date().getFullYear()} HRM Inc by ThangPD. All rights reserved.</span>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

const benefits = [
  {
    icon: "/benefits/automation.png",
    title: "Tự động hóa quy trình nhân sự",
    description:
      "Tiết kiệm thời gian với các quy trình như chấm công, tính lương, nghỉ phép được số hóa hoàn toàn.",
  },
  {
    icon: "/benefits/ui.png",
    title: "Giao diện dễ dùng",
    description:
      "Thiết kế tối giản, thân thiện người dùng ở mọi cấp độ kỹ năng.",
  },
  {
    icon: "/benefits/secure.png",
    title: "Phân quyền rõ ràng",
    description:
      "Bảo mật dữ liệu với hệ thống phân quyền chi tiết: System Admin, Admin và Member.",
  },
  {
    icon: "/benefits/report.png",
    title: "Báo cáo tức thời",
    description:
      "Xem báo cáo, thống kê, phân tích nhân sự theo thời gian thực.",
  },
];
