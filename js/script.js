const UNSPLASH_ACCESS_KEY = "81wLLBoRIVJVI1koyqef_AddDaT06fElml0UmsPbV7s";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchBtn");
const imgGallery = document.getElementById("gallery");

// fetch the searched images from unsplash
function fetchPhotos(query = "") {
  let url = `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_ACCESS_KEY}&query=${query}&per_page=10`;

  if (query) {
    url = `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_ACCESS_KEY}&query=${query}&per_page=10`;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // If a query was provided, the data will contain a 'result' array

      const images = query ? data.results : data;
      displayImages(images); // Pass the images array to displayImages
      // clear the images and display the new ones
      imgGallery.innerHTML = "";
      displayImages(images);
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}

// Function to display images on the page
function displayImages(images) {
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.urls.regular;
    imgElement.alt = image.description || "Unsplash image";

    // Add click event listener to open the full-size image in a new tab
    imgElement.addEventListener("click", (event) => {
      event.preventDefault();
      window.open(image.urls.full, "_blank");
    });
    // Add a CSS class to style the images

    imgElement.classList.add("image"); // Add a CSS class to style the images

    imgElement.style.objectFit = "cover";

    imgElement.loading = "lazy"; // Lazy load images

    imgGallery.appendChild(imgElement);
  });

  //imgGallery.appendChild(imgElement);
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();

  fetchPhotos(query);
});

// Initialize load of random photos
fetchPhotos();
