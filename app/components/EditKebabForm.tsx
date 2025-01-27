import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import EditInput from "./EditInput";
import EditInputInt from "./EditInputInt";

interface MeatType {
  id: number;
  name: string;
}
interface OpeningHour {
  weekDay: string;
  opensAt: string;
  closesAt: string;
}

interface Sauce {
  id: number;
  name: string;
  isSpicy: boolean;
}

interface EditKebabFormProps {
  kebab: {
    id: number;
    name: string;
    address: string;
    status: "active" | "inactive" | "planned";
    coordinatesX: number;
    coordinatesY: number;
    closingYear: number;
    openingYear: number;
    network: string;
    isKraft: boolean;
    isFoodTruck: boolean;
    hasPyszne: boolean;
    hasGlovo: boolean;
    hasUberEats: boolean;
    phoneNumber: string;
    appLink: string;
    websiteLink: string;
    meatTypes: MeatType[];
    sauces: Sauce[];
    openingHours: OpeningHour[];
    glovoUrl: string;
    mondayOpensAt: string;
    mondayClosesAt: string;
    tuesdayOpensAt: string;
    tuesdayClosesAt: string;
    wednesdayOpensAt: string;
    wednesdayClosesAt: string;
    thursdayOpensAt: string;
    thursdayClosesAt: string;
    fridayOpensAt: string;
    fridayClosesAt: string;
    saturdayOpensAt: string;
    saturdayClosesAt: string;
    sundayOpensAt: string;
    sundayClosesAt: string;
    logoUrl?: string;
  };
  onClose: () => void;
  onSave: () => void;
}

const allMeatTypes: MeatType[] = [
  { id: 1, name: "Chicken" },
  { id: 2, name: "Beef" },
  { id: 3, name: "Lamb" },
  { id: 4, name: "Pork" },
  { id: 5, name: "Falafel" },
];
const allSauces: Sauce[] = [
  { id: 1, name: "Mild", isSpicy: false },
  { id: 2, name: "Garlic", isSpicy: false },
  { id: 3, name: "Spicy", isSpicy: true },
  { id: 4, name: "Mixed", isSpicy: true },
];

const EditKebabForm: React.FC<EditKebabFormProps> = ({
  kebab,
  onClose,
  onSave,
}) => {
  const token = Cookies.get("token");

  const [name, setName] = useState(kebab.name);
  const [glovoUrl, setGlovoUrl] = useState(kebab.glovoUrl);
  const [address, setAddress] = useState(kebab.address);
  const [network, setNetwork] = useState(kebab.network);
  const [coordinatesX, setCoordinatesX] = useState(kebab.coordinatesX);
  const [coordinatesY, setCoordinatesY] = useState(kebab.coordinatesY);
  const [closingYear, setClosingYear] = useState(kebab.closingYear);
  const [openingYear, setOpeningYear] = useState(kebab.openingYear);
  const [status, setStatus] = useState<"active" | "inactive" | "planned">(
    kebab.status
  );
  const [isKraft, setIsKraft] = useState(kebab.isKraft);
  const [isFoodTruck, setIsFoodTruck] = useState(kebab.isFoodTruck);
  const [hasPyszne, setHasPyszne] = useState(kebab.hasPyszne);
  const [hasGlovo, setHasGlovo] = useState(kebab.hasGlovo);
  const [hasUberEats, setHasUberEats] = useState(kebab.hasUberEats);
  const [phoneNumber, setPhoneNumber] = useState(kebab.phoneNumber);
  const [appLink, setAppLink] = useState(kebab.appLink);
  const [websiteLink, setWebsiteLink] = useState(kebab.websiteLink);
  const [fetchingRates, setFetchingRates] = useState(false);
  const [fetchingRatesGoogle, setFetchingRatesGoogle] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);

  //----------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------

  const fetchRates = async () => {
    setFetchingRates(true);
    try {
      const response = await axios.post(
        "https://kebapp.bity24h.pl/api/rates-glovo",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Zaktualizowano pomyślnie!");
      console.log(response.data); // Process the data as needed
    } catch (error) {
      toast.error("Error fetching rates.");
      console.error(error);
    } finally {
      setFetchingRates(false);
    }
  };

  //----------------------------------------------------------------------------------------------------
  const fetchRatesGoogle = async () => {
    setFetchingRatesGoogle(true);
    try {
      const response = await axios.post(
        "https://kebapp.bity24h.pl/api/rates-google",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Zaktualizowano pomyślnie google!");
      console.log(response.data); // Process the data as needed
    } catch (error) {
      toast.error("Error fetching rates.");
      console.error(error);
    } finally {
      setFetchingRatesGoogle(false);
    }
  };

  //----------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------
  const openingHoursMap: {
    [key: string]: { opensAt: string; closesAt: string };
  } = {};
  kebab.openingHours.forEach((hour) => {
    openingHoursMap[hour.weekDay.toLowerCase()] = {
      opensAt: hour.opensAt,
      closesAt: hour.closesAt,
    };
  });

  const [mondayOpensAt, setMondayOpensAt] = useState(
    openingHoursMap["monday"].opensAt
  );
  const [mondayClosesAt, setMondayClosesAt] = useState(
    openingHoursMap["monday"].closesAt
  );

  const [tuesdayOpensAt, setTuesdayOpensAt] = useState(
    openingHoursMap["tuesday"].opensAt
  );
  const [tuesdayClosesAt, setTuesdayClosesAt] = useState(
    openingHoursMap["tuesday"].closesAt
  );

  const [wednesdayOpensAt, setWednesdayOpensAt] = useState(
    openingHoursMap["wednesday"].opensAt
  );
  const [wednesdayClosesAt, setWednesdayClosesAt] = useState(
    openingHoursMap["wednesday"].closesAt
  );

  const [thursdayOpensAt, setThursdayOpensAt] = useState(
    openingHoursMap["thursday"].opensAt
  );
  const [thursdayClosesAt, setThursdayClosesAt] = useState(
    openingHoursMap["thursday"].closesAt
  );

  const [fridayOpensAt, setFridayOpensAt] = useState(
    openingHoursMap["friday"].opensAt
  );
  const [fridayClosesAt, setFridayClosesAt] = useState(
    openingHoursMap["friday"].closesAt
  );

  const [saturdayOpensAt, setSaturdayOpensAt] = useState(
    openingHoursMap["saturday"].opensAt
  );
  const [saturdayClosesAt, setSaturdayClosesAt] = useState(
    openingHoursMap["saturday"].closesAt
  );

  const [sundayOpensAt, setSundayOpensAt] = useState(
    openingHoursMap["sunday"].opensAt
  );
  const [sundayClosesAt, setSundayClosesAt] = useState(
    openingHoursMap["sunday"].closesAt
  );
  const [selectedMeatTypes, setSelectedMeatTypes] = useState<number[]>(
    kebab.meatTypes.map((meat) => meat.id)
  );
  const [selectedSauces, setSelectedSauces] = useState<number[]>(
    kebab.sauces.map((sauce) => sauce.id)
  );

  const [openingHours, setOpeningHours] = useState<OpeningHour[]>(
    kebab.openingHours
  );
  //------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------

  const handleSave = async () => {
    if (selectedMeatTypes.length === 0) {
      toast.error("Proszę wybrać przynajmniej jeden rodzaj mięsa.");
      return;
    }

    if (selectedSauces.length === 0) {
      toast.error("Proszę wybrać przynajmniej jeden sos.");
      return;
    }
    try {
      // Aktualizacja danych kebaba
      await axios.put(
        `https://kebapp.bity24h.pl/api/kebabs/${kebab.id}`,
        {
          name,
          address,
          status,
          network,
          coordinatesX,
          coordinatesY,
          openingYear,
          closingYear,
          isKraft,
          isFoodTruck,
          hasPyszne,
          hasGlovo,
          hasUberEats,
          phoneNumber,
          appLink,
          websiteLink,
          glovoUrl,
          mondayOpensAt,
          mondayClosesAt,
          tuesdayOpensAt,
          tuesdayClosesAt,
          wednesdayOpensAt,
          wednesdayClosesAt,
          thursdayOpensAt,
          thursdayClosesAt,
          fridayOpensAt,
          fridayClosesAt,
          saturdayOpensAt,
          saturdayClosesAt,
          sundayOpensAt,
          sundayClosesAt,

          meatTypeIds: selectedMeatTypes,
          sauceIds: selectedSauces,
          openingHours: openingHours,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Kebab zaktualizowany!");
      onSave();
      onClose();
    } catch (error) {
      toast.error("Błąd przy aktualizacji kebaba.");
    }
  };

  const handleMeatTypeChange = (meatTypeId: number) => {
    if (selectedMeatTypes.includes(meatTypeId)) {
      setSelectedMeatTypes(selectedMeatTypes.filter((id) => id !== meatTypeId));
    } else {
      setSelectedMeatTypes([...selectedMeatTypes, meatTypeId]);
    }
  };
  const handleSauceChange = (sauceId: number) => {
    if (selectedSauces.includes(sauceId)) {
      setSelectedSauces(selectedSauces.filter((id) => id !== sauceId));
    } else {
      setSelectedSauces([...selectedSauces, sauceId]);
    }
  };

  const handleLogoUpdate = async () => {
    if (!logo) {
      toast.error("Wybierz plik przed aktualizacją loga.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("logo", logo);

      await axios.post(
        `https://kebapp.bity24h.pl/api/kebabs/${kebab.id}/logo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Logo zostało zaktualizowane!");
      onSave();
    } catch (error) {
      toast.error("Błąd przy aktualizacji loga.");
    }
  };
  //---------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------
  return (
    <form className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      <div className="flex flex-row gap-4">
        {/* ------------------------------------LEFT--------------------------------------- */}
        <div className="flex flex-col flex-1.5 border-r border-gray-300 pr-4">
          <h2 className="font-semibold text-gray-600 mb-2">Rodzaje mięsa:</h2>
          {allMeatTypes.map((meatType) => (
            <div key={meatType.id} className="flex items-center gap-">
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedMeatTypes.includes(meatType.id)}
                  onChange={() => handleMeatTypeChange(meatType.id)}
                  className="cursor-pointer  w-6 h-6 accent-green-300 mr-2 border border-gray-300 rounded-sm"
                />
                <span>{meatType.name}</span>
              </label>
            </div>
          ))}
          <div className="border-t border-gray-300 my-4"></div>

          <h2 className="font-semibold text-gray-600 mb-2">Sosy:</h2>

          {allSauces.map((sauce) => (
            <div key={sauce.id} className="flex items-center gap-2">
              <label className="flex items-center  gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedSauces.includes(sauce.id)}
                  onChange={() => handleSauceChange(sauce.id)}
                  className="cursor-pointer w-6 h-6 accent-green-300 mr-2 border border-gray-300 rounded-sm"
                />
                <span>{sauce.name}</span>
              </label>
            </div>
          ))}

          <div className="border-t border-gray-300 my-4"></div>

          <h2 className="font-semibold text-gray-600 mt-2 mb-2">
            Dodatkowe opcje:
          </h2>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={isKraft}
              onChange={() => setIsKraft(!isKraft)}
              className="cursor-pointer w-6 h-6 accent-green-300"
            />
            Kebab Kraftowy
          </label>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={isFoodTruck}
              onChange={() => setIsFoodTruck(!isFoodTruck)}
              className="cursor-pointer w-6 h-6 accent-green-300"
            />
            Food Truck
          </label>

          <div className="border-t border-gray-300 my-4"></div>

          <h2 className="font-semibold text-gray-600 mt-2 mb-2">Platformy:</h2>
          <label className="flex items-center gap-2 mb-2">
            <img src="/platforms/pyszne.png" alt="" height={35} width={35} />
            <input
              type="checkbox"
              checked={hasPyszne}
              onChange={() => setHasPyszne(!hasPyszne)}
              className="cursor-pointer w-6 h-6 accent-green-300"
            />
            Pyszne.pl
          </label>
          <label className="flex items-center gap-2 mb-2">
            <img src="/platforms/glovo.png" alt="" height={35} width={35} />
            <input
              type="checkbox"
              checked={hasGlovo}
              onChange={() => setHasGlovo(!hasGlovo)}
              className="cursor-pointer w-6 h-6 accent-green-300"
            />
            Glovo
          </label>
          <label className="flex items-center gap-2">
            <img src="/platforms/ubereats.png" alt="" height={35} width={35} />
            <input
              type="checkbox"
              checked={hasUberEats}
              onChange={() => setHasUberEats(!hasUberEats)}
              className="cursor-pointer w-6 h-6 accent-green-300"
            />
            Uber Eats
          </label>

          <EditInput
            id="glovoUrl"
            label="glovoUrl:"
            value={glovoUrl}
            onChange={(e) => setGlovoUrl(e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={fetchRates}
              disabled={fetchingRates}
              className={`px-4  py-2 bg-blue-500 text-white rounded-md ${
                fetchingRates
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              {fetchingRates ? "Aktualizuje..." : "Zaktualizuj ocene Glovo"}
            </button>
            {/* --------------------------------------------------------------------------- */}
            <button
              type="button"
              onClick={fetchRatesGoogle}
              disabled={fetchingRatesGoogle}
              className={`px-4 py-2 bg-green-500 text-white rounded-md ${
                fetchingRatesGoogle
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-600"
              }`}
            >
              {fetchingRates ? "Aktualizuję..." : "Zaktualizuj ocene Google"}
            </button>
          </div>
        </div>

        {/* ------------------------------------RIGHT--------------------------------------- */}
        <div className="flex flex-col flex-1 px-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1">
              <EditInput
                id="name"
                label="Nazwa:"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="flex-1">
              <EditInput
                id="address"
                label="Adres:"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1">
              <EditInputInt
                id="coordinatesX"
                label="X:"
                type="number"
                value={coordinatesX}
                onChange={(e) => setCoordinatesX(Number(e.target.value))}
                required
              />
            </label>
            <label className="flex-1">
              <EditInputInt
                id="coordinatesY"
                label="Y:"
                type="number"
                value={coordinatesY}
                onChange={(e) => setCoordinatesY(Number(e.target.value))}
                required
              />
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1">
              <EditInputInt
                id="openingYear"
                label="Rok otwarcia:"
                type="number"
                value={openingYear}
                onChange={(e) => setOpeningYear(Number(e.target.value))}
              />
            </label>
            <label className="flex-1">
              <EditInputInt
                id="closingYear"
                label="Rok zamknięcia:"
                type="number"
                value={closingYear}
                onChange={(e) => setClosingYear(Number(e.target.value))}
              />
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1">
              <EditInput
                id="phoneNumber"
                label="Numer telefonu:"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <label className="flex-1">
              <EditInput
                id="network"
                label="Sieć:"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <label className="flex-1">
              <EditInput
                id="appLink"
                label="Link do aplikacji:"
                value={appLink}
                onChange={(e) => setAppLink(e.target.value)}
              />
            </label>
            <label className="flex-1">
              <EditInput
                id="websiteLink"
                label="Link do strony:"
                value={websiteLink}
                onChange={(e) => setWebsiteLink(e.target.value)}
              />
            </label>

            {/*----------------------------------------------------------------------------------------------*/}
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-gray-600 mt-2 mb-2">
              Godziny otwarcia:
            </h2>

            {/* Monday */}
            <div className="flex flex-row sm:flex-row gap-4 mb-2">
              <span className="flex-1">Poniedziałek</span>

              <input
                type="time"
                value={mondayOpensAt}
                onChange={(e) => setMondayOpensAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
              <input
                type="time"
                value={mondayClosesAt}
                onChange={(e) => setMondayClosesAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>

            {/* Tuesday */}
            <div className="flex flex-row sm:flex-row gap-4 mb-2">
              <span className="flex-1">Wtorek</span>
              <input
                type="time"
                value={tuesdayOpensAt}
                onChange={(e) => setTuesdayOpensAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
              <input
                type="time"
                value={tuesdayClosesAt}
                onChange={(e) => setTuesdayClosesAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>

            {/* Wednesday */}
            <div className="flex flex-row sm:flex-row gap-4 mb-2">
              <span className="flex-1">Środa</span>
              <input
                type="time"
                value={wednesdayOpensAt}
                onChange={(e) => setWednesdayOpensAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
              <input
                type="time"
                value={wednesdayClosesAt}
                onChange={(e) => setWednesdayClosesAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>

            {/* Thursday */}
            <div className="flex flex-row sm:flex-row gap-4 mb-2">
              <span className="flex-1">Czwartek</span>
              <input
                type="time"
                value={thursdayOpensAt}
                onChange={(e) => setThursdayOpensAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
              <input
                type="time"
                value={thursdayClosesAt}
                onChange={(e) => setThursdayClosesAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>

            {/* Friday */}
            <div className="flex flex-row sm:flex-row gap-4 mb-2">
              <span className="flex-1">Piątek</span>
              <input
                type="time"
                value={fridayOpensAt}
                onChange={(e) => setFridayOpensAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
              <input
                type="time"
                value={fridayClosesAt}
                onChange={(e) => setFridayClosesAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>

            {/* Saturday */}
            <div className="flex flex-row sm:flex-row gap-4 mb-2">
              <span className="flex-1">Sobota</span>
              <input
                type="time"
                value={saturdayOpensAt}
                onChange={(e) => setSaturdayOpensAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
              <input
                type="time"
                value={saturdayClosesAt}
                onChange={(e) => setSaturdayClosesAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>

            {/* Sunday */}
            <div className="flex flex-row sm:flex-row gap-4 mb-2">
              <span className="flex-1">Niedziela</span>
              <input
                type="time"
                value={sundayOpensAt}
                onChange={(e) => setSundayOpensAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
              <input
                type="time"
                value={sundayClosesAt}
                onChange={(e) => setSundayClosesAt(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-2">
        <div className="flex flex-col flex-1 px-2">
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Logo:
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setLogo(e.target.files[0]);
                }
              }}
            />
            {kebab.logoUrl && (
              <p className="mt-2 text-sm text-gray-500">
                Aktualne logo:{" "}
                <a
                  href={kebab.logoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Zobacz
                </a>
              </p>
            )}
          </div>
        </div>
        <button
          type="button"
          className="px-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          onClick={handleLogoUpdate}
        >
          Zaktualizuj Logo
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-900"
          onClick={onClose}
        >
          Anuluj
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleSave}
        >
          Zapisz
        </button>
      </div>
    </form>
  );
};

export default EditKebabForm;
