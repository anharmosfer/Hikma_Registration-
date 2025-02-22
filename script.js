
      function showConditions(event) {
        event.preventDefault();
        document.getElementById("conditionsModal").style.display = "block";
      }

      function closeConditions() {
        document.getElementById("conditionsModal").style.display = "none";
      }

      // Close the modal when clicking outside of it
      window.onclick = function (event) {
        var modal = document.getElementById("conditionsModal");
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
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

function updateProgress() {
    const form = document.getElementById("registration-form");
    const formElements = form.elements;
    let filledCount = 0;
    let totalCount = 0;

    for (let element of formElements) {
        if (element.tagName === "INPUT" || element.tagName === "SELECT") {
            totalCount++;
            // Only consider filled elements if they are not file inputs or checkboxes
            if ((element.type !== "file" && element.type !== "checkbox") && element.value.trim() !== "") {
                filledCount++;
            }
        }
    }

    console.log(`Filled Count: ${filledCount}, Total Count: ${totalCount}`); // Debugging log

    const progress = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = progress + "%";
    progressBar.textContent = progress + "%";
}

// Attach updateProgress to input elements
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('change', updateProgress);
});
function refreshPage() {
    // You can include form validation or submission here if needed
    location.reload();
}
