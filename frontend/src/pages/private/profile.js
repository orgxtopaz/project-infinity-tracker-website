import React from "react";
import Header from "../../component/private-page-header";
import Footer from "../../component/private-page-footer";

export default function Profile() {
  return (
    <div class="container">
      <Header />

      <div className="user-container">
        <div className="user-inner-element">
          <div className="user-title">Hi! (Name)</div>
          <form action="#">
            <div className="user-details">
              <div className="personal-info-box">
                <span className="personal-details">Name</span>
                <input type="text" value="John" required />
              </div>
              <div className="personal-info-box">
                <span className="personal-details">Surname</span>
                <input type="text" value="Doe" required />
              </div>
              <div className="personal-info-box">
                <span className="personal-details">Birthday</span>
                <input type="date" value="1990-02-02" required />
              </div>
              <div className="personal-info-box">
                <span className="personal-details">Gender</span>
                <input type="text" value="Male" required />
              </div>
              <div className="personal-info-box">
                <span className="personal-details">Email</span>
                <input type="text" value="johndoe@gmail.com" required />
              </div>
              <div className="personal-info-box">
                <span className="personal-details">Password</span>
                <input type="password" value="brightcode" required />
              </div>
            </div>
            <div className="user-button">
              <input type="submit" value="UPDATE" />
            </div>
          </form>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
