interface Examination {
  name: string;
  list?: string[];
}
interface DataItem {
  id: number;
  text: string;
  age?: string;
  category?: string | undefined;
  examinations: Examination[] | [];
  type?: string;
  disabled?: boolean;
  details?: string;
}
interface Data {
  id: number;
  title: string;
  arrayValues: DataItem[];
}

export default function getExaminationsList(selectedHarmful: DataItem[], workMedicineType: string[] = [], data: Data): string[] {
  if ((!selectedHarmful?.length || selectedHarmful[0]) === undefined) return [];
  if (workMedicineType.includes("kontrolne (profilaktyczne)") && workMedicineType.length === 1) return ["Lekarz medycyny pracy"];

  // const data = isPolice ? medicineWorkPolice : medicineWorkBasic;
  const selectedHarmfulsId: number[] = selectedHarmful.map(({ id }) => id);

  const harmfulsList = data.arrayValues
    .filter(({ id }) => selectedHarmfulsId.includes(id))
    .map(({ examinations }) =>
      examinations
        .filter(({ name }) => workMedicineType.includes(name))
        .map(({ list }) => list)
        .flat()
    )
    .flat();

  const examinationsList = [...new Set(["Lekarz medycyny pracy", ...harmfulsList])];

  return examinationsList as string[];
}
