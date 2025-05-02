const container = document.querySelector("#product-listing");

const fetchAmazonData = async (value) => {
    const requestUrl = `/api/scrape?keyword=${encodeURIComponent(value)}`;
    const response = await fetch(requestUrl);
    const amazonData = response.json();
    return amazonData;
}

const listProduct = (numbers,amazonData) => {

    let counter = 0;
  
    for(let i = 0; i < numbers[0] ; i++) {
      const rowProduct = document.createElement("div");
      rowProduct.classList.add("rowProduct");
  
      for(let j = 0; j < numbers[1] ; j++) {
  
        let tempProduct = amazonData[counter];
  
        const product = document.createElement("div");
        product.classList.add("product");
  
        const productImg = document.createElement("img");
        productImg.src = tempProduct.imgSrcProduct;
  
        const infoGroup = document.createElement("div");
        infoGroup.classList.add("info-group");
  
        const titleProduct = document.createElement("div");
        titleProduct.classList.add("product-title");
        titleProduct.textContent = tempProduct.titleProduct;
  
        const productRatings = document.createElement("div");
        productRatings.classList.add("product-ratings");
        productRatings.textContent = tempProduct.ratingsProduct;
  
        const productNumberReviews = document.createElement("div");
        productNumberReviews.classList.add("product-number-reviews");
        productNumberReviews.textContent = tempProduct.numberOfReviewProduct !== "N/A" ? tempProduct.numberOfReviewProduct + " reviews" : "N/A";
  
        infoGroup.appendChild(titleProduct);
        infoGroup.appendChild(productRatings);
        infoGroup.appendChild(productNumberReviews);
  
        product.appendChild(productImg);
        product.appendChild(infoGroup);
  
        counter++;
  
        rowProduct.appendChild(product);
      }
  
      container.appendChild(rowProduct);
    }
  }

const findClosestPair = (n) => {
    const start = Math.floor(Math.sqrt(n));
    for (let a = start; a > 0; a--) {
      const b = Math.ceil(n / a);
      if (a * b >= n) {
        return [a, b];
    }
}
}

const submitButton = () => {

    const button = document.querySelector("button");
    const searchBox = document.querySelector("input");

    button.addEventListener("click", async (e) => {

        if(container.children.length > 0)
          container.replaceChildren();

        const amazonData = await fetchAmazonData(searchBox.value);

        const gridSide = findClosestPair(amazonData.length);
        listProduct(gridSide,amazonData);
    })
}

submitButton();
