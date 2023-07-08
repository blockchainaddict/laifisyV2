import React, { useState, useEffect } from "react";
import { media_list } from "../data/media_list";
// import IgPost from "../components/post/IgPost";

// file creation
// import { jsPDF } from "jspdf";

function NewContentCreation() {
  const [selectedSocialMedia, setSelectedSocialMedia] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSocialMediaChange = (event) => {
    setSelectedSocialMedia(event.target.value);
    setSelectedOption(""); // Reset the option when social media changes
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Get the options for the selected social media
  const selectedSocialMediaOptions =
    media_list.find((media) => media.name === selectedSocialMedia)?.options ||
    [];

  //FORM element - - - - - - - - - - - - - - - -
  const [formFields, setFormFields] = useState({
    title: '',
    description: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setFormValid] = useState(false);
  
  const handleFieldChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value
    });
  };
  
  // const handleFileChange = (event) => {
  //   setFormFields({
  //     ...formFields,
  //     mediaFile: event.target.files[0]
  //   });
  // };
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // The formFields state now holds the current form data
    // console.log(formFields);

    // To create and download a json file
    // add data to the object
    let jsonObject = {
      title: formFields.title,
      description: formFields.description,
      social: selectedSocialMedia,
      format: selectedOption
    }

    // Create a new Blob with the form data
    // const blob = new Blob([JSON.stringify(jsonObject, null, 2)], { type: 'application/json' });

    // Create a link element
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = 'form_data.json';

    // Append the link to the body and simulate a click to start the download
    // document.body.appendChild(link);
    // link.click();

    // Clean up by removing the link and revoking the object URL
    // document.body.removeChild(link);
    // URL.revokeObjectURL(url);

    
    // Create a new jsPDF instance
    // const doc = new jsPDF();

    // Set font size for the title
    // doc.setFontSize(22);

    // // Add title to the document
    // const title = `Title: ${formFields.title}`;
    // const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    // const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    // doc.text(title, titleX, 10);
  
    // // Set font size and style for the description
    // doc.setFontSize(16);
    // doc.setFont(undefined, 'bold');
  
    // // Add description to the document
    // doc.text(`Description: ${formFields.description}`, 10, 30);
  
    // // Add selected social media and option
    // doc.setFont(undefined, 'normal');
    // doc.text(`Selected Social Media: ${selectedSocialMedia}`, 10, 50);
    // doc.text(`Selected Option: ${selectedOption}`, 10, 70);
  
    // // Save the PDF
    // doc.save("form_data.pdf");
  };
  
  // Validation
  useEffect(() => {
    const errors = {};
    
    if (!formFields.title.trim()) {
      errors.title = 'Title is required';
    }
  
    if (!formFields.description.trim()) {
      errors.description = 'Description is required';
    }
  
    setFormErrors(errors);
  
    // If the errors object is empty, the form is valid
    setFormValid(Object.keys(errors).length === 0);
  }, [formFields]);

  return (
    <div className="create-wrapper">
      <h1>Create New Content</h1>

      <label>
        Choose Social Media:
        <select value={selectedSocialMedia} onChange={handleSocialMediaChange}>
          <option value="">Select...</option>
          {media_list.map((media) => (
            <option key={media.name} value={media.name}>
              {media.name}
            </option>
          ))}
        </select>
      </label>

      {selectedSocialMedia && (
        <label>
          Choose Option:
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Select...</option>
            {selectedSocialMediaOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Render dynamic form based on the selected social media and option */}
{selectedSocialMedia && selectedOption && (
  <form onSubmit={handleFormSubmit}>
    <label>
      Title:
      <input type="text" name="title" value={formFields.title} onChange={handleFieldChange} />
      {formErrors.title && <p style={{color:'red'}}>{formErrors.title}</p>}
    </label>
    <label>
      Description:
      <textarea name="description" value={formFields.description} onChange={handleFieldChange} />
      {formErrors.description && <p style={{color:'red'}}>{formErrors.description}</p>}
    </label>
    <button type="submit" disabled={!isFormValid}>Create</button>
  </form>
)}

    {/* <IgPost/> */}
    </div>
  );
}

export default NewContentCreation;
