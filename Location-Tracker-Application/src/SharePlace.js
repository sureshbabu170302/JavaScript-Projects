import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/Location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("submit", this.findUserHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
  }

  sharePlaceHandler() {
    const sharedLinkInputElement = document.getElementById("share-link");
    if (!navigator.clipboard) {
      sharedLinkInputElement.select();
      return;
    }
    navigator.clipboard
      .writeText(sharedLinkInputElement.value)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch((error) => {
        console.error(error);
        sharedLinkInputElement.select();
      });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    fetch("http://localhost:3000/add-location", {
      method: "POST",
      body: JSON.stringify({
        address: address,
        lat: coordinates.lat,
        lng: coordinates.lng,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((responnse) => {
        return responnse.json();
      })
      .then((data) => {
        const locationId = data.locId;
        this.shareBtn.disabled = false;
        const sharedLinkInputElement = document.getElementById("share-link");
        sharedLinkInputElement.value = `${
          location.origin
        }/my-place?location=${locationId}`;
      });
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert("Cannot find  your location,kindly use a modern browser");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait!"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        console.log(
          `Latitude:${successResult.coords.latitude}, Longitude:${successResult.coords.longitude}`
        );
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        this.selectPlace(coordinates, address);
      },
      (error) => {
        modal.hide();
        console.log("Cannot find your location, enter your address manually");
      }
    );
  }

  async findUserHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      alert("Invalid  address entered - Try again!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait!"
    );
    modal.show();

    try {
      const coordinates = await getCoordsFromAddress(address);
      modal.hide();
      this.selectPlace(coordinates, address);
      console.log(getAddressFromCoords(coordinates));
    } catch (error) {
      modal.hide();
      alert("Could not find location for the entered address");
    }
  }
}

new PlaceFinder();
