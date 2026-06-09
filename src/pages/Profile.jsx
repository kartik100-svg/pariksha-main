import { useState } from "react"

function Profile() {

  const [userData,
    setUserData] = useState({

      name:"Mohit Bhargav",

      email:"mohit@gmail.com",

      phone:"+91 9876543210",

      skills:"React, JavaScript, CSS",

      experience:"Frontend Developer",

      bio:
      "Passionate frontend developer interested in AI based platforms."

    })

  function handleChange(e){

    setUserData({

      ...userData,

      [e.target.name]:
      e.target.value

    })

  }

  function handleSave(){

    alert(
      "Profile Updated Successfully"
    )

  }

  return (

    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-top">

          <div className="profile-image">

            M

          </div>

          <div>

            <h2>
              Edit Profile
            </h2>

            <p>
              Manage your profile details
            </p>

          </div>

        </div>

        <div className="profile-form">

          <input
            type="text"
            name="name"
            placeholder="Full Name"

            value={userData.name}

            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"

            value={userData.email}

            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"

            value={userData.phone}

            onChange={handleChange}
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills"

            value={userData.skills}

            onChange={handleChange}
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"

            value={userData.experience}

            onChange={handleChange}
          />

          <textarea
            rows="5"
            name="bio"
            placeholder="About You"

            value={userData.bio}

            onChange={handleChange}
          />

          <div className="resume-upload">

            <p>
              Resume Upload
            </p>

            <input
              type="file"
            />

          </div>

          <button
            onClick={handleSave}
          >

            Save Changes

          </button>

        </div>

      </div>

    </div>

  )

}

export default Profile