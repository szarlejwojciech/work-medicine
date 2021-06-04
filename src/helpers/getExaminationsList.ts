import medicineWorkPolice from "../assets/medicine_work_police.json";
import medicineWorkBasic from "../assets/medicine_work_basic.json";
import medicineWorkDrivingLicence from "../assets/medicine_work_driving_licence.json";
import medicineWorkGun from "../assets/medicine_work_gun.json";

interface examinationItemInterface {
  name: string;
  list?: string[];
}
interface orgDataItemInterface {
  id: number;
  text: string;
  category?: string;
  examinations?: examinationItemInterface[] | [];
  type?: string;
}

export default function getExaminationsList(array: orgDataItemInterface[], isPolice = false, workMedicineType: string[]) {
  if (workMedicineType.includes("kontrolne (profilaktyczne)")) return ["Lekarz medycyny pracy"];

  const data = isPolice ? medicineWorkPolice : medicineWorkBasic;
  const selectedHarmfulsId: number[] = array.map(({ id }) => id);

  const harmfulsList = data.arrayValues
    .filter(({ id }) => selectedHarmfulsId.includes(id))
    .map(({ examinations }) =>
      examinations
        .filter(({ name }) => workMedicineType.includes(name))
        .map(({ list }) => list)
        .flat()
    )
    .flat();

  const examinationsList = ["Lekarz medycyny pracy", ...new Set(harmfulsList)];

  return examinationsList;
}
