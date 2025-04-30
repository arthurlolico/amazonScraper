const fetchAmazonData = async (value) => {
    const responseData = await fetch(`http://localhost:3000/api/scrape?keyword=${value}`);
    console.log(responseData);
}

const submitButton = () => {

    const button = document.querySelector("button");
    const searchBox = document.querySelector("input");

    button.addEventListener("click", async (e) => {
        const amazonData = await fetchAmazonData(searchBox.value);
    })
}

submitButton();
