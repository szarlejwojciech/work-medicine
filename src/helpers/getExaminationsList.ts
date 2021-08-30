import medicineWorkPolice from "../assets/medicine_work_police.json";
import medicineWorkBasic from "../assets/medicine_work_basic.json";

interface examinationItemInterface {
  name?: string;
  list?: string[];
}
interface orgDataItemInterface {
  id: number;
  text: string;
  category?: string;
  examinations: (examinationItemInterface | string)[];
  type?: string;
}

export default function getExaminationsList(
  array: orgDataItemInterface[],
  isPolice = false,
  workMedicineType: string[] = []
): string[] {
  if ((!array?.length || array[0]) === undefined) return [];
  if (
    workMedicineType.includes("kontrolne (profilaktyczne)") &&
    workMedicineType.length === 1
  )
    return ["Lekarz medycyny pracy"];

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
