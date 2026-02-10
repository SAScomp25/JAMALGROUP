// ضع هنا رقم الواتساب بصيغة دولية بدون + أو مسافات. مثال للمملكة العربية السعودية: "9665XXXXXXXX"
const whatsappNumber = "905300727398"; // <-- غيّر هذا إلى رقمك

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // جلب قيم الحقول
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const country = document.getElementById("country").value.trim();
  const serviceSelect = document.getElementById("service");
  const service = serviceSelect.options[serviceSelect.selectedIndex].text;

  // تحقق بسيط
  if (!name || !phone || !country || !serviceSelect.value) {
    alert("الرجاء تعبئة جميع الحقول");
    return;
  }

  if (!/^[0-9+()\-\s]*$/.test(phone)) {
    // السماح بالأرقام وبعض الرموز البسيطة
    if (!confirm("يبدو أن رقم الهاتف يحتوي على أحرف غير متوقعة. متابعة؟"))
      return;
  }

  if (!whatsappNumber || whatsappNumber === "00905300727398") {
    alert(
      "قم بتعديل ملف script.js وضع رقم الواتساب المستلم في المتغير whatsappNumber بصيغة دولية بدون +",
    );
    return;
  }

  // إعداد الرسالة
  const message = `طلب جديد\n الاسم : ${name}\n رقم الهاتف : ${phone}\n البلد : ${country}\n الخدمة المطلوبة : ${service}\n\n`;

  const encoded = encodeURIComponent(message);

  // ملاحظة: رابط wa.me يتطلب رقمًا بصيغة دولية (بدون + أو صفر بادئ)

  // فتح واتساب في تبويب جديد
  window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate__animated");
        // لو تبيها مرة وحدة فقط:
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 1 },
);

const elements = document.querySelectorAll(".animation");
elements.forEach((el) => observer.observe(el));
