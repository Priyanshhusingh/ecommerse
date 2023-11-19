import React, { useState, useEffect } from "react";
import { Country, State } from "country-state-city";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { AddressUrl } from "../UrlApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddressComponent({
  onNextStep,
  handleAddressSubmit,
  setValues,
  ...values
}) {
  const [allCountries, setAllCountries] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const countries = Country.getAllCountries().map(
      (country) => country.isoCode
    );
    setAllCountries(countries);
  }, []);
  console.log(values.country);
  const getStatesByCountry = (selectedCountry) => {
    let states = [];
    const countryData = Country.getCountryByCode(selectedCountry);
    console.log(countryData);
    if (countryData) {
      states = State.getStatesOfCountry(countryData.isoCode).map(
        (state) => state.name
      );
    }
    return states;
  };
  console.log(regions);
  useEffect(() => {
    if (values.country) {
      const states = getStatesByCountry(values.country);
      setRegions(states);
    }
  }, [values.country]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the function provided for handling address submission
      await handleAddressSubmit(e);
      onNextStep(); // Move to the next step after successful submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-md p-4 border rounded-md shadow-md mt-10">
      <div className="text-lg font-semibold mb-4">Address Detail</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            className="w-full border rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="block mb-1">
            Street:
          </label>
          <input
            type="text"
            id="address"
            name="street"
            className="w-full border rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="number" className="block mb-1">
            Mobile
          </label>
          <input
            type="tel"
            id="number"
            name="number"
            className="w-full border rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="block mb-1">
            Country:
          </label>
          <select
            value={values.country}
            name="country"
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Country</option>
            {allCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        {values.country && regions.length > 0 && (
          <div className="mb-3">
            <label htmlFor="state" className="block mb-1">
              State/Region:
            </label>
            <select
              value={values.region}
              name="region"
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select State/Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="setasdefault" className="block mb-1">
            Set As Default:
          </label>
          <input
            type="checkbox"
            id="setasdefault"
            checked={values.isDefault}
            className="w-full border rounded-md p-2"
            onChange={(e) =>
              setValues({ ...values, isDefault: e.target.checked })
            }
          />
        </div>
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Submit
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={onNextStep}
          >
            Next
          </button>{" "}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddressComponent;
