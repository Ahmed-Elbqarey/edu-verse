import "./App.css";
import logo from "../images/logo-removebg-preview.png";
import watch from "../images/watch.png";
import vr from "../images/vr.jpeg";
import { Link } from "react-router-dom";
function Home() {
  document.title="Home"
  return (
    <>
      <div className="header">
        <div className="logo_parent">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="nav">
          <a href="#">download edu verse</a>
          <Link to="/signin">SignIn</Link>
        </div>
      </div>
      <div className="main">
        <img src={watch} alt="vr" />
        <div>
          <h1>edu verse</h1>
          <p>
            Connect with your colleagues with avatars and immersive 3D spaces.
          </p>
          <button className="download_btn">download</button>
        </div>
      </div>
      <div className="nav">
        <ul>
          <li> 
            <a href="#key">key benefits</a>
          </li>
          <li>
            <a href="#features">features</a>
          </li>
          <li>
            <a href="#started">getting started</a>
          </li>
          <li>
            <a href="#more">discover more</a>
          </li>
        </ul>
      </div>
      <div className="block" id="key">
        <div className="head">
          <h2>key benefits</h2>
          <p>Foster copresence in a world of flexible work</p>
        </div>
        <div className="body">
          <div className="left">
            <div className="text_block">
              <h3>Remove barriers </h3>
              <p>
                Bring people together from around the world into a shared 3D
                space using the tools they already have.
              </p>
            </div>
            <div className="text_block">
              <h3>Use familiar device </h3>
              <p>
                Enjoy rich immersive experiences on PCs and Meta Quest VR
                devices.
              </p>
            </div>
            <div className="text_block">
              <h3>Bring people together</h3>
              <p>
                Seamlessly unite distributed teams in a 3D environment that
                creates a powerful sense of togetherness.
              </p>
            </div>
          </div>
          <div className="right">
            <img src={vr} alt="vr" />
          </div>
        </div>
      </div>
      <div className="block" id="features">
        <div className="head">
          <h2>FEATURES</h2>
          <p>Elevate team engagement</p>
        </div>
        <div className="body">
          <div className="right">
            <img src={vr} alt="vr" />
          </div>
          <div className="left">
            <div className="text_block">
              <h3>Avatars for Teams</h3>
              <p>
                Create multiple avatars with inclusive options to represent
                yourself uniquely in Teams meetings.
              </p>
            </div>
            <div className="text_block">
              <h3>Immersive spaces in Teams</h3>
              <p>
                Experience how immersive spaces in Teams foster a feeling of
                copresence among participants.{" "}
              </p>
            </div>
            <div className="text_block">
              <h3>Custom immersive experiences in Mesh</h3>
              <p>
                Tailor immersive experiences to meet your business needs, such
                as employee events, trainings, tours, or internal product
                showcases.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="started" id="started">
        <h3>getting started</h3>
        <p>Try Edu verse for free </p>

        <p>
          Download now and unlock a world of immersive experiences, entirely
          free of charge.
        </p>
        <button className="download_btn">download</button>
      </div>
      <div className="discover" id="more">
        <h3>discover more</h3>
        <p>
          Get the latest news and information about Edu Verse features and
          releases.
        </p>
        <button className="blog_btn">blog</button>
      </div>
    </>
  );
}

export default Home;
