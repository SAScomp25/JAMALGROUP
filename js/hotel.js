// ضع هنا رقم الواتساب بصيغة دولية بدون + أو مسافات. مثال للمملكة العربية السعودية: "9665XXXXXXXX"
const whatsappNumber = "905300727398"; // <-- غيّر هذا إلى رقمك

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // جلب قيم الحقول
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const typeSelect = document.getElementById("type");
  const type = typeSelect.options[typeSelect.selectedIndex].text;

  const numrSelect = document.getElementById("num-r");
  const numr = numrSelect.options[numrSelect.selectedIndex].text;

  const numpSelect = document.getElementById("num-p");
  const nump = numpSelect.options[numpSelect.selectedIndex].text;

  const numdSelect = document.getElementById("num-d");
  const numd = numdSelect.options[numdSelect.selectedIndex].text;

  // تحقق بسيط
  if (!name || !phone || !type || !numr || !nump || !numd) {
    alert("الرجاء تعبئة جميع الحقول");
    return;
  }

  if (!/^[0-9+()\-\s]*$/.test(phone)) {
    // السماح بالأرقام وبعض الرموز البسيطة
    if (!confirm("يبدو أن رقم الهاتف يحتوي على أحرف غير متوقعة. متابعة؟"))
      return;
  }

  if (!whatsappNumber || whatsappNumber === "00905356747067") {
    alert(
      "قم بتعديل ملف script.js وضع رقم الواتساب المستلم في المتغير whatsappNumber بصيغة دولية بدون +",
    );
    return;
  }

  // إعداد الرسالة
  const message = `طلب جديد\n الاسم : ${name}\n رقم الهاتف : ${phone}\n جودة الفندق : ${type} نجوم\n عدد الغرف : ${numr}\n عدد الأشخاص : ${nump}\n مدة الحجز : ${numd}\n  `;

  const encoded = encodeURIComponent(message);

  // ملاحظة: رابط wa.me يتطلب رقمًا بصيغة دولية (بدون + أو صفر بادئ)

  // فتح واتساب في تبويب جديد
  window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
});
