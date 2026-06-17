export function showToastWithPhrase() {
    const cacheBuster = Date.now();
    const apiUrl = `https://favqs.com/api/qotd?_=${cacheBuster}`;

    fetch(apiUrl, { mode: "cors" })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            const phrase = data.quote.body;
            const author = data.quote.author;

            const toast = document.createElement("div");
            toast.className = "fixed bottom-5 right-5 bg-darkblue text-white p-4 rounded-xl shadow-2xl max-w-sm z-50 transition-all duration-500 ease-in-out transform translate-y-20 opacity-0 border border-darkred/20";

            toast.innerHTML = `
                <p class="italic text-sm">"${phrase}"</p>
                <p class="text-right text-xs font-bold mt-2 text-mustardYellow">— ${author}</p>
            `;

            document.body.appendChild(toast);

            setTimeout(() => {
                toast.classList.remove("translate-y-20", "opacity-0");
            }, 100);

            setTimeout(() => {
                toast.classList.add("translate-y-20", "opacity-0");
                setTimeout(() => {
                    toast.remove();
                }, 500);
            }, 5000);
        })
        .catch(error => console.log("Something went wrong:", error));
}