module.exports = `
SELECT
  TID,
  startDate as TIME,
  -- TDT,
  -- LAG (TDT, 1) OVER (ORDER BY TID, CreatedAt, RANK) as LAG_TDT,
  -- ROUND(TDT - LAG (TDT, 1) OVER (PARTITION BY TID ORDER BY TID, CreatedAt, RANK), 3) as LAG_TDT_DIFF,
  -- FIRST_VALUE(TDT) OVER (PARTITION BY TID ORDER BY TID, CreatedAt, RANK) as FIRST_TDT,
  ROUND(TDT - FIRST_VALUE(TDT) OVER (PARTITION BY TID ORDER BY TID, CreatedAt, RANK) , 3) as TDT,
  SOC
FROM (
  SELECT
    RANK() OVER (PARTITION BY TID, week ORDER BY CreatedAt DESC) AS RANK,
    TID,
    CreatedAt,
    DATE_ADD(yearStartDay, INTERVAL week WEEK) as startDate,
    DATE_ADD(DATE_ADD(yearStartDay, INTERVAL week WEEK), INTERVAL 6 DAY) as endDate,
    week,
    TDT,
    SOC
  FROM (
    SELECT
      TID,
      CreatedAt,
      DATE(EXTRACT(YEAR FROM CreatedAt), 1, 1) as yearStartDay,
      EXTRACT(WEEK FROM CreatedAt) AS week,
      TDT,
      SOC
    FROM
      \`maas_mumbai.battery\` 
    WHERE
      TID != ""
      AND CreatedAt BETWEEN @from and @to
    )
  )
WHERE
  RANK = 1
ORDER BY TID ASC, week ASC
`
