document.addEventListener("DOMContentLoaded", function () {
    const listingsContainer = document.getElementById("listings-container");
    const shortlistFilterButton = document.getElementById("shortlist-filter");
    const shortlistedListings = [];

    fetch('http://127.0.0.1:5000/listings')
        .then(response => response.json())
        .then(listingsData => {
            listingsData.forEach((listing,index) => {
                const listingContainer = document.createElement('div');
                listingContainer.classList.add('landing-page-inner');

                const listingElement = document.createElement('div');
                listingElement.classList.add('listing');

                listingElement.classList.add(index % 2 === 0 ? 'even-listing' : 'odd-listing');

                // Add dynamic data to the HTML structure using the class names
                listingElement.innerHTML = `
            <b class="name" > ${listing.name}</b>
            <div class="team">${listing.teamDescription}</div>
            <div class="projects">
                <p class="p"><b>${listing.projects}</b></p>
                <p class="projects1">Projects</p>
            </div>
            <div class="years">
                <p class="p"><b>${listing.years}</b></p>
                <p class="projects1">Years</p>
            </div>
            <div class="price">
                <p class="p"><b>${listing.price}</b></p>
                <p class="projects1">Price</p>
            </div>
            <img class="landing-page-item1" alt="" src="./images/line-1.svg" />
            <img class="eye-slash-1-icon" alt="" src="./images/eye-slash-1.svg" />
            <img class="arrow-right-short-1-icon" alt="" src="./images/arrowrightshort-1.svg" />
            <div class="bookmarkheart-1 sort shortlist-line"></div>
            <div class="details">Details</div>
            <div class="hide">Hide</div>
            <div class="shortlist">Shortlist</div>
            <div class="report">Report</div>
            <div class="line-div"></div>
            <div class="div">${listing.phone1}</div>
            <div class="div1">${listing.phone2}</div>
            <img class="exclamation-circle-1-icon" alt="" src="./images/exclamationcircle-1.svg" />
        `;
                const starContainer = createStars(listing.rating);
                listingElement.appendChild(starContainer);
                listingContainer.appendChild(listingElement);
                listingsContainer.appendChild(listingContainer);
            });

            const shortlistButtons = document.querySelectorAll(".sort");


            shortlistButtons.forEach(function (button, index) {
                const isAlreadyShortlisted = button.classList.contains("shortlist-fill");

                if (isAlreadyShortlisted) {
                    shortlistedListings.push(index);
                    // toggleShortlistState(index);
                }
                button.addEventListener("click", function () {
                    const isShortlisted = toggleShortlistState(index);

                    updateShortlistIcon(button, isShortlisted);
                    // updateShortlistFilter();
                    console.log(shortlistButtons);
                });
            });

            shortlistFilterButton.addEventListener("click", function () {
                updateShortlistFilter();
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    function createStars(rating) {
        const starContainer = document.createElement('div');
        starContainer.classList.add('star-container');

        let numberOfStars = rating; 

        let value = Math.floor(5 - numberOfStars);
        let value2 = Math.floor(numberOfStars);


        for (let i = 0; i < value2; i++) 
        {
            const star = document.createElement('img');
            star.src = './images/full-star.svg';
            star.alt = 'Star';
            starContainer.appendChild(star);
        }
       if((value+value2)!=5)
       {
           const star = document.createElement('img');
           star.src = './images/half-star.svg'; 
           star.alt = 'Star';
           starContainer.appendChild(star);
       }
        for (let i = 0; i < value; i++) {
            const star = document.createElement('img');
            star.src = './images/empty-star.svg'; 
            star.alt = 'Star';
            starContainer.appendChild(star); 
        }
        return starContainer;
    }
    function toggleShortlistState(index) {
        const isShortlisted = shortlistedListings.includes(index);

        if (isShortlisted) {
            const indexOfListing = shortlistedListings.indexOf(index);
            shortlistedListings.splice(indexOfListing, 1);
        } else {
            shortlistedListings.push(index);
        }

        return !isShortlisted;
    }

    function updateShortlistIcon(button, isShortlisted) {
        const lineIconClass = "shortlist-line";
        const fillIconClass = "shortlist-fill";

        if (isShortlisted) {
            button.classList.remove(lineIconClass);
            button.classList.add(fillIconClass);
        } else {
            button.classList.remove(fillIconClass);
            button.classList.add(lineIconClass);
        }
    }

    fetch('http://127.0.0.1:5000/listings')
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => console.error('Error fetching data:', error));

    function updateShortlistFilter() {
        const listings = document.querySelectorAll(".listing");
        shortlistFilterButton.classList.toggle("shortlist-filter-active");

        const isFilterActive = shortlistFilterButton.classList.contains("shortlist-filter-active");

        listings.forEach((listing, index) => {
            const isShortlisted = shortlistedListings.includes(index);
            const displayStyle =
                isFilterActive && (!isShortlisted || shortlistedListings.length === 0)
                    ? "none"
                    : "block";
            listing.style.display = displayStyle;
        });
    }
});


