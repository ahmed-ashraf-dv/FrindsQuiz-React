import React, { useEffect, Fragment, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setTranslate, toggleDarkMode, toggleLanguages } from "./Store";
import CircleBtn from "./Components/CircleBtn/CircleBtn";
import {
  faCloudMoon,
  faCloudSun,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "./Components/Layout/Layout";
import BuiltQuiz from "./Pages/BuiltQuiz/BuiltQuiz";
import Result from "./Pages/Result/Result";
import SolveQuiz from "./Pages/SolveQuiz/SolveQuiz";

function App() {
  // Get Redux Info
  const {
    darkMode,
    lang: { Viewlang, getTRNS },
  } = useSelector((data) => data);

  // Add Dispatch To Constant to Use In Function
  const Dispatch = useDispatch();

  // Get Translate
  useEffect(() => {
    const getTRANS = async () => {
      // Fetch TRANS
      const translation = await axios("./FakeData/languages.json");

      // Add Trans
      Dispatch(setTranslate(translation.data[Viewlang]));
    };

    // Call The getTRANS
    getTRANS();
  }, [Viewlang, Dispatch]);

  // Create Dark Mode
  const toggleDM = () => {
    // Set To LS
    localStorage.setItem("darkMode", !darkMode);

    // Change State To Dark Mode
    Dispatch(toggleDarkMode());
  };

  // Toggle Languages
  const toggleLang = () => {
    // Set To LS
    localStorage.setItem("Lang", Viewlang === "ar" ? "en" : "ar");

    // Change State To Languages
    Dispatch(toggleLanguages());
  };

  // Loding Ref
  const loading = useRef();

  // Remove Loding El
  if (getTRNS) {
    setTimeout(() => loading.current.remove(), 1000);
  }

  return (
    <div className={darkMode ? "App darkMode" : "App"}>
      {!getTRNS ? (
        <div className="Main-Loading">
          <RingLoader color="#007bff" css="" loading="true" size={150} />
        </div>
      ) : (
        <Fragment>
          <div ref={loading} className="Main-Loading stopLoading">
            <RingLoader color="#007bff" css="" loading="true" size={150} />
          </div>
          <Layout>
            <Routes>
              <Route extract path="/:id" element={<SolveQuiz />} />
              <Route extract path="/" element={<BuiltQuiz />} />
              <Route path="result" element={<Result />} />
            </Routes>
          </Layout>
          <CircleBtn
            onClick={toggleDM}
            icon={darkMode ? faCloudSun : faCloudMoon}
            className="Dark-Btn"
          />
          <CircleBtn
            onClick={toggleLang}
            icon={faLanguage}
            className="Lang-Btn"
          />
        </Fragment>
      )}
    </div>
  );
}

export default App;
