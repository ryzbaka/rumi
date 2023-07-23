console.log("rumi_script_start htm")
document.getElementById('start').addEventListener('click', () => {
    console.log("started_timer")
    chrome.runtime.sendMessage({type: 'START_TIMER',content:"10"});
});
  