


const qna = [];


async function getResponseFromLLM() {

    try {

        const container = document.querySelector(".llm");
        const inputRef = document.querySelector("input.userQuery");

        if (qna.length < 5) {
            const query = inputRef.value.trim(); // Trim whitespace

            // Input validation
            if (!query) {
                alert("Please enter a query.");
                return;
            }

            // Clear Input
            inputRef.value = "";

            // Pushing Question
            const qDiv = document.createElement("div");
            qDiv.innerHTML = `<p><strong>You:</strong> ${query}</p>`;
            container.appendChild(qDiv);


            // Show loading indicator
            // const loadingDiv = document.createElement("div");
            // loadingDiv.innerHTML = `<p>Loading...</p>`;
            // container.appendChild(loadingDiv);

            const apiBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: `Context: ${JSON.stringify(qna)}`, // Convert Q&A pairs to JSON string
                            },
                            {
                                text: `
                            You are an Islamic religious scholar who answers religious queries of Muslims according to the Quran and Sunnah.
                            `,
                            },
                            {
                                text: `User query: ${query}`,
                            },
                        ],
                    },
                ],
            };

            const res = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAn4tDkD5GsrxfH025dhfgiw8COHQRLl6Y',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(apiBody),
                }
            );

            const data = await res.json();
            const responseText = data.candidates[0].content.parts[0].text;

            // Remove loading indicator
            // loadingDiv.remove();

            const newDiv = document.createElement("div");
            newDiv.innerHTML = `<p><strong>Scholar:</strong> ${responseText}</p>`;
            container.appendChild(newDiv);

            // Pushing to QNA Array
            qna.push({
                Question: query,
                LLMResponse: responseText,
            });

            document.documentElement.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
            });
        } else {
            alert("pay for full access");
        }


    } catch (err) {
        console.log(err);
        alert("Error while generating response");
    }

}




