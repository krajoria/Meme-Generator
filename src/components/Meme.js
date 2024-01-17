import React from "react"
import memesData from "../memesData.js"
import Draggable from 'react-draggable';
import html2canvas from "html2canvas";

export default function Meme() {
    
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1ur9b0.jpg" ,
        height: 500,
        width: 500
    })
    const [allMemes, setAllMemes] = React.useState(memesData)
    
    
    function getMemeImage() {
        const memesArray = allMemes.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function downloadImage(data, filename='my-meme.jpeg')
	{
		var a = document.createElement('a');
		a.href = data;
		a.download = filename;
		console.log(a);
		a.click();
  	}

  	const download = () => {
		html2canvas(document.querySelector('.meme'),{allowTaint: true, useCORS: true}).then(canvas => {
		var dataURL = canvas.toDataURL("image/jpeg", "");
        downloadImage(dataURL, 'my-meme.jpeg')})
	}

    // const styles = {height: meme.height, width: meme.width}
    const topContent = <Draggable><h2 className="meme--text">{meme.topText}</h2></Draggable>
    const bottomContent = <Draggable><h2 className="meme--text">{meme.bottomText}</h2></Draggable>

    return (
        <main>
            <div className="form">
                <input 
                    id="top-text"
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <div className="image-height-input-form">
                    <label for="height-input">Height: </label>
                    <input 
                        type="number"
                        placeholder="Height"
                        className="img--input"
                        name="height"
                        id="height-input"
                        value={meme.height}
                        onChange={handleChange}
                    />
                </div>
                <div className="image-width-input-form">
                    <label for="width-input">Width: </label>
                    <input 
                        type="number"
                        placeholder="Width"
                        id="width-input"
                        className="img--input"
                        name="width"
                        value={meme.width}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-button-container">
                    <button 
                        className="form--button"
                        onClick={getMemeImage}
                    >
                        Get a new meme image 🖼
                    </button>
                </div>

            <div className="meme-container">
                <div className="meme" id="meme--id">
                    {topContent}
                    {bottomContent}
                    <img src={meme.randomImage} className="meme--image" alt="MemeImage" style={{ width: `${meme.width}px`, height: `${meme.height}px` }}/>
                </div>
            </div>

            <div className="button-container">
                <button className="download--button" onClick={download}>Save Meme</button>
            </div>

        </main>
    )
}