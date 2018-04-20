// @flow

type Distribution = { key: number, value: number };
type Data = Array<Distribution>;

export const bucketDistributions = (distributionData: Data) => {
  let output = [
    { key: '1', value: 0 },
    { key: '2-10', value: 0 },
    { key: '11-30', value: 0 },
    { key: '31-50', value: 0 },
    { key: '51-100', value: 0 },
    { key: '101-500', value: 0 },
    { key: '501-1000', value: 0 },
    { key: '1000+', value: 0 },
  ];

  for (const rec of distributionData) {
    if (rec.key === 1) {
      output[0].value += rec.value;
    }

    if (rec.key > 1 && rec.key <= 10) {
      output[1].value += rec.value;
    }

    if (rec.key > 10 && rec.key <= 30) {
      output[2].value += rec.value;
    }

    if (rec.key > 30 && rec.key <= 50) {
      output[3].value += rec.value;
    }

    if (rec.key > 50 && rec.key <= 100) {
      output[4].value += rec.value;
    }

    if (rec.key > 100 && rec.key <= 500) {
      output[5].value += rec.value;
    }

    if (rec.key > 500 && rec.key <= 1000) {
      output[6].value += rec.value;
    }

    if (rec.key > 1000) {
      output[7].value += rec.value;
    }
  }

  return output;
};
