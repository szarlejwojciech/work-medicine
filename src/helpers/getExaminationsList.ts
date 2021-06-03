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

export default function getExaminationsList(array: orgDataItemInterface[], isPolice = false) {
  console.log(array);
  console.log(array.map(({ id }) => id));

  const examinationsList = array.map(({ text }) => text);

  return array;
}
