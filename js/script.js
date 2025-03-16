// ================== Modal Functions ==================
function showConditions(event) {
  event.preventDefault();
  document.getElementById("conditionsModal").style.display = "block";
}

function closeConditions() {
  document.getElementById("conditionsModal").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("conditionsModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// ================== College and Department Logic ==================
const collegeSelect = document.getElementById("college");
const departmentSelect = document.getElementById("department");

collegeSelect.addEventListener("change", () => {
  const selectedCollege = collegeSelect.value;
  let departments = [];

  if (selectedCollege === "institute") {
    departments = ["قسم الحاسوب", "قسم التمريض"];
  } else if (selectedCollege === "medical") {
    departments = ["قسم الصيدلة", "قسم المختبرات", "قسم التمريض", "قسم التخدير"];
  } else if (selectedCollege === "engineering") {
    departments = ["قسم الهندسة المدنية", "قسم هندسة العمارة", "قسم تقنية المعلومات"];
  } else if (selectedCollege === "administration") {
    departments = ["قسم إدارة الأعمال", "قسم المحاسبة", "قسم التسويق", "قسم نظم المعلومات الإدارية"];
  }

  departmentSelect.innerHTML = "<option value='' disabled selected>اختر القسم</option>";
  departments.forEach((department) => {
    const option = document.createElement("option");
    option.value = department;
    option.textContent = department;
    departmentSelect.appendChild(option);
  });
});

// ================== Form Validation ==================
function validateForm() {
  const branch = document.getElementById("branch").value;
  const college = document.getElementById("college").value;
  const department = document.getElementById("department").value;
  const nextButton = document.getElementById("nextButton");

  // Check if all fields are selected
  if (branch && college && department) {
    nextButton.classList.add("enabled");
    nextButton.classList.remove("disabled");
    nextButton.onclick = showMainForm; // Enable click function
  } else {
    nextButton.classList.remove("enabled");
    nextButton.classList.add("disabled");
    nextButton.onclick = null; // Disable click function
  }
}

// Attach validateForm to input elements
document.querySelectorAll('input, select').forEach((element) => {
  element.addEventListener('change', validateForm);
});

// ================== Arabic Name Validation ==================
function validateArabicName(event) {
  const inputField = document.getElementById("input1");
  const errorMessage = document.getElementById("arabicNameError");
  const nameValue = inputField.value.trim();

  // Regex to ensure at least 4 Arabic words separated by spaces
  const regex = /^[\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+){3,}$/;

  if (regex.test(nameValue)) {
    errorMessage.style.display = "none"; // Hide error if input is valid
  } else {
    errorMessage.style.display = "block"; // Show error if input is invalid
  }

  // Remove non-Arabic characters
  inputField.value = inputField.value.replace(/[^أ-ي\s]/g, '');
}

// ================== Dynamic Text Update ==================
function updateText(tabId) {
  const dynamicText = document.getElementById("dynamic-text");

  switch (tabId) {
    case 'tab1':
      dynamicText.textContent = "قم بتعبئة كافة البيانات المطلوبة كما ورد بالنص في إستمارة الثانوية العامة";
      break;
    case 'tab2':
      dynamicText.textContent = "قم بتعبئة كافة البيانات المطلوبة كما ورد بالنص في إستمارة الثانوية العامة";
      break;
    case 'tab3':
      dynamicText.textContent = "الرجاء إدخال بيانات الهوية الرسمية بشكل صحيح";
      break;
  }
}

// ================== Initialize Form ==================
function initializeForm() {
  const sections = document.querySelectorAll('.content section');
  sections.forEach((section, index) => {
    if (index === 0) {
      section.classList.add('active'); // Show the first section
    } else {
      section.classList.remove('active'); // Hide the rest
    }
  });

  // Initialize steps progress
  updateStepsProgress();
}

// Call the initializeForm function when the page loads
window.onload = initializeForm;

// ================== Show Main Form ==================
function showMainForm() {
  const section1 = document.getElementById("branch-college-section");
  const mainForm = document.getElementById("registration-form");

  // Hide Section 1 with animation
  section1.style.opacity = "0";
  section1.style.transform = "translateY(-30px)";
  setTimeout(() => {
    section1.style.display = "none";
  }, 100); // Match the transition duration

  // Show Section 2 with animation
  setTimeout(() => {
    mainForm.style.display = "flex";
    setTimeout(() => {
      mainForm.style.opacity = "1";
      mainForm.style.transform = "translateY(0)";
    }, 50);
  }, 500);
}

// ================== Refresh Page ==================
function refreshPage() {
  location.reload(); // Reload the page
}

const circles = document.querySelectorAll(".circle"),
      progressBar1 = document.querySelector(".indicator"),
      buttons = document.querySelectorAll("button"),
      prev = document.querySelector('#prev'),
      next = document.querySelector('#next');

let currentStep = 1;

const updateSteps = (e) => {
  console.log(`Button clicked: ${e.target.id}, Current Step: ${currentStep}`);

  if (e.target.id === "next") {
      if (currentStep === 1) {
          const tab2 = document.querySelector('label[for="tab2"]');
          if (tab2) {
              tab2.click(); 
          }
          currentStep++;
      } else if (currentStep === 2) {
          const tab3 = document.querySelector('label[for="tab3"]');
          if (tab3) {
              tab3.click(); 
          }
          currentStep++;
      }
  } else { // prev button
      if (currentStep === 2) {
          const tab1 = document.querySelector('label[for="tab1"]');
          if (tab1) {
              tab1.click(); 
          }
          currentStep--;
      }
      else if (currentStep === 3) {
          const tab2 = document.querySelector('label[for="tab2"]');
          if (tab2) {
              tab2.click(); 
          }
          currentStep--;
      }
  }

  // Update active circles and progress bar
  circles.forEach((circle, index) => {
      circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
  });
  
  progressBar1.style.width = `${((currentStep - 1) / (circles.length - 1)) * 100}%`;
  prev.style.display = currentStep === 1 ? "none" : "inline-block";
  next.style.display = currentStep === circles.length ? "none" : "inline-block"; 


};

buttons.forEach((button) => {
    button.addEventListener("click", updateSteps);
});







