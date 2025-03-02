'use strict';

document.addEventListener("DOMContentLoaded", function() {
  const addPropertyForm = document.getElementById("addPropertyForm");
  const propertyImageInput = document.getElementById("propertyImageFile");
  const agentImageInput = document.getElementById("agentImage");

  addPropertyForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Collect text-based form data
    const propertyData = {
      title: document.getElementById("propertyTitle").value,
      price: document.getElementById("propertyPrice").value,
      status: document.getElementById("propertyStatus").value, // "rent" or "sale"
      paymentType: document.getElementById("propertyPaymentType").value, // "/Month" or "Full"
      location: document.getElementById("propertyLocation").value,
      description: document.getElementById("propertyDescription").value,
      bedrooms: document.getElementById("bedrooms").value,
      bathrooms: document.getElementById("bathrooms").value,
      squareFt: document.getElementById("squareFt").value,
      // We'll fill these image fields later after reading the files
      imageUrl: "",
      agentName: document.getElementById("agentName").value,
      agentTitle: document.getElementById("agentTitle").value || "Estate Agents",
      agentImageUrl: ""
    };

    // Read property image file => base64
    const propertyFile = propertyImageInput.files[0];
    const agentFile = agentImageInput.files[0] || null;

    // We'll do a two-step read:
    // 1) read propertyFile
    // 2) read agentFile
    // Then store everything

    if (!propertyFile) {
      alert("Please select a property image.");
      return;
    }

    const propertyReader = new FileReader();
    propertyReader.onload = function(e) {
      propertyData.imageUrl = e.target.result; // base64 string

      // Now read agent image if any
      if (agentFile) {
        const agentReader = new FileReader();
        agentReader.onload = function(ev) {
          propertyData.agentImageUrl = ev.target.result; // base64 for agent
          storePropertyData(propertyData);
        };
        agentReader.readAsDataURL(agentFile);
      } else {
        // No agent image file => store property data now
        propertyData.agentImageUrl = ""; // or default
        storePropertyData(propertyData);
      }
    };
    propertyReader.readAsDataURL(propertyFile);
  });

  function storePropertyData(data) {
    // 1) Get existing properties from localStorage
    let existingProperties = JSON.parse(localStorage.getItem("properties")) || [];

    // 2) Push the new property
    existingProperties.push(data);

    // 3) Save to localStorage
    localStorage.setItem("properties", JSON.stringify(existingProperties));

    // 4) Reset form & confirm
    addPropertyForm.reset();
    alert("Property Added Successfully!");

    // Optionally redirect to index
    // window.location.href = "index.html";
  }
});
