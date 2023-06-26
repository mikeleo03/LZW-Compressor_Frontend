import React, { useState } from "react";

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL_DEV;

// Compression Forms Component
const CompressionForm = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [sendFailed, setSendFailed] = useState(false);
    const [enhancecomp, setEnhancecomp] = useState(false);

    const handleSubmitForms = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(url + "/api/compress/answer?" + new URLSearchParams({
                text: text,
                enhanced: enhancecomp
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
            setResult(data.data);

        } catch (err) {
            console.error("Error request result: ", err);
            setSendFailed(true);
        }
    };

    return (
        <main className="h-full">
            <div className="h-full mx-auto px-0 text-gray-600">
                <div className="h-full mx-auto flex flex-col space-y-5">
                    <div className="h-4/6 space-y-4">
                        <div>
                            <label className="font-medium">
                                Plain Text
                            </label>
                            <textarea 
                                required 
                                className="w-full mt-2 h-36 px-4 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Insert plain text like Hello World"
                            >
                            </textarea>
                            <label className="font-medium">
                                Algorithm Enhance
                            </label>
                            <div className="flex flex-col mt-1.5 grid grid-cols-2 space-x-2 rounded-lg bg-secondaryYellow p-2">
                                <div>
                                    <input type="radio" id="basiccomp" name="basiccomp" value="Basic LZW" checked={enhancecomp === false} onChange={() => setEnhancecomp(false)} className="peer hidden"></input>
                                    <label htmlFor="basiccomp" className="text-sm block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-primaryBlue font-bold peer-checked:text-white h-full flex justify-center items-center">Basic LZW</label>
                                </div>
                                <div>
                                    <input type="radio" id="enhancecomp" name="enhancecomp" value="Enhance with BWT + MTF" checked={enhancecomp === true} onChange={() => setEnhancecomp(true)} className="peer hidden"></input>
                                    <label htmlFor="enhancecomp" className="text-sm block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-primaryBlue font-bold peer-checked:text-white h-full flex justify-center items-center">Enhance with BWT + MTF</label>
                                </div>
                            </div>
                        </div>
                        <button
                            className="w-full px-4 py-1.5 text-white font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150"
                            onClick={handleSubmitForms}
                        >
                            Compress
                        </button>
                    </div>
                    <div className="h-2/6 flex flex-col">
                        <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Result</h3>
                        <div className="overflow-y-auto">
                            {result ? 
                                (<div className="bg-secondaryYellow outline-none border focus:border-indigo-600 shadow-sm rounded-lg mt-1 px-4 py-2">{result}</div>) 
                                : (<p>You haven't compress any plain text.</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CompressionForm;