// ✅ Import default Cypress commands
import "./commands";

// ✅ Register mochawesome reporter hooks
import "cypress-mochawesome-reporter/register";

// ✅ Hook لتسجيل screenshots والفيديو عند انتهاء كل test
Cypress.on("test:after:run", (test, runnable) => {
  const parentTitle = runnable?.parent?.title || "NoParent";

  if (test.state === "failed") {
    // 📸 Screenshot عند الفشل
    const screenshotFileName = `${parentTitle} -- ${test.title} (failed).png`;
    cy.screenshot(screenshotFileName, { capture: "runner" });

    // 📝 Log في التقرير
    Cypress.log({
      name: "screenshot",
      message: `❌ Failed - Screenshot saved: ${screenshotFileName}`,
    });
  } else if (test.state === "passed") {
    // 📸 Screenshot عند النجاح (اختياري)
    const screenshotFileName = `${parentTitle} -- ${test.title} (passed).png`;
    cy.screenshot(screenshotFileName, { capture: "runner" });

    Cypress.log({
      name: "screenshot",
      message: `✅ Passed - Screenshot saved: ${screenshotFileName}`,
    });
  }
});

// ✅ بعد انتهاء كل suite احفظ الفيديو (Cypress يعمل هذا تلقائياً لكن نحط Log هنا للوضوح)
Cypress.on("after:spec", (spec, results) => {
  if (results && results.video) {
    Cypress.log({
      name: "video",
      message: `🎥 Video saved: ${results.video}`,
    });
  }
});
