import { useContext } from "react";
import CampaignClientContext from "../../context/CampaignClientContext";

export const CampaignCustomerInfo = () => {
  const { campaignAnswer, setCampaignAnswer, setIsSelected,t } = useContext(
    CampaignClientContext
  );

  return (
    <>
      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
        <div className="w-2/3 mx-auto">
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            {t("contactInfo.gender")}
          </label>
          <select
            name="gender"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            onChange={(e) => {
              setCampaignAnswer({ ...campaignAnswer, gender: e.target.value });
              if (e.target.value && campaignAnswer.age) {
                setIsSelected(true);
              } else {
                setIsSelected(false);
              }
            }}
          >
            <option value=""></option>
            <option value="male">{t("inputs.male")}</option>
            <option value="female">{t("inputs.female")}</option>
          </select>
        </div>
      </div>
      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
        <div className="w-2/3 mx-auto">
          <label
            htmlFor="Age"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            {t("contactInfo.age")}
          </label>
          <input
            type="age"
            name="age"
            placeholder={t("inputs.your_age")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            value={campaignAnswer.age}
            onChange={(e) => {
              setCampaignAnswer({ ...campaignAnswer, age: e.target.value });
              if (e.target.value && campaignAnswer.gender) {
                setIsSelected(true);
              } else {
                setIsSelected(false);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export const CampaignLanguages = () => {
  const { campaign, setIsSelected, i18n } = useContext(CampaignClientContext);
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    console.log(language);
  };
  return (
    <div>
      <ul className="overflow-y-auto ">
        {campaign?.languages.map((language) => (
          <li
            key={language.id}
            className="w-2/3 mx-auto border border-inherit px-3 py-2 my-4 rounded-lg flex justify-between items-center bg-white"
          >
            <div className="flex flex-row items-center">
              <img
                src={language.coverImageUrl}
                alt="Language Icon"
                className="w-5 h-5 mr-2"
              />
              <label className="text-black" htmlFor={`checkbox-${language.id}`}>
                {language.name}
              </label>{" "}
            </div>
            <div>
              <input
                type="radio"
                id={`radio-${language.id}`}
                className="appearance-none w-5 h-5 border border-inherit rounded-full bg-slate-100 checked:bg-amber-300 checked:border-2"
                name="language"
                value={language.id}
                onChange={() => {
                  handleChangeLanguage(language.name);
                  setIsSelected(true);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
