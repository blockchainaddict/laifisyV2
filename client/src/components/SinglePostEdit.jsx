import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SinglePostEdit = () => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [formFields, setFormFields] = useState({
    description: ''
  });

  const { id } = useParams(); // get the ID from the URL

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3500/content/edit/${id}`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          setError('Failed to fetch content');
        }
      } catch (error) {
        setError('An error occurred while fetching content data');
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!content) {
    return <div>Loading...</div>;
  }


//   FORM

//FORM element - - - - - - - - - - - - - - - -


const handleFormSubmit = (event) => {
    event.preventDefault();
    // The formFields state now holds the current form data
    console.log(formFields);

    // To create and download a json file
    // add data to the object
    let jsonObject = {
      description: formFields.description
    }
  };


  return (
    <div className='single-content-wrapper'>
        <h2 className='user-name'>{content.title}</h2>
        <div className='user-details'>

      <form onSubmit={handleFormSubmit}>
          <div className="content-editable-element">
              <p> <b>Id:</b> </p>
              <p contentEditable>{content.id}</p>
          </div>
          <div className="content-editable-element">
            <p> <b>User Id:</b> </p>
            <p contentEditable>{content.id}</p>
              </div>
          
              <div className="content-editable-element">
             <p> <b>Platform:</b> </p>
             <p contentEditable>{content.platform}</p>
              </div>
          
              <div className="content-editable-element">
             <p> <b>Caption:</b> </p>
             <p contentEditable>{content.caption}</p>
              </div>
          
              <div className="content-editable-element">
            <p> <b>Description:</b> </p>
            <p contentEditable>{content.description}</p>
              </div>

              <button></button>
      </form>
     
     
    </div>
  </div>
  );
};

export default SinglePostEdit;