let timerId = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("MESSAGE received!")
  if (message.type === 'START_TIMER') {
    console.log("STARTED TIMER")
    console.log(message)
    if (timerId) {
      clearTimeout(timerId);
    }
    chrome.tabs.query({active:true},tabs=>{
        const youtube_tabs = tabs.filter(tab=>tab.url.includes("youtube"));
        console.log("YOUTUBE TABS")
        // console.log(youtube_tabs)
        youtube_tabs.forEach((el,index)=>{
            const tab_id = el.id;
            console.log(tab_id)
            chrome.tabs.sendMessage(tab_id,{type:"REDUCE_VOLUME"})
            console.log("message sent")
        })
    });
  }
});
