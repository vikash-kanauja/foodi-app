// import React, { useContext } from "react";
// import { useForm } from "react-hook-form";
// import { AuthContext } from "../../contexts/AuthProvider";
// import { useLocation, useNavigate } from "react-router-dom";

// const UpdateProfile = () => {
//   // const { updateUserProfile } = useContext(AuthContext);
//   // const {
//   //   register,
//   //   handleSubmit,
//   //   watch,
//   //   formState: { errors },
//   // } = useForm();

//   // const location = useLocation();
//   // const navigate = useNavigate();
//   // const from = location.state?.from?.pathname || "/";

//   // const onSubmit = (e) => {
//   //   e.prevnetdefault()
//     // const name = data.name;
//     // const photoURL = data.photoURL;
//     // updateUserProfile(name, photoURL)
//     //   .then(() => {
//     //     // Profile updated!
//     //     navigate(from, { replace: true });
//     //     // ...
//     //   })
//     //   .catch((error) => {
//     //     // An error occurred
//     //     // ...
//     //   });
//   // };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//         <form action="/api/user/profile" method="POST" enctype="multipart/form-data">
//           <input type="file" name="file" required />
//           <button type="submit">Upload</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateProfile = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // Append the file to FormData

    try {
      const response = await fetch("http://localhost:4000/api/user/profile", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Profile updated successfully
        navigate(from, { replace: true });
      } else {
        // Handle server errors
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      // Handle network errors
      console.error("Error during upload:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="file" onChange={handleFileChange} required />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
