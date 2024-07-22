import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleTranslate = async () => {
        try {
            const response = await axios.post('http://localhost:5000/translate', {
                text: inputText
            });
            setTranslatedText(response.data.translation);
        } catch (error) {
            console.error("Error translating text:", error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Language Translator</h1>
                <div className="input-container">
                    <label htmlFor="inputText">Enter Text:</label>
                    <textarea 
                        id="inputText" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        rows="4" 
                        cols="50"
                    />
                </div>
                <button onClick={handleTranslate}>Translate</button>
                <div className="output-container">
                    <label htmlFor="outputText">Output Text:</label>
                    <textarea 
                        id="outputText" 
                        value={translatedText}
                        readOnly
                        rows="4" 
                        cols="50"
                    />
                </div>
            </header>
        </div>
    );
}

export default App;
