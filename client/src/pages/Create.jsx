import React, { useState, useEffect } from "react";
import { media_list } from "../data/media_list";

function NewContentCreation() {

  const [selectedSocialMedia, setSelectedSocialMedia] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setFormValid] = useState(false);

  const handleSocialMediaChange = (event) => {
    setSelectedSocialMedia(event.target.value);
    setSelectedOption(""); // Reset the option when social media changes
   
    // set form field for social media 
    setFormFields({
      ...formFields,
      platform: selectedSocialMedia
    });
    
    // log the object
    console.log(formFields);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Get the options for the selected social media
  const selectedSocialMediaOptions =
    media_list.find((media) => media.name === selectedSocialMedia)?.options ||
    [];

    // Create NOW date compatible with SQL
    const dateNow = () =>{
      let currentDate = new Date();
      let timestamp = currentDate.toISOString();

      console.log("Created new item at date: - - - " + timestamp);
      return timestamp;
    }

  //FORM element - - - - - - - - - - - - - - - -
  const [formFields, setFormFields] = useState({
    user_id: 1,
    platform: '',
    title: '',
    caption: '',
    description: '',
    type: '',
    mediaURL: '',
    postDate: '',
    likes: 0,
    comments: 0,
    location: '',
    audio: '',
    brand: '',
    timestamp: ''
  });
  

  
  const handleFieldChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value
    });
  };

  const logObject = ()=>{
    console.log(formFields);
  }
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormFields({
      ...formFields,
      timestamp: dateNow()
    })
    console.log('Creating new content with:', formFields);
    fetch('http://localhost:3500/create/', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formFields),
      })
      .then(response => response.json()) // If the server returns JSON, parse it
      .then(data => console.log('Success:', data)) // Handle the success case
      .catch((error) => {
        console.error('Error:', error); // Handle the error case
      });
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

  const checkAll = () => {
    console.log('THIS - - - - - ', formFields);
  }

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
      <input type="text" name="title" value={formFields.title} onChange={handleFieldChange} onBlur={logObject} />
      {formErrors.title && <p style={{color:'red'}}>{formErrors.title}</p>}
    </label>
    <label>
      Caption:
      <input type="text" name="caption" value={formFields.caption} onChange={handleFieldChange} onBlur={logObject}/>
    </label>
    <label>
      Description:
      <textarea name="description" value={formFields.description} onChange={handleFieldChange} onBlur={logObject}/>
      {formErrors.description && <p style={{color:'red'}}>{formErrors.description}</p>}
    </label>
    <label>
      Post Date:
      <input type="date" name="post-date" value={formFields.postDate} onChange={handleFieldChange} onBlur={logObject} />
    </label>
    <label>
      Brand:
      <input type="text" name="brand" value={formFields.brand} onChange={handleFieldChange} onBlur={logObject}/>
    </label>
    <label >
      <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Select...</option>
            <option value="zara">Zara</option>
            <option value="mcdonalds">McDonals</option>
            <option value="shell">Shell</option>
          </select>

    </label>
    <label>
      Media URL (link):
      <input type="text" name="mediaURL" value={formFields.mediaURL} onChange={handleFieldChange} onBlur={logObject}/>
    </label>
    <label>
      Audio:
      <input type="text" name="audio" value={formFields.audio} onChange={handleFieldChange} onBlur={logObject}/>
    </label>

    <button onClick={checkAll}>CHECK ALL</button>

    <button type="submit" disabled={!isFormValid}>Create</button>
  </form>
)}

    </div>
  );
}

export default NewContentCreation;
