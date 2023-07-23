const createOverlay = ()=>{
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    overlay.style.border = "1px solid hotpink"
    overlay.style.zIndex = '9999'; // Set a high z-index value
    ////
    // // Create an image element
    // console.log("rumi loaded")
    // const image = document.createElement('img');
    // image.src = 'https://i.ibb.co/MPFP9KP/rumi-sleeping.jpg'; // Replace with the path to your image
    // image.style.maxWidth = '100%';
    // image.style.maxHeight = '100%';
    // image.style.objectFit = 'contain'; // Adjust the image scaling as needed

    // // Center the image using flexbox
    // overlay.style.display = 'flex';
    // overlay.style.justifyContent = 'center';
    // overlay.style.alignItems = 'center';

    // // Append the image to the overlay
    // overlay.appendChild(image);
    ////
    document.body.appendChild(overlay);
    return overlay;
}
let opacity = 0;
let overlay=null;
let originalVolume = null;
let showingImage=false
const resetOverlay = ()=>{
    console.log("reset called!")
    if(overlay){
        showingImage=false;
        overlay.remove();
        overlay = null;
        opacity=0;
        const currentVideoElement = document.querySelector('video'); //grab reference to video 
        if(originalVolume){
            currentVideoElement.volume=originalVolume;
            originalVolume=null
        }else{
            currentVideoElement.volume=1
        }
    }
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'REDUCE_VOLUME') {  
        console.log("received reduce volume message") 
        const intervalId = setInterval(() => {
        if(!overlay){
            overlay = createOverlay(); //adding div and assigning reference.
            opacity = 0;
        }else{
            opacity+=0.01;
            overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`
            if(opacity>0.7&&!showingImage){
                showingImage=true
                    // Create an image element
                console.log("rumi loaded")
                const image = document.createElement('img');
                image.src = 'https://i.ibb.co/MPFP9KP/rumi-sleeping.jpg'; // Replace with the path to your image
                image.style.maxWidth = '100%';
                image.style.maxHeight = '100%';
                image.style.objectFit = 'contain'; // Adjust the image scaling as needed

                // Center the image using flexbox
                overlay.style.display = 'flex';
                overlay.style.justifyContent = 'center';
                overlay.style.alignItems = 'center';

                // Append the image to the overlay
                overlay.appendChild(image);
            } 
        }
        const videoElement = document.querySelector('video'); //grab reference to video 
        let volume = videoElement.volume; //volume control
        if(!originalVolume){
            originalVolume = volume;
        }
        if(videoElement.volume>volume){
            console.log("resetting volume")
            volume = videoElement.volume
        }
        console.log("reducing volume...")
        volume -= 0.01;
        videoElement.volume = volume;
        console.log(`Volume now at: ${volume}`)
        console.log(`Opacity: ${opacity}`)
        }, 1000);  // Decrease volume every second
        document.addEventListener("mousemove",resetOverlay)
    }
  });
  