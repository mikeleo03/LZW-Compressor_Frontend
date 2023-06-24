import React, { useState } from "react";

// const url = process.env.REACT_APP_BACKEND_URL_DEV;
const url = "http://localhost:8080"

// Decompression Forms Component
const DecompressionForm = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [sendFailed, setSendFailed] = useState(false);

    const handleSubmitForms = async (event) => {
        event.preventDefault();

        // 1. Request and gather response
        try {
            const response = await fetch(url + "/api/decompress/answer?" + new URLSearchParams({
                text: text
            }), {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            });
        
            if (!response.ok) {
                throw new Error("Request failed with status: " + response.status);
            }
        
            const data = await response.json();
        
            // Gather result
            console.log("res:", response);
            console.log("Result:", data.data);
            setResult(data.data);

        } catch (err) {
            console.error("Error request result: ", err);
            setSendFailed(true);
        }

        // 2. Post to history DB
        /* var today = new Date();
        var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        var time = today.getHours() + "." + today.getMinutes();
        console.log("Tambah history decompression:", text);
        try {
            fetch(url + "/api/decompressDb", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "text": text,
                    "date": date,
                    "time": time,
                    "decompressed": result
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                // Update state
                console.log("Add history successful:", data);
                setText("");
            });
            console.log("send failed:", sendFailed)

        } catch (error) {
            console.error("Error add history: ", error);
            setSendFailed(true)
        } */
    };

    return (
        <main className="h-full">
            <div className="h-full mx-auto px-0 text-gray-600">
                <div className="h-full mx-auto flex flex-col space-y-5">
                    <div className="h-3/6 space-y-3">
                        <div>
                            <label className="font-medium">
                                Compressed Text
                            </label>
                            <textarea 
                                required 
                                className="w-full mt-2 h-36 px-4 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Insert compressed text here"
                            >
                            </textarea>
                        </div>
                        <button
                            className="w-full px-4 py-1.5 text-white font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150"
                            onClick={handleSubmitForms}
                        >
                            Decompress
                        </button>
                    </div>
                    <div className="h-2/6 flex flex-col">
                        <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Result</h3>
                        <div className="overflow-y-auto">
                            {result ? 
                                (<>{result}</>) 
                                : (<p>You haven't decompress any plain text.</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DecompressionForm;