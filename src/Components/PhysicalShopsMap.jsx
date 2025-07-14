// PhysicalShopsMap.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet default marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Replace with your own shop data from DB or static import
import shopData from "../../public/serviceCenter.json"; // Ensure this path is correct

// Component to handle map centering based on filtered shops
const MapCenterUpdater = ({ shops }) => {
  const map = useMap();

  useEffect(() => {
    if (shops.length > 0) {
      // If there are filtered shops, center the map on the first one
      map.flyTo([shops[0].latitude, shops[0].longitude], 10); // Zoom level 10 for closer view
    } else {
      // If no shops, reset to a default center (e.g., Bangladesh center)
      map.flyTo([23.8103, 90.4125], 7); // Default zoom level 7
    }
  }, [shops, map]); // Re-run when shops or map instance changes

  return null;
};

const PhysicalShopsMap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredShops, setFilteredShops] = useState([]);

  // Filter shops whenever searchTerm or shopData changes
  useEffect(() => {
    const activeAndFiltered = shopData.filter(shop =>
      shop.status === "active" &&
      shop.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredShops(activeAndFiltered);
  }, [searchTerm]); // Depend on searchTerm



  return (
    <section className="py-16 m-4 px-4 bg-base-100 text-base-content">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-lime-400"> Physical Shop Locations</h2>
        <p className="text-gray-600 mb-8 text-sm max-w-2xl mx-auto">
          Explore our active Dorbazar partner locations across Bangladesh. Find shops near you!
        </p>

        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg relative"> {/* Added relative positioning here */}

          {/* Search Input and Clear button positioned absolutely within the map container */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex flex-col sm:flex-row items-center gap-2  rounded-lg shadow-md w-[calc(100%-2rem)] sm:w-auto max-w-md">
            <input
              type="text"
              placeholder="Search by District (e.g., Dhaka)"
              className="input input-bordered bg-white/80 border-lime-200 w-full sm:w-auto flex-grow rounded-lg px-4 py-2 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         
          </div>

          <MapContainer
            center={[23.8103, 90.4125]} // Default center for Bangladesh
            zoom={7} // Default zoom level
            scrollWheelZoom={false}
            className="w-full h-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* MapCenterUpdater component to dynamically adjust map view */}
            <MapCenterUpdater shops={filteredShops} />

            {filteredShops.length === 0 && searchTerm !== "" ? (
              <Marker position={[23.8103, 90.4125]}> {/* Placeholder marker if no results */}
                <Popup>No shops found for "{searchTerm}"</Popup>
              </Marker>
            ) : (
              filteredShops.map((shop, idx) => (
                <Marker key={idx} position={[shop.latitude, shop.longitude]}>
                  <Popup>
                    <div className="text-left">
                      <p className="font-semibold">{shop.city}, {shop.district}</p>
                      <p className="text-sm text-gray-600">Covered: {shop.covered_area.join(", ")}</p>
                      <a
                        href={shop.flowchart}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline text-xs"
                      >
                        View Flowchart
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))
            )}
          </MapContainer>
        </div>
      </motion.div>
    </section>
  );
};

export default PhysicalShopsMap;
