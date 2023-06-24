import React, { useState, useEffect } from "react";
import './App.css'
import CompressionForm from "./components/Forms/CompressionForms";
import CompressionCard from "./components/Cards/CompressionCard";
import DecompressionForm from "./components/Forms/DecompressionForm";
import DecompressionCard from "./components/Cards/DecompressionCard";

const backgroundStyle = {
  backgroundColor : "#ECEEF9",
  height: "auto",
  width: "100vw",
  minHeight: "100vh",
  maxHeight: "100vh",
}

// const url = process.env.REACT_APP_BACKEND_URL_DEV;
const url = "https://localhost:8080"

function App() {
  const [activeTab, setActiveTab] = useState("Compression");
  const [compHist, setCompHist] = useState([]);
  const [decompHist, setDecompHist] = useState([]);

  // Fetch data process, update list fakultas every data is sent
  useEffect(() => {
      fetch(url + "/api/comphist", {
          method: "GET",
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
          .then((res) => res.json())
          .then((data) => {
              // Update state
              console.log(data);
              setCompHist(data);
          });
  }, [compHist]);

  useEffect(() => {
      fetch(url + "/api/decomphist", {
          method: "GET",
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
          .then((res) => res.json())
          .then((data) => {
              // Update state
              console.log(data);
              setDecompHist(data);
          });
  }, [decompHist]);

  return (
      <div style={backgroundStyle} className="flex p-[1.5vh]">
        <div className="w-full bg-light flex rounded-xl">
          <div className='flex flex-row w-full h-full'>
              <div className="bg-white w-full mx-auto shadow-xl rounded-xl text-lg flex flex-row h-full">
                  <div className="text-left flex flex-col w-1/12">
                      <button
                          onClick={() => setActiveTab("Compression")}
                          className={`h-1/2 p-3 rounded-tl-xl ${activeTab === "Compression" ? "font-bold" : "font-medium bg-gray-200"}`}
                      >
                          <p className="-rotate-90">Compression</p>
                      </button>
                      <button
                          onClick={() => setActiveTab("Decompression")}
                          className={`h-1/2 p-3 rounded-bl-xl ${activeTab === "Decompression" ? "font-bold" : "font-medium bg-gray-200"}`}
                      >
                          <p className="-rotate-90">Decompression</p>
                      </button>
                  </div>
                  <div className={`w-7/12 p-10 flex flex-col ${activeTab === "Decompression" ? "hidden" : ""}`}>
                    <div className='h-1/6'>
                        <h1 className='text-3xl font-bold'>Compression</h1>
                        <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Please input the text to be commpressed</h3>
                    </div>
                    <div className='h-5/6'>
                      <CompressionForm />
                    </div>
                  </div>
                  <div className={`w-4/12 bg-primaryGray p-8 ${activeTab === "Decompression" ? "hidden" : ""} flex-1 flex flex-col`}>
                      <div className='h-1/12'>
                          <h1 className='text-xl font-bold'>Compression History</h1>
                      </div>
                      <div className='overflow-y-auto h-11/12 mb-10'>
                        {compHist[0] ? (
                          compHist.map((obj) => (
                            <CompressionCard 
                              time={obj.time}
                              date={obj.date}
                              text={obj.text}
                              compressed={obj.compressed}
                            />
                          ))
                        ) : (
                            <div className='text-lg'>There is no history recorded, yet.</div>
                        )}
                      </div>
                  </div>
                  
                  <div className={`w-7/12 p-10 flex flex-col ${activeTab === "Decompression" ? "" : "hidden"}`}>
                    <div className='h-1/6'>
                        <h1 className='text-3xl font-bold'>Decompression</h1>
                        <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Please input the text to be decommpressed</h3>
                    </div>
                    <div className='h-5/6'>
                      <DecompressionForm />
                    </div>
                  </div>
                  <div className={`w-4/12 bg-primaryGray p-8 ${activeTab === "Decompression" ? "" : "hidden"} flex-1 flex flex-col`}>
                      <div className='h-1/12'>
                          <h1 className='text-xl font-bold'>Decompression History</h1>
                      </div>
                      <div className='overflow-y-auto h-11/12 mb-10'>
                        {decompHist[0] ? (
                          decompHist.map((obj) => (
                            <DecompressionCard 
                              time={obj.time}
                              date={obj.date}
                              text={obj.text}
                              decompressed={obj.decompressed}
                            />
                          ))
                        ) : (
                            <div className='text-lg'>There is no history recorded, yet.</div>
                        )}
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
  )
}

export default App;
