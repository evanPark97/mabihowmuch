export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const formatCurrency = (value: number) => {
  const units = [
    { label: "조", threshold: 10 ** 12 },
    { label: "억", threshold: 10 ** 8 },
    { label: "천만", threshold: 10 ** 7 },
  ];

  if (10 ** 8 > value) {
    return value.toLocaleString();
  } else {
    for (const unit of units) {
      if (value >= unit.threshold) {
        const main = Math.floor(value / unit.threshold).toLocaleString();
        const remainder = Math.floor(
          (value % unit.threshold) / (unit.threshold / 10)
        ).toLocaleString();

        return remainder !== "0"
          ? `${main}${unit.label} ${remainder}${
              units[units.indexOf(unit) + 1]?.label
            }`
          : `${main}${unit.label}`;
      }
    }
  }
};
