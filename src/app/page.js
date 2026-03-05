// src/app/page.js
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import CoursesSection from "@/components/home/CoursesSection";
import AISection from "@/components/home/AISection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";
import AIChatWidget from "@/components/chat/AIChatWidget";
import { db } from "@/lib/db";

export default async function HomePage() {
  const featuredCourses = await db.course.findMany({
    where:   { isPublished: true, isFeatured: true },
    include: { category: true, _count: { select: { enrollments: true, reviews: true } } },
    take:    8,
  });

  return (
    <main>
      <Navbar />
      <HeroSection />
      <CoursesSection courses={featuredCourses} />
      <AISection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <AIChatWidget />
    </main>
  );
}
